import briefModel from "../models/index.js";

/**
 * Save new brief to MongoDB
 */
export const saveBriefToDB = async (userId, rawBrief, structuredBrief, missingInfo, clarifyingQuestions) => {
    try {
        const newBrief = new briefModel({
            user: userId,
            rawBrief,
            structuredBrief,
            missingInfo,
            clarifyingQuestions,
        });

        const savedBrief = await newBrief.save();
        return savedBrief;
    } catch (error) {
        console.error("DB Error saving brief:", error);
        throw error;
    }
};

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

/**
 * Get a brief by ID
 */
export const getBriefById = async (briefId) => {
    try {
        const brief = await briefModel.findById(briefId);
        return brief;
    } catch (error) {
        console.error("DB Error fetching brief by ID:", error);
        throw error;
    }
};
