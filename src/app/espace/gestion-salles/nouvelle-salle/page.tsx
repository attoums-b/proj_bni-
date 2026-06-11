"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/template/shadcnblocs/card";
import { Input } from "@/components/template/shadcnblocs/input";
import { Label } from "@/components/template/shadcnblocs/label";
import { Button } from "@/components/template/shadcnblocs/button";

import { apiPost } from "@/lib/api";

// ============================================================
// TYPES
// ============================================================
type RoomRequest = {
  nameRoom: string;
  capacity: number;
  siteId?: string;
  equipmentsId: string[];
};

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================
export default function NouvelleSallePage() {
  const router = useRouter();

  // ===== ÉTAT DU FORMULAIRE =====
  const [nameRoom, setNameRoom] = useState("");
  const [capacity, setCapacity] = useState<number | "">("");

  // ===== ÉTAT DE L'IMAGE =====
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // ===== ÉTAT DE L'UI =====
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Référence cachée pour l'input file
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ============================================================
  // GESTION DE L'IMAGE
  // ============================================================

  // Valider et traiter le fichier sélectionné
  const handleFile = (file: File) => {
    // Validation : type
    if (!file.type.startsWith("image/")) {
      setImageError("Le fichier doit être une image (PNG ou JPG)");
      return;
    }

    // Validation : taille (5 MB max)
    if (file.size > 5 * 1024 * 1024) {
      setImageError("L'image ne doit pas dépasser 5 MB");
      return;
    }

    setImageError(null);
    setImageFile(file);

    // Créer une prévisualisation
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Sélection via le bouton "Sélectionner une image"
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  // Glisser-déposer : entrée
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Glisser-déposer : sortie
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Glisser-déposer : dépôt
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  // Supprimer l'image
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ============================================================
  // SOUMISSION DU FORMULAIRE
  // ============================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!nameRoom.trim()) {
      setError("Le nom de la salle est obligatoire");
      return;
    }
    if (!capacity || capacity < 1) {
      setError("La capacité doit être au moins de 1 personne");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // ===== 1. Créer la salle =====
      // Note : pour l'instant, on ne gère pas les équipements
      const roomData: RoomRequest = {
        nameRoom: nameRoom.trim(),
        capacity: Number(capacity),
        equipmentsId: [],
        // Pour un admin de site, le siteId sera attaché automatiquement
        // côté backend en fonction de l'utilisateur connecté
      };

      const createdRoom = await apiPost<{ id: string }>("/rooms", roomData);

      // ===== 2. Uploader l'image si présente =====
      // TODO BACKEND : créer l'endpoint POST /api/rooms/{id}/image
      // qui accepte un fichier multipart/form-data
      if (imageFile && createdRoom.id) {
        const formData = new FormData();
        formData.append("image", imageFile);

        // Note : pour l'upload, on ne peut pas utiliser apiPost (qui force Content-Type: json)
        // donc on fait un fetch direct
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

        try {
          await fetch(`${API_URL}/rooms/${createdRoom.id}/image`, {
            method: "POST",
            body: formData,
            // Ne PAS mettre Content-Type, le navigateur le génère automatiquement
            // avec le bon "boundary" pour multipart
          });
        } catch (uploadErr) {
          // Si l'upload échoue mais la salle est créée, on continue
          // L'admin pourra ré-uploader plus tard
          console.warn("Upload de l'image échoué :", uploadErr);
        }
      }

      // ===== 3. Rediriger vers la liste des salles =====
      router.push("/espace/gestion-salles");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la création de la salle"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* ===== EN-TÊTE ===== */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--bni-text)]">
          Nouvelle salle
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ajoutez une nouvelle salle à votre site
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ===== INFORMATIONS DE LA SALLE ===== */}
        <Card>
          <CardHeader>
            <CardTitle>Informations de la salle</CardTitle>
            <CardDescription>
              Renseignez les caractéristiques principales de la salle.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Nom de la salle */}
            <div className="space-y-2">
              <Label htmlFor="nameRoom" className="text-sm font-medium">
                Nom de la salle
              </Label>
              <Input
                id="nameRoom"
                type="text"
                placeholder="Ex : CARDLESS, B.FREE, Salle de conférence..."
                value={nameRoom}
                onChange={(e) => setNameRoom(e.target.value)}
                disabled={submitting}
              />
              <p className="text-xs text-muted-foreground">
                Choisissez un nom unique et facilement identifiable.
              </p>
            </div>

            {/* Capacité */}
            <div className="space-y-2">
              <Label htmlFor="capacity" className="text-sm font-medium">
                Capacité (nombre de personnes)
              </Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                placeholder="Ex : 20"
                value={capacity}
                onChange={(e) =>
                  setCapacity(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                disabled={submitting}
                className="max-w-[200px]"
              />
              <p className="text-xs text-muted-foreground">
                Nombre maximum de personnes que la salle peut accueillir.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ===== PHOTO DE LA SALLE ===== */}
        <Card>
          <CardHeader>
            <CardTitle>Photo de la salle</CardTitle>
            <CardDescription>
              Ajoutez une photo pour aider les utilisateurs à reconnaître la salle.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Si une image est sélectionnée → afficher la prévisualisation */}
            {imagePreview ? (
              <div className="relative overflow-hidden rounded-lg border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Prévisualisation"
                  className="h-64 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white transition hover:bg-black/80"
                  aria-label="Supprimer l'image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              /* Sinon → zone de dépôt */
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition ${
                  isDragging
                    ? "border-[var(--bni-main)] bg-[var(--bni-main)]/5"
                    : "border-border bg-gray-50/50"
                }`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <ImageIcon className="h-6 w-6 text-gray-500" />
                </div>

                <p className="mb-1 text-sm font-medium text-[var(--bni-text)]">
                  Déposez votre image ici
                </p>
                <p className="mb-4 text-xs text-muted-foreground">
                  PNG ou JPG jusqu'à 5 MB
                </p>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={submitting}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Sélectionner une image
                </Button>

                {/* Input file caché */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            )}

            {/* Message d'erreur sur l'image */}
            {imageError && (
              <p className="mt-2 text-sm text-red-600">{imageError}</p>
            )}
          </CardContent>
        </Card>

        {/* ===== MESSAGE D'ERREUR GLOBAL ===== */}
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* ===== BOUTONS D'ACTION ===== */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={submitting}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={submitting}
            className="bg-[var(--bni-main)] text-white hover:bg-[var(--bni-main)]/90"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Création...
              </>
            ) : (
              "Créer la salle"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}