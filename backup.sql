--
-- PostgreSQL database dump
--

\restrict fduhr9F0PUpbtuhOZ8fF5KahVdVYp5QVFR2nxHtP9n5agB4D2iwvb8JfZaUm2er

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: bookingstatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.bookingstatus AS ENUM (
    'pending',
    'confirmed',
    'cancelled'
);


ALTER TYPE public.bookingstatus OWNER TO postgres;

--
-- Name: paymentmethod; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.paymentmethod AS ENUM (
    'card',
    'cash',
    'wallet'
);


ALTER TYPE public.paymentmethod OWNER TO postgres;

--
-- Name: paymentstatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.paymentstatus AS ENUM (
    'pending',
    'paid',
    'failed'
);


ALTER TYPE public.paymentstatus OWNER TO postgres;

--
-- Name: userrole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.userrole AS ENUM (
    'admin',
    'staff',
    'customer'
);


ALTER TYPE public.userrole OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO postgres;

--
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    user_id integer,
    room_id integer,
    check_in date NOT NULL,
    check_out date NOT NULL,
    total_price integer NOT NULL,
    status public.bookingstatus,
    created_at timestamp without time zone
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookings_id_seq OWNER TO postgres;

--
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- Name: hotel_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hotel_images (
    id integer NOT NULL,
    hotel_id integer,
    image_url character varying NOT NULL
);


ALTER TABLE public.hotel_images OWNER TO postgres;

--
-- Name: hotel_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hotel_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hotel_images_id_seq OWNER TO postgres;

--
-- Name: hotel_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hotel_images_id_seq OWNED BY public.hotel_images.id;


--
-- Name: hotels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hotels (
    id integer NOT NULL,
    name character varying NOT NULL,
    location character varying NOT NULL,
    description text,
    rating integer,
    created_at timestamp without time zone,
    slug character varying(255)
);


ALTER TABLE public.hotels OWNER TO postgres;

--
-- Name: hotels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hotels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hotels_id_seq OWNER TO postgres;

--
-- Name: hotels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hotels_id_seq OWNED BY public.hotels.id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    booking_id integer,
    user_id integer,
    amount integer NOT NULL,
    method public.paymentmethod NOT NULL,
    status public.paymentstatus,
    transaction_id character varying,
    created_at timestamp without time zone
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_id_seq OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: room_amenities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room_amenities (
    id integer NOT NULL,
    room_id integer,
    name character varying NOT NULL
);


ALTER TABLE public.room_amenities OWNER TO postgres;

--
-- Name: room_amenities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.room_amenities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.room_amenities_id_seq OWNER TO postgres;

--
-- Name: room_amenities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.room_amenities_id_seq OWNED BY public.room_amenities.id;


--
-- Name: room_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room_images (
    id integer NOT NULL,
    room_id integer,
    image_url character varying NOT NULL
);


ALTER TABLE public.room_images OWNER TO postgres;

--
-- Name: room_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.room_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.room_images_id_seq OWNER TO postgres;

--
-- Name: room_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.room_images_id_seq OWNED BY public.room_images.id;


--
-- Name: rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooms (
    id integer NOT NULL,
    hotel_id integer,
    number character varying NOT NULL,
    price integer NOT NULL,
    capacity integer,
    is_available boolean,
    created_at timestamp without time zone
);


ALTER TABLE public.rooms OWNER TO postgres;

--
-- Name: rooms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rooms_id_seq OWNER TO postgres;

--
-- Name: rooms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rooms_id_seq OWNED BY public.rooms.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying,
    email character varying,
    password character varying,
    phone character varying,
    role public.userrole,
    is_active boolean,
    is_verified boolean,
    created_at timestamp without time zone,
    is_deleted boolean,
    deleted_at timestamp without time zone,
    first_name character varying,
    last_name character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


--
-- Name: hotel_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotel_images ALTER COLUMN id SET DEFAULT nextval('public.hotel_images_id_seq'::regclass);


