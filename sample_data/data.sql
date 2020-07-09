ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS pk_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.planet_votes DROP CONSTRAINT IF EXISTS fk_id CASCADE;


DROP TABLE IF EXISTS public.users;
CREATE TABLE users (
    id serial NOT NULL,
    username text,
    password text
);

DROP TABLE IF EXISTS public.planet_votes;
CREATE TABLE planet_votes (
    id serial NOT NULL,
    planet_id integer,
    planet_name character varying,
    user_id integer,
    submission_time timestamp default current_timestamp
);

ALTER TABLE ONLY users
    ADD CONSTRAINT pk_id PRIMARY KEY (id);
ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT fk_planet_votes FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
