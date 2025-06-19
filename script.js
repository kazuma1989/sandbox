import { spawn } from "node:child_process";
import { setTimeout } from "node:timers/promises";

spawn("npm", ["run", "servor", "--port=8001"], {
  stdio: "inherit",
});

spawn("npm", ["run", "sirv", "--port=9001"], {
  stdio: "inherit",
});

await setTimeout(5_000);

const result = await Promise.allSettled([
  fetch("http://localhost:8001/"),
  fetch("http://localhost:9001/"),
]);

console.log(...result);
