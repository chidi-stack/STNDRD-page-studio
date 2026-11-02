let sectionCounter = 0;

export function newSectionId(): string {
  sectionCounter += 1;
  return `s${Date.now().toString(36)}${sectionCounter}`;
}

export function newPageId(): string {
  return `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}
