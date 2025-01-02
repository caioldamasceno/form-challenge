import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { countries } from "@/constants/countries";
import { Label } from "../ui/label";
import { CountriesSelectProps } from "@/types";

const CountriesSelect = ({
  invalid,
  invalidMessage,
  disabled,
  registration,
  setValue,
}: CountriesSelectProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState("");

  const handleSelect = (countryLabel: string) => {
    setSelectedCountry(countryLabel);
    setValue("country", countryLabel);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs text-gray-500">País</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between py-5",
              selectedCountry ? "text-black" : "text-gray-500",
              invalid && "border-red-500"
            )}
            disabled={disabled}
          >
            {selectedCountry || "Selecione um país..."}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[420px] p-0">
          <Command>
            <CommandInput placeholder="Buscar país..." />
            <CommandList>
              <CommandEmpty>Nenhum país encontrado.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.value}
                    onSelect={() => handleSelect(country.label)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCountry === country.label
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {country.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {invalid && invalidMessage && (
        <span className="text-sm text-red-500">{invalidMessage}</span>
      )}
      <input type="hidden" {...registration} value={selectedCountry} />
    </div>
  );
};

export default CountriesSelect;
