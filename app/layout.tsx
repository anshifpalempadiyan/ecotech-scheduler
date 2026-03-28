import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./componenets/AuthProvider";
import Navbar from "./componenets/Navbar"
export const metadata: Metadata = {
  title: "EcoTech Scheduler",
  description: "Professional scheduling platform for 4N EcoTech",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white text-slate-900" suppressHydrationWarning>
        <AuthProvider>
          <div className="min-h-screen flex flex-col ">
            <Navbar />
            <main className="flex-grow">
              { children }
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;


