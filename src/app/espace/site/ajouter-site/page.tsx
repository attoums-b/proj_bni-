"use client";
import { useState } from 'react';
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Building2, Loader2 } from "lucide-react";

import { Input } from "@/components/template/shadcnblocs/input";
import { Button } from "@/components/template/shadcnblocs/button";
import { Label } from "@/components/template/shadcnblocs/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/template/shadcnblocs/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/template/shadcnblocs/select";

import { apiPost } from "@/lib/api";

type SiteResponseDto = {
  id: string;
  nameSite: string;
  adress: string;
  city: string;
  active: boolean;
};

export default function NouveauSitePage() {
  const router = useRouter();

  // États du formulaire
  const [nameSite, setNameSite] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [active, setActive] = useState<"true" | "false">("true");
  const [matricule, setMatricule] = useState<string>("");

  // États de soumission
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!matricule?.trim()) {
      setSaveError("Veuillez saisir le matricule de l'administrateur du site");
      return;
    }
    if (!nameSite.trim() || !address.trim() || !city.trim()) {
      setSaveError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      setSaving(true);
      setSaveError(null);

      const body = {
        nameSite: nameSite.trim(),
        address: address.trim(),
        city: city.trim(),
        active: active === "true",
        matriculeAdmin: matricule.trim(),
      };

      const created = await apiPost<SiteResponseDto>("/sites", body);

      console.log("Site créé avec succès :", created);
      router.push("/espace/site");
    } catch (err) {
      setSaveError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la création du site"
      );
      console.error("Erreur création site :", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <button
          onClick={() => router.back()}
          className="mb-3 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-[var(--bni-main)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </button>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--bni-text)]">
          Nouveau site
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Créez un nouveau site et affectez-lui un administrateur
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--bni-light)] text-[var(--bni-main)]">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <CardTitle>Informations du site</CardTitle>
                <CardDescription>
                  Renseignez les informations du site et l’administrateur responsable.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Nom + Statut */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nameSite">Nom du site</Label>
                <Input
                  id="nameSite"
                  type="text"
                  placeholder="Ex: Siège BNI Plateau"
                  value={nameSite}
                  onChange={(e) => setNameSite(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="active">Statut</Label>
                <Select
                  value={active}
                  onValueChange={(v) => setActive(v as "true" | "false")}
                  disabled={saving}
                >
                  <SelectTrigger id="active">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Actif</SelectItem>
                    <SelectItem value="false">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Adresse + Ville */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Ex: Boulevard Roume"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Ex: Abidjan"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
            </div>

            <div className="border-t border-border" />

            {/* Matricule Admin */}
            <div className="space-y-2">
              <Label htmlFor="matricule">Administrateur du site</Label>
              <Input
                id="matricule"
                type="text"
                placeholder="Saisir le matricule de l'administrateur du site"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
                required
                disabled={saving}
              />
              <p className="text-xs text-muted-foreground">
                L’utilisateur sera automatiquement créé  s’il n’existe pas.
              </p>
            </div>

            {/* Message d'erreur */}
            {saveError && (
              <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-medium">Impossible de créer le site</p>
                  <p className="text-xs">{saveError}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Boutons */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={saving}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="bg-[var(--bni-main)] text-white hover:bg-[var(--bni-main)]/90"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              "Enregistrer"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}