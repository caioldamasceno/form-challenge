import { FormSchema } from "@/types";
import { create } from "zustand";

interface FormStore {
  formData: Partial<FormSchema>;
  updateFormData: (data: Partial<FormSchema>) => void;
  resetForm: () => void;
}

const initialState: Partial<FormSchema> = {
  fullname: "",
  documentNumber: "",
  birthdate: "",
  email: "",
  zipcode: "",
  phoneNumber: "",
  addressNumber: "",
  addressState: "",
  country: "",
  city: "",
  addressDistrict: "",
  addressStreet: "",
  addressComplement: "",
  educationLevel: "",
  minimumWage: "",
  password: "",
  confirmPassword: "",
};

export const useFormStore = create<FormStore>((set) => ({
  formData: initialState,
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetForm: () => set({ formData: initialState }),
}));
