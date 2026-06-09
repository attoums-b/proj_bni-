import { redirect } from "next/navigation";

// La page racine redirige automatiquement vers la connexion
// Plus tard, on pourra rediriger vers /espace si l'utilisateur est déjà connecté
export default function HomePage() {
  redirect("/connexion/sign-in");
}