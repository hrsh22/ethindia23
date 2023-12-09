// Create.js
"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DatePicker from "@/app/create/DatePicker";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { set } from "mongoose";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Create() {
  // State for the form fields
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventDescription, setEventDescription] = useState("");
  const [toggleValue, setToggleValue] = useState("In-person"); // ["In-person", "Virtual"
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [capacity, setCapacity] = useState("");
  const [requireApproval, setRequireApproval] = useState(false);

  const { address, isConnecting, isDisconnected } = useAccount();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the event data from the form fields
      const eventData = {
        name: eventName,
        description: eventDescription,
        creator: address,
        startDate: startDate,
        endDate: endDate,
        location: location,
        link: link,
        capacity: capacity,
        requireApproval: requireApproval,
      };
      console.log("eventData", eventData);

      // Make the API call to create the event
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/events/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      console.log("response", response);

      // Handle the response from the API
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the response data
        // Optionally, you can redirect to a success page or perform other actions.
        toast({
          title: "Get Ready!",
          description: "Your event has been created!",
        });
        setEventName("");
        setStartDate(new Date());
        setEndDate(new Date());
        setEventDescription("");
        setToggleValue("In-person");
        setLocation("");
        setLink("");
        setCapacity("");
        setRequireApproval(false);
      } else {
        const errorData = await response.json();
        console.error(errorData); // Log the error data
        // Optionally, you can display an error message to the user.

        toast({
          title: "Sorry!",
          description: "An error occured!",
        });
        setEventName("");
        setStartDate(new Date());
        setEndDate(new Date());
        setEventDescription("");
        setToggleValue("In-person");
        setLocation("");
        setLink("");
        setCapacity("");
        setRequireApproval(false);
      }
    } catch (error) {
      console.error(error);
      // Handle any other errors that might occur during the API call.
    }
  };

  return (
    // <div className="bg-black flex items-center justify-center h-full pt-24 pb-12">
    //   <div className="bg-white bg-opacity-20 p-8 rounded-md text-white">
    //     <h1 className="text-4xl font-bold mb-4">Create Event</h1>
    <div className="bg-black flex items-center justify-center h-full pt-24 pb-12">
      <div className="bg-white bg-opacity-20 p-8 rounded-md text-white w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Create Event</h1>

        <form onSubmit={handleSubmit}>
          {/* Event Name */}
          <div className="mb-4">
            <Label htmlFor="eventname">Event Name</Label>
            <Input
              type="text"
              id="eventname"
              placeholder="Enter Event's Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>

          {/* Event Start Date */}
          <div className="mb-4 flex flex-col">
            <Label htmlFor="startdate" className="pb-1">
              Pick Event Start Date
            </Label>
            <DatePicker
              date={startDate}
              setDate={setStartDate}
              placeholder="Pick Event Start Date"
              id="startdate"
            />
          </div>

          {/* Event End Date */}
          <div className="mb-4 flex flex-col">
            <Label htmlFor="enddate" className="pb-1">
              Pick Event End Date
            </Label>
            <DatePicker
              date={endDate}
              setDate={setEndDate}
              placeholder="Pick Event End Date"
              id="enddate"
            />
          </div>

          {/* Event Description */}
          <div className="mb-4">
            <Label htmlFor="message">Event Description</Label>
            <Textarea
              id="message"
              placeholder="Type your message here."
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <Label>Location</Label>
            {/* <div>
              <input
                type="radio"
                id="inPerson"
                name="location"
                value="inPerson"
                checked={location === "inPerson"}
                onChange={() => setLocation("inPerson")}
              />
              <label htmlFor="inPerson">In-person</label>

              <input
                type="radio"
                id="virtual"
                name="location"
                value="virtual"
                checked={location === "virtual"}
                onChange={() => setLocation("virtual")}
              />
              <label htmlFor="virtual">Virtual</label>
            </div> */}

            <ToggleGroup
              type="single"
              value={toggleValue}
              onValueChange={(toggleValue) => {
                if (toggleValue) setToggleValue(toggleValue);
                console.log(toggleValue);
              }}
            >
              <ToggleGroupItem value="In-person" aria-label="Toggle In-person">
                In-person
              </ToggleGroupItem>
              <ToggleGroupItem value="Virtual" aria-label="Toggle Virtual">
                Virtual
              </ToggleGroupItem>
            </ToggleGroup>
            {toggleValue === "In-person" ? (
              <div className="mb-4">
                <Label htmlFor="location-name">Location</Label>
                <Input
                  type="text"
                  id="location-name"
                  placeholder="Enter Event's Location"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setLink("");
                  }}
                />
              </div>
            ) : (
              <div className="mb-4">
                <Label htmlFor="location-link">Link</Label>
                <Input
                  type="text"
                  id="location-link"
                  placeholder="Enter Event's Link"
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value);
                    setLocation("");
                  }}
                />
              </div>
            )}
          </div>

          {/* Capacity */}
          <div className="mb-4">
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              type="number"
              id="capacity"
              placeholder="Enter Event's capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>

          {/* Require Approval (Toggle) */}
          <div className="mb-4 flex items-center">
            <Label htmlFor="require-approval">Require Approval &nbsp;</Label>
            <Switch
              id="require-approval"
              checked={requireApproval}
              onCheckedChange={setRequireApproval}
              placeholder="Require Approval"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={handleSubmit}
          >
            Create Event
          </Button>
        </form>
      </div>
    </div>
  );
}
