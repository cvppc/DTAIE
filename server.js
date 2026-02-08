const express = require("express");
const path = require("path");

const app = express();

// Required to receive JSON
app.use(express.json());

// store webhook data in memory
let webhookStore;

// webhook endpoint (OTHER SITES POST HERE)
app.post("/webhook", (req, res) => {

    const data = req.body;
    // let mailId;

    // if (data.mailId.includes("<")) {
    //     const start = data.indexOf("<");
    //     const end = data.indexOf(">");

    //     mailId = data.substring(start + 1, end);
    // } else {
    //     mailId = data;
    // }

    console.log("Webhook received:");
    console.log(data);

    // store data
    webhookStore = data;

    res.status(200).send("Webhook received successfully");
});
let i=0;

// endpoint for frontend to get data
app.get("/data", (req, res) => {
    if (!webhookStore) {
        return res.status(404).json({ error: "No webhook data available" });
    }
    res.json(webhookStore);
    webhookStore = null; // clear data after sending to frontend
});


// serve frontend
app.use(express.static((path.join(__dirname, "public"))));


// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
