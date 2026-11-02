import "@/handoff/tokens/tokens.css";
import "@/handoff/components/page-studio.css";
import "@/handoff/components/section.css";
import "@/app/(studio)/editor/studio.css";
import "@/webflow/css/global.css";
import "@/app/(site)/published.css";

export const metadata = {
  title: "Page Studio · Editor",
};

export default function StudioEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
