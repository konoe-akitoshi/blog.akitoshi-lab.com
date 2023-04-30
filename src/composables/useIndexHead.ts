import { config } from "../settings/site-settings";

export const useIndexHead = () => {
  return useHead({
    title: config.siteName,
    link: [
      {
        rel: "canonical",
        href: config.siteUrl,
      },
    ],
    meta: [{ name: "description", content: config.siteDescription }],
  });
};
