import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetAllValidationsQuery } from "@/gql/generated/schema";

interface CustomSelectMultipleProps {
  field: ControllerRenderProps<
    { name: string; description: string; validationIds: number[] },
    "validationIds"
  >;
}

type ValidationType = {
  id: number;
  points: number;
};

const CustomSelectMultiple = ({ field }: CustomSelectMultipleProps) => {
  const [selected, setSelected] = useState<ValidationType[]>([]);
  const { data, loading } = useGetAllValidationsQuery();

  if (loading) return <div>Loading...</div>;

  const handleAddSelect = (value: ValidationType) => {
    if (selected.includes(value)) return;
    setSelected((prev) => [...prev, value]);

    const newValue = field.value.includes(value.id)
      ? field.value.filter((item) => item !== value.id)
      : [...field.value, value.id];

    field.onChange(newValue);
  };

  const handelDeleteSelect = (value: number) => {
    const newValue = field.value.filter((item) => item !== value);
    field.onChange(newValue);

    setSelected((prev) => prev.filter((item) => item.id !== value));
  };

  return (
    <Select>
      <SelectTrigger className="w-[190px]">
        <SelectValue placeholder="Selection des points">
          {"Selection des points"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {data?.getAllValidations.map((validation) => (
          <SelectItem
            key={validation.id}
            value={validation.id.toString()}
            onPointerUp={() => handleAddSelect(validation)}
          >
            {validation.points.toString()}
          </SelectItem>
        ))}
      </SelectContent>
      <div className="flex w-[190px]">
        {field.value.length > 0 &&
          selected.map((value) => (
            <div
              key={value.id}
              className="flex justify-between w-10 px-1 mx-1 border rounded"
            >
              {value.points}
              <div
                className=" cursor-pointer text-red-600"
                onClick={() => handelDeleteSelect(value.id)}
              >
                X
              </div>
            </div>
          ))}
      </div>
    </Select>
  );
};
export default CustomSelectMultiple;
