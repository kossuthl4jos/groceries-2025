const TOKEN_KEY = 'tokens';

export function getToken(): { userKey: string; userName: string } | null {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token != null) {
    const { userKey, userName } = JSON.parse(token);
    return { userKey, userName };
  } else {
    return null;
  }
}

export function setToken({ userKey, userName }: { userKey: string; userName: string }): void {
  localStorage.setItem(TOKEN_KEY, JSON.stringify({ userKey, userName }));
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}
