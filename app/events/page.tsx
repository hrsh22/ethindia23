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

const rubik = Rubik({ subsets: ["latin"] });

const Events = async () => {
  // console.log("hey1");
  const events = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events`, {
    cache: "no-store",
  }).then((res) => res.json());
  // console.log(events);
  // console.log("hey2");
  const currentDate = new Date();

  const upcomingEvents = events.response?.filter(
    (event: { startDate: string | number | Date }) =>
      new Date(event.startDate) > currentDate
  );
  const pastEvents = events.response?.filter(
    (event: { startDate: string | number | Date }) =>
      new Date(event.startDate) <= currentDate
  );

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
    <div className="flex bg-black justify-center pt-20 min-h-[100vh]">
      <Tabs defaultValue="upcoming" className="w-[700px]">
        <TabsList className="grid w-[400px] grid-cols-3 ml-auto mr-auto">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="yours">Yours</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {!upcomingEvents ? (
            <div className="flex flex-col  justify-center items-center h-[80vh]">
              {/* <Image src={emptyImg} alt="Empty" className="w-[300px]" /> */}
              <div
                className="border-0 h-[175px] w-[200px] rounded-lg items-center flex flex-col justify-center"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.51)",
                }}
              >
                <div
                  className={rubik.className}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div className="pb-2">No upcoming events!</div>
                  <div className="pb-2">Why not create one?</div>
                  <div className="p-2">
                    <Link href="/create">
                      <Button className="w-24">Create event</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            upcomingEvents.map(
              (event: { _id: React.Key | null | undefined }) => (
                <Card
                  key={event._id}
                  className="border-0 mt-16 h-[200px] flex"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.51)",
                  }}
                >
                  <div className="flex-1">
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
                        <div className="text-white">
                          Location: {event.location}
                        </div>
                      )}
                      {event.link && (
                        <div className="text-white">
                          <Link href={event.link}>
                            {" "}
                            Event Link: {event.link}
                          </Link>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <div className="text-white">
                        {formatDate(event.startDate)}
                      </div>
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
              )
            )
          )}
        </TabsContent>
        <TabsContent value="past">
          {!pastEvents ? (
            <div className="flex flex-col  justify-center items-center h-[80vh]">
              {/* <Image src={emptyImg} alt="Empty" className="w-[300px]" /> */}
              <div
                className="border-0 h-[175px] w-[200px] rounded-lg items-center flex flex-col justify-center"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.51)",
                }}
              >
                <div
                  className={rubik.className}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div className="pb-2">No past events!</div>
                  <div className="pb-2">Why not host one?</div>
                  <div className="p-2">
                    <Link href="/create">
                      <Button className="w-24">Create event</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            pastEvents.map((event: { _id: React.Key | null | undefined }) => (
              <Card
                key={event._id}
                className="border-0 mt-16 h-[200px] flex"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.51)",
                }}
              >
                <div className="flex-1">
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
                      <div className="text-white">{event.location}</div>
                    )}
                    {event.link && (
                      <div className="text-white">
                        <Link href={event.link}> Event Link: {event.link}</Link>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <div className="text-white">
                      {formatDate(event.startDate)}
                    </div>
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
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Events;
