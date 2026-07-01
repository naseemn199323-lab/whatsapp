const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("WhatsApp Webhook Server is running.");
});

app.use(express.json());

const VERIFY_TOKEN = "EAAStQO5uZANsBR0cWBwBszD723rqauo0uLQdZC9mvZAXiA1ClMIbCUekhAfPKWfNnSDwJkdwHQOApewigU6KCAiyVTh39gq7CZArM7DgnA4pGonT4ZBAOnmhyhy5vfPO5R2HrAHiPD2ohsFdNVbFkOwXZB15WjMfsRLpHcZBsJLlnCcu0ZCsrQbXSV1BT8okLdiykk9YnZBZCgUDW0DMDhVQHq7dlvp2i1S6a2cvid7maivZB9KxZB4B3Q7jjtWhoIHDeOCqjg3CjzvnYgetZBpRvQtVwsjXG";

// Webhook verification (Meta calls this)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  res.sendStatus(403);
});

// Receive messages/events
app.post("/webhook", (req, res) => {
  console.log("Webhook event:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));
