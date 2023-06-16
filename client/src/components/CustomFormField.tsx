import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface CustomFormFieldProps {
  control: Control<any[] | any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  hint?: string;
}

function CustomFormField({
  control,
  name,
  label,
  placeholder,
  type = "text",
  hint,
  ...props
}: CustomFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              {...props}
            />
          </FormControl>
          {hint && <FormDescription>{hint}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomFormField;
