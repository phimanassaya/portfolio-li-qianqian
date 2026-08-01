-- Storage policies for the "assets" bucket
-- CLIENT_ID: li-qianqian
-- Apply in Supabase Dashboard -> SQL Editor. Not executed automatically.
-- Bucket must already exist and be set to Public before running this.
--
-- Architecture: one independent Supabase project per client -- NOT a shared
-- multi-tenant bucket. Every deployment uses this identical file; only the
-- CLIENT_ID label above changes per customer project. Because each project
-- only ever holds one client's files, the storage paths themselves do not
-- need a per-client folder segment -- exact-matching the three known asset
-- paths is already the tightest possible policy.
--
-- Structure:
-- assets/
--   profile/
--     avatar.jpg
--   resume/
--     resume.pdf
--   cover/
--     cover.jpg

-- 1. Public read access to the assets bucket
create policy "Public read access - assets bucket"
on storage.objects for select
to public
using (bucket_id = 'assets');

-- 2. Allow new uploads, restricted to exactly these three known asset paths
create policy "Allow asset uploads - profile, resume, and cover only"
on storage.objects for insert
to anon
with check (
  bucket_id = 'assets'
  and name in (
    'profile/avatar.jpg',
    'resume/resume.pdf',
    'cover/cover.jpg'
  )
);

-- 3. Allow overwriting those same three paths (needed for upsert on replace)
create policy "Allow asset overwrites - profile, resume, and cover only"
on storage.objects for update
to anon
using (
  bucket_id = 'assets'
  and name in (
    'profile/avatar.jpg',
    'resume/resume.pdf',
    'cover/cover.jpg'
  )
)
with check (
  bucket_id = 'assets'
  and name in (
    'profile/avatar.jpg',
    'resume/resume.pdf',
    'cover/cover.jpg'
  )
);
