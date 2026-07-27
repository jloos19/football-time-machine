import type { CanonicalMatch } from "./types";

export function serializeCanonicalMatches(
  exportName: string,
  matches: CanonicalMatch[]
): string {
  const plain = JSON.parse(JSON.stringify(matches)) as CanonicalMatch[];
  let body = JSON.stringify(plain, null, 2);
  body = body.replace(
    /"stage": "(Group Stage|Round of 16|Quarter-final|Semi-final|Third-place play-off|Final)"/g,
    '"stage": "$1" as const'
  );
  body = body.replace(
    /"provider": "(FIFA|Official broadcaster|Dailymotion|YouTube)"/g,
    '"provider": "$1" as const'
  );
  body = body.replace(
    /"packageKind": "(highlights|extended-highlights)"/g,
    '"packageKind": "$1" as const'
  );
  return `import type { CanonicalMatch } from "../types";\n\nexport const ${exportName}: CanonicalMatch[] = ${body};\n`;
}
