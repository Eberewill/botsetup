# Telegram Token Info Bot

The Telegram Token Info Bot is a script designed to provide users with information about a specific token smart contract on the Ethereum blockchain. By interacting with this bot, users can retrieve details such as the token's name, symbol, and price in USD.

![Telegram Token Info Bot](bot_screenshot.png)

## Features

- **Token Information**: Users can input a token smart contract address, and the bot will fetch and display the token's name, symbol, and current price in USD.

- **User-Friendly**: The bot's interface is intuitive and easy to use. Users only need to provide the smart contract address to receive the desired token information.

## Prerequisites

Before setting up the Telegram Token Info Bot, make sure you have the following:

- **Telegram Bot Token**: Obtain a Telegram bot token by creating a bot on Telegram. This token is required for the bot to interact with users on the Telegram platform.

- **TokenFather bot**: You need to interact with the [TokenFather bot](https://core.telegram.org/bots#botfather) on Telegram to get the `botTokenId`. This ID is essential for your bot to respond to users' commands.

- **Moralis API Token**: Sign up for [Moralis](https://moralis.io/) and obtain an API token. The Moralis API will be used to fetch the token price in USD.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/telegram-token-info-bot.git
   cd telegram-token-info-bot
   ```

2. Install dependencies:

   ```bash
   npm install 
   ```

3. Open the `config.py` file and enter your Telegram bot token, `botTokenId` from TokenFather, and Moralis API token:

   ```node js
   TELEGRAM_BOT_TOKEN = "your_telegram_bot_token"
   BOT_TOKEN_ID = "your_bot_token_id"
   MORALIS_API_TOKEN = "your_moralis_api_token"
   ```

4. Run the bot:

   ```bash
   node index.js
   ```

## Usage

1. Start a chat with your Telegram bot on Telegram.

2. Enter the token's smart contract address when prompted.

3. The bot will retrieve and display the token's name, symbol, and current price in USD.

## Contributions

Contributions to the Telegram Token Info Bot are welcome! If you find any issues or have ideas for improvements, feel free to submit a pull request.

## Disclaimer

This bot provides token price information for educational and informational purposes only. The displayed token price may not reflect real-time market conditions. Always verify information from multiple sources before making any financial decisions.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this README to match your project's specific details and structure. Don't forget to include any relevant disclaimers and notices. Good luck with your Telegram Token Info Bot!