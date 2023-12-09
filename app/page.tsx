"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import homeImg from "@/public/home.png";
import { Elsie_Swash_Caps } from "next/font/google";
import { Zilla_Slab } from "next/font/google";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";

const elsie = Elsie_Swash_Caps({
  subsets: ["latin"],
  weight: "400",
});

const zilla = Zilla_Slab({
  subsets: ["latin"],
  weight: "400",
});

const titles = ["Inspire", "Advocate", "Protect", "Celebrate"];
const description =
  "Welcome to the hub that's brewing revolutions! Our platforms are powerhouses of change, connecting communities and enabling dialogue throughout the world. Let's roll up our sleeves and join hands!";

const fadeIn = { opacity: 1 };
const fadeOut = { opacity: 0 };

export default function Home() {
  const [currentTitle, setCurrentTitle] = useState(0);

  const { address, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    const handleConnect = async () => {
      if (!isConnecting && !isDisconnected && address) {
        // The wallet is connected, and you have the wallet address
        try {
          const response = await fetch(`${NEXT_PUBLIC_URL}/user/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ address: address }),
          });

          if (response.ok) {
            console.log("Wallet address saved successfully!");
          } else {
            console.error("Failed to save wallet address.");
          }
        } catch (error) {
          console.error("Error saving wallet address:", error);
        }
      }
    };

    handleConnect();
  }, [isConnecting, isDisconnected, address]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((currentTitle + 1) % titles.length);
    }, 5000); // Change 5000 to 5000 for 5 seconds

    return () => clearInterval(interval);
  }, [currentTitle]);

  return (
    <div
      className="bg-black h-[100vh] items-center"
      style={{
        backgroundImage: `url(${homeImg.src})`,
        aspectRatio: "inherit",
        backgroundSize: "cover",
      }}
    >
      {/* <div className="grid grid-col-2"> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",
          height: "100%",
          paddingLeft: "10%",
        }}
      >
        <motion.div
          className={elsie.className}
          style={{
            fontSize: "84px",
            fontWeight: "bold",
            color: "white",
          }}
          initial={fadeOut}
          animate={fadeIn}
          transition={{ duration: 1, ease: "easeInOut" }}
          key={currentTitle}
        >
          {titles[currentTitle]}
        </motion.div>
        <motion.div
          className={zilla.className}
          style={{
            fontSize: "24px",
            color: "white",
            lineHeight: "1.5",
            textAlign: "center",
            // width: "80%",
            marginTop: "20px",
          }}
        >
          {description}
        </motion.div>
        <Button className="mt-8 bg-[#BC4749]">Join Us</Button>
      </div>
    </div>
    // </div>
  );
}
