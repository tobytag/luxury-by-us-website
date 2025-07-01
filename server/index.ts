import express, { Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes"; // Ensure this returns a promise
import { setupVite, serveStatic, log } from "./vite";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config();

const app = express();
const staticPath = path.join(__dirname, '../client/dist'); // adjust if needed

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

// Serve static assets (JS, CSS, etc.)
app.use(express.static(staticPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Configuration from environment variables with defaults
const PORT = parseInt(process.env.PORT || "3001", 10); // Default to 3001 if not specified
const HOST = process.env.HOST || "localhost"; // Default to "localhost" if not specified
const LOG_TRUNCATE_LENGTH = parseInt(process.env.LOG_TRUNCATE_LENGTH || "200", 10);

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > LOG_TRUNCATE_LENGTH) {
        logLine = `${logLine.slice(0, LOG_TRUNCATE_LENGTH - 1)}… [truncated]`;
      }

      log(logLine);
    }
  });

  next();
});

// The asynchronous IIFE to initialize the server
(async () => {
  try {
    // Initialize routes and ensure it returns a valid server instance
    const server = await registerRoutes(app);

    // Global error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      console.error(err);

      res.status(status).json({
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
      });
    });

    // Setup Vite in development or serve static assets in production
    if (app.get("env") === "development") {
      await setupVite(app, server); // Vite setup for hot reloading
    } else {
      serveStatic(app); // Serve static assets in production
    }

    // Start the server
    server.listen({ port: PORT, host: HOST }, () => {
      log(`Server running at http://${HOST}:${PORT} in ${app.get("env")} mode`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Exit with failure code
  }
})();
