import { ConditionType, PushAPI } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { ethers } from "ethers";
import { useState } from "react";

const _signer = new ethers.Wallet(
  "0x9b2d1f23d1831949ccf603490528ec2ea407d87dbb3f49baa8a851133761ba41"
);

async function getNotifications(signer: any) {
  const userAlice = await PushAPI.initialize(signer, { env: "staging" as ENV });
  console.log("userAlice", userAlice);
  const inboxNotifications = await userAlice.notification.list("SPAM");
  console.log("inboxNotifications", inboxNotifications);
  return inboxNotifications;
}

async function Notify(address: any, title: any, body: any) {
  const mainUser = await PushAPI.initialize(_signer, { env: "staging" as ENV });
  console.log("mainUser", mainUser);

  const response = await mainUser.channel.send([address], {
    notification: {
      title: title,
      body: body,
    },
  });

  console.log(response);
}

async function createGroup(groupName: any, groupDescription: any, signer: any) {
  // const alice = await PushAPI.initialize(signer, { env: "staging" as ENV });
  // const createdGroup = await alice?.chat.group.create(groupName, {
  //   description: groupDescription,
  //   private: true,
  //   image:
  //     "https://github-production-user-asset-6210df.s3.amazonaws.com/90423812/289332309-ed57b93b-f2b2-4d58-9a2c-9edf1a1754cc.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231210%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231210T012447Z&X-Amz-Expires=300&X-Amz-Signature=28e13389c430ddf749d3dd30e0b003a030ee4e630a203d34778c37c05b55714e&X-Amz-SignedHeaders=host&actor_id=90423812&key_id=0&repo_id=727644349",
  //   rules: {
  //     entry: {
  //       conditions: {
  //         type: "PUSH" as ConditionType,
  //         category: "CustomEndpoint",
  //         subcategory: "GET",
  //       },
  //     },
  //   },
  // });
  const userAlice = await PushAPI.initialize(signer, { env: ENV.STAGING });

  // Creating your token gated community
  const createTokenGatedGroup = await userAlice.chat.group.create(groupName, {
    description: groupDescription, // provide short description of group
    image:
      "https://github-production-user-asset-6210df.s3.amazonaws.com/90423812/289332309-ed57b93b-f2b2-4d58-9a2c-9edf1a1754cc.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231210%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231210T012447Z&X-Amz-Expires=300&X-Amz-Signature=28e13389c430ddf749d3dd30e0b003a030ee4e630a203d34778c37c05b55714e&X-Amz-SignedHeaders=host&actor_id=90423812&key_id=0&repo_id=727644349", // provide base64 encoded image
    members: [], // not needed, rules define this, can omit
    admins: [], // not needed as per problem statement, can omit
    private: true,
    rules: {
      entry: {
        // entry is based on conditions
        conditions: {
          any: [
            // any of the decider should allow entry
            {
              // decider 1 - If admin or owner invites someone
              any: [
                {
                  // criteria 1
                  type: "PUSH",
                  category: "INVITE",
                  subcategory: "DEFAULT",
                  data: {
                    inviterRoles: ["ADMIN", "OWNER"],
                  },
                },
              ],
            },
            {
              // decicder 2 - If wallet holds 1 NFT on polygon testnet
              any: [
                {
                  // criteria 1
                  type: "PUSH", // define type that rules engine should go for
                  category: "ERC721", // define it's ERC20 token that you want to check, supports ERC721 as well
                  subcategory: "holder", // define if you are checking 'holder'
                  data: {
                    contract:
                      "eip155:80001:0x7E30eD4DB0E95BFfc85E5631f160b988ffb95154",
                    comparison: ">=", // what comparison needs to pass
                    amount: 1, // amount that needs to passed
                    decimals: 18,
                  },
                },
              ],
            },
          ],
        },
      },
    },
  });

  console.log(
    "NFT Gated Group for events created successfully!",
    createTokenGatedGroup
  );
}

export { Notify, getNotifications };
