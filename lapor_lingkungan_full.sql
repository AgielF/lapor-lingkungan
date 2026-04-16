--
-- PostgreSQL database dump
--

\restrict dh88uPMJZnlQoLPOxZYOAJduIVWSjFAhORSJsj6aXndfV3RtYzl9W1HNsEKuCNE

-- Dumped from database version 17.9 (Ubuntu 17.9-0ubuntu0.25.10.1)
-- Dumped by pg_dump version 17.9 (Ubuntu 17.9-0ubuntu0.25.10.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: laporans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.laporans (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    kategori character varying(100) NOT NULL,
    latitude numeric NOT NULL,
    longitude numeric NOT NULL,
    foto_url character varying(255),
    status character varying(50) DEFAULT 'Terkirim'::character varying,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.laporans OWNER TO postgres;

--
-- Name: laporans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.laporans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.laporans_id_seq OWNER TO postgres;

--
-- Name: laporans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.laporans_id_seq OWNED BY public.laporans.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    nama character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'warga'::character varying,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
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
-- Name: laporans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laporans ALTER COLUMN id SET DEFAULT nextval('public.laporans_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: laporans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.laporans (id, user_id, kategori, latitude, longitude, foto_url, status, created_at, updated_at, deleted_at) FROM stdin;
1	1	Jalan Rusak	-6.9147	107.6098	uploads/1775892974_Screenshot From 2026-02-17 21-34-54.png	Terkirim	2026-04-11 14:36:14.689942+07	2026-04-11 14:36:14.689942+07	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, nama, email, password, role, created_at, updated_at, deleted_at) FROM stdin;
1	Budi Santoso	budi@gmail.com	$2a$10$PBtvE6S7VD3nAAOBWiov5OmDs07PXq/vioO9qG1p4742mQmB2CuZm	warga	2026-04-09 20:05:54.709242+07	2026-04-09 20:05:54.709242+07	\N
2	Super Admin	admin@puskesmas.com	$2a$10$vlxcpi7JOIZcklqso48Ew.U2yKrnzrdy0fyYc.IP6MArtFU1cnBxK	admin	2026-04-11 15:02:46.132044+07	2026-04-11 15:02:46.132044+07	\N
\.


--
-- Name: laporans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.laporans_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: laporans laporans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laporans
    ADD CONSTRAINT laporans_pkey PRIMARY KEY (id);


--
-- Name: users uni_users_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uni_users_email UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_laporans_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_laporans_deleted_at ON public.laporans USING btree (deleted_at);


--
-- Name: idx_users_deleted_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_deleted_at ON public.users USING btree (deleted_at);


--
-- PostgreSQL database dump complete
--

\unrestrict dh88uPMJZnlQoLPOxZYOAJduIVWSjFAhORSJsj6aXndfV3RtYzl9W1HNsEKuCNE

