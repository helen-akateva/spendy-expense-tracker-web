export async function checkServerSession(origin: string, cookieHeader: string) {
  const res = await fetch(`${origin}/api/auth/refresh`, {
    method: "POST",
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res;
}
