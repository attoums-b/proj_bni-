"use client";

import { EmailIcon, PasswordIcon } from "@/assets/icons";
//import { signIn } from "@/lib/auth/auth-client";
import Link from "next/link";
//import { useRouter, useSearchParams } from "next/navigation";
//import React, { useState } from "react";
//import { toast } from "sonner";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";

export default function SigninWithPassword() {
  /**
   * Définir la logique de connexion ici 
   */

  return (
    // formutlaire de connexion 
    <form >
      {/* deux input pour l'identifiant et le mot de passe */}
      <InputGroup
        type="email"
        label="matricule"
        className="mb-4 [&_input]:py-3.75"
        placeholder="Entrez votre matricule"
        name="email"
        icon={<EmailIcon />}
      />

      <InputGroup
        type="password"
        label="mot de passe"
        className="mb-5 [&_input]:py-3.75"
        placeholder="Entrez votre mot de passe"
        name="password"
        icon={<PasswordIcon />}
      />
{/* checkbox pour que l'utilisateur n'ait pas à tt le temps se connecter */}
      <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
        <Checkbox
          label="se souvenir de moi"
          name="remember"
          withIcon="check"
          minimal
          radius="md"

        />

        <Link
          href="/"
          className="text-[#0f2e25] outline-0 hover:underline"
        >
          Mot de passe oublié ?
        </Link>
      </div>
{/*  bouton se connecter */}
      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0f2e25] p-4 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Se connecter
        </button>
      </div>
    </form>
  );
  

}
