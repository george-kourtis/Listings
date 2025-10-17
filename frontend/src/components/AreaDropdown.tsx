import { Label } from "./ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Input } from "./ui/input";
import type { AreaType } from "@/lib/types";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { FormSchemaInput } from "@/lib/types";

interface AreaDropdownProps {
  register: UseFormRegister<FormSchemaInput>;
  selectedArea: string | null;
  handleAreaValueChange: (value: string) => void;
  setSelectedArea: (value: string) => void;
  areaData: AreaType[];
  setValue: UseFormSetValue<FormSchemaInput>;
  showNoResults: boolean;
  isLoading?: boolean;
}

/**
 * A dropdown component for selecting an area.
 *
 * @param {UseFormRegister<FormSchemaInput>} register - The register function from react-hook-form.
 * @param {string | null} selectedArea - The currently selected area.
 * @param {(value: string) => void} handleAreaValueChange - The callback called when the user changes the area input.
 * @param {(value: string) => void} setSelectedArea - The callback called when the user selects an area.
 * @param {AreaType[]} areaData - The list of areas to select from.
 * @param {UseFormSetValue<FormSchemaInput>} setValue - The setValue function from react-hook-form.
 * @param {boolean} [isLoading=false] - Whether the component is currently loading data.
 * @param {boolean} showNoResults - Whether to show the "No results found" message.
 */
export default function AreaDropdown({
  register,
  selectedArea,
  handleAreaValueChange,
  setSelectedArea,
  areaData,
  setValue,
  showNoResults,
  isLoading = false,
}: AreaDropdownProps) {
  return (
    <>
      <Label htmlFor="area" className="font-bold text-lg">
        Area
      </Label>
      <Input
        id="area"
        type="hidden"
        {...register("area", { required: true })}
      />
      <Command
        label="area"
        className="relative border shadow-xs border-accent rounded-md"
      >
        <CommandInput
          value={selectedArea || ""}
          onValueChange={(value) => {
            handleAreaValueChange(value);
            setSelectedArea(value);
          }}
          className=""
        />
        {showNoResults && !isLoading && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
        {(areaData.length > 0 || isLoading) && (
          <CommandList className="absolute left-0 top-full w-full z-50 bg-white border border-accent shadow-xl rounded-xl">
            {!isLoading && (
              <CommandGroup>
                {areaData.map((area) => (
                  <CommandItem
                    key={area.placeId}
                    value={area.mainText + ", " + area.secondaryText}
                    onSelect={() => {
                      setValue("placeId", area.placeId);
                      setValue(
                        "area",
                        `${area.mainText}, ${area.secondaryText}`
                      );
                      setSelectedArea(
                        `${area.mainText}, ${area.secondaryText}`
                      );
                    }}
                  >
                    <span className="text-lg">
                      {area.mainText}, {area.secondaryText}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
    </>
  );
}
