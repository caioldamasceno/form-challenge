import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseErrors, MaskHandler } from "@/lib/utils";
import { formSchema } from "@/constants/zod-schema";
import { FormSchema } from "@/types";
import { useState } from "react";

export function useSubmit() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormSchema>();
  const fmt = new MaskHandler();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      educationLevel: "",
    },
  });

  const submitDummyData = async (data: FormSchema) => {
    try {
      console.log(data);
      formSchema.parse(data);
      setSubmittedData(data);

      // assuming this data will go to an API, it'll be unmasked.
      const unmaskedData = {
        ...data,
        documentNumber: fmt.unmask.cpf(data.documentNumber),
        birthdate: fmt.unmask.date(data.birthdate),
        zipcode: fmt.unmask.cep(data.zipcode),
        phoneNumber: fmt.unmask.phone(data.phoneNumber),
        minimumWage: fmt.unmask.currency(data.minimumWage),
      };

      const formattedData = Object.entries(unmaskedData)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");

      alert("Form Data:\n" + formattedData);
      setIsModalOpen(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(parseErrors(error));
      }
    }
  };

  return {
    submitDummyData,
    register,
    handleSubmit,
    errors,
    setValue,
    isModalOpen,
    setIsModalOpen,
    submittedData,
  };
}
