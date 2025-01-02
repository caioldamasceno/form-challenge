import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility class for handling masking and unmasking of common Brazilian data formats
 * @class MaskHandler
 * @description Provides methods to format and clean strings for dates, CPF, CEP, phone numbers, and currency values
 * @example
 * const handler = new MaskHandler();
 * handler.mask.cpf('12345678900'); // Returns: '123.456.789-00'
 * handler.unmask.cpf('123.456.789-00'); // Returns: '12345678900'
 */
export class MaskHandler {
  mask = {
    date: (value: string): string => {
      const cleaned = value.replace(/\D/g, "");
      const limited = cleaned.slice(0, 8);
      if (limited.length <= 2) return limited;
      if (limited.length <= 4)
        return `${limited.slice(0, 2)}/${limited.slice(2)}`;
      return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(
        4
      )}`;
    },
    cpf: (value: string): string => {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .slice(0, 14);
    },
    cep: (value: string): string => {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 9);
    },
    phone: (value: string): string => {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);
    },
    currency: (value: string): string => {
      const onlyNumbers = value.replace(/\D/g, "");
      const numberFormat = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      return numberFormat.format(Number(onlyNumbers) / 100);
    },
  };

  unmask = {
    date: (birthdate: string): number => {
      const [day, month, year] = birthdate.split("/");
      return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
    },
    cpf: (documentNumber: string): string => {
      return documentNumber.replace(/\D/g, "");
    },
    cep: (zipcode: string): string => {
      return zipcode.replace(/\D/g, "");
    },
    phone: (phoneNumber: string): string => {
      return phoneNumber.replace(/\D/g, "");
    },
    currency: (minimumWage: string): number => {
      return parseFloat(minimumWage.replace(/[^\d,]/g, "").replace(",", "."));
    },
  };
}

/**
 * Parses Zod validation errors into a simplified object format
 * @param error - The error object to parse (expected to be a Zod error)
 * @returns Object with field names as keys and error messages as values
 * @example
 * // Returns: { email: "Invalid email format", password: "Too short" }
 */
export const parseErrors = (error: unknown) => {
  if (error instanceof z.ZodError) {
    const errorMap = error.errors.reduce(
      (acc: { [key: string]: string }, curr) => {
        const fieldName = curr.path[0];
        acc[fieldName] = curr.message;
        return acc;
      },
      {}
    );

    return errorMap;
  }
};

export const validateBirthDate = (date: string) => {
  const [day, month, year] = date.split("/").map(Number);
  const birth = new Date(year, month - 1, day);
  const today = new Date();

  if (isNaN(birth.getTime())) return false;

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age >= 18;
};
