import type { Metadata } from "next";
import NextSessionProvider from "../src/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../src/components/ui/sidebar";
import { AppSidebar } from "../src/components/sidebar/appsidebar";


export const metadata: Metadata = {
  title: "Dashboard",
  description: "CRM para gestion interna",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <NextSessionProvider session={session}>
            
            <SidebarProvider>
              <AppSidebar  session={session} />
               <SidebarInset> 
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 ">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    Colapsar menú
                  </div>
                </header>
                <section className="p-5 xl:p-10 bg-[#DDE9F3]/30">{children}</section>
               </SidebarInset> 
            </SidebarProvider>
       
     
      </NextSessionProvider>
    );
  } else {
    redirect("/");
  }
}