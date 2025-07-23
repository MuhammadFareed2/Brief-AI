import briefModel from "../models/index.js";

export const getBriefById = async (briefId) => {
    try {
        const brief = await briefModel.findById(briefId);
        return brief;
    } catch (error) {
        console.error("DB Error fetching brief by ID:", error);
        throw error;
    }
};
