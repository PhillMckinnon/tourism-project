--
-- PostgreSQL database dump
--

-- Dumped from database version 15.10 (Debian 15.10-0+deb12u1)
-- Dumped by pg_dump version 15.10 (Debian 15.10-0+deb12u1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bookings; Type: TABLE; Schema: public; Owner: tourism_user
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    client_id integer NOT NULL,
    tour_id integer NOT NULL,
    booking_date timestamp with time zone NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.bookings OWNER TO tourism_user;

--
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: tourism_user
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bookings_id_seq OWNER TO tourism_user;

--
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tourism_user
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: tourism_user
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(255),
    password_hash character varying(255) NOT NULL,
    is_admin boolean DEFAULT false,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    is_manager boolean DEFAULT false
);


ALTER TABLE public.clients OWNER TO tourism_user;

--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: tourism_user
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clients_id_seq OWNER TO tourism_user;

--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tourism_user
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: countries; Type: TABLE; Schema: public; Owner: tourism_user
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    currency_code character varying(255) NOT NULL,
    language_code character varying(255) NOT NULL,
    region_code character varying(255) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.countries OWNER TO tourism_user;

--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: tourism_user
--

CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.countries_id_seq OWNER TO tourism_user;

--
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tourism_user
--

ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;


--
-- Name: tours; Type: TABLE; Schema: public; Owner: tourism_user
--

CREATE TABLE public.tours (
    id integer NOT NULL,
    country_id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    price numeric NOT NULL,
    departure_date timestamp with time zone NOT NULL,
    return_date timestamp with time zone NOT NULL,
    available boolean NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.tours OWNER TO tourism_user;

--
-- Name: tours_id_seq; Type: SEQUENCE; Schema: public; Owner: tourism_user
--

CREATE SEQUENCE public.tours_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tours_id_seq OWNER TO tourism_user;

--
-- Name: tours_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tourism_user
--

ALTER SEQUENCE public.tours_id_seq OWNED BY public.tours.id;


--
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);


--
-- Name: tours id; Type: DEFAULT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.tours ALTER COLUMN id SET DEFAULT nextval('public.tours_id_seq'::regclass);


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: tourism_user
--

