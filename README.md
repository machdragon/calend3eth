# Calend3.eth

https://machdragon.github.io/calend3eth/

Requires the [Metamask Wallet Extension](https://metamask.io/) to be installed in your browser to interact with this Web3 ReactJs app built on the Ethereum Blockchain.

This project implements a Web3 based Calendly React web app using ETH to book appointments. 

Frameworks used: ReactJS, Solidity, NodeJs, Hardhat, Alchemy, Metamask, Twilio.

Users interact with the Frontend React Calend3 Web3app, viewing the available schedule to book appointments by paying a rate of ETH/min as set by the owner.
Once an appointment has been booked, the user receives a confirmation of the appointment booking on the blockchain viewed by etherscan txn hash.
The owner of the Calendly receives ETH and is notified by SMS of the appointment on the blockchain.

We deploy this smart contract to the Goerli Testnet, Calend3 frontend calls the Solidity smart contract backend for getting/setting rate and to send/recieve ETH transactions

![calend3.eth screen](https://i.imgur.com/9ml12BE.png)

![connect wallet screen](https://i.imgur.com/CEzORwr.png)

Test out the features by selecting the Goerli Test Network with your MetaMask Wallet.
Then head to https://goerlifaucet.com/ to add some play money to your wallet address and create some calendar bookings!

![MetaMask Wallet](https://i.imgur.com/fPVQlrX.png)

### launch Frontend React WebApp at localhost:3000
displays calendar for user and admin components verifies against Metamask owner address
```
cd frontend
npm start
```
requires Metamask to be installed in frontend directory
```
npm install @metamask/detect-provider
```

## How to build this project on your own utilizing Solidity, NodeJs, Hardhat, ReactJS, Alchemy, Metamask, Twilio
```
cd calend3eth
npm init -y
npm install --save-dev hardhat
npx hardhat
npm install --save-dev @nomiclabs/hardhat-waffle@^2.0.0 ethereum-waffle@^3.0.0 chai@^4.2.0 @nomiclabs/hardhat-ethers@^2.0.0 ethers@^5.0.0
npx hardhat
npx hardhat accounts
```
### deploy our smart contract on network goerli
```
npx hardhat run scripts/deploy.js --network goerli
```
### Twilio Notifications with Alchemy Webhooks
```
cd webhooks && npm init -y
npm install express body-parser twilio
node index.js
```

### ngrok to tunnel and enable Alchemy to access localhost
```
unzip /path/to/ngrok.zip
ngrok authtoken [your token]
ngrok http 3100
```

### copy https ngrok address and paste into Alchemy Notify Webhook to get Notifications about our Smart Contract Transactions

Source: [Part Time Larry](https://www.youtube.com/channel/UCY2ifv8iH1Dsgjrz-h3lWLQ)
