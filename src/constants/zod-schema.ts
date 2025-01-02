import { validateBirthDate } from "@/lib/utils";
import { z } from "zod";

export const formSchema = z
  .object({
    fullname: z
      .string()
      .min(1, "Nome completo é obrigatório")
      .max(100, "Máximo 100 caracteres"),
    documentNumber: z
      .string()
      .length(14, "CPF deve ter 14 caracteres (incluindo símbolos)"),
    birthdate: z
      .string()
      .min(9, "Data de nascimento inválida")
      .refine(validateBirthDate, "Você deve ter pelo menos 18 anos"),
    email: z.string().email("Email inválido"),
    zipcode: z.string().min(8, "CEP deve ter no mínimo 8 caracteres"),
    phoneNumber: z.string().min(11, "Contato deve ter no mínimo 11 caracteres"),
    addressNumber: z
      .string()
      .min(1, "Número é obrigatório")
      .max(40, "Máximo 40 caracteres"),
    addressState: z.string().length(2, "Estado deve ter 2 caracteres"),
    country: z.string().nonempty("País é obrigatório"),
    city: z.string().nonempty("Cidade é obrigatória"),
    addressDistrict: z.string().nonempty("Bairro é obrigatório"),
    addressStreet: z.string().nonempty("Endereço é obrigatório"),
    addressComplement: z.string().optional(),
    educationLevel: z.string().nonempty("Escolaridade é obrigatória"),
    minimumWage: z.string().nonempty("Renda mensal é obrigatória"),
    password: z.string().min(10, "Senha deve ter no mínimo 10 caracteres"),
    confirmPassword: z
      .string()
      .min(10, "Confirmação de senha deve ter no mínimo 10 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
