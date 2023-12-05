const telegram = require("node-telegram-bot-api");
const OpenAI = require("openai");

telegramToken = "6572244393:AAFWB_Mdy7-PpWjE2FJjTfC27B9UHCfo9Ek";
openAiToken = "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";

const bot = new telegram(telegramToken, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(chatId, "Welcome to Sandeep Saini's Chat BOT");
});

const openai = new OpenAI({
  apiKey: openAiToken, // This is also the default, can be omitted
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
