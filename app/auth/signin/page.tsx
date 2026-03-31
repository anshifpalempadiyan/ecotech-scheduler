"use client"
import { signIn } from "next-auth/react";
import { Clock } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";



export default function SignInPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/dashboard");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-slate-500 font-medium">Checking session...</p>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-[40px] p-12 shadow-2xl shadow-blue-100 border border-slate-100 text-center">
                {/* LOGO ICON */}
                <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-8 flex items-center justify-center rotate-3 shadow-lg shadow-blue-200">
                    <Clock className="text-white" size={32} />
                </div>

                <h1 className="text-3xl font-black text-slate-900 mb-2 italic tracking-tighter">EcoSched</h1>
                <p className="text-slate-500 mb-10 text-sm font-medium">Log in to manage your professional availability.</p>

                {/* SIGN IN BUTTON */}
                <button
                    onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                    className="w-full flex items-center justify-center gap-4 border-2 border-slate-100 py-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-blue-200 transition-all active:scale-95 cursor-pointer"
                >
                    {/* You can use an <img> for the Google G logo here */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Sign in with Google
                </button>

                <p className="mt-8 text-[10px] text-slate-400 uppercase tracking-widest font-bold">Secure Access • NextAuth</p>
            </div>
        </div>
    );
}