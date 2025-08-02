import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Package, LayoutDashboard, ShoppingCart, Users, BarChart3, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const navigation = [{
  name: "Dashboard",
  href: "/",
  icon: LayoutDashboard
}, {
  name: "Products",
  href: "/products",
  icon: Package
}, {
  name: "Orders",
  href: "/orders",
  icon: ShoppingCart
}, {
  name: "Settings",
  href: "/settings",
  icon: Settings
}];
export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <div className="min-h-screen bg-dashboard-bg">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <div className={cn("fixed inset-y-0 left-0 z-50 w-64 bg-dashboard-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0", sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
            <h1 className="text-xl font-bold text-white">
              Admin Panel
            </h1>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map(item => {
            const isActive = window.location.pathname === item.href;
            return <a key={item.name} href={item.href} className={cn("flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200", isActive ? "bg-dashboard-sidebarActive text-white shadow-medium" : "text-white/70 hover:text-white hover:bg-white/10")}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </a>;
          })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-white">A</span>
              </div>
              <div className="text-sm">
                <p className="font-medium text-white">Admin User</p>
                <p className="text-white/70">admin@store.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-border">
          <div className="flex h-16 items-center justify-between px-6 bg-slate-500">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-950">
                Welcome back! Ready to manage your store.
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>;
}