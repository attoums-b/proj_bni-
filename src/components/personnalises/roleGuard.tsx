"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth, RoleName } from "@/lib/auth-context";

interface RoleGuardProps {
  allowedRoles: RoleName[];
  children: React.ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter();
  const { user, loading, hasRole } = useAuth();

  useEffect(() => {
    // Attendre la fin du chargement
    if (loading) return;

    // Si pas d'utilisateur connecté → vers la page de connexion
    if (!user) {
      router.replace("/connexion/sign-in");
      return;
    }

    // Si l'utilisateur n'a pas le bon rôle → vers /espace (sa page par défaut)
    if (!hasRole(allowedRoles)) {
      router.replace("/espace");
    }
  }, [user, loading, hasRole, allowedRoles, router]);

  // Pendant le chargement, on affiche un spinner
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--bni-main)]" />
      </div>
    );
  }

  // Si pas autorisé, on ne montre rien (la redirection est en cours)
  if (!user || !hasRole(allowedRoles)) {
    return null;
  }

  // Sinon, on affiche le contenu protégé
  return <>{children}</>;
}