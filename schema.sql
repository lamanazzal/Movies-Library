DROP TABLE IF EXISTS movieTable ;
CREATE TABLE IF NOT EXISTS movieTable
 
 (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    poster  VARCHAR(255),
   overview  VARCHAR(255),
   comment VARCHAR(255))