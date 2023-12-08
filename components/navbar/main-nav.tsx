import Link from "next/link";

import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faHouse } from "@fortawesome/free-solid-svg-icons";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";

import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <FontAwesomeIcon
          icon={faHouse}
          style={{
            color: "#000000",
            width: "1.5rem",
            height: "1.5rem",
            paddingLeft: "4px",
            paddingRight: "4px",
          }}
        />
        Home
      </Link>
      <Link
        href="/events"
        className="text-lg flex flex-row items-center font-medium transition-colors hover:text-primary"
      >
        <FontAwesomeIcon
          icon={faTicket}
          style={{
            color: "#000000",
            width: "1.75rem",
            height: "1.75rem",
            paddingLeft: "4px",
            paddingRight: "4px",
          }}
        />
        Events
      </Link>
      <Link
        href="/chats"
        className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <FontAwesomeIcon
          icon={faRocketchat}
          style={{
            color: "#000000",
            width: "1.5rem",
            height: "1.5rem",
            paddingLeft: "4px",
            paddingRight: "4px",
          }}
        />
        Chats
      </Link>
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
    </nav>
  );
}
