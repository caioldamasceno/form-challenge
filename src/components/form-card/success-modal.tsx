import { FormSchema } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Check } from "lucide-react";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  data?: FormSchema;
}

const SuccessModal = ({ open, onClose, data }: SuccessModalProps) => {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <div className="mx-auto bg-green-100 p-3 rounded-full w-fit">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <DialogTitle className="text-center text-xl">
            Cadastro realizado com sucesso!
          </DialogTitle>
          <DialogDescription className="text-center">
            Seus dados foram registrados conforme abaixo
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <InfoSection title="Dados Pessoais">
            <InfoItem label="Nome" value={data.fullname} />
            <InfoItem label="CPF" value={data.documentNumber} />
            <InfoItem label="Data de Nascimento" value={data.birthdate} />
            <InfoItem label="Email" value={data.email} />
            <InfoItem label="Telefone" value={data.phoneNumber} />
          </InfoSection>

          <InfoSection title="Endereço">
            <InfoItem label="CEP" value={data.zipcode} />
            <InfoItem label="País" value={data.country} />
            <InfoItem label="Estado" value={data.addressState} />
            <InfoItem label="Cidade" value={data.city} />
            <InfoItem label="Bairro" value={data.addressDistrict} />
            <InfoItem
              label="Endereço Completo"
              value={`${data.addressStreet}, ${data.addressNumber}${
                data.addressComplement ? `, ${data.addressComplement}` : ""
              }`}
            />
          </InfoSection>

          <InfoSection title="Informações Adicionais">
            <InfoItem label="Escolaridade" value={data.educationLevel} />
            <InfoItem label="Renda Mensal" value={data.minimumWage} />
          </InfoSection>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const InfoSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <h3 className="font-semibold text-gray-900">{title}</h3>
    <div className="space-y-1">{children}</div>
  </div>
);

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="text-sm">
    <span className="text-gray-500">{label}:</span>{" "}
    <span className="text-gray-900">{value}</span>
  </div>
);

export default SuccessModal;
