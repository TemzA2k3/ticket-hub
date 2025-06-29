-- USERS (password is 123456)
INSERT INTO users (id, password, first_name, last_name, email, role, created_at)
VALUES
  (1, '$2a$12$fI9HA6VxaGaOT/GIQ/cI2OhGTIgLpae2a6MD6zq6k8eyzqzUgH.Ra', 'Bob', 'Verified', 'bob@example.com', 'VERIFIED', now())
ON CONFLICT (email) DO NOTHING;

-- Reset the users_id_seq to the max id in users
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));

-- CATEGORIES
INSERT INTO categories (name)
VALUES 
  ('Concerts'), ('Sports'), ('Theater'), ('Comedy'),
  ('Films'), ('Food and Drink'), ('Gaming'), ('Conferences')
ON CONFLICT (name) DO NOTHING;