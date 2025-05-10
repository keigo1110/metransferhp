import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  // 基本メタデータ
  title: {
    default: "Metransfer | 波、泡沫、鼓動",
    template: "%s | Metransfer"
  },
  description: "波打つ液体から泡沫を高速に飛び立たせて立体物を実体化する、Metransferの公式サイトです。メタモルフォーゼする変身が多様な律動を刻み心を揺さぶる鼓動感を生みだします。",
  keywords: ["Metransfer", "アート", "インスタレーション", "メタモルフォーゼ", "波", "泡沫", "鼓動", "4ZIGEN"],
  authors: [
    { name: "岡空来" },
    { name: "金澤政宜" },
    { name: "中田裕紀" },
    { name: "南田桂吾" }
  ],
  creator: "Metransfer",
  publisher: "4ZIGEN",

  // アイコン設定
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: '/favicon.svg',
  },

  // OGP設定（Open Graph Protocol）
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://metransferhp.vercel.app/",
    title: "Metransfer | 波、泡沫、鼓動",
    description: "波打つ液体から泡沫を高速に飛び立たせて立体物を実体化する、Metransferの公式サイトです。",
    siteName: "Metransfer",
    images: [
      {
        url: "/og-image.jpg", // OGP画像は別途作成が必要
        width: 1200,
        height: 630,
        alt: "Metransfer - 波、泡沫、鼓動"
      }
    ]
  },

  // Twitter Card設定
  twitter: {
    card: "summary_large_image",
    title: "Metransfer | 波、泡沫、鼓動",
    description: "波打つ液体から泡沫を高速に飛び立たせて立体物を実体化する、Metransferの公式サイトです。",
    images: ["/og-image.jpg"],
    creator: "@4ZIGEN"
  },

  // ロボット制御
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },

  // 追加メタデータ
  formatDetection: {
    telephone: false
  },
  metadataBase: new URL("https://metransferhp.vercel.app/")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* JSON-LD 構造化データ */}
        <Script
          id="schema-org-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Metransfer",
              "description": "波打つ液体から泡沫を高速に飛び立たせて立体物を実体化する、Metransferの公式サイトです。",
              "url": "https://metransferhp.vercel.app/",
              "potentialAction": {
                "@type": "ViewAction",
                "target": "https://metransferhp.vercel.app/"
              },
              "author": {
                "@type": "Organization",
                "name": "4ZIGEN",
                "url": "https://4zigenhp.vercel.app/"
              },
              "creator": [
                {
                  "@type": "Person",
                  "name": "岡空来"
                },
                {
                  "@type": "Person",
                  "name": "金澤政宜",
                  "url": "https://kanassi.info/"
                },
                {
                  "@type": "Person",
                  "name": "中田裕紀",
                  "url": "https://yuki-nakata.org/"
                },
                {
                  "@type": "Person",
                  "name": "南田桂吾",
                  "url": "https://keigominamida.com/"
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
