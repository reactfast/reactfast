create table public.files (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  file_name text null,
  ref text null,
  folder_id uuid null,
  user_id uuid not null default auth.uid (),
  constraint files_pkey primary key (id),
  constraint files_folder_id_fkey foreign KEY (folder_id) references folders (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;