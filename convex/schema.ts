import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    kindeId: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    paymentId: v.optional(v.string()),
    plan: v.optional(v.union(
      v.literal('free'),
      v.literal('pro'),
      v.literal('enterprise')
    )),
    features: v.optional(v.array(v.string())), // For storing individual feature flags
    companionLimit: v.optional(v.number()), // Optional: Cache the computed limit
  }),

  companions: defineTable({
    userId: v.id("users"),
    name: v.string(),
    subject: v.string(),
    topic: v.string(),
    style: v.string(),
    voice: v.string(),
    duration: v.number(),
    author: v.string(),
    updatedAt: v.string(),
  }),

  sessions: defineTable({
    userId: v.id("users"),
    companionId: v.id("companions"),
    updatedAt: v.string(),
  }),

  bookmarks: defineTable({
    userId: v.id("users"),
    companionId: v.id("companions"),
    updatedAt: v.string(),
  }),
});