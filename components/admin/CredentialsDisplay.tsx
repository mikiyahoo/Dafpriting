"use client";

import { useState } from "react";
import { Eye, EyeOff, Copy, Check } from "lucide-react";

export function CredentialsDisplay() {
  const [showPassword, setShowPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const email = "admin@dafprinting.com";
  const password = "Admin@2026";

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="mb-8 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl p-6 border border-primary/20">
      <div className="mb-4">
        <h2 className="text-lg font-black text-textMain mb-1">Setup Credentials</h2>
        <p className="text-sm text-textMuted">Default admin login credentials for database setup</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <div className="bg-bgPure rounded-lg p-4 border border-primary/10">
          <label className="block text-xs font-semibold text-textMuted uppercase tracking-wider mb-2">
            Email
          </label>
          <div className="flex items-center justify-between gap-2">
            <code className="flex-1 text-sm font-mono text-textMain">
              {showEmail ? email : "•".repeat(email.length)}
            </code>
            <div className="flex gap-2">
              <button
                onClick={() => setShowEmail(!showEmail)}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"
                title={showEmail ? "Hide" : "Show"}
              >
                {showEmail ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <button
                onClick={() => handleCopy(email, "email")}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"
                title="Copy to clipboard"
              >
                {copiedField === "email" ? (
                  <Check size={18} className="text-green-600" />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="bg-bgPure rounded-lg p-4 border border-primary/10">
          <label className="block text-xs font-semibold text-textMuted uppercase tracking-wider mb-2">
            Password
          </label>
          <div className="flex items-center justify-between gap-2">
            <code className="flex-1 text-sm font-mono text-textMain">
              {showPassword ? password : "•".repeat(password.length)}
            </code>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"
                title={showPassword ? "Hide" : "Show"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <button
                onClick={() => handleCopy(password, "password")}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"
                title="Copy to clipboard"
              >
                {copiedField === "password" ? (
                  <Check size={18} className="text-green-600" />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-textMuted mt-4 p-3 bg-bgLight rounded-lg">
        💡 <span className="font-semibold">Tip:</span> Click the eye icon to show/hide credentials. Use the copy button to quickly copy to clipboard.
      </p>
    </div>
  );
}
