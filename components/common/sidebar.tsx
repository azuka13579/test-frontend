"use client";
import { Calendar, Home, Inbox } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarTrigger,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Home",
    url: "/students",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/posts",
    icon: Inbox,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: Calendar,
  },
];

export function AppSidebar() {
  const { setOpen, open } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" onClick={() => setOpen(true)}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div
          className={`flex items-center w-full ${open ? "justify-between" : "justify-center"}`}
        >
          {open && <span className="font-bold text-sm ml-2">Dashboard</span>}
          <div onClick={(e) => e.stopPropagation()} className="hidden md:block">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent
        className="[&::-webkit-scrollbar]:w-0.75      
    
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-gray-900
        dark:[&::-webkit-scrollbar-thumb]:bg-white
        [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, id) => {
                const isActive =
                  pathname === item.url || pathname.startsWith(`${item.url}/`);

                return (
                  <SidebarMenuItem key={id}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                      className={
                        isActive ? "font-bold text-shadow-orange-700" : ""
                      }
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span className="">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
