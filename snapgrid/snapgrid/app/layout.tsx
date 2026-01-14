import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans, segmentA } from "@/lib/fonts";

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
        className={`${geistSans.variable} ${geistMono.variable} ${segmentA.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
