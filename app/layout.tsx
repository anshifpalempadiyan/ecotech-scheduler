import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoTech Scheduler",
  description: "Professional scheduling platform for 4N EcoTech",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white text-slate-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;