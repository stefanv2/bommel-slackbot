# 🟠 Olivier B. Bommel Quote Slack Bot


---

<p align="center">
<img src="/bommel1.png" alt="BTOP" width="120" height="120"/>  
</p>

---

Een simpele, Docker-gebaseerde Slack-bot die elke dag een legendarische uitspraak van Olivier B. Bommel post in een Slack-kanaal. Ideaal voor humor of inspiratie op de werkvloer.

> "Heer Bommel zegt: "Tom Poes, verzin een list!" 

---

## ⚙️ Functionaliteit

- ✅ Post dagelijks een willekeurige Bommel-quote
- ✅ Slack-integratie met gebruik van `xoxb-` bot token
- ✅ Eenvoudig te draaien in een Docker-container
- ✅ Aanpasbare quotes en tijdstip via code of cron

---

Bommel Quote Bot

Een Slack-bot die elke dag een uitspraak van Heer Bommel post, en via /bommel een quote on-demand kan geven.

🚀 Installatie

Clone de repository

git clone https://github.com/jouw-gebruikernaam/bommel-quote-bot.git
cd bommel-quote-bot


Maak een .env bestand

SLACK_BOT_TOKEN=xoxb-...
SLACK_CHANNEL_ID=C012ABC345D


Build en run de container

docker build -t bommel-slackbot .
docker run --env-file .env -d --name bommel-bot -p 3002:3002 bommel-slackbot

🕰️ Tijdzone instellen

A) In de Dockerfile

ENV TZ=Europe/Amsterdam
RUN apk add --no-cache tzdata


B) Of bij het runnen

-v /etc/localtime:/etc/localtime:ro

✏️ Aanpassen
Quotes toevoegen

Quotes staan in bommel-quotes.json.
Voorbeeld:

[
  "Als je begrijpt wat ik bedoel.",
  "Tom Poes, verzin een list!",
  "Ik wilde gewoon een rustige dag. Is dat te veel gevraagd?",
  "Ach jonge vriend, vroeger was alles simpeler — en duurder."
]

Cron aanpassen

In bommel.js wordt de posting-tijd ingesteld.
Voorbeeld: elke dag om 09:30 (Europe/Amsterdam):

cron.schedule('30 9 * * *', async () => {
  ...
}, { timezone: 'Europe/Amsterdam' });


Alleen maandagochtend om 09:30:00am

cron.schedule('30 9 * * 1', async () => {
  ...
}, { timezone: 'Europe/Amsterdam' });

🧪 Testen

Handmatig een quote testen binnen de container:

docker exec -it bommel-bot node
> const quotes = require('./bommel-quotes.json'); 
> quotes[Math.floor(Math.random() * quotes.length)];


Test het Slack-slash command:

curl -X POST http://localhost:3002/slack/bommel \
  -H "Content-Type: application/json" \
  -d '{"text":"test"}'

📄 Licentie

MIT – Vrij te gebruiken en aan te passen.
Quotes van Heer Bommel zijn cultureel erfgoed 😉

📫 Contact

Gebouwd door Stefan. Ideeën of uitbreidingen? PR’s welkom!

