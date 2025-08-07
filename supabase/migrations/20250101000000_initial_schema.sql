-- Enable UUID extension (if not already enabled)
create extension if not exists "pgcrypto";
-- Drop and recreate enum types
drop type if exists role_enum cascade;
create type role_enum as enum ('coordinator', 'carer', 'system');
drop type if exists care_event_type_enum cascade;
create type care_event_type_enum as enum (
  'clock_in',
  'clock_out',
  'exercise',
  'medication',
  'bowel_movement'
);
drop type if exists message_status_enum cascade;
create type message_status_enum as enum ('unread', 'acknowledged');
drop type if exists user_event_type_enum cascade;
create type user_event_type_enum as enum (
  'login',
  'logout',
  'login_failed',
  'logout_failed',
  'clock_in',
  'clock_out',
  'create_message',
  'create_message_failed',
  'ack_message',
  'ack_message_failed',
  'create_care_event',
  'create_care_event_failed',
  'get_clock_status_failed',
  'get_care_events_failed',
  'get_message_failed'
);
-- Drop and recreate tables
-- USERS TABLE FIRST
drop table if exists users cascade;
create table users (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  username text unique not null,
  salt text not null,
  password_hash text not null,
  role role_enum not null,
  coordinator_id uuid references users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  deleted_at timestamptz,
  -- Ensure carers have a coordinator, but coordinators and system users don't
  constraint chk_coordinator_required check (
    (
      role = 'carer'
      and coordinator_id is not null
    )
    or (
      role in ('coordinator', 'system')
      and coordinator_id is null
    )
  )
);

-- Trigger function to ensure carer coordinator_id references a coordinator
create or replace function check_carer_coordinator() returns trigger as $$
begin
  if NEW.role = 'carer' then
    if NEW.coordinator_id is null then
      raise exception 'Carer must have a coordinator_id';
    end if;
    if not exists (select 1 from users where id = NEW.coordinator_id and role = 'coordinator') then
      raise exception 'coordinator_id must reference a user with role = coordinator';
    end if;
  end if;
  return NEW;
end;
$$ language plpgsql;

drop trigger if exists trg_check_carer_coordinator on users;
create trigger trg_check_carer_coordinator
  before insert or update on users
  for each row execute function check_carer_coordinator();
-- CARE RECIPIENTS (references users)
drop table if exists care_recipients cascade;
create table care_recipients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  coordinator_id uuid references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  deleted_at timestamptz
);
-- MESSAGES (references users)
drop table if exists messages cascade;
create table messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references users(id) on delete cascade,
  title text,
  body text not null,
  is_broadcast boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  deleted_at timestamptz
);
-- CARE EVENTS (references users)
drop table if exists care_events cascade;
create table care_events (
  id uuid primary key default gen_random_uuid(),
  carer_id uuid not null references users(id) on delete cascade,
  event_type care_event_type_enum not null,
  notes text,
  event_time timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  deleted_at timestamptz
);
-- MESSAGE ACKNOWLEDGEMENTS (references messages, users)
drop table if exists message_acknowledgements cascade;
create table message_acknowledgements (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references messages(id) on delete cascade,
  carer_id uuid not null references users(id) on delete cascade,
  acknowledged_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  deleted_at timestamptz,
  constraint uq_message_acknowledgement unique (message_id, carer_id)
);
-- MESSAGE RECIPIENTS (references messages, users)
drop table if exists message_recipients cascade;
create table message_recipients (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references messages(id) on delete cascade,
  carer_id uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  deleted_at timestamptz,
  constraint uq_message_recipient unique (message_id, carer_id)
);
-- USER EVENT LOGS (references users)
drop table if exists user_event_logs cascade;
create table user_event_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  event_type user_event_type_enum not null,
  created_at timestamptz not null default now(),
  -- Additional text context
  general1 text,
  general2 text,
  general3 text,
  general4 text,
  general5 text,
  -- Rich structured metadata
  metadata1 jsonb,
  metadata2 jsonb,
  metadata3 jsonb,
  metadata4 jsonb,
  metadata5 jsonb
);
-- Drop and recreate indexes
drop index if exists idx_users_username;
create index idx_users_username on users(username);
drop index if exists idx_users_role;
create index idx_users_role on users(role);
drop index if exists idx_users_coordinator;
create index idx_users_coordinator on users(coordinator_id);
drop index if exists idx_care_recipients_coordinator;
create index idx_care_recipients_coordinator on care_recipients(coordinator_id);
drop index if exists idx_care_events_carer;
create index idx_care_events_carer on care_events(carer_id);
drop index if exists idx_care_events_event_type;
create index idx_care_events_event_type on care_events(event_type);
drop index if exists idx_care_events_event_time;
create index idx_care_events_event_time on care_events(event_time);
drop index if exists idx_messages_sender;
create index idx_messages_sender on messages(sender_id);
drop index if exists idx_messages_broadcast;
create index idx_messages_broadcast on messages(is_broadcast);
drop index if exists idx_messages_created;
create index idx_messages_created on messages(created_at);
drop index if exists idx_message_recipients_message;
create index idx_message_recipients_message on message_recipients(message_id);
drop index if exists idx_message_recipients_carer;
create index idx_message_recipients_carer on message_recipients(carer_id);
drop index if exists idx_acknowledgements_message;
create index idx_acknowledgements_message on message_acknowledgements(message_id);
drop index if exists idx_acknowledgements_carer;
create index idx_acknowledgements_carer on message_acknowledgements(carer_id);
drop index if exists idx_user_event_logs_user_id;
create index idx_user_event_logs_user_id on user_event_logs (user_id);
drop index if exists idx_user_event_logs_event_type;
create index idx_user_event_logs_event_type on user_event_logs (event_type);
drop index if exists idx_user_event_logs_created_at;
create index idx_user_event_logs_created_at on user_event_logs (created_at desc);
drop index if exists idx_user_event_logs_user_event_time;
create index idx_user_event_logs_user_event_time on user_event_logs (user_id, event_type, created_at desc);
-- Drop and recreate functions
drop function if exists prevent_user_event_log_modifications() cascade;
create function prevent_user_event_log_modifications() returns trigger
set search_path = pg_catalog as $$ begin raise exception 'Modifications to user_event_logs are not allowed.';
end;
$$ language plpgsql;
-- Drop and recreate triggers
drop trigger if exists no_update_user_event_logs on user_event_logs;
create trigger no_update_user_event_logs before
update on user_event_logs for each row execute function prevent_user_event_log_modifications();
drop trigger if exists no_delete_user_event_logs on user_event_logs;
create trigger no_delete_user_event_logs before delete on user_event_logs for each row execute function prevent_user_event_log_modifications();
-- Drop and recreate views
create or replace view view_message_status_per_carer as
select mr.message_id,
  mr.carer_id,
  u.full_name as carer_name,
  m.sender_id,
  m.title,
  m.body,
  m.is_broadcast,
  m.created_at,
  m.created_at AT TIME ZONE 'Australia/Brisbane' as created_at_brisbane,
  ma.acknowledged_at,
  ma.acknowledged_at AT TIME ZONE 'Australia/Brisbane' as acknowledged_at_brisbane,
  ma.acknowledged_at is not null as is_acknowledged
