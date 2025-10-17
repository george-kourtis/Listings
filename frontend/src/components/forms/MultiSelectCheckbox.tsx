import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Command, CommandList } from "@/components/ui/command";
import type { Option } from "@/lib/types";

interface MultiSelectCheckboxProps {
  options: Option[];
  value: string[]; // selected values
  onChange: (next: string[]) => void;
  label: string;
  max?: number; // default 5
  disabled?: boolean;
  className?: string;
  name?: string;
  onBlur?: () => void;
}

/**
 * A component that allows the user to select multiple options from a list.
 * It displays a button with the selected options, and a popover with the options.
 * The user can select up to `max` options.
 * The `onChange` callback is called whenever the user selects or deselects an option.
 * The component also renders a hidden input for form integration.
 *
 *
 * @param {MultiSelectCheckboxProps} props - The props for the component.
 * @param {Option[]} props.options - The options to select from.
 * @param {string[]} props.value - The selected values.
 * @param {(next: string[]) => void} props.onChange - The callback called when the user selects or deselects an option.
 * @param {string} props.label - The label for the component.
 * @param {number} [props.max=5] - The maximum number of options the user can select.
 * @param {boolean} [props.disabled=false] - Whether the component is disabled.
 * @param {string} [props.className] - The className for the component.
 * @param {string} [props.name] - The name for the hidden input.
 * @param {() => void} [props.onBlur] - The callback called when the user blurs the hidden input.
 */
export function MultiSelectCheckbox({
  options,
  value,
  onChange,
  label,
  max = 5,
  disabled = false,
  className,
  name,
  onBlur,
}: MultiSelectCheckboxProps) {
  const selectedSet = new Set(value);

  const toggle = (opt: Option) => {
    if (disabled) return;
    const isSelected = selectedSet.has(opt.value);
    // If already selected -> remove
    if (isSelected) {
      onChange(value.filter((v) => v !== opt.value));
      return;
    }

    // If adding would exceed max, do nothing
    if (value.length >= max) {
      return;
    }

    onChange([...value, opt.value]);
  };

  const clearAll = () => onChange([]);

  return (
    <div className={className}>
      <Label className="mb-2 font-bold text-lg ">{label}</Label>

      {/* Hidden input for form integration */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={JSON.stringify(value)}
          onBlur={onBlur}
        />
      )}

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="w-full cursor-pointer flex items-center justify-between border border-gray-100 rounded-md p-2 shadow-sm h-10"
            disabled={disabled}
          >
            <span className="truncate">
              {value.length === 0 ? "" : `${value.join(", ")} `}
            </span>
          </button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-[320px] p-0">
          <div className="p-3 border-b">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Choose up to {max}</div>
              <div className="flex gap-2">
                <button
                  className="text-xs text-blue-600 hover:underline disabled:opacity-40"
                  onClick={clearAll}
                  disabled={value.length === 0}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <Command>
            <CommandList>
              <div className="max-h-56 overflow-auto">
                {options.map((opt) => {
                  const isSelected = selectedSet.has(opt.value);
                  const disabledBecauseLimit =
                    !isSelected && value.length >= max;
                  return (
                    <div
                      key={opt.value}
                      role="button"
                      onClick={() => toggle(opt)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggle(opt);
                        }
                      }}
                      tabIndex={0}
                      className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-slate-50 ${
                        disabledBecauseLimit
                          ? "opacity-60 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggle(opt)}
                        aria-label={`Select ${opt.label}`}
                        disabled={disabledBecauseLimit}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {opt.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CommandList>
          </Command>
          <div className="p-3 border-t flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {value.length} of {max} selected
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
