create table public.forum_replies (
  id uuid not null default gen_random_uuid (),
  "user" uuid null,
  content text null,
  parent uuid null,
  created_at timestamp with time zone not null default now(),
  forum_post bigint not null,
  constraint forum_replies_pkey primary key (id),
  constraint forum_replies_forum_post_fkey foreign KEY (forum_post) references forum_posts (id) on update CASCADE on delete CASCADE,
  constraint forum_replies_parent_fkey foreign KEY (parent) references forum_replies (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;