create table public.folders (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  parent_folder uuid null,
  name text null,
  status text null default 'active'::text,
  user_id uuid not null default auth.uid (),
  constraint folders_pkey primary key (id),
  constraint folders_parent_folder_fkey foreign KEY (parent_folder) references folders (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;