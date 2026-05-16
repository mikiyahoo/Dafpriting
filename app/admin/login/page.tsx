import { LoginForm } from "@/components/admin/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-bgPure mb-2">
            <span className="text-secondary">Daf</span> Printing
          </h1>
          <p className="text-bgPure/60 text-sm">
            Admin Dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
