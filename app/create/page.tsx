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

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data as needed
    console.log({
      eventName,
      startDate,
      endDate,
      eventDescription,
      location,
      capacity,
      requireApproval,
    });
    // Add further logic for form submission
  };

  return (
    <div className="flex items-center justify-center h-screen pt-">
      <div className="bg-black bg-opacity-50 p-8 rounded-md text-white">
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
          <div className="mb-4">
            {/* <Label htmlFor="startdate">Event Start Date</Label> */}
            <DatePicker
              date={startDate}
              setDate={setStartDate}
              placeholder="Pick Event Start Date"
              id="startdate"
            />
          </div>

          {/* Event End Date */}
          <div className="mb-4">
            {/* <Label htmlFor="enddate">Event End Date</Label> */}
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
          <div className="mb-4">
            <Label htmlFor="require-approval">Require Approval &nbsp;</Label>
            <Switch
              id="require-approval"
              onCheckedChange={(e) => setRequireApproval(false)}
              placeholder="Require Approval"
              // checked={requireApproval}
              // onChange={() => setRequireApproval(!requireApproval)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
