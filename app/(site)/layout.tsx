import "@/webflow/css/global.css";
import "./published.css";

import { Providers } from "@/app/providers";
import { DevLinkFontTags } from "@/webflow/webflow_modules/DevLinkFontTags";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DevLinkFontTags />
      <Providers>{children}</Providers>
    </>
  );
}
