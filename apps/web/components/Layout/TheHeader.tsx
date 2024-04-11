import Link from 'next/link';
import { getI18n } from '../../locales/server';
import TheContent from "./TheContent";

const navLinks = [
  {
    title: 'nav.cardsGenerator',
    link: '/cards-generator'
  }
]

export default async function TheHeader() {
  const t = await getI18n()

  return (
    <header className="web-bg-slate-900 web-text-slate-300 web-py-4">
      <TheContent>
        <div>{t('app.name')}</div>
        <nav>
          <ul>
            {navLinks.map(nl => <li key={nl.link}>
              <Link href={nl.link}>
                {t(nl.title)}
              </Link>
            </li>)}
          </ul>
        </nav>
      </TheContent>
    </header>
  );
}
