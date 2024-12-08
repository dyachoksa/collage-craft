"use client";

import { ControllerProps, FieldValues, Path } from "react-hook-form";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Switch } from "~/components/ui/switch";

interface FormProps<T extends FieldValues> {
  control: ControllerProps<T>["control"];
  name: Path<T>;
}

interface ComponentProps<T extends FieldValues> extends FormProps<T> {
  label: string;
  description?: React.ReactNode;
}

type Props<T extends FieldValues> = ComponentProps<T> &
  Omit<React.ComponentPropsWithoutRef<typeof Switch>, keyof ComponentProps<T>>;

export default function FormInput<T extends FieldValues>(props: Props<T>) {
  const { control, name, label, description, ...inputProps } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-start gap-4 space-y-0">
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              name={field.name}
              disabled={field.disabled}
              {...inputProps}
            />
          </FormControl>

          <div className="flex flex-col gap-1">
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
