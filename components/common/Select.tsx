"use client";
import * as React from "react";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function SelectAlignItem() {
  const [alignItemWithTrigger, setAlignItemWithTrigger] = React.useState(true);
  return (
    <FieldGroup className="w-full">
      <Field>
        <Select defaultValue="banana">
          <SelectTrigger className="rounded-[4px] p-4 text-red-500 font-bold">
            <SelectValue />
          </SelectTrigger>

          <SelectContent
            position={alignItemWithTrigger ? "popper" : "item-aligned"}
          >
            <SelectGroup>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </FieldGroup>
  );
}
