import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

type Messages = Record<string, unknown>;

function deepMerge(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base };
  for (const key of Object.keys(override)) {
    if (
      typeof override[key] === "object" &&
      override[key] !== null &&
      !Array.isArray(override[key]) &&
      typeof base[key] === "object" &&
      base[key] !== null
    ) {
      result[key] = deepMerge(base[key] as Messages, override[key] as Messages);
    } else {
      result[key] = override[key];
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const [localeMessages, fallbackMessages] = await Promise.all([
    import(`../messages/${locale}.json`).then((m) => m.default as Messages).catch(() => ({} as Messages)),
    import(`../messages/en.json`).then((m) => m.default as Messages),
  ]);

  return {
    locale,
    messages: deepMerge(fallbackMessages, localeMessages),
    onError(error) {
      if (error.code !== "MISSING_MESSAGE") throw error;
    },
    getMessageFallback({ key }: { key: string }) {
      return key;
    },
  };
});