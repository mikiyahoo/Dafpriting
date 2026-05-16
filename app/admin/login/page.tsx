import Image from "next/image";
import { LoginForm } from "@/components/admin/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image 
              src="/assets/daf-logo.png" 
              alt="Daf Printing Logo" 
              width={60} 
              height={60}
              priority
            />
          </div>
          <h1 className="text-3xl font-black text-bgPure mb-2">
            Daf Printing
          </h1>
          <p className="text-bgPure/60 text-sm">
            Admin Dashboard
          </p>
        </div>
        
        <div className="bg-bgPure rounded-2xl p-8 shadow-2xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
