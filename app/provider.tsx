"use client";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { baseGoerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { SCWalletContext } from "@/context/SCWallet";
import { AnonAadhaarProvider } from "anon-aadhaar-react";

const { chains, publicClient } = configureChains(
  [baseGoerli],
  [
    alchemyProvider({ apiKey: "XeqbzKzOklvVcN5tsLW5VnSZ5ETutKuc" }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Using Base Paymaster",
    wallets: [injectedWallet({ chains })],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const appid = process.env.NEXT_PUBLIC_APP_ID;

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <SCWalletContext>
          <AnonAadhaarProvider _appId={appid}>{children}</AnonAadhaarProvider>
        </SCWalletContext>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
