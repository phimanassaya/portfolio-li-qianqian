import { supabase, isSupabaseConfigured } from '../lib/supabase';

const BUCKET = 'assets';

/**
 * Fixed object paths inside the "assets" bucket, one per asset type.
 * Each upload overwrites the existing object (upsert), so there is
 * always exactly one current file per key — no database row needed.
 * Add new entries here to support future asset types without touching
 * the upload/URL logic below. Must stay in sync with storage-policies.sql.
 */
const ASSET_PATHS = {
  profile: 'profile/avatar.jpg',
  resume: 'resume/resume.pdf',
  cover: 'cover/cover.jpg'
} as const;

type AssetKey = keyof typeof ASSET_PATHS;

// Stable for the lifetime of the page load, so repeated reads within the
// same session don't bust the browser cache on every render.
const CACHE_BUST = Date.now();

function requireClient() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
}

function getAssetUrl(key: AssetKey): string | null {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(ASSET_PATHS[key]);
  return `${data.publicUrl}?v=${CACHE_BUST}`;
}

async function uploadAsset(key: AssetKey, file: File): Promise<string> {
  const client = requireClient();
  const path = ASSET_PATHS[key];

  const { error } = await client.storage.from(BUCKET).upload(path, file, {
    upsert: true,
    contentType: file.type,
    cacheControl: '3600'
  });

  if (error) throw error;

  const url = getAssetUrl(key);
  if (!url) throw new Error('Upload succeeded but the public URL could not be resolved.');
  return url;
}

export function getProfileImageUrl(): string | null {
  return getAssetUrl('profile');
}

export function getResumeUrl(): string | null {
  return getAssetUrl('resume');
}

export function getCoverImageUrl(): string | null {
  return getAssetUrl('cover');
}

export function uploadProfileImage(file: File): Promise<string> {
  return uploadAsset('profile', file);
}

export function uploadResume(file: File): Promise<string> {
  return uploadAsset('resume', file);
}

export function uploadCoverImage(file: File): Promise<string> {
  return uploadAsset('cover', file);
}
