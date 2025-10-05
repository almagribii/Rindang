
import LoginForm from "@/components/auth/LoginForm";
import { createSupabaseServerClient } from "@/lib/supabase/server-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    redirect("/dashboard");
  }

  return (
    <div className="justify-center flex">
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl">
        <LoginForm />
      </div>
    </div>
  );
}
