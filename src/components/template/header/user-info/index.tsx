"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/template/shadcnblocs/dropdown-menu";
import { UserIcon, SettingsIcon, LogOutIcon } from "./icons";
import { ChevronDown } from "lucide-react";

// ===== TYPE =====
// Si tu veux rendre le composant réutilisable, tu peux lui passer
// les infos de l'utilisateur en props.
// Pour l'instant on garde des valeurs en dur.
type UserInfoProps = {
  prenom?: string;
  nom?: string;
  role?: string;
  initiales?: string;
};

export function UserInfo({
  prenom = "Amani",
  nom = "Koné",
  role = "Administrateur",
  initiales = "AK",
}: UserInfoProps) {
  const router = useRouter();

  // ===== FONCTION DE DÉCONNEXION =====
  // Pour l'instant, redirige vers la page de connexion.
  // Plus tard tu y mettras la logique réelle (effacer le token, etc.)
  const handleLogout = () => {
    // TODO : appeler l'API de déconnexion + effacer le token local
    console.log("Déconnexion...");
    router.push("/connexion/sign-in");
  };

  return (
    <DropdownMenu>
      {/* ===== LE BOUTON DÉCLENCHEUR ===== */}
      <DropdownMenuTrigger className="flex items-center gap-3 rounded-lg p-2 outline-none transition hover:bg-gray-100">
        {/* Cercle avec les initiales */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bni-main)] text-sm font-semibold text-white">
          {initiales}
        </div>

        {/* Nom + rôle */}
        <div className="hidden text-left md:block">
          <p className="text-sm font-semibold text-[#0f2e25]">
            {prenom} {nom}
          </p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>

        {/* Petite flèche pour indiquer que c'est cliquable */}
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </DropdownMenuTrigger>

      {/* ===== LE MENU DÉROULANT ===== */}
      <DropdownMenuContent align="end" className="w-56">
        {/* En-tête avec le nom complet */}
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{prenom} {nom}</span>
            <span className="text-xs font-normal text-gray-500">{role}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Option : Mon profil */}
        <DropdownMenuItem asChild>
          <Link href="/profil" className="flex items-center gap-2 cursor-pointer">
            <UserIcon className="h-4 w-4" />
            Mon profil
          </Link>
        </DropdownMenuItem>

        {/* Option : Paramètres */}
        <DropdownMenuItem asChild>
          <Link href="/parametres" className="flex items-center gap-2 cursor-pointer">
            <SettingsIcon className="h-4 w-4" />
            Paramètres
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Option : Déconnexion */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOutIcon className="h-4 w-4" />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}