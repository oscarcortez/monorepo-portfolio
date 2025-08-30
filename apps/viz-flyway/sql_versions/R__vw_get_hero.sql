DROP VIEW IF EXISTS vw_get_hero;

create view
  vw_get_hero as
select
  u."name",
  u.email,
  hg.title as greeting_title,
  hg."content" as greeting_content,
  hg.footer as greeting_footer
from
  users u
  join hero_greetings hg on u.user_id = hg.user_id
where
  u."uuid" = 'c8988785-25db-4a86-add3-9b6873ff131b'
  and u.deleted_at is null
  and hg."language" = 'en';