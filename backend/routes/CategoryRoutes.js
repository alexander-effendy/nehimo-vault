// routes/categoryRoutes.js
const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// POST endpoint to add a new category
router.post('/', async (req, res) => {
  const { icon, label } = req.body;

  if (!label) {
    return res.status(400).json({ error: 'Label is required' });
  }

  try {
    const queryText = `
      INSERT INTO category (icon, label)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [icon || null, label];
    const result = await pool.query(queryText, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET endpoint to retrieve all categories
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM category');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
