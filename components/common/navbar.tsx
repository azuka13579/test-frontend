import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { HomeIcon } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import Select from "../form/Select";
import { SelectAlignItem } from "./Select";

export default function Navbar() {
  return (
    <div className="h-24 bg-white w-full flex justify-between md:justify-end px-8 py-3 items-center">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <SelectAlignItem></SelectAlignItem>
      <div className="flex gap-2">
        <ProfileDropdown></ProfileDropdown>
        <div className="border rounded-[4px] border-gray-300 bg-gray-50 flex justify-center items-center w-14 h-14">
          <HomeIcon className="text-black" width={32}></HomeIcon>
        </div>
        <div className="border rounded-[4px] border-gray-300 bg-gray-50 flex justify-center items-center w-14 h-14">
          <HomeIcon className="text-black" width={32}></HomeIcon>
        </div>
        <ProfileDropdown></ProfileDropdown>
      </div>
    </div>
  );
}
