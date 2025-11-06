import { getServerSession } from "next-auth/next";
import { authOption } from "../api/auth/[...nextauth]/route";

export default async function TestPage() {
  const session = await getServerSession(authOption);

  if (!session) return <p>No session detected</p>;

  return (
    <div>
      <h1>Session Active!</h1>
      <p>User: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
    </div>
  );
}
