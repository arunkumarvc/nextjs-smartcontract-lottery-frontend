import { ConnectButton } from "@web3uikit/web3";

export default function Header() {
    return (
        <div className="flex flex-row border-b-2 p-5">
            <h1 className="px-4 py-4 text-3xl"> Decentralized Lottery </h1>
            <div className="ml-auto px-2 py-2">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    );
}
