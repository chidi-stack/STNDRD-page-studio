import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "STNDRD Page Studio",
  description: "Landing page editor and public pages",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
