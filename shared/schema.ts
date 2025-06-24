import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const watches = pgTable("watches", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  price: integer("price").notNull(), // Price in Naira
  category: text("category").notNull(),
  condition: text("condition").notNull(),
  year: integer("year").notNull(),
  image: text("image").notNull(),
  movement: text("movement").notNull(),
  caseMaterial: text("case_material").notNull(),
  caseSize: text("case_size").notNull(),
  waterResistance: text("water_resistance").notNull(),
  description: text("description").notNull(),
  featured: boolean("featured").default(false),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  watchId: integer("watch_id").references(() => watches.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message"),
  createdAt: text("created_at").notNull(),
});

export const sellSubmissions = pgTable("sell_submissions", {
  id: serial("id").primaryKey(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  year: integer("year"),
  condition: text("condition").notNull(),
  hasBox: boolean("has_box").default(false),
  hasPapers: boolean("has_papers").default(false),
  hasServiceRecords: boolean("has_service_records").default(false),
  description: text("description"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  createdAt: text("created_at").notNull(),
});

export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: text("subscribed_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWatchSchema = createInsertSchema(watches).omit({
  id: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export const insertSellSubmissionSchema = createInsertSchema(sellSubmissions).omit({
  id: true,
  createdAt: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletters).omit({
  id: true,
  subscribedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Watch = typeof watches.$inferSelect;
export type InsertWatch = z.infer<typeof insertWatchSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type SellSubmission = typeof sellSubmissions.$inferSelect;
export type InsertSellSubmission = z.infer<typeof insertSellSubmissionSchema>;
export type Newsletter = typeof newsletters.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
