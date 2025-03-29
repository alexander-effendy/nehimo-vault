// controllers/categoryController.js
const { Pool } = require('pg');

// Configure your PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER || 'your_db_username',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'password_manager',
  password: process.env.DB_PASSWORD || 'your_db_password',
  port: process.env.DB_PORT || 5432,
});

// Function to add a new category
exports.addCategory = async (req, res) => {
  const { icon, label } = req.body;

  // Validate that a label is provided
  if (!label) {
    return res.status(400).json({ error: 'Label is required' });
  }

  try {
    // Insert the new category and return the inserted row
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
};

// Function to get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM category');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Optionally, you could add functions like updateCategory and deleteCategory here if needed.
