const express = require('express');

const app = express();
const PORT = process.env.PORT || 3002;

app.get('/', (_req, res) => {
  res.send('Products Service Running');
});

app.get('/health', (_req, res) => {
  res.json({ service: 'products', status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`products-service listening on port ${PORT}`);
});
