import { Input } from "@/components/ui/input";
import {
  FieldErrors,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";

export interface FormSchema {
  fullname: string;
  documentNumber: string;
  birthdate: string;
  email: string;
  zipcode: string;
  phoneNumber: string;
  addressNumber: string;
  addressState: string;
  country: string;
  city: string;
  addressDistrict: string;
  addressStreet: string;
  addressComplement?: string;
  educationLevel: string;
  minimumWage: string;
  password: string;
  confirmPassword: string;
}

export interface BaseInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  icon?: string;
  iconSize?: number;
  iconClassName?: string;
  invalid?: boolean;
  invalidMessage?: string;
}

export interface SchoolOptionsProps {
  invalid?: boolean;
  invalidMessage?: string;
  onChange: (value: string) => void;
  name: string;
}

export interface PasswordProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export interface CountriesSelectProps
  extends React.HTMLAttributes<HTMLDivElement> {
  invalid?: boolean;
  invalidMessage?: string;
  disabled?: boolean;
  registration: Partial<UseFormRegisterReturn>;
  setValue: (name: string, value: string) => void;
}

export interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}
