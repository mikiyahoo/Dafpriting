import { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Radiance",
  description: "Sign in to the Radiance admin dashboard",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">R</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 mt-2">
            Sign in to the Radiance dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}