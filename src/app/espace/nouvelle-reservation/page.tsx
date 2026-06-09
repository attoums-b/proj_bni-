"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Building2, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/template/shadcnblocs/button";
import { Input } from "@/components/template/shadcnblocs/input";
import { Label } from "@/components/template/shadcnblocs/label";
import { Textarea } from "@/components/template/shadcnblocs/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/template/shadcnblocs/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/template/shadcnblocs/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/template/shadcnblocs/popover";
import { Calendar } from "@/components/template/shadcnblocs/calendar";

type RequestType = "STANDARD" | "PARTICULIER";

export default function NouvelleReservationPage() {
  const router = useRouter();

  // ===== ÉTAT DU FORMULAIRE =====
  const [requestType, setRequestType] = useState<RequestType>("STANDARD");
  const [reason, setReason] = useState("");
  const [eventTypeId, setEventTypeId] = useState("");
  const [numberOfParticipants, setNumberOfParticipants] = useState<number | "">("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [precisions, setPrecisions] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ===== HEURES DISPONIBLES (7h - 19h, créneaux de 30 min) =====
  const horaires: string[] = [];
  for (let h = 7; h <= 19; h++) {
    horaires.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 19) horaires.push(`${String(h).padStart(2, "0")}:30`);
  }

  // ===== RECHERCHE DE SALLES =====
  const handleChercherSalles = async () => {
    if (!date || !startTime || !endTime || !reason || !eventTypeId || !numberOfParticipants) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setSubmitting(true);
    try {
      // Construire les LocalDateTime à partir de la date + heures
      const dateStr = format(date, "yyyy-MM-dd");
      const startDateTime = `${dateStr}T${startTime}:00`;
      const endDateTime = `${dateStr}T${endTime}:00`;

      // Stocker les données du formulaire pour la page suivante
      const formData = {
        reason,
        eventTypeId,
        numberOfParticipants: Number(numberOfParticipants),
        reservationStartDate: startDateTime,
        reservationEndDate: endDateTime,
        precisions,
        requestType,
      };

      sessionStorage.setItem("reservationDraft", JSON.stringify(formData));

      if (requestType === "STANDARD") {
        // Pour STANDARD, on cherche les salles disponibles
        router.push("/espace/nouvelle-reservation/chercher-salles");
      } else {
        // Pour PARTICULIER, on soumet directement sans choisir de salle
        router.push("/espace/nouvelle-reservation/confirmation");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* ===== EN-TÊTE ===== */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--bni-text)]">
          Nouvelle réservation
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Remplissez le formulaire pour soumettre votre demande
        </p>
      </div>

      {/* ===== TYPE DE DEMANDE ===== */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card
          onClick={() => setRequestType("STANDARD")}
          className={cn(
            "cursor-pointer transition-all hover:ring-foreground/20",
            requestType === "STANDARD" &&
              "ring-2 ring-[var(--bni-main)] bg-[var(--bni-main)]/[0.02]"
          )}
        >
          <CardHeader>
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "rounded-lg p-2",
                  requestType === "STANDARD"
                    ? "bg-[var(--bni-main)] text-white"
                    : "bg-gray-100 text-gray-600"
                )}
              >
                <Building2 className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <CardTitle>Demande standard</CardTitle>
                <CardDescription className="mt-1">
                  Pour un événement classique où vous choisissez vous-même la salle.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card
          onClick={() => setRequestType("PARTICULIER")}
          className={cn(
            "cursor-pointer transition-all hover:ring-foreground/20",
            requestType === "PARTICULIER" &&
              "ring-2 ring-[var(--bni-main)] bg-[var(--bni-main)]/[0.02]"
          )}
        >
          <CardHeader>
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "rounded-lg p-2",
                  requestType === "PARTICULIER"
                    ? "bg-[var(--bni-main)] text-white"
                    : "bg-gray-100 text-gray-600"
                )}
              >
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <CardTitle>Demande particulière</CardTitle>
                <CardDescription className="mt-1">
                  Pour un grand événement nécessitant la modulation de plusieurs salles.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* ===== INFORMATIONS DE LA RÉSERVATION ===== */}
      <Card>
        <CardHeader>
          <CardTitle>Informations de la réservation</CardTitle>
          <CardDescription>
            Renseignez le motif et les caractéristiques de votre événement.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Motif */}
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm font-medium">
              Motif de la réservation
            </Label>
            <Input
              id="reason"
              type="text"
              placeholder="Ex. : Comité de direction trimestriel"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          {/* Type d'événement + Nombre de participants */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="eventType" className="text-sm font-medium">
                Type d'événement
              </Label>
              <Select value={eventTypeId} onValueChange={setEventTypeId}>
                <SelectTrigger id="eventType" className="w-full">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reunion">Réunion</SelectItem>
                  <SelectItem value="formation">Formation</SelectItem>
                  <SelectItem value="atelier">Atelier</SelectItem>
                  <SelectItem value="ag">Assemblée générale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="participants" className="text-sm font-medium">
                Nombre de participants
              </Label>
              <Input
                id="participants"
                type="number"
                min="1"
                placeholder="0"
                value={numberOfParticipants}
                onChange={(e) =>
                  setNumberOfParticipants(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===== CRÉNEAU SOUHAITÉ ===== */}
      <Card>
        <CardHeader>
          <CardTitle>Créneau souhaité</CardTitle>
          <CardDescription>
            Choisissez la date et la plage horaire de votre événement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date
                      ? format(date, "PPP", { locale: fr })
                      : "Choisir une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    locale={fr}
                    disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Heure début */}
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-sm font-medium">
                Heure début
              </Label>
              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger id="startTime" className="w-full">
                  <SelectValue placeholder="--:--" />
                </SelectTrigger>
                <SelectContent>
                  {horaires.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Heure fin */}
            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-sm font-medium">
                Heure fin
              </Label>
              <Select value={endTime} onValueChange={setEndTime}>
                <SelectTrigger id="endTime" className="w-full">
                  <SelectValue placeholder="--:--" />
                </SelectTrigger>
                <SelectContent>
                  {horaires.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===== PRÉCISIONS (OPTIONNEL) ===== */}
      <Card>
        <CardHeader>
          <CardTitle>
            Précisions{" "}
            <span className="text-sm font-normal text-muted-foreground">
              (optionnel)
            </span>
          </CardTitle>
          <CardDescription>
            Ajoutez des détails complémentaires sur votre événement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Ex. : Besoin d'un vidéoprojecteur, prévoir un café d'accueil, etc."
            value={precisions}
            onChange={(e) => setPrecisions(e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      {/* ===== BOUTONS D'ACTION ===== */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Annuler
        </Button>
        <Button
          type="button"
          onClick={handleChercherSalles}
          disabled={submitting}
          className="bg-[var(--bni-main)] text-white hover:bg-[var(--bni-main)]/90"
        >
          {submitting
            ? "Recherche..."
            : requestType === "STANDARD"
              ? "Chercher une salle"
              : "Soumettre la demande"}
        </Button>
      </div>
    </div>
  );
}