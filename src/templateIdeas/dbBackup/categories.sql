create table public.categories (
  id uuid not null default gen_random_uuid (),
  name text not null,
  parent_category uuid null,
  created_at timestamp with time zone not null default now(),
  description text null,
  constraint categories_pkey primary key (id)
) TABLESPACE pg_default;