--
-- Name: hotels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels ALTER COLUMN id SET DEFAULT nextval('public.hotels_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Name: room_amenities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_amenities ALTER COLUMN id SET DEFAULT nextval('public.room_amenities_id_seq'::regclass);


--
-- Name: room_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_images ALTER COLUMN id SET DEFAULT nextval('public.room_images_id_seq'::regclass);


--
-- Name: rooms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms ALTER COLUMN id SET DEFAULT nextval('public.rooms_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alembic_version (version_num) FROM stdin;
76ca85f00432
\.


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (id, user_id, room_id, check_in, check_out, total_price, status, created_at) FROM stdin;
1	2	13	2026-04-30	2026-05-08	9600	confirmed	2026-04-29 17:46:50.275993
3	2	8	2026-05-06	2026-05-09	3600	pending	2026-05-03 09:43:10.501891
2	2	10	2026-05-01	2026-05-05	4800	cancelled	2026-05-03 09:35:54.33049
4	2	9	2026-05-01	2026-05-05	6000	pending	2026-05-03 10:04:23.30493
5	2	2	2026-05-15	2026-05-18	4500	pending	2026-05-06 14:50:21.599007
\.


--
-- Data for Name: hotel_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hotel_images (id, hotel_id, image_url) FROM stdin;
1	1	/media/hotels/0a896006-69ab-4f3e-a52d-f69c6189ee82.jpeg
2	2	/media/hotels/670b436c-511c-4985-abbe-287f22f9fd4a.jpeg
3	3	/media/hotels/eea4edf6-5e08-4bb2-8a07-c3276dd34a64.jpg
4	4	/media/hotels/aa2699bc-1b22-4d95-9431-958e5799ac9c.jpg
5	4	/media/hotels/d2341112-11ce-4fe7-a9f3-8b340185c3b5.jpg
6	3	/media/hotels/2a193e1c-e592-4fa3-8262-49639cb97cac.jpg
7	3	/media/hotels/ab6db32c-34fb-453e-a144-09b780c893b5.jpg
\.


--
-- Data for Name: hotels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hotels (id, name, location, description, rating, created_at, slug) FROM stdin;
1	Hilton Cairo	Cairo	Luxury hotel in Egypt	0	2026-04-29 12:42:27.684591	hilton-cairo
2	Hilton Alex	Alexandria	Luxury hotel in Egypt	0	2026-04-29 12:44:45.589148	hilton-alex
3	Hilton Luxor	luxor	Luxury hotel in Egypt	0	2026-04-29 12:46:04.317024	hilton-luxor
4	Hilton Giza	Giza	Luxury hotel in Egypt	0	2026-04-29 12:46:20.308518	hilton-giza
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, booking_id, user_id, amount, method, status, transaction_id, created_at) FROM stdin;
\.


--
-- Data for Name: room_amenities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_amenities (id, room_id, name) FROM stdin;
1	1	WiFi
2	1	AC
3	2	WiFi
4	2	TV
5	3	WiFi
6	3	AC
7	4	WiFi
8	4	TV
9	5	WiFi
10	5	AC
11	6	WiFi
12	6	AC
13	7	WiFi
14	7	TV
15	8	WiFi
16	8	AC
17	9	WiFi
18	9	TV
19	10	WiFi
20	10	AC
21	11	WiFi
22	11	AC
23	12	WiFi
24	12	TV
25	13	WiFi
26	13	AC
27	14	WiFi
28	14	TV
29	15	WiFi
30	15	AC
31	16	WiFi
32	16	AC
33	17	WiFi
34	17	TV
\.


--
-- Data for Name: room_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_images (id, room_id, image_url) FROM stdin;
1	1	/media/rooms/room_1/e38e1fa9-94fe-4df1-bf88-2a6caab4b86c.jpg
2	2	/media/rooms/room_2/72fb9b85-b098-4ff1-93b2-80cc4e8ad19a.jpg
3	3	/media/rooms/room_3/fc345ecb-69a3-43c0-b9e7-22097888ddd0.jpg
4	4	/media/rooms/room_4/68849e94-0bdf-4c82-860e-734c76e66567.jpg
5	5	/media/rooms/room_5/59edad08-9e96-41b0-97eb-45d082d4ab1c.jpg
6	6	/media/rooms/room_6/f5a32564-452e-4cdb-9ddb-f0ce02dd58ad.jpg
7	7	/media/rooms/room_7/0c0caf75-bd31-4908-8914-28a6a9a250c9.jpg
8	8	/media/rooms/room_8/1c929063-efba-4f7f-9105-e00c72edbf1b.jpg
9	9	/media/rooms/room_9/12305cbd-e6c0-4cda-844c-cceda3f0300f.jpg
10	10	/media/rooms/room_10/9e8069e5-8c22-4fc8-a3a5-d05e954e7bef.jpg
\.


--
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rooms (id, hotel_id, number, price, capacity, is_available, created_at) FROM stdin;
1	1	101	1200	2	t	2026-04-29 12:42:27.698838
2	1	102	1500	3	t	2026-04-29 12:42:27.712823
3	2	101	1200	2	t	2026-04-29 12:44:45.593562
4	2	102	1500	3	t	2026-04-29 12:44:45.599704
5	2	103	1200	2	t	2026-04-29 12:44:45.608673
6	2	104	1200	3	t	2026-04-29 12:44:45.612669
7	2	105	1300	2	t	2026-04-29 12:44:45.616821
8	3	101	1200	2	t	2026-04-29 12:46:04.318487
9	3	102	1500	3	t	2026-04-29 12:46:04.320042
10	3	103	1200	2	t	2026-04-29 12:46:04.323431
11	3	104	1200	3	t	2026-04-29 12:46:04.327136
12	3	105	1300	2	t	2026-04-29 12:46:04.331335
13	4	101	1200	2	t	2026-04-29 12:46:20.310272
14	4	102	1500	3	t	2026-04-29 12:46:20.312255
15	4	103	1200	2	t	2026-04-29 12:46:20.315807
16	4	104	1200	3	t	2026-04-29 12:46:20.320476
17	4	105	1300	2	t	2026-04-29 12:46:20.323711
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, phone, role, is_active, is_verified, created_at, is_deleted, deleted_at, first_name, last_name) FROM stdin;
1	admin1	admin@hotel.com	$2b$12$TcUMHCxFqsy9B/rlIG.oiOiHnjITzmyaICjBc0NM.LvV.U7V1N3f.	01000000000	admin	t	t	2026-04-29 12:36:59.275052	f	\N	admin	admin
2	hazem	hazem0106080@gmail.com	$2b$12$n/giW3V8k4bX89kc4aOk3eI/OAWGCov9Ho7qCtXPkFu1eQ4ceHbE.	01005309722	customer	t	f	2026-04-29 17:25:57.263159	f	\N	hazem	marie
\.


