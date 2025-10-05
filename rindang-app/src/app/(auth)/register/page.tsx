// src/app/(auth)/register/page.tsx

import RegisterForm from "@/components/auth/RegisterForm";
import { createSupabaseServerClient } from "@/lib/supabase/server-auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl">
        <RegisterForm />
      </div>
    </div>
  );
}
