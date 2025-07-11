import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const add = mutation({
  args: {
    userId: v.id("users"),
    companionId: v.id("companions"),
  },
  handler: async (ctx, args) => {
    const existingBookmark = await ctx.db
      .query("bookmarks")
      .filter((q) => 
        q.and(
          q.eq(q.field("userId"), args.userId),
          q.eq(q.field("companionId"), args.companionId)
        )
      )
      .first();

    if (existingBookmark) {
      throw new Error("Bookmark already exists");
    }

    const bookmark = await ctx.db.insert("bookmarks", {
      ...args,
      updatedAt: new Date().toISOString(),
    });

    return bookmark;
  },
});

export const remove = mutation({
  args: {
    userId: v.id("users"),
    id: v.id("bookmarks"),
  },
  handler: async (ctx, args) => {
    const bookmark = await ctx.db
      .query("bookmarks")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!bookmark) {
      throw new Error("Bookmark not found");
    }

    if (bookmark.userId !== args.userId) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.id);
    return true;
  },
});

export const getForUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const bookmarks = await ctx.db
      .query("bookmarks")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    return bookmarks;
  },
});

export const getById = query({
  args: {
    id: v.id("bookmarks"),
  },
  handler: async (ctx, args) => {
    const bookmark = await ctx.db
      .query("bookmarks")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();

    if (!bookmark) {
      throw new Error("Bookmark not found");
    }

    return bookmark;
  },
});

export const getByCompanionId = query({
  args: {
    companionId: v.id("companions"),
  },
  handler: async (ctx, args) => {
    const bookmark = await ctx.db
      .query("bookmarks")
      .filter((q) => q.eq(q.field("companionId"), args.companionId))
      .first();

    return bookmark;
  },
});

export const isBookmarked = query({
  args: {
    userId: v.id("users"),
    companionId: v.id("companions"),
  },
  handler: async (ctx, args) => {
    const bookmark = await ctx.db
      .query("bookmarks")
      .filter((q) => 
        q.and(
          q.eq(q.field("userId"), args.userId),
          q.eq(q.field("companionId"), args.companionId)
        )
      )
      .first();

    return !!bookmark;
  },
});

export const updateTimestamp = mutation({
  args: {
    userId: v.id("users"),
    id: v.id("bookmarks"),
  },
  handler: async (ctx, args) => {
    const bookmark = await ctx.db
      .query("bookmarks")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();

    if (!bookmark) {
      throw new Error("Bookmark not found");
    }

    if (bookmark.userId !== args.userId) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.id, {
      updatedAt: new Date().toISOString(),
    });

    return await ctx.db
      .query("bookmarks")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();
  },
});

export const toggle = mutation({
  args: {
    userId: v.id("users"),
    companionId: v.id("companions"),
  },
  handler: async (ctx, args) => {
    const existingBookmark = await ctx.db
      .query("bookmarks")
      .filter((q) => 
        q.and(
          q.eq(q.field("userId"), args.userId),
          q.eq(q.field("companionId"), args.companionId)
        )
      )
      .first();

    if (existingBookmark) {
      await ctx.db.delete(existingBookmark._id);
      return { bookmarked: false };
    } else {
      const bookmark = await ctx.db.insert("bookmarks", {
        ...args,
        updatedAt: new Date().toISOString(),
      });
      return { bookmarked: true, id: bookmark };
    }
  },
});