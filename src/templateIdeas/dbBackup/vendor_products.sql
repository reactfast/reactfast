create table public.vendor_products (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  user_id uuid not null,
  name text not null,
  default_image text null,
  images text null,
  description text null,
  price double precision not null default '0'::double precision,
  details text null,
  status text null default 'draft'::text,
  weight double precision null,
  stock bigint null,
  materials text null,
  parent uuid null,
  constraint vendor_products_pkey primary key (id),
  constraint vendor_products_parent_fkey foreign KEY (parent) references products (id) on update CASCADE on delete CASCADE,
  constraint vendor_products_user_id_fkey foreign KEY (user_id) references profiles (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;