import { PushAPI } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { ethers } from "ethers";

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

export { Notify, getNotifications };
