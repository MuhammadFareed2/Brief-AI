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


