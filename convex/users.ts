import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";

export const create = internalMutation({
  args: {
    kindeId: v.string(),
    email: v.string(),
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
    features: v.optional(v.array(v.string())),
    companionLimit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    try {
      const newUserId = await ctx.db.insert("users", {
        kindeId: args.kindeId,
        email: args.email,
        firstName: args.firstName || "",
        lastName: args.lastName || "",
        imageUrl: args.imageUrl,
        imageStorageId: args.imageStorageId,
        paymentId: args.paymentId || "",
        plan: args.plan || 'free',
        features: args.features || [],
        companionLimit: args.companionLimit
      });
      const updatedUser = await ctx.db.get(newUserId);

      return updatedUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new ConvexError("Failed to create user.");
    }
  }
});

export const getByKindeId = internalQuery({
  args: { kindeId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("kindeId"), args.kindeId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

export const getUserKinde = query({
  args: { kindeId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("kindeId"), args.kindeId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

export const updateByKindeId = internalMutation({
  args: {
    kindeId: v.string(),
    imageUrl: v.optional(v.string()),
    email: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    paymentId: v.optional(v.string()),
    plan: v.optional(v.union(
      v.literal('free'),
      v.literal('pro'),
      v.literal('enterprise')
    )),
    features: v.optional(v.array(v.string())),
    companionLimit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("kindeId"), args.kindeId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const updateFields = {
      ...(args.kindeId !== undefined && { kindeId: args.kindeId }),
      ...(args.imageUrl !== undefined && { imageUrl: args.imageUrl }),
      ...(args.email !== undefined && { email: args.email }),
      ...(args.firstName !== undefined && { firstName: args.firstName }),
      ...(args.lastName !== undefined && { lastName: args.lastName }),
      ...(args.paymentId !== undefined && { paymentId: args.paymentId }),
      ...(args.plan !== undefined && { plan: args.plan }),
      ...(args.features !== undefined && { features: args.features }),
      ...(args.companionLimit !== undefined && { companionLimit: args.companionLimit })
    };

    await ctx.db.patch(user._id, updateFields);
    return user._id;
  },
});

export const deleteByKindeId = internalMutation({
  args: { kindeId: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("kindeId"), args.kindeId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.delete(user._id);
  },
});

export const update = mutation({
  args: {
    userId: v.id("users"),
    email: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    paymentId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const updateFields = {
      ...(args.imageUrl !== undefined && { imageUrl: args.imageUrl }),
      ...(args.imageStorageId !== undefined && { imageStorageId: args.imageStorageId }),
      ...(args.email !== undefined && { email: args.email }),
      ...(args.firstName !== undefined && { firstName: args.firstName }),
      ...(args.lastName !== undefined && { lastName: args.lastName }),
      ...(args.paymentId !== undefined && { paymentId: args.paymentId })
    };

    await ctx.db.patch(args.userId, updateFields);
    return args.userId;
  },
});

export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

export const get = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  }
});

export const deleteAndUpdateImage = mutation({
  args: {
    userId: v.id("users"),
    oldImageStorageId: v.id('_storage'),
    newImageUrl: v.string(),
    newImageStorageId: v.id("_storage")
  },
  handler: async (ctx, args) => {
    await ctx.storage.delete(args.oldImageStorageId);

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const updateProfileImage = {
      ...(args.newImageUrl !== undefined && { imageUrl: args.newImageUrl }),
      ...(args.newImageStorageId !== undefined && { imageStorageId: args.newImageStorageId })
    };

    await ctx.db.patch(args.userId, updateProfileImage);
  },
});

export const saveNewProfileImage = mutation({
  args: {
    userId: v.id("users"),
    newImageUrl: v.string(),
    newImageStorageId: v.id("_storage")
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const updateProfileImage = {
      ...(args.newImageUrl !== undefined && { imageUrl: args.newImageUrl }),
      ...(args.newImageStorageId !== undefined && { imageStorageId: args.newImageStorageId })
    };

    await ctx.db.patch(args.userId, updateProfileImage);
  },
});

export const remove = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new ConvexError("User not found");
    }

    return await ctx.db.delete(args.userId);
  },
});

export const getUrl = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query('users').order('desc').collect()
  },
});