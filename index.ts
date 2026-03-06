import { createServer, IncomingMessage, ServerResponse } from "http";
import dotenv from "dotenv";
import { handleAsk } from "./api/ask";
import { handleQuiz } from "./api/quiz";
import { handleProgress } from "./api/progress";

dotenv.config();

const port = Number(process.env.PORT ?? 3001);

function sendJson(res: ServerResponse, status: number, payload: unknown): void {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
  });
  res.end(JSON.stringify(payload));
}

async function parseBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {};

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return {};
  }
}

const server = createServer(async (req, res) => {
  const method = req.method ?? "GET";
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);

  if (method === "OPTIONS") {
    return sendJson(res, 204, {});
  }

  if (method === "GET" && url.pathname === "/health") {
    return sendJson(res, 200, { status: "ok" });
  }

  if (method === "POST" && url.pathname === "/ask") {
    const result = await handleAsk(await parseBody(req));
    return sendJson(res, result.status, result.payload);
  }

  if (method === "POST" && url.pathname === "/quiz") {
    const result = handleQuiz(await parseBody(req));
    return sendJson(res, result.status, result.payload);
  }

  if (method === "GET" && url.pathname === "/progress") {
    const result = handleProgress(url);
    return sendJson(res, result.status, result.payload);
  }

  return sendJson(res, 404, { error: "Not Found" });
});

server.listen(port, () => {
  console.log(`Learny API listening on http://localhost:${port}`);
});
