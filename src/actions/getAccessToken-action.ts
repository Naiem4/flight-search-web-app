
export const getAccessToken = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.AMADEUS_API_KEY!,
      client_secret: process.env.AMADEUS_API_SECRET!,
    }),
  });
  if (!response.ok) {
    throw await response.json();
  }
  const data = await response.json();
  return data.access_token;
};
