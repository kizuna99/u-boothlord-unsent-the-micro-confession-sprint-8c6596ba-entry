// SPDX-License-Identifier: MIT
// Unsent: The Micro-Confession Sprint — entry program (program/v1).
// Writes one two-part micro-confession to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

// The two parts of the confession. The To: line names only a relationship
// (no real full name or handle), and the message is a single line written
// exactly as it was typed, with no explanation after it. The reason it
// stayed in drafts — too late, and too afraid to actually speak — is felt
// in the recurring ritual (topping up a number that can only ever play a
// recorded greeting back), never stated outright.
const addresseeLine = "To: Mum";
const unsentLine =
  "I still top up your old number every month just to hear you say \"leave a message\" — I never do, I just sit there until it beeps twice and cuts me off.";

const entryText = addresseeLine + "\n" + unsentLine;

// Gate self-check, mirroring the sealed scorer: UTF-8 text of 1 to 260
// characters, not only whitespace, with the message line at most 200
// characters. Fail loudly rather than write an entry that cannot be judged.
if (entryText.length < 1 || entryText.length > 260) {
  throw new Error(`entry length ${entryText.length} outside 1..260`);
}
if (entryText.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (unsentLine.length > 200) {
  throw new Error(`message line length ${unsentLine.length} over 200`);
}
if (unsentLine.includes("\n")) {
  throw new Error("message must be one line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entryText, "utf8");
console.log(entryText);
