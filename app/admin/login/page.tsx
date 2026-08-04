import Image from "next/image";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Admin — Iniciar sesión",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white p-8 shadow-xl">
        <Image
          src="/logo-inmo-azul.png"
          alt="Grupo Inmobienes"
          width={160}
          height={35}
          className="mx-auto h-9 w-auto"
        />
        <p className="mt-1 text-center text-sm text-slate-500">
          Panel de administración
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
