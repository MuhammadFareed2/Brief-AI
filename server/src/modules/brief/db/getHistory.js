import briefModel from "../models/index.js";

/**
 * Get all briefs for a user
 */
export const getBriefsByUser = async (userId) => {
    try {
        const briefs = await briefModel.find({ user: userId }).sort({ createdAt: -1 });
        return briefs;
    } catch (error) {
        console.error("DB Error fetching briefs:", error);
        throw error;
    }
};
