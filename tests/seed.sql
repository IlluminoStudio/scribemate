TRUNCATE TABLE users RESTART IDENTITY CASCADE;
insert into users (id, full_name, username, salt, password_hash, role, coordinator_id, created_at)
values
  ('11111111-1111-1111-1111-111111111111', 'Don Smith', 'coordinator1', 'coordinator1_salt_2024', '$2a$12$LdA.qgrNwwp.obhMALT8ReM5qkwBU2SRg/Wvor0sIT9zLuKNLSR.G', 'coordinator', null, now()),
  ('22222222-2222-2222-2222-222222222222', 'Emily Davis', 'carer1', 'carer1_salt_2024', '$2a$12$iMM7NaQX7KEZLufQOOHCT.2mhwzOv907nmhWuyYwB.WowuQYObJ.i', 'carer', '11111111-1111-1111-1111-111111111111', now()),
  ('33333333-3333-3333-3333-333333333333', 'Jake Miller', 'carer2', 'carer2_salt_2024', '$2a$12$tw4aFxkMiQDqqyDf53pRF.wRKNjkqS5/YWg6liNiQ5CNhq0fEIRpW', 'carer', '11111111-1111-1111-1111-111111111111', now()),
  ('44444444-4444-4444-4444-444444444444', 'Kate Jones', 'coordinator2', 'coordinator2_salt_2024', '$2a$12$1HlTU/rZ/L9krAlQzLp41uNZ9etUv01MMdrnclz.jhf5dwazSPGmO', 'coordinator', null, now()),
  ('55555555-5555-5555-5555-555555555555', 'Sarah Wilson', 'carer3', 'carer3_salt_2024', '$2a$12$1fPSDl1BN8XMjeXzwa1lDekD9rtqlAWzY83f3xMhFyqbwCBDT9lKe', 'carer', '11111111-1111-1111-1111-111111111111', now()),
  ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'System Admin', 'admin', 'admin_salt_2024', '$2a$12$9N9xjlejYuLELhobVvY3n.qsszBTFoX10oe4iLj9Kjt3l5iVHlRly', 'system', null, now()); 