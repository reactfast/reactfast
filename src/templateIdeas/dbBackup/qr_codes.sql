create table public.qr_codes (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  img_ref text not null,
  redirect_url text not null default 'https://jot.cards/register-qr'::text,
  status text not null default 'not printed'::text,
  user_id uuid null,
  kind text null default ''::text,
  page bigint null,
  name text null,
  constraint qr_codes_pkey primary key (id),
  constraint qr_codes_page_fkey foreign KEY (page) references pages (id) on delete CASCADE,
  constraint qr_codes_user_id_fkey foreign KEY (user_id) references profiles (id)
) TABLESPACE pg_default;