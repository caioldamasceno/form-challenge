import { forwardRef } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { SchoolOptionsProps } from "@/types";

const SchoolOptions = forwardRef<HTMLDivElement, SchoolOptionsProps>(
  ({ invalid, invalidMessage, onChange, name }, ref) => {
    const options = [
      "Ensino Fundamental Completo",
      "Ensino médio completo",
      "Ensino superior completo",
    ];

    return (
      <div ref={ref} className="space-y-2 pb-3 pt-2">
        <Label className="text-xs text-gray-600">Escolaridade</Label>
        <RadioGroup
          name={name}
          onValueChange={onChange}
          className="flex flex-col space-y-2"
        >
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem id={option} value={option} />
              <Label
                htmlFor={option}
                className="text-xs text-gray-500 cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {invalid && invalidMessage && (
          <span className="text-sm text-red-500">{invalidMessage}</span>
        )}
      </div>
    );
  }
);

SchoolOptions.displayName = "SchoolOptions";

export default SchoolOptions;
