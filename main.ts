// The Tired Dark Lord: A 100-Word Villain Monologue
// A dark lord who has ruled for centuries — siege of Aldermere, seven
// copies of the same prophecy — offers the hero his whole damp kingdom
// and keeps only the library and the good chair. The tiredness lives in
// the pauses, the deflections ("Not surrendering. Delegating.") and the
// small domestic details (a loose step, a throne that bites), never in
// a plain statement that he is weary. He is still a villain: he read
// the prophecy, he is handing over a kingdom, and the ravens answer to him.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Come in. Mind the third step. It has been loose since the siege of Aldermere, and I have meant to fix it for forty years. Sit. Not the throne. That one bites.\n" +
  "\n" +
  "You came to slay me, yes? Of course you did. The prophecy, the sword, the dramatic entrance.\n" +
  "\n" +
  "Here is the thing no bard writes down. I have read your prophecy. All seven copies. The ink changes. The hero doesn't. So, a proposal. Take the crown. Take the keys, the ravens, the kingdom. I will keep the library and the good chair.\n" +
  "\n" +
  "No. Not surrendering. Delegating. Ask the ravens.";

// Gate: /output/entry.txt must be UTF-8 text of 1-600 characters, not
// only white space. The brief asks for about 100 words, so check both.
// Word count uses the same whitespace split the scorer's word measure
// implies: every run of non-whitespace characters is one word.
function validateEntry(text: string): number {
  const words = text.trim().split(/\s+/);
  if (text.length === 0 || text.length > 600 || text.trim().length === 0) {
    throw new Error(`entry must be 1-600 chars (got ${text.length})`);
  }
  if (words.length < 90 || words.length > 110) {
    throw new Error(`entry must be about 100 words (got ${words.length})`);
  }
  // The tiredness must be felt, never announced: refuse any plain
  // statement of weariness so the entry cannot fail criterion 2.
  if (/\b(tired|weary|exhausted|fatigued)\b/i.test(text)) {
    throw new Error("entry must not plainly state the villain is weary");
  }
  return words.length;
}

const wordCount = validateEntry(ENTRY);

// Never delete /output: the grader mounts it as a bind mount. Create it
// if missing, then write the entry exactly — no trailing newline, the
// gate counts every character.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
