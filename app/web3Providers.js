"use client";

import { NotificationProvider } from "@web3uikit/web3";
import { MoralisProvider } from "react-moralis";

export default function Web3Providers({ children }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            {/* <NotificationProvider>{children}</NotificationProvider> */}
            {children}
        </MoralisProvider>
    );
}
