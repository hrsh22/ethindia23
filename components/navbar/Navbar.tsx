"use client";
import { MainNav } from "@/components/navbar/main-nav";
import { UserNav } from "@/components/navbar/user-nav";
import { BellIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <div
      className="flex-col absolute w-full py-2 z-10"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <div className="">
        <div className="flex h-12 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <BellIcon className="w-6 h-6 text-yellow-400" />
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
}
