const TelegramBot = require('node-telegram-bot-api');
const token = '6646624297:AAHcCZG8gLbjWLmohhow64YUnsG6mLGdkNo'



// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
const img_url = 'https://images.unsplash.com/photo-1636953099671-481a72803051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80'


async function fetchCoinData(contractAddress) {
    const axios = require('axios')
    const url = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contractAddress}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'accept': 'application/json'
            }
        });

        const resOb = {
            tokenID: response.data['id'],
            symbol: response.data['symbol'],
            name: response.data['name'],
            thumb: response.data['image']['thumb'],
            prices: {
                eth: response.data['market_data']['current_price'].eth,
                btc: response.data['market_data']['current_price'].btc,
                eur: response.data['market_data']['current_price'].eur,
                usd: response.data['market_data']['current_price'].usd

            }

        }
        return resOb;
    } catch (error) {
        throw error;
    }
}



var contractAdddress = '';

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Define keyboard options with emojis as images and descriptive text
    const keyboard = [
        [{ text: "📢 Price Tracking", callback_data: "price_tracking" }, { text: "🎥 Trending", callback_data: "trending" }],
    ];

    // Create reply markup with custom keyboard
    const replyMarkup = {
        reply_markup: {
            keyboard: keyboard,
            resize_keyboard: true,
            one_time_keyboard: false
        }
    };

    bot.sendPhoto(chatId, img_url, {
        caption:  "Hello there! 🌟\nExplore the world of cryptocurrency with us."
    }).then(() => {
        bot.sendMessage(chatId, "How can we assist you today? 🛠️🤖", replyMarkup);
    });
});


// Say Hello to bot
bot.on('message', (msg) => {
    var send_txt1 = msg.text;
    var send_msg = "Hi";
    if (send_txt1.toString().indexOf(send_msg) === 0) {
        bot.sendMessage(msg.chat.id, "Hello I am smart bot from Beowulf, start the task list by replying \n /start ")
    }
});

bot.on('message', (msg) => {
    var send_txt1 = msg.text;
    var send_msg = "hi";
    if (send_txt1.toString().indexOf(send_msg) === 0) {
        bot.sendMessage(msg.chat.id, "Hello I am smart bot from Beowulf, start the task list by replying \n /start ")
    }
});


bot.on('message', (msg) => {
    var send_txt = msg.text;
    /*
    var step1_txt = '1. Join Telegram group';
    if (send_txt.toString().indexOf(step1_txt) === 0) {
        var text = 'Beowulf Official Telegram Group';
        var keyboardStr = JSON.stringify({
            inline_keyboard: [
                [
                    { text: 'Join the chat 🦜', url: 'https://t.me/ctobeowulf' }
                ]
            ]
        });
        var keyboard = { reply_markup: JSON.parse(keyboardStr) };
        bot.sendMessage(msg.chat.id, text, keyboard);
    }
*/
///Price tracckng

const step2_txt = '📢 Price Tracking';
if (send_txt.toString().indexOf(step2_txt) === 0) {
    const erc20AddressMessage = "🔑 Please provide a valid ERC20 address on the Ethereum network (starting with 0x).";
    bot.sendMessage(msg.chat.id, erc20AddressMessage);
  }

const re_eth = /^0x[a-fA-F0-9]{40}$/g;

if (re_eth.test(send_txt)) {
    contractAdddress = send_txt;

    fetchCoinData(contractAdddress).then((c_data) => {
        const formattedPrices = Object.entries(c_data.prices)
            .map(([currency, value]) => `${currency.toUpperCase()}: ${value}`)
            .join(', ');

        // Create the message text with coin information
        const messageText = `
🪙 Token: ${c_data.name} (${c_data.symbol.toUpperCase()})
🆔 Token ID: ${c_data.tokenID}
💰 Price: ${formattedPrices}
`;

        // Send coin information with a photo and formatted text
        bot.sendPhoto(msg.chat.id, c_data.thumb, {
            caption: messageText
        }).then(() => {
            // Provide options to buy or sell
            bot.sendMessage(msg.chat.id, 'Do you want to:', {
                reply_markup: {
                    keyboard: [
                        [{ text: "Buy 💰" }],
                        [{ text: "Sell 💸" }]
                    ],
                    resize_keyboard: true
                }
            });
        });
    }).catch((err)=> {
        bot.sendMessage(msg.chat.id, 'Token not found:', {
            reply_markup: {
                keyboard: [
                    [{ text: "📢 Price Tracking", callback_data: "price_tracking" }, { text: "🎥 Trending", callback_data: "trending" }],
   
                ],
                resize_keyboard: true
            }
        });
    });
}
});