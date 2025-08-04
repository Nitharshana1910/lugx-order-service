const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

// POST /orders
app.post('/orders', async (req, res) => {
  const { userId, cartItems, totalPrice } = req.body;
  try {
    await pool.query(
      'INSERT INTO orders (user_id, cart_items, total_price) VALUES ($1, $2, $3)',
      [userId, JSON.stringify(cartItems), totalPrice]
    );
    res.status(201).send('Order placed');
  } catch (err) {
    console.error(err);
    res.status(500).send('DB Error');
  }
});

// GET /orders
app.get('/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('DB Error');
  }
});

app.listen(3002, async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Connected to DB');
  } catch (err) {
    console.error('❌ Failed to connect to DB:', err.message);
  }
  console.log('🛒 Order Service running on port 3002');
});
