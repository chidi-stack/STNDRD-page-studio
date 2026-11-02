export type CoachSlot = { name: string; image: string };

export type CoachSectionContent = {
  heading: string;
  coaches: CoachSlot[];
};

const DEFAULT_COACHES: CoachSlot[] = [
  {
    name: "Budda Baker",
    image:
      "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/6a15ee54c34c12a129c8f26e_Frame%202147227930.png",
  },
  {
    name: "Marcus McGhee",
    image:
      "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/6a15ee54c34c12a129c8f27e_Frame%202147227931.png",
  },
  {
    name: "Ryan Hughes",
    image:
      "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/6a15ee54c34c12a129c8f254_Frame%202147227932.png",
  },
  {
    name: "Will Tennyson",
    image:
      "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/6a15ee54c34c12a129c8f274_Frame%202147227933.png",
  },
  {
    name: "Jason House",
    image:
      "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/6a15ee54c34c12a129c8f270_Frame%202147227934.png",
  },
  {
    name: "Helen Maroulis",
    image:
      "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/6a15ee54c34c12a129c8f278_Frame%202147227972.png",
  },
  {
    name: "Christian Guzman",
    image:
      "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/6a15ee54c34c12a129c8f276_Frame%202147227973.png",
  },
  {
    name: "Chris Bumstead",
    image:
      "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/6a15ee54c34c12a129c8f272_Frame%202147227974.png",
  },
  {
    name: "Jalen Thompson",
    image:
      "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/6a15ee54c34c12a129c8f27a_Frame%202147227975.png",
  },
  {
    name: "David Laid",
    image:
      "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/6a15ee54c34c12a129c8f27c_Frame%202147227976.png",
  },
];

export function defaultCoachSectionProps(): CoachSectionContent {
  return {
    heading: "COACH TO TODAY'S MOST ELITE TEAM",
    coaches: DEFAULT_COACHES.map((c) => ({ ...c })),
  };
}

export function parseCoachSectionProps(
  raw: Record<string, unknown>,
): CoachSectionContent {
  const defaults = defaultCoachSectionProps();
  const heading =
    typeof raw.heading === "string" && raw.heading.trim()
      ? raw.heading
      : defaults.heading;
  const coachesRaw = Array.isArray(raw.coaches) ? raw.coaches : defaults.coaches;
  const coaches = defaults.coaches.map((slot, i) => {
    const item = coachesRaw[i] as Record<string, unknown> | undefined;
    return {
      name:
        typeof item?.name === "string" && item.name.trim()
          ? item.name
          : slot.name,
      image:
        typeof item?.image === "string" && item.image.trim()
          ? item.image
          : slot.image,
    };
  });
  return { heading, coaches };
}
