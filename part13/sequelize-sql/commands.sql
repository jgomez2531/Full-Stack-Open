-- 1. Create table for blogs
CREATE TABLE blogs(
  id SERIAL PRIMARY KEY, 
  author text, 
  url text NOT NULL, 
  title text NOT NULL, 
  likes numeric DEFAULT 0 
);

-- 2. Insert a couple of entries
insert into blogs (author, url, title) values ('Roni', 'asd.com', 'Art of asd');
insert into blogs (author, url, title) values ('Roni', 'wasd.com', 'War and Wasd');