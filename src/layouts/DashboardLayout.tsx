import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../components/ui/sidebar";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { Toaster } from "../components/ui/toaster";
import { useEffect } from "react";
import countryFounder from "../utils/countryFinder";

export default function DashboardLayout() {

  useEffect(() => {
    // countryFounder().then((data) => console.log(data))
  }, [])

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="bg-bg text-text text-lg h-screen w-screen box-border p-10 font-base " >
        <Outlet />
      </main>
      <Toaster />
    </SidebarProvider>
  )
}
