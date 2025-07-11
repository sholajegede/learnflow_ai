import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const canCreateCompanion = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Define limits based on subscription plan
    const planLimits = {
      free: 3,
      pro: 10,
      enterprise: 100
    };

    const userPlan = user.plan || 'free';
    const limit = planLimits[userPlan] || planLimits.free;

    // If pro user, they can always create more companions
    if (userPlan === 'pro') {
      return true;
    }

    // Check if user has a custom limit (from features or other sources)
    const customLimit = user.companionLimit;
    const effectiveLimit = customLimit !== undefined ? customLimit : limit;

    // Count the user's existing companions
    const companions = await ctx.db
      .query("companions")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    const companionCount = companions.length;

    // Check if user can create more companions
    return companionCount < effectiveLimit;
  },
});

export const search = query({
  args: {
    subject: v.optional(v.string()),
    topic: v.optional(v.string()),
    page: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { subject, topic, page = 1, limit = 10 } = args;
    let query = ctx.db.query("companions");

    // Apply search filters
    if (subject && topic) {
      const subjectLower = subject.toLowerCase();
      const topicLower = topic.toLowerCase();
      
      const results = await query.collect();
      const filtered = results.filter(companion => {
        const matchesSubject = companion.subject.toLowerCase().includes(subjectLower);
        const matchesTopic = companion.topic.toLowerCase().includes(topicLower) || 
                           companion.name.toLowerCase().includes(topicLower);
        return matchesSubject && matchesTopic;
      });

      // Apply pagination
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginated = filtered.slice(start, end);

      return {
        companions: paginated,
        total: filtered.length,
        page,
        totalPages: Math.ceil(filtered.length / limit),
      };
    } 
    
    if (subject) {
      const subjectLower = subject.toLowerCase();
      const results = await query.collect();
      const filtered = results.filter(companion => 
        companion.subject.toLowerCase().includes(subjectLower)
      );

      // Apply pagination
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginated = filtered.slice(start, end);

      return {
        companions: paginated,
        total: filtered.length,
        page,
        totalPages: Math.ceil(filtered.length / limit),
      };
    } 
    
    if (topic) {
      const topicLower = topic.toLowerCase();
      const results = await query.collect();
      const filtered = results.filter(companion => 
        companion.topic.toLowerCase().includes(topicLower) || 
        companion.name.toLowerCase().includes(topicLower)
      );

      // Apply pagination
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginated = filtered.slice(start, end);

      return {
        companions: paginated,
        total: filtered.length,
        page,
        totalPages: Math.ceil(filtered.length / limit),
      };
    }

    // If no filters, just return paginated results
    const allCompanions = await query.collect();
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = allCompanions.slice(start, end);

    return {
      companions: paginated,
      total: allCompanions.length,
      page,
      totalPages: Math.ceil(allCompanions.length / limit),
    };
  },
});

export const searchForUser = query({
  args: {
    userId: v.id("users"),
    subject: v.optional(v.string()),
    topic: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, subject, topic } = args;
    let query = ctx.db.query("companions")
      .filter((q) => q.eq(q.field("userId"), userId));

    // Apply search filters
    if (subject && topic) {
      const subjectLower = subject.toLowerCase();
      const topicLower = topic.toLowerCase();
      
      const results = await query.collect();
      const filtered = results.filter(companion => {
        const matchesSubject = companion.subject.toLowerCase().includes(subjectLower);
        const matchesTopic = companion.topic.toLowerCase().includes(topicLower) || 
                           companion.name.toLowerCase().includes(topicLower);
        return matchesSubject && matchesTopic;
      });

      return {
        companions: filtered,
        total: filtered.length,
      };
    } 
    
    if (subject) {
      const subjectLower = subject.toLowerCase();
      const results = await query.collect();
      const filtered = results.filter(companion => 
        companion.subject.toLowerCase().includes(subjectLower)
      );

      return {
        companions: filtered,
        total: filtered.length,
      };
    } 
    
    if (topic) {
      const topicLower = topic.toLowerCase();
      const results = await query.collect();
      const filtered = results.filter(companion => 
        companion.topic.toLowerCase().includes(topicLower) || 
        companion.name.toLowerCase().includes(topicLower)
      );

      return {
        companions: filtered,
        total: filtered.length,
      };
    }

    const allCompanions = await query.collect();
    const paginated = allCompanions;

    return {
      companions: paginated,
      total: allCompanions.length,
    };
  },
});

export const create = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    subject: v.string(),
    topic: v.string(),
    style: v.string(),
    voice: v.string(),
    duration: v.number(),
    author: v.string(),
  },
  handler: async (ctx, args) => {
    const companion = await ctx.db.insert("companions", {
      ...args,
      updatedAt: new Date().toISOString(),
    });

    return companion;
  },
});

export const getForUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const companions = await ctx.db
      .query("companions")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    return companions;
  },
});

export const getById = query({
  args: {
    id: v.id("companions"),
  },
  handler: async (ctx, args) => {
    const companion = await ctx.db
      .query("companions")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();
    if (!companion) {
      throw new Error("Companion not found");
    }

    return companion;
  },
});

export const getAll = query({
  handler: async (ctx) => {
    const companions = await ctx.db
      .query("companions")
      .collect();

    return companions;
  },
});

export const getMultipleCompanions = query({
  args: { ids: v.array(v.id("companions")) },
  handler: async (ctx, args) => {
    const companions = await Promise.all(
      args.ids.map(id => ctx.db.get(id))
    );
    return companions.filter((companion): companion is NonNullable<typeof companion> => companion !== null);
  },
});

export const update = mutation({
  args: {
    userId: v.id("users"),
    id: v.id("companions"),
    name: v.optional(v.string()),
    subject: v.optional(v.string()),
    topic: v.optional(v.string()),
    style: v.optional(v.string()),
    voice: v.optional(v.string()),
    duration: v.optional(v.number()),
    author: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updateData } = args;
    
    const companion = await ctx.db
      .query("companions")
      .filter((q) => q.eq(q.field("_id"), id))
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    if (!companion) {
      throw new Error("Companion not found");
    }

    await ctx.db.patch(id, {
      ...updateData,
      updatedAt: new Date().toISOString(),
    });

    return await ctx.db.get(id);
  },
});

export const remove = mutation({
  args: {
    userId: v.id("users"),
    id: v.id("companions"),
  },
  handler: async (ctx, args) => {
    const companion = await ctx.db
      .query("companions")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    if (!companion) {
      throw new Error("Companion not found");
    }

    await ctx.db.delete(args.id);
    return true;
  },
});