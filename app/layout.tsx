import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ciclourb",
  description: "Observatório Cicloviário de Fortaleza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
