// /app/(public)/layout.tsx
import React from "react";
import SideBar from "../../components/SideBarComponent";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/ui/toaster";

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ViewTransitions>
      <div className="flex min-h-screen">
        <SideBar />
        <main className="flex-1 overflow-auto">
          <div className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-4 lg:h-[60px]">
            <div className="flex-1">
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
          </div>
          <div className="container mx-auto p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
      <Toaster />
    </ViewTransitions>
  );
};

export default PublicLayout;
