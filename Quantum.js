////dont touch
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
////end of dont touch
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");

// Set up your bot token
const token = "6372895753:AAEXJQ5iqcpFRU-kGveMJXFuTJOa3ZRbMLs";

// Create an instance of the TelegramBot class
const bot = new TelegramBot(token, { polling: true });

// Create a state variable for each user
const userStates = {};
// Handle incoming messages
bot.on("message", (msg) => {
  // Implement your bot's functionality here
  if (msg.text === "/start") {
    // Check if it's the user's first time opening the bot
    const userDataPath = `./userData/${msg.from.id}.json`;
    if (!fs.existsSync(userDataPath)) {
      // Create the welcome message
      const headerText = "*Welcome to My Bot!*";
      const welcomeText =
        "Thank you for joining. Let me assist you with any queries you have.";
      const startButton = {
        reply_markup: {
          keyboard: [[{ text: "Start" }]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      };

      // Save user data to indicate that the user has opened the bot before
      const userData = {
        hasOpenedBot: true,
      };
      fs.writeFileSync(userDataPath, JSON.stringify(userData));

      // Send the welcome message
      bot.sendMessage(
        msg.chat.id,
        `${headerText}\n\n${welcomeText}`,
        startButton
      );
    }
  }
});

// Handle incoming messages
bot.on("message", (msg) => {
  // Implement your bot's functionality here
  if (msg.text === "/menu" || "/start") {
    // Create the formatted message
    const message = `
Hello ${msg.from.username}! 🌟
Welcome to using the Quantum Chain AI BOT on Telegram! 🌴

👉 You can utilize me for the following tasks:
- NEW: Mint NFTs out of generated images on SKALE, gas-free!
- AI Assistant with Text & Image Input
- Google & YouTube Smart Search
- ERC20 Token Analysis
- Voice Message

💡 Be sure to visit Quantum Chain  to learn more about the project!
`;

    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Asistant", callback_data: "asistant" },
            { text: "AI Search", callback_data: "ai_search" },
          ],
          [
            { text: "Token Analysis", callback_data: "token_analysis" },
            { text: "Topics", callback_data: "topics" },
          ],
          [
            { text: "Voice Message", callback_data: "voice_message" },
            { text: "Image Gen", callback_data: "image_gen" },
          ],
          [
            { text: "Wallet Menu", callback_data: "wallet_menu" },
            { text: "Web3 Portal", callback_data: "web3_portal" },
          ],
          [
            { text: "Group Functions", callback_data: "group_function" },
            { text: "Quantum Portal", callback_data: "quantum_portal" },
          ],
        ],
      },
    };

    // Send the formatted message with options
    bot.sendMessage(msg.chat.id, message, options);
  }
});

// Handle callback queries
bot.on("callback_query", (query) => {
  // Implement your bot's functionality for each option here
  const option = query.data;
  // Example handling for each option
  switch (option) {
    // Handle the "Buy token" option
    case "asistant":
      const message = `How can I help you? You can send me either images or text! 
TIP: Caption your images for specific results.`;

      bot.sendMessage(query.message.chat.id, message).then(() => {
        userStates[query.from.id] = "awaiting_wallet_address_buy_token";
      });
      break;
    //Please enter your search query:
    case "ai_search":
      bot
        .sendMessage(query.message.chat.id, `Please enter your search query:`)
        .then(() => {});
      break;

    //token_analysis
    case "token_analysis":
      bot
        .sendMessage(
          query.message.chat.id,
          `Please enter the ERC-20 token contract address, name, or symbol`
        )
        .then(() => {});
      break;

    //token_analysis
    case "topics":
      bot
        .sendMessage(
          query.message.chat.id,
          `How can I help you? You can send me either images or text! 
TIP: Caption your images for specific results.`
        )
        .then(() => {});
      break;

    case "voice_message":
      bot
        .sendMessage(query.message.chat.id, `Please send a voice message now.`)
        .then(() => {});
      break;

    case "image_gen":
      const imageGenMsg = `
Welcome to the Quantum AI Project's ImgGen! 

❓ What can you do currently?
You can both generate and edit images with the bot and mint them as NFTs on SKALE. Prompting will be automatically enhanced. 
Remember to include a hint at the style of image you want, if it matters e.g. 'realistic'.

⚙️ Features
- Generate & edit high-quality images
- Free users can generate up to three high-quality images per one hour. - Unlimited image editing 
🫰Extras for Quantum holders:
- Access to exclusive filtered model 
- Retry generating (unlimited)
- Increased generation cap of 20 images per hour.
- No watermark.`;

      const imageGenMsg_options = {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Create Image", callback_data: "_" }],
            [{ text: "Create Artwork", callback_data: "_" }],
            [{ text: "Generate Video (Sora)", callback_data: "_" }],
            [{ text: "Edit Image", callback_data: "_" }],
            [{ text: "Enter Product key", callback_data: "_" }],
            [
              {
                text: "Back",
                callback_data: "image_gen",
              },
            ],
          ],
        },
      };

      bot
        .sendMessage(query.message.chat.id, imageGenMsg, imageGenMsg_options)
        .then(() => {});
      break;
  }
  // Respond to the callback query (acknowledge the button click)
  bot.answerCallbackQuery(query.id);
});

bot.on("message", (msg) => {
  // Check if the state is 'awaiting_wallet_address'
  //if (userStates[msg.from.id] === 'awaiting_wallet_address_buy_token') {
  // Check if the message text is a valid wallet address
  // if (isValidWalletAddress(msg.text)) {
  // Store the wallet address and reset the state
  // userWalletAddress = msg.text;
  // userStates[msg.from.id] = null;

  //  } else {
  //  bot
  //   .sendMessage(msg.chat.id, `⚠️Invalid token address: \n ${msg.text}`)
  // .then(() => {
  //     bot.sendMessage(msg.chat.id, '📝Enter wallet address:');
  //  });
  // }

  bot.sendMessage(msg.chat.id, `recieved \n ${msg.text}`);
});

function isValidWalletAddress(address) {
  // Implement your validation logic here
  return address.startsWith("0x") && address.length === 42;
}
