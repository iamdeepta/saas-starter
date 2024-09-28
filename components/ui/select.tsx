"use client";

import * as Select from "@radix-ui/react-select";

const SelectDropdown = ({
  handleSelectChange,
  data,
}: {
  handleSelectChange: (value: string) => void;
  data: { id: number; name: string }[];
}) => {
  return (
    <Select.Root onValueChange={handleSelectChange}>
      <Select.Trigger
        aria-label="Blog Tags"
        className="border-2 px-3 rounded-md bg-white text-sm"
      >
        <Select.Value placeholder="Select a tag" />
        <Select.Icon />
      </Select.Trigger>

      <Select.Content className="mt-6 border-2 px-3 rounded-md bg-white text-sm z-50">
        <Select.Viewport>
          <Select.Item key={"all"} value={"all"} className="cursor-pointer">
            <Select.ItemText>{"All"}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
          {data?.map((item: { id: number; name: string }) => (
            <Select.Item
              key={item.id}
              value={item?.name}
              className="cursor-pointer"
            >
              <Select.ItemText>{item?.name}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
};

export default SelectDropdown;
