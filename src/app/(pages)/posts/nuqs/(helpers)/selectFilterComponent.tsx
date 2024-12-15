"use client";
import { FC } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeWord } from "@/utils/cleanObject";

type SelectFilterProps = {
  id: string;
  value: string;
  statuses: readonly string[];
  onChange: (status: string) => void;
};

const SelectFilterComponent: FC<SelectFilterProps> = ({
  id,
  value,
  statuses,
  onChange,
}) => {
  const placeholder = `Select ${id.charAt(0).toUpperCase() + id.slice(1)}`;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[210px]  shadow-none  focus:ring-yellow-100  ring-1 ring-yellow-100 text-gray-500">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="w-50 shadow-none">
        {statuses.map((status, idx) => (
          <SelectItem
            key={idx}
            value={status}
            className=" py-2 cursor-pointer focus:bg-yellow-300 shadow-none ring-0 focus:ring-0 active:ring-0 hover:focus:ring-0 text-red-700"
          >
            {capitalizeWord(status)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilterComponent;
