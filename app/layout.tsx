import type { Metadata } from "next";
import { Noto_Sans_JP, Quicksand } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahoroba Bakery Orders",
  description:
    "Full-stack bakery ordering system inspired by Mahoroba Japanese Bakery workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSansJP.variable} ${quicksand.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
