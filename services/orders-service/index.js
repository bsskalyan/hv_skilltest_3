const express = require('express');

const app = express();
const PORT = process.env.PORT || 3003;

app.get('/', (_req, res) => {
  res.send('Orders Service Running');
});

app.get('/health', (_req, res) => {
  res.json({ service: 'orders', status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`orders-service listening on port ${PORT}`);
});