from message_recipients mr
  join messages m on mr.message_id = m.id
  and m.deleted_at is null
  left join message_acknowledgements ma on mr.message_id = ma.message_id
  and mr.carer_id = ma.carer_id
  and ma.deleted_at is null
  join users u on mr.carer_id = u.id
  and u.deleted_at is null
where mr.deleted_at is null
order by m.created_at desc;
create or replace view view_today_care_events as
select ce.id,
  ce.carer_id,
  u.coordinator_id,
  u.full_name as carer_name,
  ce.event_type,
  ce.notes,
  ce.event_time,
  ce.event_time AT TIME ZONE 'Australia/Brisbane' as event_time_brisbane
from care_events ce
  join users u on ce.carer_id = u.id
  and u.deleted_at is null
where ce.deleted_at is null
  and date_trunc(
    'day',
    ce.event_time at time zone 'Australia/Brisbane'
  ) = date_trunc('day', now() at time zone 'Australia/Brisbane')
order by ce.event_time desc;
create or replace view view_my_clock_status as
select distinct on (ce.carer_id) ce.carer_id,
  u.full_name,
  ce.event_type,
  ce.event_time,
  ce.event_time AT TIME ZONE 'Australia/Brisbane' as event_time_brisbane
from care_events ce
  join users u on ce.carer_id = u.id
  and u.deleted_at is null
where ce.deleted_at is null
  and ce.event_type in ('clock_in', 'clock_out')
order by ce.carer_id,
  ce.event_time desc;
create or replace view view_current_user_profile as
select id,
  username,
  full_name,
  coordinator_id,
  role,
  created_at,
  created_at AT TIME ZONE 'Australia/Brisbane' as created_at_brisbane
from users
where deleted_at is null
order by created_at desc;
create or replace view view_user_event_logs as
select id,
  user_id,
  event_type,
  created_at,
  created_at AT TIME ZONE 'Australia/Brisbane' as created_at_brisbane,
  general1,
  general2,
  general3,
  general4,
  general5,
  metadata1,
  metadata2,
  metadata3,
  metadata4,
  metadata5
from user_event_logs
order by created_at desc;
-- Function to get messages for a specific carer
drop function if exists get_my_messages(uuid);
create function get_my_messages(carer_id_param uuid) returns table (
  carer_id uuid,
  message_id uuid,
  title text,
  body text,
  is_broadcast boolean,
  sent_at timestamptz,
  sent_at_brisbane timestamptz,
  status text,
  acknowledged_at timestamptz,
  acknowledged_at_brisbane timestamptz
) as $$ begin return query
select mr.carer_id,
  m.id as message_id,
  m.title,
  m.body,
  m.is_broadcast,
  m.created_at::timestamptz as sent_at,
  (m.created_at AT TIME ZONE 'Australia/Brisbane')::timestamptz as sent_at_brisbane,
  case
    when ma.acknowledged_at is null then 'unread'
    else 'acknowledged'
  end as status,
  ma.acknowledged_at::timestamptz as acknowledged_at,
  (
    ma.acknowledged_at AT TIME ZONE 'Australia/Brisbane'
  )::timestamptz as acknowledged_at_brisbane
from message_recipients mr
  join messages m on mr.message_id = m.id
  and m.deleted_at is null
  left join message_acknowledgements ma on mr.message_id = ma.message_id
  and mr.carer_id = ma.carer_id
  and ma.deleted_at is null
where mr.deleted_at is null
  and mr.carer_id = carer_id_param;
end;
$$ language plpgsql;