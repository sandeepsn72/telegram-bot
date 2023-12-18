const telegram = require("node-telegram-bot-api");
const OpenAI = require("openai");
require("dotenv").config();

const bot = new telegram(process.env.telegramToken, { polling: true });

// bot.onText(/\/start/, (msg) => {
//   bot.sendMessage(chatId, "Welcome to Sandeep Saini's Chat BOT");
// });

const openai = new OpenAI({
  apiKey: process.env.openAiToken, // This is also the default, can be omitted
});

bot.on("message", async (msg) => {
  console.log(msg);

  const chatId = msg.chat.id;
  if (msg.text && msg.text.trim() !== "") {
    const reply = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: msg.text }],
    });
    console.log(reply);
    bot.sendMessage(chatId, reply.choices[0].message.content);
  }
});
