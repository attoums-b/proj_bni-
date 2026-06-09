import BniSidebar from "@/components/template/Auth/BniSidebar";
import Signin from "@/components/template/Auth/Signin";

export default function SignInPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* COLONNE GAUCHE - Panneau vert BNI */}
      <BniSidebar />

      {/* COLONNE DROITE - Formulaire */}
      <div className="flex items-center justify-center bg-white p-8 md:p-16">
        <div className="w-full max-w-md">
          <h2 className="mb-2 text-3xl font-semibold text-gray-900">
            Connexion
          </h2>
          <p className="mb-8 text-gray-600">
            Accédez à votre espace de réservation
          </p>

          <Signin />
        </div>
      </div>
    </div>
  );
}