--
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_id_seq', 5, true);


--
-- Name: hotel_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hotel_images_id_seq', 7, true);


--
-- Name: hotels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hotels_id_seq', 4, true);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_seq', 1, false);


--
-- Name: room_amenities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_amenities_id_seq', 34, true);


--
-- Name: room_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_images_id_seq', 10, true);


--
-- Name: rooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rooms_id_seq', 17, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- Name: hotel_images hotel_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotel_images
    ADD CONSTRAINT hotel_images_pkey PRIMARY KEY (id);


--
-- Name: hotels hotels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT hotels_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: room_amenities room_amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_amenities
    ADD CONSTRAINT room_amenities_pkey PRIMARY KEY (id);


--
-- Name: room_images room_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_images
    ADD CONSTRAINT room_images_pkey PRIMARY KEY (id);


--
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- Name: rooms unique_room_per_hotel; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT unique_room_per_hotel UNIQUE (hotel_id, number);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_room_dates; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_room_dates ON public.bookings USING btree (room_id, check_in, check_out);


--
-- Name: ix_bookings_room_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_bookings_room_id ON public.bookings USING btree (room_id);


--
-- Name: ix_bookings_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_bookings_status ON public.bookings USING btree (status);


--
-- Name: ix_bookings_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_bookings_user_id ON public.bookings USING btree (user_id);


--
-- Name: ix_hotels_location; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_hotels_location ON public.hotels USING btree (location);


--
-- Name: ix_hotels_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_hotels_name ON public.hotels USING btree (name);


--
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);


--
-- Name: ix_users_username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_users_username ON public.users USING btree (username);


--
-- Name: bookings bookings_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON DELETE CASCADE;


--
-- Name: bookings bookings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: hotel_images hotel_images_hotel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotel_images
    ADD CONSTRAINT hotel_images_hotel_id_fkey FOREIGN KEY (hotel_id) REFERENCES public.hotels(id) ON DELETE CASCADE;


--
-- Name: payments payments_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE CASCADE;


--
-- Name: payments payments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: room_amenities room_amenities_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_amenities
    ADD CONSTRAINT room_amenities_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON DELETE CASCADE;


--
-- Name: room_images room_images_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_images
    ADD CONSTRAINT room_images_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON DELETE CASCADE;


--
-- Name: rooms rooms_hotel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_hotel_id_fkey FOREIGN KEY (hotel_id) REFERENCES public.hotels(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict fduhr9F0PUpbtuhOZ8fF5KahVdVYp5QVFR2nxHtP9n5agB4D2iwvb8JfZaUm2er

