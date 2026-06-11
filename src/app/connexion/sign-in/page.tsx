import Signin from "@/components/template/Auth/Signin";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">

      <Image
        src="/images/centre_integre.jpg"
        alt="Centre Intégré BNI"
        fill
        priority
        className="-z-10 object-cover"
      />

      <div className="absolute inset-0 -z-10 bg-black/40" />
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl md:p-8">

        <div className="mb-6 flex justify-center">
          <Image
            src="/images/logo-bni.png"
            alt="Logo BNI"
            width={80}
            height={80}
            priority
          />
        </div>
        <h2 className="mb-2 text-center text-3xl font-semibold text-gray-900">
          Connexion
        </h2>
        <p className="mb-8 text-center text-sm text-gray-600">
          Accédez à votre espace de réservation
        </p>
        <Signin />
      </div>
    </div>
  );
}