-- Password: 'password123'
-- Each user has a unique salt, and the password_hash is generated from salt + password

-- USERS
insert into users (id, full_name, username, salt, password_hash, role, coordinator_id, created_at)
values 
  ('11111111-1111-1111-1111-111111111111', 'Don Smith', 'don', 'don_salt_2024', '$2a$12$.eVic4mT39NEQJJvsRW/Y.hsY8CtfMLPiGek2lqBiQpiJts0DZ4Ca', 'coordinator', null, now()),
  ('22222222-2222-2222-2222-222222222222', 'Emily Davis', 'emily', 'emily_salt_2024', '$2a$12$lC.pL6T/b78cP5AdpzkGOeZ/wfI8pDilLQaiv4hqEQOjpCmAHriGa', 'carer', '11111111-1111-1111-1111-111111111111', now()),
  ('33333333-3333-3333-3333-333333333333', 'Jake Miller', 'jake', 'jake_salt_2024', '$2a$12$gnJGYSU5R5sseP7zBEuO.OHvujpCmgonikBzpW5DHvAF8jIj0iUbS', 'carer', '11111111-1111-1111-1111-111111111111', now()),
  ('44444444-4444-4444-4444-444444444444', 'Kate Jones', 'kate', 'kate_salt_2024', '$2a$12$tF13Ddz/AtTEJAmNatfoD.eAUUEGkcSQg5HvztwV1PsW7HNLtA.sm', 'coordinator', null, now()),
  ('55555555-5555-5555-5555-555555555555', 'Sarah Wilson', 'sarah', 'sarah_salt_2024', '$2a$12$Srv9Gc3OWE4HZt/iAVmqFuNz9SYutA6vwQs1dg1SbAKDtk9X/SE.S', 'carer', '11111111-1111-1111-1111-111111111111', now()),
  ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'System Admin', 'admin', 'admin_salt_2024', '$2a$12$UvLpq3DgwmrGvXb37tWz7.9ImpBLM/9aUCwIz0dcOjK8Cxi2PM7Me', 'system', null, now()); 

-- CARE RECIPIENT
insert into care_recipients (id, full_name, coordinator_id, created_at)
values 
  ('44444444-4444-4444-4444-444444444444', 'Doris Walker', '11111111-1111-1111-1111-111111111111', now());

-- CARE EVENTS (Today's events with realistic time intervals)
insert into care_events (id, carer_id, event_type, notes, event_time, created_at)
values
  -- Emily's morning shift (8am - 2pm)
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 'clock_in', 'Morning shift begins', now() - interval '6 hours', now() - interval '6 hours'),
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 'medication', 'Morning medication administered', now() - interval '5 hours 30 minutes', now() - interval '5 hours 30 minutes'),
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 'exercise', 'Morning stretching routine', now() - interval '4 hours', now() - interval '4 hours'),
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 'clock_out', 'Morning shift completed', now() - interval '2 hours', now() - interval '2 hours'),

  -- Jake's afternoon shift (2pm - 8pm)
  (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', 'clock_in', 'Afternoon shift begins', now() - interval '2 hours', now() - interval '2 hours'),
  (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', 'medication', 'Afternoon medication given', now() - interval '1 hour 30 minutes', now() - interval '1 hour 30 minutes'),
  (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', 'exercise', 'Afternoon walk in garden', now() - interval '45 minutes', now() - interval '45 minutes'),
  (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', 'clock_out', 'Afternoon shift completed', now() - interval '15 minutes', now() - interval '15 minutes');

-- MESSAGES
insert into messages (id, sender_id, title, body, is_broadcast, created_at)
values 
  ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '11111111-1111-1111-1111-111111111111', 'Shift Reminder', 'Please remember to clock in by 8am daily.', true, now() - interval '1 day'),
  ('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '11111111-1111-1111-1111-111111111111', 'Patient Notes', 'Doris had difficulty sleeping, please monitor tonight.', false, now()),
  ('aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3', '11111111-1111-1111-1111-111111111111', 'New Policy Update', 'Please review the new care policy document.', true, now()),
  ('aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4', '11111111-1111-1111-1111-111111111111', 'Private Feedback', 'Please see me after your shift for feedback.', false, now());

-- MESSAGE RECIPIENTS
insert into message_recipients (message_id, carer_id, created_at)
values 
  ('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '22222222-2222-2222-2222-222222222222', now()),
  ('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '33333333-3333-3333-3333-333333333333', now()),
  ('aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4', '22222222-2222-2222-2222-222222222222', now()),
  ('aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4', '33333333-3333-3333-3333-333333333333', now());

-- MESSAGE ACKNOWLEDGEMENTS
insert into message_acknowledgements (message_id, carer_id, acknowledged_at, created_at)
values 
  ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '22222222-2222-2222-2222-222222222222', now() - interval '23 hours', now() - interval '23 hours'),
  ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '33333333-3333-3333-3333-333333333333', now() - interval '20 hours', now() - interval '20 hours'),
  ('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '22222222-2222-2222-2222-222222222222', now() - interval '1 hour', now() - interval '1 hour');
