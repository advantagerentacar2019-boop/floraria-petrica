create table if not exists appointments (
  id text primary key,
  service_id text not null,
  client_name text not null,
  client_phone text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'confirmed',
  notes text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists appointments_starts_at_idx on appointments (starts_at);
create index if not exists appointments_status_idx on appointments (status);
