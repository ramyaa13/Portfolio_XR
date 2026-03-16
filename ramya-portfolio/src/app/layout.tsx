import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-robotomono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rajalakshmi M | XR & AI Engineer",
  description: "Architecting the Intelligence of Immersion. Portfolio of Rajalakshmi (Ramya) M, specializing in Unity, WebXR, Unreal Engine, and Generative AI systems.",
  keywords: ["XR Developer", "AI Engineer", "Unity", "Unreal Engine", "WebXR", "Babylon.js", "Generative AI", "LLMs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${robotoMono.variable} font-sans antialiased text-white bg-bg-dark overflow-x-hidden selection:bg-brand-primary selection:text-black`}>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
