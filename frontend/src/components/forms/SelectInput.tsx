import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import type { FormSchemaInput, FormData } from "@/lib/types";
import type { Control, UseFormStateReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

interface SelectInputProps {
  label: string;
  name: keyof FormSchemaInput;
  control: Control<FormSchemaInput, undefined, FormData>;
  formState: UseFormStateReturn<FormSchemaInput>;
  options: { value: string; label: string }[];
  placeholder?: string;
}

/**
 * A form select input component with a label and optional validation.
 *
 * @param {string} label - The label to display above the input.
 * @param {Control<FormSchemaInput, undefined, FormData>} control - The control object from react-hook-form.
 * @param {keyof FormSchemaInput} name - The name of the input element.
 * @param {UseFormStateReturn<FormSchemaInput>} formState - The form state object from react-hook-form.
 * @param {{ value: string; label: string }[]} options - An array of options to display in the select input.
 * @param {string} [placeholder] - An optional placeholder string to display in the select input.
 */
export default function SelectInput({
  label,
  control,
  name,
  formState,
  options,
  placeholder = "Select option",
}: SelectInputProps) {
  return (
    <div>
      <Label htmlFor={name} className="font-bold text-lg">
        {label}
      </Label>

      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value ? String(field.value) : ""}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent id={name}>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {formState.errors[name] && (
        <p className="text-red-500">{formState.errors[name]?.message}</p>
      )}
    </div>
  );
}
