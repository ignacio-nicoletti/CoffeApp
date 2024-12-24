import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import DashboardUser from "../src/views/dashBoardView/dashboardUser";
import DashboardBarista from "../src/views/dashBoardView/dashboardBarista";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main className="relative flex flex-col r  w-full bg-[--background] min-h-screen  gap-10">
      {session?.user.role === 1 ? <DashboardUser /> : <DashboardBarista />}
    </main>
  );
}
