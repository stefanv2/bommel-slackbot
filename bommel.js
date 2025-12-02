const express = require('express');
const cors = require('cors'); // ✅ CORS module
const bodyParser = require('body-parser');
const fs = require('fs');
const cron = require('node-cron');
const { WebClient } = require('@slack/web-api');

require('dotenv').config();

const app = express();

// ✅ CORS inschakelen voor alle domeinen (mag later strenger)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Quotes laden
const quotes = JSON.parse(fs.readFileSync('bommel-quotes.json', 'utf8'));

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// ✅ Slack client
const token = process.env.SLACK_BOT_TOKEN;
const channel = process.env.SLACK_CHANNEL_ID;
const slack = new WebClient(token);

// ✅ API endpoint — jouw dashboard gebruikt dit
app.get('/quote', (req, res) => {
  const quote = getRandomQuote();
  res.json({
    quote: quote,
    author: 'Heer Bommel'
  });
});

// ✅ Slack slash command /bommel
app.post('/slack/bommel', async (req, res) => {
  const quote = getRandomQuote();

  res.json({
    response_type: 'in_channel',
    blocks: [
      {
        type: "section",
        text: { type: "mrkdwn", text: "*📜 Quote van Heer Bommel*" }
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `_${quote}_` }
      },
      {
        type: "context",
        elements: [
          { type: "mrkdwn", text: ":scroll: Cultureel erfgoed – Tom Poes & Heer Bommel" }
        ]
      }
    ]
  });
});

// ✅ Automatische dagelijkse Slack-post (09:30)
cron.schedule('30 09 * * *', async () => {
  try {
    const quote = getRandomQuote();

    await slack.chat.postMessage({
      channel,
      text: `🧱 Heer Bommel zegt: "${quote}"`,
      blocks: [
        {
          type: "section",
          text: { type: "mrkdwn", text: "*📜 Quote van Heer Bommel*" }
        },
        {
          type: "section",
          text: { type: "mrkdwn", text: `_${quote}_` }
        },
        {
          type: "context",
          elements: [
            { type: "mrkdwn", text: ":scroll: Cultureel erfgoed – Tom Poes & Heer Bommel" }
          ]
        }
      ]
    });

    console.log(`[CRON] Quote gepost om 09:30: ${quote}`);
  } catch (err) {
    console.error('[CRON] Fout bij posten:', err);
  }
}, { timezone: 'Europe/Amsterdam' });

// ✅ Health check endpoint
app.get('/', (_req, res) => res.send('Bommel bot is alive'));

// ✅ Luister op alle netwerkinterfaces
const port = process.env.PORT || 3002;
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Bommel Slackbot draait op poort ${port}`);
});

