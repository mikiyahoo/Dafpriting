import { LoginForm } from "@/components/admin/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-primary-navy flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-white mb-2">
            <span className="text-primary-brown">Daf</span> Printing
          </h1>
          <p className="text-secondary-white/60 text-sm">
            Admin Dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}