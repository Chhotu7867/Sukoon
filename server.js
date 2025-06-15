
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = "8069061401:AAHJuDhaHY-u6gTJsX1Os8gMoWBbog-tGlI";
const CHAT_ID = "7954258115";

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post("/submit", async (req, res) => {
    const reply = req.body.reply;
    const now = new Date().toLocaleString();
    const message = `📩 Friend Request Reply:\n🕒 Time: ${now}\n💬 Reply: ${reply}`;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: CHAT_ID, text: message })
        });
        res.send("Thank you for your response!");
    } catch (error) {
        console.error("Telegram Error:", error);
        res.status(500).send("Error sending message to Chhotu.");
    }
});

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
