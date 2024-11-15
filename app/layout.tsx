import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Quick Safee",
  description: "ปรเจ็คนี้เกี่ยวกับการแจ้งอุบัติเหตุบนท้องถนนโดยการใช้กล้องวงจรปิด (CCTV) และเทคนิค Object detection เพื่อแยกระดับความรุนแรงของอุบัติเหตุที่เกิดขึ้นบนท้องถนน จากนั้นแจ้งไปยังหน่วยงานที่เกี่ยวข้องพร้อมทั้งค้นหาเส้นทางที่มีความหนาแน่นของการใช้ท้องถนนน้อยที่สุด",
};

/*************  ✨ Codeium Command ⭐  *************/
/**
 * The root layout of the application.
 *
 * This component is responsible for rendering the HTML `<body>` element,
 * as well as the root font styles.
 *
 * It also sets the `lang` attribute of the `<html>` element to `"en"`.
 *
 * @param {{ children: React.ReactNode }} props
 *   The props of the component.
 * @returns {JSX.Element}
 *   The JSX element representing the root layout.
 */
/******  e1ea94f0-7fa5-487f-9a0e-f1f2fdb23594  *******/
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
