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
    const [numPlayers, setNumPlayers] = useState("0");
    const [recentWinner, setRecentWinner] = useState("0");

    // runContractFunction can both send transactions and read state
    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
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

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    });

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    });

    async function updateUIValues() {
        const entranceFeeFromCall = (await getEntranceFee()).toString();
        const numPlayersFromCall = (await getNumberOfPlayers()).toString();
        const recentWinnerFromCall = (await getRecentWinner()).toString();
        setEntranceFee(entranceFeeFromCall);
        setNumPlayers(numPlayersFromCall);
        setRecentWinner(recentWinnerFromCall);
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues();
        }
    }, [isWeb3Enabled]);

    const handleSuccess = async function (tx) {
        await tx.wait(1);
        console.log("Transaction Complete");
        updateUIValues();
    };

    return (
        <div className="p-5">
            Hi from LotteryEntrance!
            {raffleAddress ? (
                <div>
                    <button
                        className="ml-auto rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                        onClick={async function () {
                            await enterRaffle({
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            });
                        }}
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="spinner-border h-4 w-4 animate-spin rounded-full border-b-2"></div>
                        ) : (
                            <div>Enter Raffle</div>
                        )}
                    </button>
                    <p>
                        Entrance Fee:{" "}
                        {ethers.utils.formatUnits(entranceFee, "ether")} ETH
                    </p>
                    <p>Number of Players: {numPlayers}</p>
                    <p>Recent Winner: {recentWinner} </p>
                </div>
            ) : (
                <div>No Raffle Address Detected </div>
            )}
        </div>
    );
}
