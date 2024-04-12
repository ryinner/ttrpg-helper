import Link from "next/link";
import { getI18n } from "../../locales/server";

export default async function TheLogo(): Promise<JSX.Element> {
  const t = await getI18n();

  return (
    <Link href="/" className="web-text-indigo-200">
      {t("app.name")}
    </Link>
  );
}
