CREATE TABLE category (
  id SERIAL PRIMARY KEY,                   -- Unique identifier
  name VARCHAR(255) NOT NULL,              -- Category name
  type VARCHAR(100) NOT NULL,              -- Category type (adjust length as needed)
  date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Date created
  last_edited TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,   -- Last edited date
  icon TEXT                                -- Icon image reference (e.g., URL or file path)
);