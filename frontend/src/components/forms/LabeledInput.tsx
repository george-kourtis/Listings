import type { FormSchemaInput } from "@/lib/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface LabeledInputProps {
  label: string;
  id: string;
  type: string;
  register: UseFormRegister<FormSchemaInput>;
  name: keyof FormSchemaInput;
  registerOptions?: RegisterOptions<FormSchemaInput, keyof FormSchemaInput>;
  errorMessage?: string;
}

/**
 * A form input component with a label and optional validation.
 *
 * @param {string} label - The label to display above the input.
 * @param {string} id - The id of the input element.
 * @param {string} type - The type of the input element.
 * @param {function} register - The register function from react-hook-form.
 * @param {string} name - The name of the input element.
 * @param {object} [registerOptions] - An optional object with validation options.
 * @param {string} [errorMessage] - An optional error message to display below the input.
 */
export default function LabeledInput({
  label,
  id,
  type,
  register,
  name,
  errorMessage,
  registerOptions,
}: LabeledInputProps) {
  return (
    <div>
      <Label htmlFor={id} className="font-bold text-lg mb-2">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        {...register(name, registerOptions)}
        onChange={(e) => {
          if (type === "text" && registerOptions?.validate) {
            // Only allow numbers and decimal point for text inputs that need number validation
            const value = e.target.value.replace(/[^0-9]/g, "");
            e.target.value = value;
          }
        }}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}
