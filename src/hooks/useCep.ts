import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useFormStore } from "@/stores/form.store";
import type { UseFormSetValue } from "react-hook-form";
import { FormSchema, ViaCEPResponse } from "@/types";

const fetchCepData = async (cep: string) => {
  const formattedCep = cep.replace(/\D/g, "");
  const response = await axios.get<ViaCEPResponse>(
    `https://viacep.com.br/ws/${formattedCep}/json/`
  );

  if (response.data.erro) {
    throw new Error("CEP não encontrado");
  }

  return response.data;
};

export function useCep(setValue: UseFormSetValue<FormSchema>) {
  const updateFormData = useFormStore((state) => state.updateFormData);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["cep"],
    queryFn: async () => {
      const cep = queryClient.getQueryData<string>(["currentCep"]);
      if (!cep) throw new Error("CEP não fornecido");
      return fetchCepData(cep);
    },
    enabled: false,
  });

  const fetchAddress = async (cep: string) => {
    queryClient.setQueryData(["currentCep"], cep);
    const result = await query.refetch();

    if (result.data) {
      const addressData = {
        zipcode: result.data.cep,
        addressStreet: result.data.logradouro,
        addressComplement: result.data.complemento,
        addressDistrict: result.data.bairro,
        city: result.data.localidade,
        addressState: result.data.uf,
      };

      updateFormData(addressData);
      Object.entries(addressData).forEach(([key, value]) => {
        setValue(key as keyof FormSchema, value);
      });
    }
  };

  return {
    fetchAddress,
    isLoading: query.isLoading,
    error: query.error ? (query.error as Error).message : null,
  };
}
