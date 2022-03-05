const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTHTOKEN;
const fromPhone = process.env.TWILIO_PHONE;
const toPhone = process.env.TEXT_PHONE;

const app = express();
const PORT = 3100;

// this application will receive JSON data
app.use(bodyParser.json());

// start the server on port 3100
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

// set up twilio client
const client = require('twilio')(accountSid, authToken);

// POST Request Webhook
app.post("/webhook", (request, response) => {
    console.log(request.body);

    const activity = request.body.activity;
    const message = `💰🚀 ${activity[0].fromAddress} paid you ${activity[0].value} ETH. https://goerli.etherscan.io/tx/${activity[0].hash} 💰🚀`;

    client.messages
    .create({
       body: message,
       from: fromPhone,
       to: toPhone
     })
    .then(message => console.log(message.sid));

    response.send(message);
});

function isValidSignature(request) {    
    const token = 'Auth token provided by Alchemy on the Webhook setup page';
    const headers = request.headers;
    const signature = headers['x-alchemy-signature']; // Lowercase for NodeJS
    const body = request.body;    
    const hmac = crypto.createHmac('sha256', token) // Create a HMAC SHA256 hash using the auth token
    hmac.update(JSON.stringify(body), 'utf8') // Update the token hash with the request body using utf8
    const digest = hmac.digest('hex');     
    return (signature === digest); // If signature equals your computed hash, return true
}