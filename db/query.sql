-- psql -f ./db/query.sql -U dev -d blog-app

DROP TABLE IF EXISTS stories;

CREATE TABLE stories(
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text
);

INSERT INTO stories (title, content) VALUES
('The Problem with Designer NeuroNode Transfers', 'We all have that one friend with indispensable income who just can''t get enough of those fancy, designer-tier synaptic-enhancement modules...'),
('Orbital Hydroponics 101: a Primer in Cosmic Ag', 'Ah, the smell of synthetic protein in the morning...'),
('Low Gravity Shenanigans', 'Just another day in the dunes. Taking the lunar buggy out for a spin with my boys...'),
('Virtual Companionship and the Case for Computer Love', 'So we''re all human and we''re all stuck with this pesky need to feel loved...'),
('Radical Views in a Pulsar System', 'Stellar sightseers rejoice! New holographic immersion streams of the Lich system are now available...');