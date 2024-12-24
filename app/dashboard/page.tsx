import { useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import DashboardUser from "../src/views/dashBoardView/dashboardUser";
import DashboardBarista from "../src/views/dashBoardView/dashboardBarista";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main className="w-screen h-screen flex p-0 m-0">
      {session?.user.role === 1 ? <DashboardUser /> : <DashboardBarista />}
    </main>
  );
}
