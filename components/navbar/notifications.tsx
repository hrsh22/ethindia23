"use client";

import { useEffect, useState } from "react";
import { getNotifications } from "@/blockchain/PushNotifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWalletClient } from "wagmi";
import Image from "next/image";
import pushIcon from "@/public/push.svg";

export default function Notifications() {
  const { data: _signer } = useWalletClient();
  console.log("WAGMI signer", _signer);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (_signer) {
      getNotifications(_signer).then((data) => {
        console.log(data);
        setNotifications(data);
      });
    }
  }, [getNotifications, _signer]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <BellIcon className="w-6 h-6 text-yellow-400" /> */}
        <Image
          src={pushIcon.src}
          alt="Notifications by Push Protocol"
          //   className="w-6 h-6"
          //   width='auto'
          width={30}
          height={36}
          className="cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <ScrollArea className="h-[400px] w-[350px] rounded-md border p-4">
          {" "}
          {notifications.length > 0 &&
            notifications.map((notification) => (
              <div
                key={notification.sid}
                className="flex justify-between items-center rounded-md border border-gray-300 px-2.5 py-2 mb-3 hover-bg-gray-100 active-bg-gray-200 transition-all duration-500"
              >
                <div className="flex">
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <div className="flex flex-col items items-baseline">
                        <span className="text-gray-800 text-sm font-normal">
                          <strong>{notification.title || ""}</strong>
                        </span>
                        <span className="text-gray-800 text-sm font-normal ml-1">
                          {notification.message || ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
