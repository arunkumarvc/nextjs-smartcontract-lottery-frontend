"use client";

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../../constants";

export default function LotteryEntrance() {
    // Moralis knows chainId because everything is wrapped under MoralisProvider
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
    const chainId = parseInt(chainIdHex);
    // console.log(chainIdHex); // 0x7a69
    // console.log(chainId); // 31337

    const raffleAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null;

    // State hooks
    const [entranceFee, setEntranceFee] = useState("0");

    // runContractFunction can both send transactions and read state
    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    });

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    });

    async function updateUIValues() {
        const entranceFeeFromCall = (await getEntranceFee()).toString();
        setEntranceFee(entranceFeeFromCall);
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues();
        }
    }, [isWeb3Enabled]);

    return (
        <div>
            Hi from LotteryEntrance!
            {raffleAddress ? (
                <div>
                    <button
                        onClick={async function () {
                            await enterRaffle();
                        }}
                    >
                        Enter Raffle
                    </button>
                    Entrance Fee:
                    {ethers.utils.formatUnits(entranceFee, "ether")}
                    ETH
                </div>
            ) : (
                <div> No Raffle Address Detected</div>
            )}
        </div>
    );
}
