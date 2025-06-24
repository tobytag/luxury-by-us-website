import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertSellSubmissionSchema, insertNewsletterSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all watches
  app.get("/api/watches", async (_req, res) => {
    try {
      const watches = await storage.getAllWatches();
      res.json(watches);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch watches" });
    }
  });

  // Get single watch
  app.get("/api/watches/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const watch = await storage.getWatch(id);
      if (!watch) {
        return res.status(404).json({ message: "Watch not found" });
      }
      res.json(watch);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch watch" });
    }
  });

  // Get featured watches
  app.get("/api/watches/featured", async (_req, res) => {
    try {
      const watches = await storage.getFeaturedWatches();
      res.json(watches);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured watches" });
    }
  });

  // Create inquiry
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      res.status(400).json({ message: "Invalid inquiry data" });
    }
  });

  // Create sell submission
  app.post("/api/sell-submissions", async (req, res) => {
    try {
      const validatedData = insertSellSubmissionSchema.parse(req.body);
      const submission = await storage.createSellSubmission(validatedData);
      res.status(201).json(submission);
    } catch (error) {
      res.status(400).json({ message: "Invalid submission data" });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(validatedData);
      res.status(201).json(subscription);
    } catch (error) {
      res.status(400).json({ message: "Invalid email or already subscribed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
