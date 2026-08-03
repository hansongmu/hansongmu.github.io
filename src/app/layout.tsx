import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/content/site";

const TITLE = "한송무 - Portfolio";
const DESCRIPTION =
  "5년차 풀스택 개발자 한송무의 포트폴리오 - AI 플랫폼, 업무 앱 제작 플랫폼, PMS 등 사내 시스템 개발";

export const metadata: Metadata = {
  // metadataBase 가 있어야 openGraph.images 의 상대 경로가 절대 URL 로 확장된다.
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: TITLE,
    title: TITLE,
    description: DESCRIPTION,
    // 전용 OG 이미지가 없어 프로필 사진을 쓴다. 슬랙·카카오톡 공유 시 썸네일로 뜬다.
    images: [{ url: "/profile.png", alt: "한송무 프로필 사진" }],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/profile.png"],
  },
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
