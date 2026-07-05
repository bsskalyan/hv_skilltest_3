const express = require('express');

const app = express();
const PORT = process.env.PORT || 3004;

app.get('/', (_req, res) => {
  res.send('Cart Service Running');
});

app.get('/health', (_req, res) => {
  res.json({ service: 'cart', status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`cart-service listening on port ${PORT}`);
});
