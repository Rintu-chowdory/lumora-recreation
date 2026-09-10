import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";

/**
 * Vercel serverless entry point.
 *
 * vercel.json rewrites every /api/* request to this function (bundled by
 * esbuild into api/index.js during the Vercel build step). The Express app is
 * created lazily on the first request and reused across warm invocations.
 */
let app: Express | null = null;

async function handler(req: Request, res: Response): Promise<void> {
  if (!app) {
    const created = express();
    created.use(express.json({ limit: "50mb" }));
    created.use(express.urlencoded({ limit: "50mb", extended: true }));
    registerStorageProxy(created);
    registerOAuthRoutes(created);
    created.use(
      "/api/trpc",
      createExpressMiddleware({
        router: appRouter,
        createContext,
      })
    );
    // No static serving here: Vercel's CDN serves dist/public via the
    // vercel.json rewrites, and importing "./vite" would drag rollup's
    // platform-specific natives into the serverless bundle.
    app = created;
  }
  return void app(req, res);
}

export default handler;
