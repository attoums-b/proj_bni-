"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function MicrosoftSigninButton({ text }: { text: string }) {
  const [loading, setLoading] = useState(false);

  const handleMicrosoftSignIn = async () => {
    setLoading(true);
    try {
      toast.info("Connexion Microsoft à configurer");
    } catch (error) {
      toast.error("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleMicrosoftSignIn}
      disabled={loading}
      className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white p-3 font-medium hover:bg-gray-50 disabled:opacity-70"
    >
      <svg width="20" height="20" viewBox="0 0 21 21">
        <rect x="1" y="1" width="9" height="9" fill="#f25022" />
        <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
        <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
        <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
      </svg>
      {loading ? "Redirection..." : `${text} avec Microsoft 365`}
    </button>
  );
}


