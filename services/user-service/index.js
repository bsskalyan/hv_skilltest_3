const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (_req, res) => {
  res.send('User Service Running');
});

app.get('/health', (_req, res) => {
  res.json({ service: 'user', status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`user-service listening on port ${PORT}`);
});
