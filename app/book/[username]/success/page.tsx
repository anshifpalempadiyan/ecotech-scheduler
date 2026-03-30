import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center border border-slate-100">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Meeting Confirmed!</h1>
                <p className="text-slate-500 mb-8">An invitation has been sent to your email. We look forward to seeing you.</p>
                <Link href="/" className="inline-block w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition">
                    Back to Home
                </Link>
            </div>
        </div>
    );
}