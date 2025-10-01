require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const cron = require('node-cron');
const quotes = require('./quotes');

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return `🟠 *Quote van Cruijff:*\n> "${quotes[index]}"`;
}

// Dagelijks om 09:00
cron.schedule('25 12 * * *', async () => {
  try {
    const message = getRandomQuote();
    await slack.chat.postMessage({
      channel: process.env.SLACK_CHANNEL_ID,
      text: message,
    });
    console.log('Quote verzonden:', message);
  } catch (err) {
    console.error('Fout bij verzenden:', err);
  }
});

