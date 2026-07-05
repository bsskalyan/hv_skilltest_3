const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const services = {
  user: process.env.USER_SERVICE_URL || 'http://localhost:3001',
  products: process.env.PRODUCTS_SERVICE_URL || 'http://localhost:3002',
  orders: process.env.ORDERS_SERVICE_URL || 'http://localhost:3003',
  cart: process.env.CART_SERVICE_URL || 'http://localhost:3004'
};

app.get('/', (_req, res) => {
  res.send(`
    <html>
      <head>
        <title>E-commerce Frontend</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 2rem; line-height: 1.4; }
          code { background: #f1f1f1; padding: 0.2rem 0.4rem; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>Frontend is Live</h1>
        <p>Node.js multi-service e-commerce demo is running.</p>
        <p>Configured backend URLs:</p>
        <ul>
          <li>User: <code>${services.user}</code></li>
          <li>Products: <code>${services.products}</code></li>
          <li>Orders: <code>${services.orders}</code></li>
          <li>Cart: <code>${services.cart}</code></li>
        </ul>
      </body>
    </html>
  `);
});

app.get('/health', (_req, res) => {
  res.json({ service: 'frontend', status: 'ok', backends: services });
});

app.listen(PORT, () => {
  console.log(`frontend-service listening on port ${PORT}`);
});
