"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import InputGroup from "../FormElements/InputGroup";
import { login } from "@/lib/auth-service";

export default function SigninWithPassword() {
  const router = useRouter();

  // ===== ÉTAT DU FORMULAIRE =====
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");

  // ===== ÉTAT DE L'UI =====
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ===== SOUMISSION DU FORMULAIRE =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!matricule || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await login({ matricule, password });

      if (response.status === 200) {
        router.push("/espace");
      } else {
        setError(response.message || "Identifiants invalides");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur de connexion. Vérifiez votre réseau."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        type="email"
        label="matricule"
        className="mb-4 [&_input]:py-3.75"
        placeholder="Entrez votre matricule"
        name="email"
        icon={<EmailIcon />}
        value={matricule}
        onChange={(e) => setMatricule(e.target.value)}
      />

      <InputGroup
        type="password"
        label="mot de passe"
        className="mb-5 [&_input]:py-3.75"
        placeholder="Entrez votre mot de passe"
        name="password"
        icon={<PasswordIcon />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <p className="text-red-500 mb-4 text-sm">
          {error}
        </p>
      )}

      <div className="mb-4.5">
        <button
          type="submit"
          disabled={loading}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0f2e25] p-4 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </div>
    </form>
  );
}
