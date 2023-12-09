"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { notFound, useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Notify } from "@/blockchain/PushNotifications";

import Spinner from "./spinner";

export default function Page() {
  const router = useRouter();
  const { address, isConnecting, isDisconnected } = useAccount();
  const [event, setEvent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const params = useParams();
  console.log("params", params);
  const { toast } = useToast();
  const [anonAadhaar] = useAnonAadhaar();
  const [userStatus, setUserStatus] = useState("logged-out");
  const [initialPendingAttendees, setInitialPendingAttendees] = useState([]);
  const [pendingAttendees, setPendingAttendees] = useState([]);
  console.log("anonAadhaar", anonAadhaar);

  useEffect(() => {
    anonAadhaar.status === "logged-in"
      ? setUserStatus("logged-in")
      : setUserStatus("logged-out");
  }, [anonAadhaar, setUserStatus]);

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
        setPendingAttendees(
          data.response[0].attendees?.filter(
            (attendee) => attendee.status === "pending"
          )
        );
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

        const sendNoti = await Notify(
          address,
          `👍 Event Registration Submitted!`,
          `Your registration for the event ${event.name} has been submitted. Sit tight, and we'll keep you posted. 🤞`
        );
        console.log("sent", sendNoti);
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
    } finally {
      const value = `{"status":"logged-out"}`;
      localStorage.setItem("anonAadhaar", value);
    }
  };

  console.log("Event Attendees", event?.attendees);

  // const initialPendingAttendees =
  //   event?.attendees?.filter((attendee) => attendee.status === "pending") || [];

  // console.log("initialPendingAttendees", initialPendingAttendees);

  // const [pendingAttendees, setPendingAttendees] = useState(
  //   initialPendingAttendees
  //   // event?.attendees?.filter((attendee) => attendee.status === "pending") || []
  // );
  // console.log("pendingAttendees", pendingAttendees);

  const handleAccept = async (eventId, address) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/events/status?eventId=${eventId}&address=${address}&newStatus=approved`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // Handle the response data accordingly
      const updatedAttendees = pendingAttendees.filter(
        (attendee) => attendee.address !== address
      );
      setPendingAttendees(updatedAttendees);
      const sendNoti = await Notify(
        address,
        `🎉 Registration Approved!`,
        `Congratulations! Your registration for the event ${event.name} has been approved. Get ready for an exciting experience! 🌟`
      );
      console.log("sent", sendNoti);
    } catch (error) {
      console.error("Error updating attendee status:", error);
    }
  };

  const handleReject = async (eventId, address) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/events/status?eventId=${eventId}&address=${address}&newStatus=not_approved`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // Handle the response data accordingly
      const updatedAttendees = pendingAttendees.filter(
        (attendee) => attendee.address !== address
      );
      setPendingAttendees(updatedAttendees);
      const sendNoti = await Notify(
        address,
        `😞 Registration Not Approved`,
        `Unfortunately, your registration for the event ${event.name} has not been approved. Don't worry, there are plenty of other opportunities. Keep exploring! 🌐`
      );
      console.log("sent", sendNoti);
    } catch (error) {
      console.error("Error updating attendee status:", error);
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
              <>
                <div className="flex flex-col items-center justify-center">
                  <div className="">
                    {anonAadhaar.status === "logged-in" ? (
                      <Button
                        className="w-24 bg-[#BC4749]"
                        onClick={handleRegister}
                      >
                        Register
                      </Button>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="mb-2 italic">
                          Login with Anon Aadhar to continue registering
                        </div>
                        <LogInWithAnonAadhaar />
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className="mb-4 flex items-center justify-center">
                  
                </div> */}
              </>
            )}
          </div>
          {isCreator && (
            <>
              <div className="bg-white bg-opacity-20 text-white p-8 mt-24 rounded-md w-full max-w-2xl mx-auto h-full">
                <div className="flex text-xl text-white items-center ">
                  Accept/Decline registrations
                </div>
                <div className="flex-1">
                  {pendingAttendees?.map((attendee, index) => (
                    <Card
                      key={index}
                      className="mt-16 h-full flex "
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.51)",
                      }}
                    >
                      <div className="flex justify-between items-center p-4 w-full">
                        <div className="flex-1">
                          <h2 className="text-lg font-bold">Address</h2>
                          {attendee.address}
                        </div>
                        <div className="flex-shrink-0 flex items-center space-x-2">
                          <Button
                            onClick={() =>
                              handleAccept(event._id, attendee.address)
                            }
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </Button>
                          <Button
                            onClick={() =>
                              handleReject(event._id, attendee.address)
                            }
                          >
                            <FontAwesomeIcon icon={faXmark} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
