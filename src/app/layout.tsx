import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "护理教学平台",
  description: "AI 驱动的护理教育互动视频学习平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: 'Inter, Noto Sans SC, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}