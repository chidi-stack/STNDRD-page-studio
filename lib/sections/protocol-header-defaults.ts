export type ProtocolHeaderContent = {
  headingTitle: string;
  paragraphText: string;
  bullet1: string;
  bullet2: string;
  bullet3: string;
  buttonText: string;
  wistiaMediaId: string;
  visibility: boolean;
};

export function defaultProtocolHeaderProps(): ProtocolHeaderContent {
  return {
    headingTitle:
      "Gain visible muscle & lose fat in 90 days - or your coach works with you another 90 days, on us.",
    paragraphText:
      "A fully remote 90-day protocol built for founders, executives, and high-output professionals who want elite results without wrecking their schedule.",
    bullet1:
      "Visible muscle gained and fat lost in 90 days, tracked against your own data.",
    bullet2:
      "A protocol your coach builds specifically for you, not a generic template.",
    bullet3:
      "Option to continue into full 1-on-1 executive coaching once you see it work.",
    buttonText: "START YOUR 90 DAY PROTOCOL",
    wistiaMediaId: "y9p6r54vjc",
    visibility: true,
  };
}

export function parseProtocolHeaderProps(
  raw: Record<string, unknown>,
): ProtocolHeaderContent {
  const d = defaultProtocolHeaderProps();
  const str = (key: keyof ProtocolHeaderContent, max = 2000) => {
    const v = raw[key];
    if (typeof v === "string" && v.trim()) {
      return v.slice(0, max);
    }
    return d[key] as string;
  };
  return {
    headingTitle: str("headingTitle", 500),
    paragraphText: str("paragraphText", 800),
    bullet1: str("bullet1", 300),
    bullet2: str("bullet2", 300),
    bullet3: str("bullet3", 300),
    buttonText: str("buttonText", 80),
    wistiaMediaId: str("wistiaMediaId", 40),
    visibility: raw.visibility !== false,
  };
}
