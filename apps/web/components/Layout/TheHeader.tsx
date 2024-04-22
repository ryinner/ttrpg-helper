import { getI18n } from "../../locales/server";
import TheContent from "./TheContent";
import TheLogo from "./TheLogo";
import TheNavigation from "./TheNavigation";
import { NavigationLink } from "./NavigationLink";

const navLinks = [
  {
    title: "nav.cardsGenerator",
    link: "/cards-generator",
  },
];

export default async function TheHeader() {
  const t = await getI18n();

  return (
    <header className="web-bg-slate-900 web-text-slate-300 web-py-4 print:web-hidden">
      <TheContent className="web-flex web-justify-between">
        <TheLogo />
        <TheNavigation>
          <ul className="web-flex">
            {navLinks.map((nl) => (
              <li key={nl.link}>
                <NavigationLink href={nl.link}>{t(nl.title)}</NavigationLink>
              </li>
            ))}
          </ul>
        </TheNavigation>
      </TheContent>
    </header>
  );
}
