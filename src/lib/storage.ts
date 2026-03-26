import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/env";

export function resolveStoragePublicUrl(
  bucket: string,
  storagePath?: string | null,
) {
  if (!storagePath) {
    return null;
  }

  if (storagePath.startsWith("http://") || storagePath.startsWith("https://")) {
    return storagePath;
  }

  if (storagePath.startsWith("/")) {
    return storagePath;
  }

  if (!isSupabaseConfigured()) {
    return null;
  }

  const env = getSupabaseEnv();
  return `${env.url}/storage/v1/object/public/${bucket}/${storagePath}`;
}

export function buildRoomStoragePath(roomId: string, fileName: string) {
  const sanitized = fileName.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  return `rooms/${roomId}/${Date.now()}-${sanitized}`;
}
