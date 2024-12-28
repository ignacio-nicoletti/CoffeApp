import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import DashboardUser from "../src/views/dashBoardView/dashboardUser";
import DashboardBarista from "../src/views/dashBoardView/dashboardBarista";
import { getMockData } from "../src/server-actions/getMocks";

export default async function Page() {
  const session = await getServerSession(authOptions);
const mocks = await getMockData();

  return (
    <main className="relative flex flex-col r  w-full bg-[--background] min-h-screen  gap-10">
      {session?.user.role === 1 ? <DashboardUser /> : <DashboardBarista mocks={mocks}/>}
    </main>
  );
}
