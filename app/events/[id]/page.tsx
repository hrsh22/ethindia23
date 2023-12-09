"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { useAccount } from "wagmi";
import { useParams } from "next/navigation";
import { set } from "mongoose";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [event, setEvent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const params = useParams();
  console.log("params", params);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoaded(false);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/events?eventId=${params.id}`
        );

        console.log("response", response);

        if (!response.ok) {
          // Handle non-successful response
          console.log("Failed to fetch event data");
          notFound(); // Trigger notFound if there's an issue
          return;
        }

        const data = await response.json();
        // console.log("data", data);
        // console.log("data.response", data.response[0]);
        if (data.response[0].creator === address) {
          setIsCreator(true);
        }
        setEvent(data.response[0]);
        setIsLoaded(true);
      } catch (error) {
        // Handle network or other errors
        console.error("Error fetching event:", error);
        console.log("Failed to fetch event data");
        notFound(); // Trigger notFound if there's an issue
      }
    };

    fetchEvent();
  }, [params.id]);

  const handleRegister = async (e) => {
    //   await fetch(
    //   `${process.env.NEXT_PUBLIC_URL}/api/events/register?eventId=${params.id}`
    // ).then((res) => res.json());
    try {
      // Prepare the event data from the form fields
      const data = {
        eventId: event._id,
        userAddress: address,
      };
      console.log("data", data);

      // Make the API call to create the event
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/events/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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
          description: "You have successfully registered!",
        });
      } else {
        const errorData = await response.json();
        console.error(errorData); // Log the error data
        // Optionally, you can display an error message to the user.
        toast({
          title: "Oops!",
          description: "An error occured!",
        });
      }
    } catch (error) {
      console.error(error);
      // Handle any other errors that might occur during the API call.
    }
  };

  return (
    <>
      {isLoaded && (
        <div className="bg-black pt-24 h-full min-h-[100vh]">
          <div className="bg-white bg-opacity-20 text-white p-8 rounded-md w-full max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-1">{event.name}</h1>

            <div className="mb-4">{event.description}</div>

            <div className="mb-4">
              <strong>Event by</strong> {event.creator}
            </div>

            <div className="mb-4">
              <strong>Start Date:</strong>{" "}
              {new Date(event.startDate).toLocaleString()}
            </div>

            <div className="mb-4">
              <strong>End Date:</strong>{" "}
              {new Date(event.endDate).toLocaleString()}
            </div>
            {event.location ? (
              <div className="mb-4">
                <strong>Location:</strong> {event.location}
              </div>
            ) : null}

            {event.link ? (
              <div className="mb-4">
                <strong>Link:</strong> {event.link}
              </div>
            ) : null}

            <div className="mb-4">
              <strong>Capacity:</strong> {event.capacity}
            </div>

            <div className="mb-4">
              <strong>Approval Required:</strong>{" "}
              {event.requireApproval ? "Yes" : "No"}
            </div>
            {!isCreator && (
              <div className="mb-4 flex items-center justify-center">
                <Button className="w-24 bg-[#BC4749]" onClick={handleRegister}>
                  Register
                </Button>
              </div>
            )}
          </div>
          {isCreator && (
            <>
              <div className="bg-white bg-opacity-20 text-white p-8 mt-24 mt-12 rounded-md w-full max-w-2xl mx-auto h-full">
                <div className="flex text-xl text-white items-center ">
                  Accept/Decline registrations
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
