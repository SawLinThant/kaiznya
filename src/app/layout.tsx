import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Kanaiya - Premium Skincare Products",
    template: "%s | Kanaiya"
  },
  description: "Discover premium skincare products with Kanaiya. Professional skincare solutions for healthy, radiant skin.",
  applicationName: "Kanaiya",
  authors: [{ name: "Kanaiya" }],
  keywords: ["skincare", "beauty", "cosmetics", "face care", "skin health", "premium skincare"],
  openGraph: {
    type: "website",
    siteName: "Kanaiya",
    title: "Kanaiya - Premium Skincare Products",
    description: "Discover premium skincare products with Kanaiya. Professional skincare solutions for healthy, radiant skin.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@kanaiya",
    creator: "@kanaiya",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
