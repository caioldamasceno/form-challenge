import { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BaseInput } from "../ui/base-input";
import { useSubmit } from "@/hooks/useSubmit";
import { MaskedInputs } from "./masked-inputs";
import { useCep } from "@/hooks/useCep";

// Lazily import the components
const CountriesSelect = lazy(() => import("./countries-select"));
const SchoolOptions = lazy(() => import("./school-options"));
const Password = lazy(() => import("./password"));
const SuccessModal = lazy(() => import("./success-modal"));

export default function FormCard() {
  const {
    submitDummyData,
    register,
    handleSubmit,
    errors,
    setValue,
    isModalOpen,
    setIsModalOpen,
    submittedData,
  } = useSubmit();
  const { CpfInput, DateInput, PhoneInput, CepInput, CurrencyInput } =
    MaskedInputs();
  const { isLoading, error } = useCep(setValue);

  return (
    <>
      <Card className="w-[800px] px-12 overflow-y-auto relative">
        <form onSubmit={handleSubmit(submitDummyData)}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <BaseInput
                type="text"
                label="Nome completo"
                placeholder="ex: Johny Doe"
                invalid={errors.fullname !== undefined}
                invalidMessage={errors.fullname?.message}
                {...register("fullname")}
              />

              <CpfInput
                invalid={errors.documentNumber !== undefined}
                invalidMessage={errors.documentNumber?.message}
                {...register("documentNumber")}
              />

              <DateInput
                invalid={errors.birthdate !== undefined}
                invalidMessage={errors.birthdate?.message}
                {...register("birthdate")}
              />

              <BaseInput
                type="email"
                label="Email"
                placeholder="exemplo@email.com"
                invalid={errors.email !== undefined}
                invalidMessage={errors.email?.message}
                {...register("email")}
              />

              <PhoneInput
                invalid={errors.phoneNumber !== undefined}
                invalidMessage={errors.phoneNumber?.message}
                {...register("phoneNumber")}
              />
            </div>

            <div className="space-y-4">
              <CepInput
                invalid={errors.zipcode !== undefined || !!error}
                invalidMessage={errors.zipcode?.message ?? error ?? ""}
                setValue={setValue}
                {...register("zipcode")}
              />

              <Suspense fallback={<div>Carregando...</div>}>
                <CountriesSelect
                  disabled={isLoading}
                  invalid={errors.country !== undefined}
                  invalidMessage={errors.country?.message}
                  registration={register("country")}
                  setValue={(_, val) => {
                    setValue("country", val);
                  }}
                />
              </Suspense>

              <BaseInput
                type="text"
                label="Estado"
                placeholder="ex: SP"
                disabled={isLoading}
                invalid={errors.addressState !== undefined}
                invalidMessage={errors.addressState?.message}
                {...register("addressState")}
              />

              <BaseInput
                type="text"
                label="Cidade"
                placeholder="ex: São Paulo"
                disabled={isLoading}
                invalid={errors.city !== undefined}
                invalidMessage={errors.city?.message}
                {...register("city")}
              />

              <BaseInput
                type="text"
                label="Bairro"
                placeholder="ex: Centro"
                disabled={isLoading}
                invalid={errors.addressDistrict !== undefined}
                invalidMessage={errors.addressDistrict?.message}
                {...register("addressDistrict")}
              />

              <BaseInput
                type="text"
                label="Endereço"
                placeholder="ex: Rua das Flores"
                disabled={isLoading}
                invalid={errors.addressStreet !== undefined}
                invalidMessage={errors.addressStreet?.message}
                {...register("addressStreet")}
              />

              <BaseInput
                type="text"
                label="Número"
                placeholder="ex: 123"
                invalid={errors.addressNumber !== undefined}
                invalidMessage={errors.addressNumber?.message}
                {...register("addressNumber")}
              />

              <BaseInput
                type="text"
                label="Complemento"
                placeholder="ex: Apto 101"
                disabled={isLoading}
                {...register("addressComplement")}
              />
            </div>

            <div className="space-y-4">
              <Suspense fallback={<div>Carregando...</div>}>
                <SchoolOptions
                  invalid={errors.educationLevel !== undefined}
                  invalidMessage={errors.educationLevel?.message}
                  {...register("educationLevel")}
                  onChange={(value) => setValue("educationLevel", value)}
                />
              </Suspense>

              <CurrencyInput
                invalid={errors.minimumWage !== undefined}
                invalidMessage={errors.minimumWage?.message}
                {...register("minimumWage")}
              />
            </div>

            <Suspense fallback={<div>Carregando...</div>}>
              <Password register={register} errors={errors} />
            </Suspense>
          </CardContent>

          <CardFooter className="flex justify-between sticky bottom-0 bg-white w-full left-0 py-4">
            <Button className="bg-[#7a5cfa] w-full py-5" type="submit">
              Cadastrar
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Suspense fallback={null}>
        <SuccessModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={submittedData}
        />
      </Suspense>
    </>
  );
}
