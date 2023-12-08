"use client";

// import image2 from "@/public/2092.jpg";

export default function Home() {
  // const {
  //   isAuthenticated,
  //   loginWeb3Auth,
  //   logoutWeb3Auth,
  //   ownerAddress,
  //   safes,
  //   safeSelected,
  //   safeBalance,
  // } = useAccountAbstraction();
  return (
    // <>
    //   {/* <Navbar /> */}
    //   <div className="flex flex-col items-center gap-4">
    //     {isAuthenticated ? (
    //       <div className="flex flex-col items-center">
    //         <p className="mr-2">{ownerAddress}</p>
    //         <Button onClick={logoutWeb3Auth}>Disconnect</Button>
    //         <br />
    //         <p className="mr-2">SAFES: {safes}</p>
    //         <br />
    //         <p className="mr-2">safeSelected: {safeSelected}</p>
    //         <br />
    //         {/* <button onClick={() => isContractAddress(safeSelected)}>
    //       Check Deployment Status
    //     </button> */}
    //         <br />
    //         <p className="mr-2">Safe Balance: {safeBalance}</p>
    //         <br />
    //         {/* <button disabled={!hasNativeFunds} onClick={relayTransaction}>
    //       Send Transaction
    //     </button> */}

    //         {/* {!hasNativeFunds && (
    //       <div>Insufficient funds. Send some funds to the Safe Account</div>
    //     )} */}
    //       </div>
    //     ) : (
    //       <Button onClick={loginWeb3Auth}>Connect Wallet</Button>
    //     )}
    //   </div>
    // </>

    <div
      className="flex flex-col items-start px-8 justify-between h-screen"
      style={{
        // backgroundImage: `url(${image2.src})`,
        backgroundSize: "cover",
      }}
    >
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
