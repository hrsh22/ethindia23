"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import emptyImg from "@/public/empty.jpg";
import arrowImg from "@/public/arrow2.png";
import Image from "next/image";
import eventBackground from "@/public/eventBackground.png";
import { Rubik } from "next/font/google";
import Link from "next/link";
// import { useAccount } from "wagmi";
import { useState, useEffect } from "react";

const rubik = Rubik({ subsets: ["latin"] });

const Explore = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/events`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Explore data", data);
        setEvents(data.response);
      } catch (error) {
        console.error("Error fetching events:", error);
        // Handle the error or display a message to the user
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect will run once when the component mounts

  function formatDate(isoDateString) {
    const isoDate = new Date(isoDateString);

    // Get the components of the date
    const year = isoDate.getFullYear();
    const month = isoDate.getMonth() + 1; // Month is zero-based
    const day = isoDate.getDate();

    // Format the date as a string
    const formattedDate = `${padZero(day)}-${padZero(month)}-${year}`;

    return formattedDate;
  }

  function padZero(number) {
    return number < 10 ? "0" + number : number;
  }
  return (
    <div className="flex bg-black justify-center pt-20 min-h-[100vh] flex-col pl-48 pr-48">
      {events.map((event: { _id: React.Key | null | undefined }) => (
        <Card
          key={event._id}
          className="border-0 mt-16 h-[200px]"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.51)",
            display: "flex", // Add this style to make it a flex container
          }}
        >
          <div className="flex-1 flex-col">
            <CardHeader>
              <CardTitle className="text-xl text-red-800">
                {event.name}
              </CardTitle>
              <CardDescription className="text-white">
                by {event.creator}
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              {event.location && (
                <div className="text-white">Location: {event.location}</div>
              )}
              {event.link && (
                <div className="text-white">
                  <Link href={event.link}> Event Link: {event.link}</Link>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="text-white">{formatDate(event.startDate)}</div>
              {/* <Button>See More Details</Button> */}
            </CardFooter>
          </div>
          <div className="flex items-center pr-[24px]">
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/events/${event._id}`}
              target="_blank"
            >
              <Image src={arrowImg} alt="Empty" className="w-[120px]" />
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Explore;
