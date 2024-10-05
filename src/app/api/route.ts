export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res?.access_token;
  if (!sessionToken) {
    return Response.json({ status: 401, message: "Unauthorized" });
  }
  return Response.json(
    { res },
    { status: 200, headers: { "Set-Cookie": `sessionToken=${sessionToken}` } }
  );
}
