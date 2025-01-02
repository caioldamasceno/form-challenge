import { useState } from "react";
import { BaseInput } from "../ui/base-input";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { PasswordProps } from "@/types";

export default function Password({ register, errors }: PasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      <BaseInput
        type={showPassword ? "text" : "password"}
        label="Senha"
        placeholder="********"
        invalid={errors.password !== undefined}
        invalidMessage={errors.password?.message?.toString()}
        {...register("password")}
      />

      <BaseInput
        type={showPassword ? "text" : "password"}
        label="Confirmar Senha"
        placeholder="********"
        invalid={errors.confirmPassword !== undefined}
        invalidMessage={errors.confirmPassword?.message?.toString()}
        {...register("confirmPassword")}
      />

      <div className="flex items-center gap-2">
        <Switch
          id="show-password"
          checked={showPassword}
          onCheckedChange={setShowPassword}
          aria-label="Toggle password visibility"
        />
        <Label htmlFor="show-password">Mostrar senha</Label>
      </div>
    </div>
  );
}
