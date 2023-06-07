# Raffle-Frontend

Frontend app that allows users to enter a raffle and win a prize.

## Features

-   Users can enter the raffle by sending ETH to the contract.
-   The raffle is open for a set period of time.
-   At the end of the raffle, a random winner is chosen.
-   The winner receives the prize.


## Requirements

- MetaMask
- Node.js
- npm or yarn


## Installation

First, run the development server:

```bash
yarn dev
```
Clone [this repository](https://github.com/arunkumarvc/hardhat-smartcontract-lottery-backend) for backend.

Run the local node/network chain
```bash
yarn hardhat node
```

Run the script command to pick the winner
```bash
yarn hardhat run scripts/enterRaffle.js --network localhost
```
