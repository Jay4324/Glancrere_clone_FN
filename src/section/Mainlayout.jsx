import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";

export default function Layout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="relative top-96">

        <SidebarTrigger  className="hidden md:block"/>
        </div>
        <main className="w-full bg-white">
        
          
          

          <Navbar />
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
}
