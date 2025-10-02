# 🟠 Cruijff Quote Slack Bot


---

<p align="center">
<img src="/bommel1.png" alt="BTOP" width="120" height="120"/>  
</p>

---

Een simpele, Docker-gebaseerde Slack-bot die elke week een legendarische uitspraak van Johan Cruijff post in een Slack-kanaal. Ideaal voor wat voetbalwijsheid, humor of inspiratie op de werkvloer.

> "Je gaat het pas zien als je het doorhebt." – Johan Cruijff

---

## ⚙️ Functionaliteit

- ✅ Post wekelijks (standaard: elke maandag om 09:00) een willekeurige Cruijff-quote
- ✅ Slack-integratie met gebruik van `xoxb-` bot token
- ✅ Eenvoudig te draaien in een Docker-container
- ✅ Aanpasbare quotes en tijdstip via code of cron

---

## 🚀 Installatie

### 1. Clone de repo

```bash
git clone https://github.com/jouw-gebruikernaam/cruijff-quote-bot.git
cd cruijff-quote-bot


2. Maak een .env bestand
SLACK_BOT_TOKEN=xoxb-...
SLACK_CHANNEL_ID=C012ABC345D

3. Build en run de container
docker build -t cruijff-slackbot .
docker run --env-file .env -d --name cruijff-bot cruijff-slackbot

🕰️ Tijdzone instellen
A) In de Dockerfile:
ENV TZ=Europe/Amsterdam
RUN apk add --no-cache tzdata

B) Of bij het runnen:
-v /etc/localtime:/etc/localtime:ro

✏️ Aanpassen

Quotes toevoegen:

Pas het bestand quotes.js aan:
module.exports = [
  "Elk nadeel heb z’n voordeel.",
  "Voetbal is simpel. Maar simpel voetballen is het moeilijkste wat er is.",
  // ...meer quotes
];

Cron aanpassen (in index.js):

// Elke maandag om 09:00 (Europe/Amsterdam)
cron.schedule('0 9 * * 1', async () => {
  ...
});

🧪 Testen
Test handmatig een quote:

docker exec -it cruijff-bot node
> const quotes = require('./quotes'); quotes[Math.floor(Math.random() * quotes.length)];

📄 Licentie
MIT – Vrij te gebruiken en aan te passen. Quotes van Johan Cruijff zijn cultureel erfgoed 😉.

📫 Contact
Gebouwd door Stefan. Ideeën of uitbreidingen? PR’s welkom!

