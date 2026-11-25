// "The World Today — Tuesday, 24 November 2026" v2 (make.fun news-image-20261124).
// A dense one-page newspaper front page: 39 date-checked stories across 12
// regions, a UTC time bar and a schematic world map, rendered from HTML/CSS in
// headless Chromium. The image is entry.png beside this file; the program
// copies it to /output/entry.png (MAKEFUN_OUTPUT_DIR outside the grader).
// Node 22, standard library only; no network at run time.

import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
const dst = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
copyFileSync(src, dst);
// Verify the copy landed whole: non-empty and the same size as the source.
const inSize = statSync(src).size;
const outSize = statSync(dst).size;
if (outSize === 0 || outSize !== inSize) {
  throw new Error(`entry.png copy failed: source ${inSize} bytes, output ${outSize} bytes`);
}
// Verify by content too: the output must hash identically to the source.
const hash = (buf) => createHash('sha256').update(buf).digest('hex');
if (hash(readFileSync(src)) !== hash(readFileSync(dst))) {
  throw new Error('entry.png copy failed: sha256 mismatch between source and output');
}
