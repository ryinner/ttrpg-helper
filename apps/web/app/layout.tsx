import './global.css';
import '@repo/ui/styles.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TheHeader from '../components/Layout/TheHeader';
import TheFooter from '../components/Layout/TheFooter';
import TheContent from '../components/Layout/TheContent';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TTRPG-Helper",
  description: "HELPER",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={`${inter.className} web-grid web-grid-rows-web`}>
        <TheHeader />
        <TheContent>
          {children}
        </TheContent>
        <TheFooter />
      </body>
    </html>
  );
}
