"use client";

import { UserInfo } from "@/components/template/header/user-info";

export default function BniNavbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
      {/* ===== ZONE GAUCHE : Titre ===== */}
      <div>
        <p className="text-sm font-medium text-gray-700">Espace administrateur</p>
      </div>

      {/* ===== ZONE DROITE : Recherche + Notifications + UserInfo ===== */}
      <div className="flex items-center gap-4">
        {/* UserInfo (cercle initiales + menu déroulant) */}
        <UserInfo
          prenom="prenom"
          nom="nom"
          role="fonction"
          initiales="PN"
        />
      </div>
    </header>
  );
}