export function AdminNotice({
  notice,
  error,
}: {
  notice?: string;
  error?: string;
}) {
  if (!notice && !error) {
    return null;
  }

  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm ${
        error
          ? "border-destructive/40 bg-destructive/5 text-destructive"
          : "border-primary/30 bg-primary/5 text-foreground"
      }`}
    >
      {error ?? notice}
    </div>
  );
}
