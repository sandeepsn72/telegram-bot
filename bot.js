const telegram = require("node-telegram-bot-api");
const OpenAI = require("openai");
require("dotenv").config();
let flag = false;
const bot = new telegram(process.env.telegramToken, { polling: true });
const forbiddenWords = [process.env.forbiddenWords];
bot.onText(/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Hello! Welcome to Sandeep Saini's Chat BOT");
});

const openai = new OpenAI({
  apiKey: process.env.openAiToken, // This is also the default, can be omitted
});

bot.on("message", async (msg) => {
  console.log(msg.text);
  const chatId = msg.chat.id;
  if (
    msg.text &&
    forbiddenWords.some((word) => msg.text.toLowerCase().includes(word))
  ) {
    bot.sendMessage(chatId, "tu hoga ;)");
  } else if (msg.text.toLowerCase().includes("create")) {
    bot.sendMessage(
      chatId,
      "I was created by Mr. Sandeep Saini on 4th December 2023! "
    );
  } else if (msg.text && msg.text.trim() !== "" && !flag) {
    const reply = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: msg.text }],
    });
    console.log(reply.choices[0].message.content);
    bot.sendMessage(chatId, reply.choices[0].message.content);
  }
});
