const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cron = require('node-cron');
const { WebClient } = require('@slack/web-api');

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const quotes = JSON.parse(fs.readFileSync('bommel-quotes.json', 'utf8'));

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Slack client
const token = process.env.SLACK_BOT_TOKEN;     // xoxb-...
const channel = process.env.SLACK_CHANNEL_ID; // bv. C0123456789
const slack = new WebClient(token);

// ---- Slash command: /bommel
app.post('/slack/bommel', async (req, res) => {
  const quote = getRandomQuote();

  // Direct antwoord in Slack (in-channel)
  res.json({
    response_type: 'in_channel',
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*📜 Quote van Heer Bommel*"
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `_${quote}_`
        }
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: ":scroll: Cultureel erfgoed – Tom Poes & Heer Bommel"
          }
        ]
      }
    ]
  });
});

// ---- Dagelijks schema: 09:30 Europe/Amsterdam
cron.schedule('30 09 * * *', async () => {
  try {
    const quote = getRandomQuote();

    await slack.chat.postMessage({
      channel,
      text: `🧱 Heer Bommel zegt: "${quote}"`, // fallback
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*📜 Quote van Heer Bommel*"
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `_${quote}_`
          }
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: ":scroll: Cultureel erfgoed – Tom Poes & Heer Bommel"
            }
          ]
        }
      ]
    });

    console.log(`[CRON] Quote gepost om 09:30: ${quote}`);
  } catch (err) {
    console.error('[CRON] Fout bij posten:', err);
  }
}, { timezone: 'Europe/Amsterdam' });

// Healthcheck
app.get('/', (_req, res) => res.send('Bommel bot is alive'));

// Start server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`🚀 Bommel Slackbot draait op poort ${port}`);
});

