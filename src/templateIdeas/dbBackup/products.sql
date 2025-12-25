create table public.products (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  name text not null,
  default_image text null,
  images text null,
  price double precision null,
  sale_price double precision null,
  description text null,
  sale boolean not null default false,
  attributes text null,
  details text null,
  status text not null default 'pending'::text,
  weight double precision not null default '0'::double precision,
  materials text null,
  stock bigint not null default '0'::bigint,
  constraint products_pkey primary key (id)
) TABLESPACE pg_default;