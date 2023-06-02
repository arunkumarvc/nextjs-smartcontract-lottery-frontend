import { useEffect } from "react";
import { useMoralis } from "react-moralis";

export default function ManualHeader() {
    // enableWeb3: A function that enables Web3.(eth_requestAccounts)
    // account: The user's account, if it is enabled.
    // isWeb3Enabled: A boolean value that indicates whether Web3 is enabled.(isWalletConnected)
    // isWeb3EnableLoading: A boolean value that indicates whether Web3 is loading.
    // deactivateWeb3: A function that deactivates Web3.(disconnectWallet)
    // Moralis: The Moralis object.
    const {
        enableWeb3,
        account,
        isWeb3Enabled,
        isWeb3EnableLoading,
        deactivateWeb3,
        Moralis,
    } = useMoralis();

    // When we hit refresh the browser forgets that we are already connected to wallet and changes isWeb3Enabled = false, so if localStorage has "connected" key in it. this useEffect will change the isWeb3Enabled = true
    useEffect(() => {
        if (
            !isWeb3Enabled &&
            typeof window !== "undefined" &&
            window.localStorage.getItem("connected")
        )
            enableWeb3();
    }, [isWeb3Enabled]);

    // useEffect hook to listen for changes to the user's account.
    // useEffect hook is used to listen for changes to the account property. When the account property changes, the function will be run. The function will log the new account to the console. If the new account is null, the function will remove the connected key from the window.localStorage object and call the deactivateWeb3 function.
    useEffect(() => {
        Moralis.onAccountChanged((newAccount) => {
            console.log(`Account changed to ${newAccount}`);
            if (newAccount == null) {
                window.localStorage.removeItem("connected");
                deactivateWeb3(); // sets isWeb3Enabled = false
                console.log("Null Account Found");
            }
        });
    }, []);

    // If the user has a connected account, the div element will contain the user's account information. Otherwise, the div element will contain a button that the user can click to connect to Web3.
    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...
                    {account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3();
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem(
                                "connected",
                                "injected"
                            );
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    );
}

// The enableWeb3 function first checks to see if the browser supports Web3. This is done by calling the window.ethereum object.
// enableWeb3 function is as this "await window.ethereum.request({method: "eth_requestAccounts"});"
// enableWeb3 only works with MetaMask
