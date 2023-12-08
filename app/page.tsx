"use client";
import { useContext } from "react";
import { useAccount } from "wagmi";
import { SCWContext } from "../context/SCWallet";

// import image2 from "@/public/2092.jpg";

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { sCWAddress } = useContext(SCWContext);
  return (
    <div
      className="flex flex-col items-start px-8 justify-between h-screen"
      style={{
        // backgroundImage: `url(${image2.src})`,
        backgroundSize: "cover",
      }}
    >
      <div className="p-4">
        {address ? (
          <>
            <div>Logged In!</div>
            <div>EOA Address: {address}</div>
            <div>SCW Address: {sCWAddress}</div>
          </>
        ) : (
          <div>Please connect your wallet</div>
        )}
      </div>
      <div className="pt-20 absolute bottom-10 left-10 text-white">
        Our platform turns any event into a breeze of laughter and unforgettable
        moments. Mark your dates and get ready to rock like never before! 🎉📅🚀
      </div>

      <div className="grid grid-cols-4 justify-center items-center h-[100vh]">
        <div className="text-xl font-bold col-span-4 flex text-center">
          Get ready for a rollercoaster of excitement as we turn ordinary
          gatherings into extraordinary memories! 🌟🎈"
        </div>
        {/* <div className="col-span-2 flex justify-center">
          <Image src={conference} alt="Conference" />
        </div> */}
      </div>
    </div>
  );
}
