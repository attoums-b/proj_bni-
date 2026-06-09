"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/template/shadcnblocs/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/template/shadcnblocs/dropdown-menu";
import { Card, CardHeader, CardTitle } from "@/components/template/shadcnblocs/card";
import { Button } from "@/components/template/shadcnblocs/button";
import { Badge } from "@/components/template/shadcnblocs/badge";
import { Filter, Check, X, Inbox } from "lucide-react";

// ===== TYPES =====
type TypeEvenement = "REUNION" | "FORMATION" | "ATELIER" | "ASSEMBLEE_GENERALE";
type typeDemande = "STANDARD" | "PARTICULIERE";
type Filtre = "TOUS" | "STANDARD" | "PARTICULIERE";

type DemandeReservation = {
  idReservation: string;
  demandeur: {
    prenom: string;
    nom: string;
    fonction: string;
  };
  salle: string;
  dateReservation: string;
  heureDebut: string;
  heureFin: string;
  nbParticipants: number;
  capaciteSalle: number;
  typeEvenement: TypeEvenement;
  typeDemande: typeDemande;
};

// ===== DONNÉES FICTIVES =====
const demandesFictives: DemandeReservation[] = [
  {
    idReservation: "1",
    demandeur: { prenom: "Blon Sadia", nom: "Emmanuel", fonction: "chef de département" },
    salle: "CARDLESS",
    dateReservation: "2026-05-14",
    heureDebut: "14:00",
    heureFin: "16:00",
    nbParticipants: 18,
    capaciteSalle: 20,
    typeEvenement: "REUNION",
    typeDemande: "STANDARD",
  },
  {
    idReservation: "2",
    demandeur: { prenom: "Fatou", nom: "Diabaté", fonction: "Ressources humaines" },
    salle: "?",
    dateReservation: "2026-05-18",
    heureDebut: "08:30",
    heureFin: "10:00",
    nbParticipants: 22,
    capaciteSalle: 25,
    typeEvenement: "FORMATION",
    typeDemande: "PARTICULIERE",
  },
];

// ===== HELPERS =====
const labelTypeEvenement = (type: TypeEvenement): string => {
  const labels: Record<TypeEvenement, string> = {
    REUNION: "Réunion",
    FORMATION: "Formation",
    ATELIER: "Atelier",
    ASSEMBLEE_GENERALE: "Assemblée générale",
  };
  return labels[type];
};

const couleurBadgeTypeEvenement = (type: TypeEvenement): string => {
  const couleurs: Record<TypeEvenement, string> = {
    REUNION: "border-blue-200 bg-blue-50 text-blue-700",
    FORMATION: "border-purple-200 bg-purple-50 text-purple-700",
    ATELIER: "border-amber-200 bg-amber-50 text-amber-700",
    ASSEMBLEE_GENERALE: "border-red-200 bg-red-50 text-red-700",
  };
  return couleurs[type];
};

// ===== COMPOSANT =====
export default function ValidationDemandesPage() {
  const [demandes, setDemandes] = useState<DemandeReservation[]>(demandesFictives);
  const [filtre, setFiltre] = useState<Filtre>("TOUS");

  const demandesFiltrees =
    filtre === "TOUS" ? demandes : demandes.filter((d) => d.typeDemande === filtre);

  const formaterDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
  };

  const approuver = (id: string) => {
    console.log("Approuver la demande", id);
    setDemandes(demandes.filter((d) => d.idReservation !== id));
  };

  const refuser = (id: string) => {
    console.log("Refuser la demande", id);
    setDemandes(demandes.filter((d) => d.idReservation !== id));
  };

  const labelFiltreActif = (): string => {
    if (filtre === "TOUS") return "Tous les types";
    if (filtre === "STANDARD") return "Demandes standard";
    return "Demandes particulières";
  };

  return (
    <div className="mx-auto max-w-7xl p-8">
      {/* Titre de la page */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0f2e25]">
          Validation des demandes
        </h1>
      </div>

      {/* Carte qui contient la table */}
      <Card className="border-gray-200 bg-white">
        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-3">
            <CardTitle className="text-base font-semibold">Demandes en attente</CardTitle>
            {filtre !== "TOUS" && (
              <Badge variant="outline" className="text-xs">
                {labelFiltreActif()}
              </Badge>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filtrer par type de demande</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setFiltre("TOUS")}
                className={filtre === "TOUS" ? "bg-gray-100" : ""}
              >
                Tous les types
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFiltre("STANDARD")}
                className={filtre === "STANDARD" ? "bg-gray-100" : ""}
              >
                Demandes standard
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFiltre("PARTICULIERE")}
                className={filtre === "PARTICULIERE" ? "bg-gray-100" : ""}
              >
                Demandes particulières
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        {demandesFiltrees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Inbox className="h-12 w-12 text-gray-300" />
            <p className="mt-4 text-base font-medium text-gray-700">
              {demandes.length === 0
                ? "Aucune demande en attente"
                : "Aucune demande pour ce filtre"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {demandes.length === 0
                ? "Les nouvelles demandes apparaîtront ici."
                : "Essayez un autre filtre pour voir d'autres demandes."}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-gray-100 uppercase">
                <TableHead className="text-xs font-semibold text-gray-500">Demandeur</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500">Salle</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500">Date & Créneau</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500">Participants</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500">Type</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {demandesFiltrees.map((demande) => (
                <TableRow key={demande.idReservation} className="border-gray-100">
                  <TableCell>
                    <div className="font-semibold text-[#0f2e25]">
                      {demande.demandeur.prenom} {demande.demandeur.nom}
                    </div>
                    <div className="text-xs text-gray-500">
                      {demande.demandeur.fonction}
                    </div>
                  </TableCell>

                  <TableCell className="text-sm font-medium text-gray-700">
                    {demande.salle}
                  </TableCell>

                  <TableCell className="text-sm font-medium text-[#0f2e25]">
                    {formaterDate(demande.dateReservation)} - {demande.heureDebut} - {demande.heureFin}
                  </TableCell>

                  <TableCell className="text-sm text-gray-700">
                    {demande.capaciteSalle > 0
                      ? `${demande.nbParticipants}/${demande.capaciteSalle}`
                      : `${demande.nbParticipants}`}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={couleurBadgeTypeEvenement(demande.typeEvenement)}
                    >
                      {labelTypeEvenement(demande.typeEvenement)}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        className="bg-green-100 text-green-700 hover:bg-green-200"
                        onClick={() => approuver(demande.idReservation)}
                      >
                        <Check className="mr-1 h-4 w-4" />
                        Approuver
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-100 text-red-700 hover:bg-red-200"
                        onClick={() => refuser(demande.idReservation)}
                      >
                        <X className="mr-1 h-4 w-4" />
                        Refuser
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}

