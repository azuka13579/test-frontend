import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HomeIcon, LogOut, LockIcon, User, LogOutIcon } from "lucide-react";
import Link from "next/link";

export default function ProfileDropdown() {
  const menuItems = [
    {
      label: "Account",
      icon: User,
      url: "/login",
    },
    {
      label: "Change Password",
      icon: LockIcon,
      url: "/about",
    },
    {
      label: "Logout",
      icon: LogOut,
      className: "text-red-600 focus:text-red-600 focus:bg-red-50",
      url: "/about",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="border rounded-[4px] border-gray-300 bg-white flex justify-center items-center w-14 h-14 hover:bg-gray-300 transition duration-300">
          <HomeIcon className="text-black" width={32}></HomeIcon>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={5}
        side="bottom"
        className="w-64"
      >
        <DropdownMenuGroup>
          {menuItems.map((item, index) => (
            <DropdownMenuItem
              asChild
              key={index}
              className={`cursor-pointer gap-2 ${item.className || ""}`}
            >
              <Link href={item.url} className="flex gap-3">
                <item.icon className={`h-4 w-4 ${item.className || ""}`} />
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
