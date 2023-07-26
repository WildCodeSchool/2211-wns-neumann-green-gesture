import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputWithLabelProps {
  idForLabel: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  hint?: string;
}

function InputWithLabel({
  idForLabel,
  label,
  onChange,
  value,
  type = "text",
  placeholder,
  hint,
}: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={idForLabel}>{label}</Label>
      <Input
        type={type}
        id={idForLabel}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
    </div>
  );
}

export default InputWithLabel;
