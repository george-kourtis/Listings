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
  setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedArea: React.Dispatch<React.SetStateAction<string | null>>;
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
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setSearchQuery - A function to update the search query state.
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setSelectedArea - A function to update the selected area state.
 * @param {AreaType[]} areaData - An array of AreaType objects to display in the dropdown.
 * @param {UseFormSetValue<FormSchemaInput>} setValue - The setValue function from react-hook-form.
 * @param {boolean} showNoResults - A boolean indicating whether to show a "no results found" message.
 * @param {boolean} [isLoading=false] - A boolean indicating whether the data is currently being fetched.
 */
export default function AreaDropdown({
  register,
  selectedArea,
  setSearchQuery,
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
            setSearchQuery(value);
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
                      // Clear the search query to close the dropdown
                      setSearchQuery(null);
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
