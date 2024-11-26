"use client";

import { ControllerProps, FieldValues, Path } from "react-hook-form";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";

interface FormProps<T extends FieldValues> {
  control: ControllerProps<T>["control"];
  name: Path<T>;
}

interface ComponentProps<T extends FieldValues> extends FormProps<T> {
  label: string;
  description?: React.ReactNode;
  hint?: React.ReactNode;
}

type Props<T extends FieldValues> = ComponentProps<T> &
  Omit<React.ComponentPropsWithoutRef<"input">, keyof ComponentProps<T>>;

export default function FormInput<T extends FieldValues>(props: Props<T>) {
  const { control, name, label, description, hint, ...inputProps } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between gap-2">
            <FormLabel>{label}</FormLabel>
            {hint}
          </div>

          <FormControl>
            <Input {...inputProps} {...field} />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
