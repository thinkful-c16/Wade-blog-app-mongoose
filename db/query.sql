CREATE TABLE stories(
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text
);

INSERT INTO stories
  (title, content) VALUES
    ('The Problem with Designer NeuroNode Transfers', 'We all have a friend with indispensable income who just can''t get enough of these oblique, "designer-tier" synaptic-enhancement modules...');