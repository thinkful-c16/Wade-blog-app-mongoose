-- psql -f ./db/query.sql -U dev -d blog-app

DROP TABLE IF EXISTS stories;

CREATE TABLE stories(
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text
);

INSERT INTO stories (title, content) VALUES
('The Problem with Designer NeuroNode Transfers', 'We all have that one friend with indispensable income who just can''t get enough of these oblique, "designer-tier" synaptic-enhancement modules...'),
('Orbital Hydroponics 101: a Primer in Cosmic Ag', 'Ah, the smell of synthetic meat');