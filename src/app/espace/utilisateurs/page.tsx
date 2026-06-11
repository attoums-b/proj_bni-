"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, MoreHorizontal, Shield, Loader2 } from "lucide-react";

import { Input } from "@/components/template/shadcnblocs/input";
import { Button } from "@/components/template/shadcnblocs/button";
import { Badge } from "@/components/template/shadcnblocs/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/template/shadcnblocs/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/template/shadcnblocs/dropdown-menu";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/template/shadcnblocs/card";



import { apiGet } from "@/lib/api";

// ============================================================
// TYPES (alignés sur les DTOs du backend)
// ============================================================
type User = {
  id: string;
  matricule: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  roleId: string | null;
  roleName: string | null;
};

type Role = {
  id: string;
  nameRole: string;
  description?: string;
};

// Format Spring Data Page
type PageResponse<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

// ============================================================
// HELPERS
// ============================================================
function getInitials(firstName: string, lastName: string): string {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
}

function getRoleBadgeStyle(roleName: string | null): string {
  switch (roleName) {
    case "SUPER_ADMIN":
      return "bg-red-50 text-red-700 border-red-200";
    case "ADMIN_SITE":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "DEMANDEUR":
      return "bg-gray-100 text-gray-700 border-gray-200";
    default:
      return "bg-gray-50 text-gray-500 border-gray-200";
  }
}

function getRoleLabel(roleName: string | null): string {
  switch (roleName) {
    case "SUPER_ADMIN":
      return "Administrateur";
    case "ADMIN_SITE":
      return "Gestionnaire";
    case "DEMANDEUR":
      return "Demandeur";
    default:
      return "Aucun rôle";
  }
}

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================
export default function UtilisateursPage() {
  // ===== ÉTATS DES DONNÉES =====
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ===== ÉTATS DES FILTRES =====
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  // ===== RÔLES STATIQUES =====
  // Les 3 rôles sont fixes dans ton application, donc on les définit ici
  // (pas besoin d'appel API pour eux)
  const roles: Role[] = [
    { id: "role-1", nameRole: "DEMANDEUR" },
    { id: "role-2", nameRole: "GESTIONNAIRE_SALLE" },
    { id: "role-3", nameRole: "ADMIN_SITE" },
  ];

  // ============================================================
  // CHARGEMENT DES UTILISATEURS DEPUIS L'API
  // ============================================================
  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);

        // Appel à GET /api/users (retourne une Page)
        // size=100 pour récupérer la plupart des utilisateurs en une fois
        const data = await apiGet<PageResponse<User>>("/users?size=100");

        // La vraie liste est dans data.content
        setUsers(data.content);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erreur lors du chargement des utilisateurs"
        );
        console.error("Erreur :", err);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  // ============================================================
  // CHANGEMENT DE RÔLE (à connecter au backend plus tard)
  // ============================================================
  // ⚠️ FONCTION FICTIVE — Backend pas encore implémenté
  // TODO: remplacer par apiPatch(`/users/${userId}/role`, { roleId: newRoleId })
  const handleChangeRole = (userId: string, newRoleId: string) => {
    const newRole = roles.find((r) => r.id === newRoleId);
    if (!newRole) return;

    // Simulation locale pour l'instant
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, roleId: newRoleId, roleName: newRole.nameRole }
          : u
      )
    );

    console.log(
      `[FICTIF] Changement de rôle : ${userId} → ${newRole.nameRole}`
    );
  };

  
  
  
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchLower = search.toLowerCase();
      const matchSearch =
        !search ||
        user.firstName?.toLowerCase().includes(searchLower) ||
        user.lastName?.toLowerCase().includes(searchLower) ||
        user.matricule?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower);

      const matchRole = roleFilter === "all" || user.roleName === roleFilter;

      return matchSearch && matchRole;
    });
  }, [users, search, roleFilter]);

  
  
  
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* ===== EN-TÊTE ===== */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--bni-text)]">
          Utilisateurs
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gérez les utilisateurs et leurs rôles
        </p>
      </div>

      {/* ===== CARTE PRINCIPALE ===== */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-1">
            <CardTitle>Liste des utilisateurs</CardTitle>
            <CardDescription>
              {loading
                ? "Chargement..."
                : `${filteredUsers.length} utilisateur${filteredUsers.length > 1 ? "s" : ""} trouvé${filteredUsers.length > 1 ? "s" : ""}`}
            </CardDescription>
          </div>

          {/* Barre de recherche + filtre rôle */}
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher par nom, matricule ou email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Tous les rôles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.nameRole}>
                    {getRoleLabel(role.nameRole)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="px-0">
          {/* ===== ÉTAT : CHARGEMENT ===== */}
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Chargement des utilisateurs...
            </div>
          ) : error ? (
            /* ===== ÉTAT : ERREUR ===== */
            <div className="mx-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              <p className="font-medium">Erreur de chargement</p>
              <p className="mt-1">{error}</p>
              <p className="mt-2 text-xs">
                Vérifiez que le backend est démarré et accessible.
              </p>
            </div>
          ) : filteredUsers.length === 0 ? (
            /* ===== ÉTAT : VIDE ===== */
            <div className="py-12 text-center text-sm text-muted-foreground">
              Aucun utilisateur trouvé
            </div>
          ) : (
            /* ===== ÉTAT : TABLE ===== */
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-gray-50/50 text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-3 text-left font-medium">
                      Utilisateur
                    </th>
                    <th className="px-6 py-3 text-left font-medium">
                      Matricule
                    </th>
                    <th className="px-6 py-3 text-left font-medium">Email</th>
                    <th className="px-6 py-3 text-left font-medium">Rôle</th>
                    <th className="px-6 py-3 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-border transition-colors last:border-0 hover:bg-gray-50/50"
                    >
                      {/* Avatar + nom + position */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bni-light)] text-xs font-medium text-[var(--bni-main)]">
                            {getInitials(user.firstName, user.lastName)}
                          </div>
                          <div>
                            <div className="font-medium text-[var(--bni-text)]">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {user.position || "—"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Matricule */}
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {user.matricule}
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {user.email}
                      </td>

                      {/* Badge de rôle */}
                      <td className="px-6 py-4">
                        <Badge
                          variant="outline"
                          className={getRoleBadgeStyle(user.roleName)}
                        >
                          {getRoleLabel(user.roleName)}
                        </Badge>
                      </td>

                      {/* Menu d'actions */}
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <Shield className="mr-2 h-4 w-4" />
                                <span>Changer le rôle</span>
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup
                                  value={user.roleId ?? ""}
                                  onValueChange={(value) =>
                                    handleChangeRole(user.id, value)
                                  }
                                >
                                  {roles.map((role) => (
                                    <DropdownMenuRadioItem
                                      key={role.id}
                                      value={role.id}
                                    >
                                      {getRoleLabel(role.nameRole)}
                                    </DropdownMenuRadioItem>
                                  ))}
                                </DropdownMenuRadioGroup>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}