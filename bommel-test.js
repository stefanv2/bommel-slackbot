const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("✅ Server leeft op /");
});

app.post('/slack/bommel', (req, res) => {
  res.json({ text: "✅ Bommel route werkt!" });
});

app.listen(3002, () => {
  console.log("Bommel testbot draait op poort 3002");
});

