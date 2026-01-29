import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans, urbanist, inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "SnapGrid",
  description: "Photobooth taking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} ${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
