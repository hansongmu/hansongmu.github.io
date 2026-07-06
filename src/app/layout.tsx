import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "한송무 - Portfolio",
  description: "5년차 풀스택 개발자 한송무의 포트폴리오 - AI 플랫폼, 업무 앱 제작 플랫폼, PMS 등 사내 시스템 개발",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Nav />
        <main className="pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
