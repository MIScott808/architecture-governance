import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Architecture Governance | Mana Platform",
  description: "Cross-cutting governance layer for the Mana Platform — artifact registry, conflict detection, compliance tracking, and ADM cycle management.",
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return <>{children}</>;
  }
  return <ClerkProvider>{children}</ClerkProvider>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="antialiased">
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
