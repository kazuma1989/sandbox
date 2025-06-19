import { spawn } from "node:child_process";
import { setTimeout } from "node:timers/promises";

using _servor = spawn("npm", ["run", "servor", "--port=8001"], {
  stdio: "inherit",
});

using _sirv = spawn("npm", ["run", "sirv", "--port=9001", "--", "--host", "172.18.0.2"], {
  stdio: "inherit",
});

await setTimeout(5_000);

const result = await Promise.allSettled([
  fetch("http://localhost:8001/"),
  fetch("http://172.18.0.2:8001/"),

  fetch("http://localhost:9001/"),
  fetch("http://172.18.0.2:9001/"),
]);

console.log(...result);
