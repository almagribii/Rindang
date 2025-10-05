// app/(auth)/login/page.tsx (Server Component)

import RegisterForm from '@/components/auth/RegisterForm'
import { createSupabaseServerClient } from "@/lib/supabase/server-auth"; 

import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getSession()

  if (data.session) {
    redirect('/dashboard') 
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl">
        <RegisterForm />
      </div>
    </div>
  )
}