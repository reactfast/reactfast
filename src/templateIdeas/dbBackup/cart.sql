create table public.cart (
  id uuid not null default gen_random_uuid (),
  user_id uuid null,
  guest_id uuid null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  product_id uuid not null,
  price double precision not null,
  constraint cart_pkey primary key (id)
) TABLESPACE pg_default;