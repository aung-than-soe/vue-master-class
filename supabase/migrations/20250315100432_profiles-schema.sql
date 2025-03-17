drop table if exists profiles;
TRUNCATE auth.users cascade;

create table profiles(
  id uuid references auth.users on delete cascade not null,
  created_at timestamptz default now() not null,
  username varchar(255) unique not null,
  full_name varchar(255) not null,
  bio text default null,
  mode text default 'dark' not null,
  avatar_url text default null,
  
  primary key (id)
)