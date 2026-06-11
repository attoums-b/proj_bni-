import { redirect } from "next/navigation";

// La page racine redirige automatiquement vers la connexion
export default function HomePage() {
  redirect("/connexion/sign-in");
}