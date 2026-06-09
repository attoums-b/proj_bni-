import { Check } from "lucide-react";

export default function BniSidebar() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#0f2e25] p-16 text-white">
      <div>
        <h1 className="text-4xl font-bold leading-tight tracking-tight">
          BNI <br /> RESERVATIONS
        </h1>
        <p className="mt-2 text-lg font-medium opacity-80">Centre Intégré</p>
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="text-4xl font-medium leading-snug">
          La réservation des salles,<br />
          simple et instantanée
        </h2>

        <p className="text-xl font-normal leading-relaxed opacity-90">
          Plateforme centralisée de gestion des espaces du centre intégré.
          Réservez, suivez et validez vos demandes en temps réel.
        </p>

        <ul className="mt-4 flex flex-col gap-6">
          {[
            "Disponibilités en temps réel",
            "Créneaux adaptés",
            "Validation rapide",
          ].map((feature) => (
            <li key={feature} className="flex items-center gap-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3e6356] text-[#4eaf52]">
                <Check size={22} strokeWidth={3} />
              </div>
              <span className="text-xl font-normal">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div />
    </div>
  );
}