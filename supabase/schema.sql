create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  report_id text not null unique,
  email text,
  answers jsonb not null,
  f_text_inputs jsonb,
  full_report jsonb,
  summary text,
  model_used text,
  prompt_version text,
  created_at timestamptz not null default now()
);

create index if not exists reports_report_id_idx on reports (report_id);

-- No public policies: the app only talks to this table from server-side
-- routes using the service_role key, which bypasses RLS. Enabling RLS
-- with zero policies means an anon/public key (if ever exposed) gets
-- nothing.
alter table reports enable row level security;
