import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const kook = localFont({
  src: [
    {
      path: "../public/Font/Kook-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/Font/Kook-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/Font/Kook-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Font/Kook-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Font/Kook-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/Font/Kook-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-kook",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khesht KPI",
  description: "Khesht KPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${kook.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}