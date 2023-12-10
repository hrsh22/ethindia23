"use client";
import {
  ChatView,
  ChatUIProvider,
  darkChatTheme,
  MODAL_POSITION_TYPE,
  ENV,
} from "@pushprotocol/uiweb";
import { useEffect, useState, useRef } from "react";
import { PushAPI } from "@pushprotocol/restapi";
import { Signer, ethers } from "ethers";
import { useWalletClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Push() {
  const [chats, setChats] = useState([]);
  const [signer, setSigner] = useState<ethers.Signer | undefined>(); // Corrected type
  const [selectedChat, setSelectedChat] = useState<string | null>(null); // Corrected type
  const [alice, setAlice] = useState<PushAPI | null>(null); // Corrected type

  const { data: _signer } = useWalletClient();

  // CreateGroup Page 1 values
  // const groupNameRef = useRef<HTMLInputElement | null>(null); // Corrected type
  // const groupDescriptionRef = useRef<HTMLInputElement | null>(null); // Corrected type
  // const [groupName, setGroupName] = useState("");
  // const [groupDescription, setGroupDescription] = useState("");

  const [loading, setLoading] = useState(true);
  // CreateGroup Page 2 values
  // const [isPrivate, setIsPrivate] = useState(false);

  // async function createGroup() {
  //   const createdGroup = await alice?.chat.group.create(groupName, {
  //     description: groupDescription,
  //     private: isPrivate,
  //     image:
  //       "https://github-production-user-asset-6210df.s3.amazonaws.com/90423812/289332309-ed57b93b-f2b2-4d58-9a2c-9edf1a1754cc.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231210%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231210T012447Z&X-Amz-Expires=300&X-Amz-Signature=28e13389c430ddf749d3dd30e0b003a030ee4e630a203d34778c37c05b55714e&X-Amz-SignedHeaders=host&actor_id=90423812&key_id=0&repo_id=727644349",
  //     rules: {
  //       entry: {
  //         conditions: {
  //           type: "PUSH",
  //           category: "CustomEndpoint",
  //           subcategory: "GET",
  //           // data: {
  //           //   url: createAccessURL(),
  //           // },
  //         },
  //       },
  //     },
  //   });
  // }

  useEffect(() => {
    async function fetchSigner() {
      setLoading(true);

      if (!_signer) {
        // Do nothing if the signer is not available
        setLoading(false);
        return;
      }

      const user = await PushAPI.initialize(_signer, {
        env: "staging" as ENV,
      });

      setAlice(user);

      const aliceChats = await user.chat.list("CHATS");
      console.log(aliceChats);

      setChats(aliceChats);
      setLoading(false);
    }

    // Check if _signer is available before fetching
    if (_signer) {
      fetchSigner();
    }
  }, [_signer]);

  console.log("CHATS: ", chats);
  console.log("SELECTED CHATS: ", selectedChat);

  return (
    <ChatUIProvider theme={darkChatTheme} env={ENV.STAGING} signer={_signer}>
      {!_signer ? (
        <div className="flex justify-center items-center h-[100vh]">
          <ConnectButton />
        </div>
      ) : (
        <div className="bg-black w-full p-10">
          <div className="grid lg:grid-cols-6 gap-10">
            <div
              className={
                "lg:col-span-2 border border-gray-800 px-4 py-5 rounded-3xl"
              }
            >
              <div className="flex flex-col h-[90%]  justify-between">
                <div className="flex flex-col space-y-2">
                  {chats &&
                    chats
                      ?.filter((x) => x.groupInformation)
                      .map((x) => (
                        <div
                          key={x.chatId}
                          onClick={() => setSelectedChat(x?.chatId)}
                          className="flex space-x-4 items-center px-4 py-3 cursor-pointer bg-gray-300 hover:bg-gray-200 duration-300 text-left rounded-3xl border-2 hover:border-gray-400 border-gray-600 w-full"
                        >
                          <img
                            src={x.groupInformation?.groupImage}
                            alt="Group Image"
                            width={40}
                            height={40}
                          />
                          <div className="flex text-pink-500 flex-col">
                            <span>{x.groupInformation?.groupName}</span>
                            <span className="text-gray-500">
                              {x.groupInformation?.groupDescription}
                            </span>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 h-[90vh]">
              <ChatView
                chatId={selectedChat}
                limit={10}
                verificationFailModalPosition={MODAL_POSITION_TYPE.RELATIVE}
                isConnected={true}
              />
            </div>
          </div>
        </div>
      )}
    </ChatUIProvider>
  );
}

export default Push;
