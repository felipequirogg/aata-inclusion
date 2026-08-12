import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AATA Inclusion",
  description: "Muy pronto vas a poder encontrar acá toda la información.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
