"use client";

export default function EditorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="studio-content" style={{ padding: 32 }}>
      <h1 style={{ fontSize: 18, marginBottom: 8 }}>Editor failed to load</h1>
      <p className="studio-error">{error.message}</p>
      <button type="button" className="studio-btn studio-btn-secondary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
