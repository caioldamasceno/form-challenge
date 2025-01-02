import { forwardRef } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Icon } from "@iconify-icon/react";
import { cn } from "@/lib/utils";
import { BaseInputProps } from "@/types";

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    { label, icon, iconClassName, iconSize, invalid, invalidMessage, ...props },
    ref
  ) => (
    <div className="space-y-1">
      <Label className="text-xs text-gray-500">{label}</Label>
      <div
        className={cn(
          "relative border rounded-md flex items-center justify-between border-gray-300 pr-2",
          {
            "border-red-500": invalid,
          }
        )}
      >
        <Input ref={ref} className="border-none shadow-none" {...props} />
        {invalid ? (
          <Icon
            icon="mingcute:warning-fill"
            className="text-red-500"
            size={iconSize || 20}
          />
        ) : (
          icon && <Icon icon={icon} className={iconClassName} size={iconSize} />
        )}
      </div>
      {invalid && (
        <span className="text-red-500 text-xs">{invalidMessage}</span>
      )}
    </div>
  )
);

BaseInput.displayName = "BaseInput";
