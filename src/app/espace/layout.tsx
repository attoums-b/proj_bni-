import BniSidebar from "@/components/personnalises/BniSidebar";
import BniNavbar from "@/components/personnalises/BniNavbar";
import type { PropsWithChildren } from "react";

export default function EspaceLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen bg-gray-50">
      <BniSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <BniNavbar />
        
      <main className="flex-1 overflow-y-auto p-8 bg-[#BAD1BA/10]">
  {children}
      </main>
      </div>
    </div>
  );
}