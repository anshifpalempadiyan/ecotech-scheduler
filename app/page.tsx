import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  console.log(authOptions,"authoptikkdfjdjfjdjfjkdfj")
  const session = await getServerSession(authOptions);

  // 1. If already logged in, go to dashboard
  if (session) {
    redirect("/dashboard");
  }

  // 2. If NOT logged in, go DIRECTLY to sign-in
  redirect("/auth/signin");
  
  return null; 
}