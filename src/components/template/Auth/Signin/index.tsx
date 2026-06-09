import { Suspense } from "react";
import MicrosoftSigninButton from "../MicrosoftSigninButton";
import SigninWithPassword from "../SigninWithPassword";

export default function Signin() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SigninWithPassword />

      <div className="my-6 flex items-center justify-center gap-3">
        <span className="block h-px w-full bg-gray-300" />
        <div className="text-sm font-medium text-gray-500">OU</div>
        <span className="block h-px w-full bg-gray-300" />
      </div>

      <MicrosoftSigninButton text="Se connecter" />
    </Suspense>
  );
}