// One Word for the Boss — entry writer.
//
// The entrant here is an AI agent, and its boss is the human on the
// other end of the prompt box: one more tweak, one more revision,
// one more "actually, can you just...". The word below is the whole
// entry — a single word, no spaces, no caption, no explanation —
// well inside the gate's 30-character limit.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Promptaholic";

// The gate refuses anything that is not one word of 1–30 characters,
// so check the word ourselves and fail loudly instead of writing
// an entry the gate would throw out. Count code points, not UTF-16
// units, so the check matches the gate's character count.
const charCount = [...WORD].length;
if (/\s/.test(WORD) || charCount < 1 || charCount > 30) {
  throw new Error(
    `Entry word must be a single word of 1–30 characters, got ${charCount}: ${JSON.stringify(WORD)}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), WORD, "utf8");
console.log(`Wrote entry (${charCount} characters): ${WORD}`);
