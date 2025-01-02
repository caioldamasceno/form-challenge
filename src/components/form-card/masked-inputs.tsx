import React, { useState, forwardRef } from "react";
import { BaseInput } from "../ui/base-input";
import type { BaseInputProps } from "@/types";
import { MaskHandler } from "@/lib/utils";
import { useCep } from "@/hooks/useCep";

export const MaskedInputs = () => {
  const fmt = new MaskHandler();

  const DateInput = forwardRef<HTMLInputElement, BaseInputProps>(
    ({ ...props }, ref) => {
      const [date, setDate] = useState("");

      const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maskedValue = fmt.mask.date(e.target.value);
        setDate(maskedValue);
      };

      return (
        <BaseInput
          {...props}
          ref={ref}
          label="Data de nascimento"
          value={date}
          onChange={handleDateChange}
          placeholder="DD/MM/YYYY"
          icon="carbon:calendar"
          maxLength={10}
        />
      );
    }
  );

  const CpfInput = forwardRef<HTMLInputElement, BaseInputProps>(
    ({ ...props }, ref) => {
      const [value, setValue] = useState("");

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(fmt.mask.cpf(e.target.value));
      };

      return (
        <BaseInput
          {...props}
          ref={ref}
          label="CPF"
          value={value}
          onChange={handleChange}
          placeholder="000.000.000-00"
          maxLength={14}
        />
      );
    }
  );

  const CepInput = forwardRef<
    HTMLInputElement,
    BaseInputProps & {
      setValue?: any;
    }
  >(({ setValue, ...props }, ref) => {
    const [value, setValue2] = useState("");
    const { fetchAddress } = useCep(setValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const maskedValue = fmt.mask.cep(e.target.value);
      setValue2(maskedValue);
      if (maskedValue.replace(/\D/g, "").length === 8) {
        fetchAddress(maskedValue);
      }
    };

    return (
      <BaseInput
        {...props}
        ref={ref}
        label="CEP"
        value={value}
        onChange={handleChange}
        placeholder="00000-000"
        maxLength={9}
      />
    );
  });

  const PhoneInput = forwardRef<HTMLInputElement, BaseInputProps>(
    ({ ...props }, ref) => {
      const [value, setValue] = useState("");

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(fmt.mask.phone(e.target.value));
      };

      return (
        <BaseInput
          {...props}
          ref={ref}
          label="Telefone"
          value={value}
          onChange={handleChange}
          placeholder="(00) 00000-0000"
          maxLength={15}
        />
      );
    }
  );

  const CurrencyInput = forwardRef<HTMLInputElement, BaseInputProps>(
    ({ ...props }, ref) => {
      const [value, setValue] = useState("");

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(fmt.mask.currency(e.target.value));
      };

      return (
        <BaseInput
          {...props}
          ref={ref}
          label="Renda Mensal"
          value={value}
          onChange={handleChange}
          placeholder="R$ 0,00"
        />
      );
    }
  );

  return {
    DateInput,
    CpfInput,
    CepInput,
    PhoneInput,
    CurrencyInput,
  };
};
