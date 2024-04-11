import { createI18nServer } from "next-international/server";

const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  en: () => import("./messages/en"),
  ru: () => import("./messages/ru"),
});

export { getI18n, getScopedI18n, getStaticParams };
