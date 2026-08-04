import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Admin — Iniciar sesión",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white p-8 shadow-xl">
        <p className="text-center text-lg font-bold text-slate-900">
          Grupo <span className="text-emerald-600">INMOBIENES</span>
        </p>
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
