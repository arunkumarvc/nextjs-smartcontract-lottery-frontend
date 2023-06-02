import { Inter } from "next/font/google";
import "./globals.css";
import Web3Providers from "./web3Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Smart Contract Lottery",
    description:
        "A smart contract lottery is a decentralized and transparent lottery on the blockchain.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Web3Providers>{children}</Web3Providers>
            </body>
        </html>
    );
}
