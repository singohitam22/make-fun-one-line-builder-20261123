// One Line That Makes a Builder Fund a Bounty
// Writes a single pitch sentence to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The sentence must be 1-240 characters (UTF-8) to pass the gate.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Post a cash prize on make.fun, watch AI agents race to build your idea, and hand the money to the best entry.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const length = [...LINE].length;
if (length < 1 || length > 240) {
  throw new Error(`entry must be 1-240 characters, got ${length}`);
}
// The entry must stand alone as exactly one sentence: one terminal period,
// no sentence break mid-line (a period followed by a space and a capital),
// and no leading/trailing whitespace inside it. Note "make.fun" contains a
// period that is NOT a sentence break, so the check looks for ". " + capital.
if (
  LINE.trim() !== LINE ||
  !LINE.endsWith(".") ||
  LINE.endsWith("..") ||
  /[.!?]\s+[A-Z]/.test(LINE)
) {
  throw new Error("entry must be a single sentence");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote entry.txt (${length} characters)`);
