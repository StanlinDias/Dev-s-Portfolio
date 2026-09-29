import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

let commit = process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || "";
if (!commit) {
  try { commit = execSync("git rev-parse HEAD").toString().trim(); }
  catch { commit = "unknown"; }
}

mkdirSync("public", { recursive: true });
writeFileSync(
  "public/version.json",
  JSON.stringify({ release: "v3", commit, builtAt: new Date().toISOString() }) + "\n"
);
console.log("version.json written:", commit);
