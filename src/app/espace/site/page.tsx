"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, Pencil } from "lucide-react";

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
Card,
CardContent,
CardHeader,
CardTitle,
CardDescription,
} from "@/components/template/shadcnblocs/card";

import { apiGet, apiPatch } from "@/lib/api";

// ============================================================
// TYPES
// ============================================================

type Site = {
id: string;
nameSite: string;
address: string;
city: string;
active: boolean;
};

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
// COMPOSANT PRINCIPAL
// ============================================================

export default function SitePage() {
const router = useRouter();

// ==========================================================
// ETATS
// ==========================================================

const [sites, setSites] = useState<Site[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("all");

const [updatingId, setUpdatingId] = useState<string | null>(null);

// ==========================================================
// CHARGEMENT DES SITES
// ==========================================================

useEffect(() => {
async function loadSites() {
try {
setLoading(true);
setError(null);


    const data = await apiGet<PageResponse<Site>>(
      "/sites/list?page=0&size=100"
    );

    setSites(data.content);
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Erreur lors du chargement des sites"
    );

    console.error(err);
  } finally {
    setLoading(false);
  }
}

loadSites();


}, []);

// ==========================================================
// ACTIVER / DESACTIVER
// ==========================================================

const handleToggleStatus = async (siteId: string) => {
try {
setUpdatingId(siteId);


  const updatedSite = await apiPatch<Site>(
    `/sites/${siteId}/disable-or-enable-Site`
  );

  setSites((prev) =>
    prev.map((site) =>
      site.id === siteId ? updatedSite : site
    )
  );
} catch (error) {
  console.error(error);
} finally {
  setUpdatingId(null);
}


};

// ==========================================================
// FILTRAGE
// ==========================================================

const filteredSites = useMemo(() => {
return sites.filter((site) => {
const searchLower = search.toLowerCase();


  const matchSearch =
    !search ||
    site.nameSite.toLowerCase().includes(searchLower) ||
    site.address?.toLowerCase().includes(searchLower) ||
    site.city?.toLowerCase().includes(searchLower);

  const matchStatus =
    statusFilter === "all" ||
    (statusFilter === "active" && site.active) ||
    (statusFilter === "inactive" && !site.active);

  return matchSearch && matchStatus;
});


}, [sites, search, statusFilter]);

// ==========================================================
// RENDU
// ==========================================================

return ( <div className="mx-auto max-w-7xl space-y-6">
{/* ===================================================== */}
{/* EN-TETE */}
{/* ===================================================== */}


  <div>
    <h1 className="text-2xl font-semibold tracking-tight text-[var(--bni-text)]">
      Sites
    </h1>

    <p className="mt-1 text-sm text-muted-foreground">
      Gérez les sites du système
    </p>
  </div>

  {/* ===================================================== */}
  {/* CARTE PRINCIPALE */}
  {/* ===================================================== */}

  <Card>
    <CardHeader>
      <div className="flex flex-col gap-1">
        <CardTitle>Liste des sites</CardTitle>

        <CardDescription>
          {loading
            ? "Chargement..."
            : `${filteredSites.length} site${
                filteredSites.length > 1 ? "s" : ""
              } trouvé${filteredSites.length > 1 ? "s" : ""}`}
        </CardDescription>
      </div>

      {/* RECHERCHE + FILTRE */}

      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            type="text"
            placeholder="Rechercher par nom, adresse ou ville..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              Tous les statuts
            </SelectItem>

            <SelectItem value="active">
              Actifs
            </SelectItem>

            <SelectItem value="inactive">
              Inactifs
            </SelectItem>
          </SelectContent>
        </Select>
          <Button
    variant="outline"
    className="bg-white text-black hover:bg-gray-100"
    onClick={() => router.push("/espace/site/ajouter-site")}
  >
    Ajouter un site
  </Button>
      </div>
    </CardHeader>

    <CardContent className="px-0">
      {/* ================================================= */}
      {/* CHARGEMENT */}
      {/* ================================================= */}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Chargement des sites...
        </div>
      ) : error ? (
        /* =============================================== */
        /* ERREUR */
        /* =============================================== */

        <div className="mx-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          <p className="font-medium">
            Erreur de chargement
          </p>

          <p className="mt-1">{error}</p>
        </div>
      ) : filteredSites.length === 0 ? (


        <div className="py-12 text-center text-sm text-muted-foreground">
          Aucun site trouvé
        </div>
      ) : (

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-gray-50/50 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3 text-left font-medium">
                  Nom du site
                </th>

                <th className="px-6 py-3 text-left font-medium">
                  Adresse
                </th>

                <th className="px-6 py-3 text-left font-medium">
                  Ville
                </th>

                <th className="px-6 py-3 text-left font-medium">
                  Statut
                </th>

                <th className="px-6 py-3 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredSites.map((site) => (
                <tr
                  key={site.id}
                  className="border-b border-border transition-colors last:border-0 hover:bg-gray-50/50"
                >
                  {/* NOM */}

                  <td className="px-6 py-4 font-medium text-[var(--bni-text)]">
                    {site.nameSite}
                  </td>

                  {/* ADRESSE */}

                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {site.address}
                  </td>

                  {/* VILLE */}

                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {site.city}
                  </td>

                  {/* STATUT */}

                  <td className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className={
                        site.active
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }
                    >
                      {site.active
                        ? "Actif"
                        : "Inactif"}
                    </Badge>
                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant={
                          site.active
                            ? "destructive"
                            : "default"
                        }
                        disabled={
                          updatingId === site.id
                        }
                        onClick={() =>
                          handleToggleStatus(site.id)
                        }
                      >
                        {updatingId === site.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : site.active ? (
                          "Désactiver"
                        ) : (
                          "Activer"
                        )}
                      </Button>

                      <Button
                        size="sm"
                        className="bg-green-600 text-white hover:bg-green-700"
                        onClick={() =>
                          router.push(
                            `/espace/site/${site.id}/modifier-site`
                          )
                        }
                      >
                        <Pencil className="mr-1 h-4 w-4" />
                        Modifier
                      </Button>
                    </div>
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
