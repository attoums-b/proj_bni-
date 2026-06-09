import Signin from "@/components/template/Auth/Signin";
import Image from "next/image";

export default function SignInPage() {
  return (
    // ===== CONTAINER PRINCIPAL =====
    // - min-h-screen : prend toute la hauteur de l'écran
    // - relative : permet de positionner l'image en arrière-plan
    // - flex + items-center + justify-center : centre la box au milieu
    // - p-4 : marge sur les côtés pour mobile
    <div className="relative flex min-h-screen items-center justify-center p-4">

      {/* ===== IMAGE DE FOND ===== */}
      {/* - fill : prend toute la place du parent */}
      {/* - object-cover : recadre l'image pour qu'elle remplisse sans déformation */}
      {/* - -z-10 : place l'image derrière tout le reste */}
      <Image
        src="/images/centre_integre.jpg"
        alt="Centre Intégré BNI"
        fill
        priority
        className="-z-10 object-cover"
      />

      {/* ===== OVERLAY SOMBRE (optionnel mais joli) ===== */}
      {/* Un voile noir semi-transparent pour que la box ressorte mieux */}
      <div className="absolute inset-0 -z-10 bg-black/40" />

      {/* ===== BOX DE CONNEXION ===== */}
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl md:p-8">

        {/* Logo BNI centré */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/logo-bni.png"
            alt="Logo BNI"
            width={80}
            height={80}
            priority
          />
        </div>

        {/* Titre et sous-titre */}
        <h2 className="mb-2 text-center text-3xl font-semibold text-gray-900">
          Connexion
        </h2>
        <p className="mb-8 text-center text-sm text-gray-600">
          Accédez à votre espace de réservation
        </p>

        {/* Formulaire (composant Signin existant) */}
        <Signin />
      </div>
    </div>
  );
}