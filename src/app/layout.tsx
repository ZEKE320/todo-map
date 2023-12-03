import "@fontsource-variable/noto-sans-jp/";
import type { Metadata } from "next";
import { NextFont } from "next/dist/compiled/@next/font";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.scss";

const notoSansJp: NextFont = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Todo Map",
  description: "Todoリストを地図として表示するアプリケーション",
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={notoSansJp.className}>{children}</body>
    </html>
  );
}
