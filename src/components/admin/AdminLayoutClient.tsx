"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayoutClient({
  children
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, never show the admin sidebar or header
  const isLoginPage = pathname === "/admin/login";

  // Check authentication for protected admin pages
  useEffect(() => {
    if (isLoginPage) {
      setIsAuthenticated(false);
      return;
    }

    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Unauthenticated");
      })
      .then((data) => {
        if (data?.authenticated && data?.user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.replace(`/admin/login?from=${encodeURIComponent(pathname)}`);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        router.replace(`/admin/login?from=${encodeURIComponent(pathname)}`);
      });
  }, [pathname, isLoginPage, router]);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Handle escape key to close sidebar on mobile
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen]);

  // Lock body scroll when mobile sidebar drawer is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // On login page: render only the clean login view with NO sidebar or admin header
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 antialiased relative">
      {/* Mobile Drawer Backdrop - only when authenticated */}
      {isAuthenticated && sidebarOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close sidebar menu"
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setSidebarOpen(false);
          }}
        />
      )}

      {/* Admin Sidebar Container - strictly visible only when authenticated */}
      {isAuthenticated && (
        <div
          className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-slate-900 transition-transform duration-300 ease-in-out lg:static lg:w-64 lg:z-auto lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          }`}
        >
          <AdminSidebar onClose={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content Area - children segment is always rendered for instant navigation */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {isAuthenticated && (
          <AdminHeader onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        )}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
