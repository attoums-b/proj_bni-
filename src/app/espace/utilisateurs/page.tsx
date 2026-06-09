"use client";

import { useState, useMemo } from "react";
import { Search, MoreHorizontal, Shield } from "lucide-react";

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

// ============================================================
// TYPES
// ============================================================
type User = {
  id: string;
  matricule: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  siteId: string;
  siteName: string;
  roleId: string;
  roleName: string;
};

type Role = {
  id: string;
  nameRole: string;
};

type Site = {
  id: string;
  nameSite: string;
  city: string;
};

// ============================================================
// ⚠️ DONNÉES FICTIVES — À REMPLACER PAR L'API BACKEND
// ============================================================
// TODO: remplacer par fetch("http://localhost:8080/api/roles")
const ROLES_FICTIFS: Role[] = [
  { id: "role-1", nameRole: "DEMANDEUR" },
  { id: "role-2", nameRole: "GESTIONNAIRE_SALLE" },
  { id: "role-3", nameRole: "ADMIN_SITE" },
];

// TODO: remplacer par fetch("http://localhost:8080/api/sites")
const SITES_FICTIFS: Site[] = [
  { id: "site-1", nameSite: "Siège BNI Plateau", city: "Abidjan" },
  { id: "site-2", nameSite: "Agence Cocody", city: "Abidjan" },
  { id: "site-3", nameSite: "Agence Marcory", city: "Abidjan" },
];

// TODO: remplacer par fetch("http://localhost:8080/api/users/all")
const USERS_FICTIFS: User[] = [
  {
    id: "user-1",
    matricule: "BNI001",
    firstName: "Amani",
    lastName: "Koné",
    email: "amani.kone@bni.ci",
    position: "Administrateur système",
    siteId: "site-1",
    siteName: "Siège BNI Plateau",
    roleId: "role-3",
    roleName: "ADMIN_SITE",
  },
  {
    id: "user-2",
    matricule: "BNI002",
    firstName: "Fatou",
    lastName: "Diabaté",
    email: "fatou.diabate@bni.ci",
    position: "Ressources humaines",
    siteId: "site-1",
    siteName: "Siège BNI Plateau",
    roleId: "role-1",
    roleName: "DEMANDEUR",
  },
  {
    id: "user-3",
    matricule: "BNI003",
    firstName: "Blon Sadia",
    lastName: "Emmanuel",
    email: "blon.emmanuel@bni.ci",
    position: "Chef de département",
    siteId: "site-1",
    siteName: "Siège BNI Plateau",
    roleId: "role-2",
    roleName: "GESTIONNAIRE_SALLE",
  },
  {
    id: "user-4",
    matricule: "BNI004",
    firstName: "Yao",
    lastName: "Kouassi",
    email: "yao.kouassi@bni.ci",
    position: "Marketing",
    siteId: "site-2",
    siteName: "Agence Cocody",
    roleId: "role-1",
    roleName: "DEMANDEUR",
  },
  {
    id: "user-5",
    matricule: "BNI005",
    firstName: "Aïcha",
    lastName: "Traoré",
    email: "aicha.traore@bni.ci",
    position: "Comptabilité",
    siteId: "site-2",
    siteName: "Agence Cocody",
    roleId: "role-1",
    roleName: "DEMANDEUR",
  },
  {
    id: "user-6",
    matricule: "BNI006",
    firstName: "Bakary",
    lastName: "Ouattara",
    email: "bakary.ouattara@bni.ci",
    position: "Chef d'agence",
    siteId: "site-3",
    siteName: "Agence Marcory",
    roleId: "role-2",
    roleName: "GESTIONNAIRE_SALLE",
  },
  {
    id: "user-7",
    matricule: "BNI007",
    firstName: "Marie",
    lastName: "N'Guessan",
    email: "marie.nguessan@bni.ci",
    position: "Conseillère clientèle",
    siteId: "site-3",
    siteName: "Agence Marcory",
    roleId: "role-1",
    roleName: "DEMANDEUR",
  },
  {
    id: "user-8",
    matricule: "BNI008",
    firstName: "Ibrahim",
    lastName: "Diallo",
    email: "ibrahim.diallo@bni.ci",
    position: "Audit interne",
    siteId: "site-1",
    siteName: "Siège BNI Plateau",
    roleId: "role-1",
    roleName: "DEMANDEUR",
  },
];

// ============================================================
// HELPERS
// ============================================================
function getInitials(firstName: string, lastName: string): string {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
}

function getRoleBadgeStyle(roleName: string): string {
  switch (roleName) {
    case "ADMIN_SITE":
      return "bg-red-50 text-red-700 border-red-200";
    case "GESTIONNAIRE_SALLE":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "DEMANDEUR":
      return "bg-gray-100 text-gray-700 border-gray-200";
    default:
      return "bg-gray-50 text-gray-500 border-gray-200";
  }
}

function getRoleLabel(roleName: string): string {
  switch (roleName) {
    case "ADMIN_SITE":
      return "Administrateur";
    case "GESTIONNAIRE_SALLE":
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
  // ⚠️ DONNÉES FICTIVES en attendant le backend
  // TODO: remplacer par useEffect + fetch comme dans la version connectée
  const [users, setUsers] = useState<User[]>(USERS_FICTIFS);
  const roles = ROLES_FICTIFS;
  const sites = SITES_FICTIFS;

  // ===== ÉTATS DES FILTRES =====
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [siteFilter, setSiteFilter] = useState<string>("all");

  // ===== CHANGEMENT DE RÔLE (FICTIF) =====
  // ⚠️ FONCTION FICTIVE — En production, fera un appel PATCH au backend
  // TODO: remplacer par fetch PATCH /api/users/{userId}/role
  const handleChangeRole = (userId: string, newRoleId: string) => {
    const newRole = roles.find((r) => r.id === newRoleId);
    if (!newRole) return;

    // Simulation : mise à jour locale uniquement (pas d'appel API)
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, roleId: newRoleId, roleName: newRole.nameRole }
          : u
      )
    );

    console.log(
      `[FICTIF] Changement de rôle pour utilisateur ${userId} → ${newRole.nameRole}`
    );
  };

  // ===== FILTRAGE COMBINÉ =====
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchLower = search.toLowerCase();
      const matchSearch =
        !search ||
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.matricule.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower);

      const matchRole = roleFilter === "all" || user.roleName === roleFilter;
      const matchSite = siteFilter === "all" || user.siteId === siteFilter;

      return matchSearch && matchRole && matchSite;
    });
  }, [users, search, roleFilter, siteFilter]);

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
              {filteredUsers.length} utilisateur
              {filteredUsers.length > 1 ? "s" : ""} trouvé
              {filteredUsers.length > 1 ? "s" : ""}
            </CardDescription>
          </div>

          {/* Barre de recherche + filtres */}
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
            {/* Recherche */}
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

            {/* Filtre par rôle */}
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
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

            {/* Filtre par site */}
            <Select value={siteFilter} onValueChange={setSiteFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Tous les sites" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les sites</SelectItem>
                {sites.map((site) => (
                  <SelectItem key={site.id} value={site.id}>
                    {site.nameSite}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="px-0">
          {/* ===== TABLE ===== */}
          {filteredUsers.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Aucun utilisateur trouvé
            </div>
          ) : (
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
                    <th className="px-6 py-3 text-left font-medium">Site</th>
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

                      {/* Site */}
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {user.siteName || "—"}
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

                            {/* Sous-menu : changer le rôle */}
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <Shield className="mr-2 h-4 w-4" />
                                <span>Changer le rôle</span>
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup
                                  value={user.roleId}
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