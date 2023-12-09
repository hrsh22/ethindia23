"use client";
import { MainNav } from "@/components/navbar/main-nav";
import { UserNav } from "@/components/navbar/user-nav";
import { BellIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";

import { ConnectButton } from "@rainbow-me/rainbowkit";

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
            <Link
              href="/create"
              className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <FontAwesomeIcon
                icon={faCalendarPlus}
                style={{
                  color: "#000000",
                  width: "1.5rem",
                  height: "1.5rem",
                  paddingLeft: "4px",
                  paddingRight: "4px",
                }}
              />
              Create Event
            </Link>
            <BellIcon className="w-6 h-6 text-yellow-400" />
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
}
