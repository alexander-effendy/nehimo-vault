// app.js
const express = require('express');
const app = express();

// Built-in middleware to parse JSON bodies
app.use(express.json());

// Import route files
const categoryRoutes = require('./routes/CategoryRoutes');
// const passwordRoutes = require('./routes/passwordRoutes');

// Mount routes
app.use('/categories', categoryRoutes);
// app.use('/passwords', passwordRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
