// Only allow same-site relative paths, never "//evil.com", "/\evil.com" or "@evil.com".
export function safeNext(next: string | null | undefined): string {
  return next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\") ? next : "/";
}
