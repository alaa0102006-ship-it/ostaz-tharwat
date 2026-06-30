-- profiles table
create table profiles (
  id uuid references auth.users primary key,
  name text not null,
  email text not null,
  phone text,
  grade text,
  role text default 'student',
  is_active boolean default false,
  created_at timestamp default now()
);

-- courses table
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  grade text not null,
  created_at timestamp default now()
);

-- lessons table
create table lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  title text not null,
  youtube_id text not null,
  order_num int default 1,
  created_at timestamp default now()
);

-- video tokens table
create table video_tokens (
  id uuid primary key default gen_random_uuid(),
  token text not null,
  user_id uuid references auth.users,
  lesson_id uuid references lessons(id),
  expires_at timestamp not null,
  created_at timestamp default now()
);

-- RLS Policies
alter table profiles enable row level security;
alter table courses enable row level security;
alter table lessons enable row level security;

create policy "Users see own profile" on profiles for select using (auth.uid() = id);
create policy "Users update own profile" on profiles for update using (auth.uid() = id);
create policy "Active students see courses" on courses for select using (
  exists (select 1 from profiles where id = auth.uid() and is_active = true)
);
create policy "Active students see lessons" on lessons for select using (
  exists (select 1 from profiles where id = auth.uid() and is_active = true)
);
