import "./../global.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TheHeader from "../../components/Layout/TheHeader";
import TheFooter from "../../components/Layout/TheFooter";
import TheMain from "../../components/Layout/TheMain";
import { getI18n } from "../../locales/server";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return {
    title: t("app.name"),
    description: t("app.description"),
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: LayoutParams;
}): JSX.Element {
  return (
    <html lang={locale}>
      <body className={`${inter.className} web-grid web-grid-rows-web`}>
        <TheHeader />
        <TheMain>{children}</TheMain>
        <TheFooter />
      </body>
    </html>
  );
}

export interface LayoutParams {
  locale: string;
  [key: string]: string | string[];
}
