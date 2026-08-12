const express = require("express");

const app = express();

app.use(express.json());

const VERIFY_TOKEN = "test123";

// Health check
app.get("/", (req, res) => {
    res.send("WhatsApp Webhook Server is running.");
});

// Webhook verification
app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    console.log("Webhook verification:", {
        mode,
        token,
        challenge
    });

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("WEBHOOK VERIFIED");

        return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
});

// Receive WhatsApp events
app.post("/webhook", (req, res) => {
    console.log("\nWEBHOOK EVENT RECEIVED");
    console.log(JSON.stringify(req.body, null, 2));

    return res.sendStatus(200);
});

module.exports = app;