import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserSessionsWithCompanions = query({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { userId, limit = 10 } = args;

    const sessions = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .take(limit);

  
    const sessionsWithCompanions = await Promise.all(
      sessions.map(async (session) => {
        const companion = await ctx.db.get(session.companionId);
        return {
          ...session,
          companions: companion || null,
        };
      })
    );

    // Filter out any sessions where companion wasn't found
    const validSessions = sessionsWithCompanions.filter(
      (session) => session.companions !== null
    );

    // Map to match the Supabase output format
    return validSessions.map(({ companions }) => companions);
  },
});

export const add = mutation({
  args: {
    userId: v.id("users"),
    companionId: v.id("companions"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.insert("sessions", {
      ...args,
      updatedAt: new Date().toISOString(),
    });

    return session;
  },
});

export const getForUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    return sessions;
  },
});

export const getById = query({
  args: {
    id: v.id("sessions"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();

    if (!session) {
      throw new Error("Session not found");
    }

    return session;
  },
});

export const getByCompanionId = query({
  args: {
    companionId: v.id("companions"),
  },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("companionId"), args.companionId))
      .collect();

    return sessions;
  },
});

export const getAll = query({
  handler: async (ctx) => {
    const sessions = await ctx.db
      .query("sessions")
      .collect();

    return sessions;
  },
});

export const updateTimestamp = mutation({
  args: {
    id: v.id("sessions"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();

    if (!session) {
      throw new Error("Session not found");
    }

    await ctx.db.patch(args.id, {
      updatedAt: new Date().toISOString(),
    });

    return await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();
  },
});

export const remove = mutation({
  args: {
    userId: v.id("users"),
    id: v.id("sessions"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!session) {
      throw new Error("Session not found");
    }

    await ctx.db.delete(args.id);
    return true;
  },
});