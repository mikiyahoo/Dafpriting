import { LoginForm } from "@/components/admin/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-bgPure mb-2">
            <span className="text-secondary">Daf</span> Printing
          </h1>
          <p className="text-bgPure/60 text-sm">
            Admin Dashboard
          </p>
        </div>
        
        {/* Default Credentials Box */}
        <div className="bg-bgPure/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-bgPure/20">
          <p className="text-xs font-semibold text-bgPure/70 uppercase tracking-wider mb-2">
            Default Credentials
          </p>
          <div className="space-y-1 text-sm">
            <p className="text-bgPure/80">
              <span className="font-semibold">Email:</span>{" "}
              <code className="bg-bgPure/10 px-2 py-0.5 rounded text-secondary">admin@dafprinting.com</code>
            </p>
            <p className="text-bgPure/80">
              <span className="font-semibold">Password:</span>{" "}
              <code className="bg-bgPure/10 px-2 py-0.5 rounded text-secondary">Admin@2026</code>
            </p>
          </div>
        </div>
        
        <div className="bg-bgPure rounded-2xl p-8 shadow-2xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
