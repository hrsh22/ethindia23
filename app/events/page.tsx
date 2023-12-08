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
import Image from "next/image";
import eventBackground from "@/public/eventBackground.png";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const Events = async () => {
  const events = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events`).then(
    (res) => res.json()
  );
  // console.log(events);
  const currentDate = new Date();
  const upcomingEvents = events.response.filter(
    (event: { startDate: string | number | Date }) =>
      new Date(event.startDate) > currentDate
  );
  const pastEvents = events.response.filter(
    (event: { startDate: string | number | Date }) =>
      new Date(event.startDate) <= currentDate
  );

  return (
    <div
      className="flex justify-center pt-20 min-h-[100vh]"
      style={{
        backgroundImage: `url(${eventBackground.src})`,
        backgroundSize: "cover",
        // backgroundPosition: "center",
      }}
    >
      <Tabs defaultValue="upcoming" className="w-[700px]">
        <TabsList className="grid w-[400px] grid-cols-3 ml-auto mr-auto">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="yours">Yours</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {upcomingEvents.length === 0 ? (
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
                    <Button className="w-24">Create event</Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            upcomingEvents.map(
              (event: { _id: React.Key | null | undefined }) => (
                <Card key={event._id}>
                  <CardHeader>
                    <div>12-06-2023</div>
                    <CardTitle>EVENT</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you'll be logged
                      out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>By CREATOR NAME</div>
                    <div>EVENT LOCATION</div>
                  </CardContent>
                  <CardFooter>
                    <Button>See More Details</Button>
                  </CardFooter>
                </Card>
              )
            )
          )}
        </TabsContent>
        <TabsContent value="past">
          {pastEvents.length === 0 ? (
            <div className="flex flex-col  justify-center items-center h-[85vh]">
              <Image src={emptyImg} alt="Empty" className="w-[300px]" />
              <div>No events attended!</div>
              <div>Why not create one?</div>
              <Button className="w-24">Create event</Button>
            </div>
          ) : (
            pastEvents.map((event: { _id: React.Key | null | undefined }) => (
              <Card
                key={event._id}
                className="border-0 mt-16 h-[150px] overflow-y-auto"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.51)",
                }}
              >
                <div className="grid grid-cols-8">
                  <div className="col-span-5 flex flex-col">
                    <CardHeader>
                      <div>12-06-2023</div>
                      <CardTitle>EVENT</CardTitle>
                      <CardDescription>
                        Change your password here. After saving, you'll be
                        logged out.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>By CREATOR NAME</div>
                      <div>EVENT LOCATION</div>
                    </CardContent>
                    <CardFooter>
                      <Button>See More Details</Button>
                    </CardFooter>
                  </div>
                  <div className=" col-span-3 flex items-center ">
                    <Image src={emptyImg} alt="Empty" className="w-[120px]" />
                  </div>
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
