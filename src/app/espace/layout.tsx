import BniSidebar from "@/components/personnalises/BniSidebar";
import BniNavbar from "@/components/personnalises/BniNavbar";
import type { PropsWithChildren } from "react";

export default function EspaceLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR À GAUCHE (fixe) */}
      <BniSidebar />

      {/* CONTENU PRINCIPAL À DROITE */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* NAVBAR EN HAUT */}
        <BniNavbar />

        {/* ZONE DE CONTENU SCROLLABLE */}
      <main className="flex-1 overflow-y-auto p-8 bg-[#BAD1BA/10]">
  {children}
      </main>
      </div>
    </div>
  );
}