COPY public.bookings (id, client_id, tour_id, booking_date, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: tourism_user
--

COPY public.clients (id, first_name, last_name, email, phone, password_hash, is_admin, created_at, updated_at, is_manager) FROM stdin;
11	Admin	Admin	admin@gmail.com	555-555	$2b$10$PXH/YKguHdPkFWjm27ZaPeGHGCBCzLPhRthHQhqCD1H5s/fzQPoIu	t	2025-02-04 18:41:20.179+00	2025-02-04 18:41:20.179+00	f
7	not-admin	not-admin	notadmin@gmail.com	666-666-7	$2b$10$.yZK63yVtOv2T93WId3xAuM/16ctZy6vk8K81pB6y121RxvEsJv4q	f	2025-01-30 04:02:19.591+00	2025-02-04 18:46:56.976+00	f
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: tourism_user
--

COPY public.countries (id, name, currency_code, language_code, region_code, created_at, updated_at) FROM stdin;
3	China	CNY	ZH-CN	ASIA	2025-01-31 10:14:39.346+00	2025-02-04 18:36:22.063+00
1	USA	USD	EN	NA	2025-01-30 16:38:36.553+00	2025-02-04 18:36:29.777+00
2	Hungary	HUF	HU	EU	2025-01-31 09:15:58.432+00	2025-02-04 18:47:28.227+00
\.


--
-- Data for Name: tours; Type: TABLE DATA; Schema: public; Owner: tourism_user
--

COPY public.tours (id, country_id, name, description, price, departure_date, return_date, available, created_at, updated_at) FROM stdin;
1	1	USA culture	American culture tour	10000	2025-01-08 00:00:00+00	2025-01-26 00:00:00+00	t	2025-01-30 21:06:03.184+00	2025-02-04 18:32:03.833+00
2	2	Hungary culture	Hungarian culture tour	9000	2025-02-14 00:00:00+00	2025-02-21 00:00:00+00	t	2025-01-31 10:03:55.379+00	2025-02-04 18:32:29.567+00
3	3	China culture	Chinese culture tour	13000	2025-02-27 00:00:00+00	2025-02-28 00:00:00+00	f	2025-01-31 10:15:25.244+00	2025-02-04 18:44:07.472+00
\.


--
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tourism_user
--

SELECT pg_catalog.setval('public.bookings_id_seq', 21, true);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tourism_user
--

SELECT pg_catalog.setval('public.clients_id_seq', 11, true);


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tourism_user
--

SELECT pg_catalog.setval('public.countries_id_seq', 3, true);


--
-- Name: tours_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tourism_user
--

SELECT pg_catalog.setval('public.tours_id_seq', 3, true);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- Name: clients clients_email_key; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key UNIQUE (email);


--
-- Name: clients clients_email_key1; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key1 UNIQUE (email);


--
-- Name: clients clients_email_key10; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key10 UNIQUE (email);


--
-- Name: clients clients_email_key11; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key11 UNIQUE (email);


--
-- Name: clients clients_email_key12; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key12 UNIQUE (email);


--
-- Name: clients clients_email_key13; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key13 UNIQUE (email);


--
-- Name: clients clients_email_key14; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key14 UNIQUE (email);


--
-- Name: clients clients_email_key15; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key15 UNIQUE (email);


--
-- Name: clients clients_email_key16; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key16 UNIQUE (email);


--
-- Name: clients clients_email_key17; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key17 UNIQUE (email);


--
-- Name: clients clients_email_key18; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key18 UNIQUE (email);


--
-- Name: clients clients_email_key19; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key19 UNIQUE (email);


--
-- Name: clients clients_email_key2; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key2 UNIQUE (email);


--
-- Name: clients clients_email_key20; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key20 UNIQUE (email);


--
-- Name: clients clients_email_key21; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key21 UNIQUE (email);


--
-- Name: clients clients_email_key22; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key22 UNIQUE (email);


--
-- Name: clients clients_email_key23; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key23 UNIQUE (email);


--
-- Name: clients clients_email_key24; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key24 UNIQUE (email);


--
-- Name: clients clients_email_key25; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key25 UNIQUE (email);


--
-- Name: clients clients_email_key26; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key26 UNIQUE (email);


--
-- Name: clients clients_email_key27; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key27 UNIQUE (email);


--
-- Name: clients clients_email_key28; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key28 UNIQUE (email);


--
-- Name: clients clients_email_key29; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key29 UNIQUE (email);


--
-- Name: clients clients_email_key3; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key3 UNIQUE (email);


--
-- Name: clients clients_email_key30; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key30 UNIQUE (email);


--
-- Name: clients clients_email_key31; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key31 UNIQUE (email);


--
-- Name: clients clients_email_key32; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key32 UNIQUE (email);


--
-- Name: clients clients_email_key4; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key4 UNIQUE (email);


--
-- Name: clients clients_email_key5; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key5 UNIQUE (email);


--
-- Name: clients clients_email_key6; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key6 UNIQUE (email);


--
-- Name: clients clients_email_key7; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key7 UNIQUE (email);


--
-- Name: clients clients_email_key8; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key8 UNIQUE (email);


--
-- Name: clients clients_email_key9; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key9 UNIQUE (email);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: tours tours_pkey; Type: CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.tours
    ADD CONSTRAINT tours_pkey PRIMARY KEY (id);


--
-- Name: bookings bookings_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id) ON UPDATE CASCADE;


--
-- Name: bookings bookings_tour_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES public.tours(id) ON UPDATE CASCADE;


--
-- Name: tours tours_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tourism_user
--

ALTER TABLE ONLY public.tours
    ADD CONSTRAINT tours_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(id) ON UPDATE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO tourism_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES  TO tourism_user;


--
-- PostgreSQL database dump complete
--

