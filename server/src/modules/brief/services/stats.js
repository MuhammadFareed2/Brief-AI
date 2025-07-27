import briefModel from "../models/index.js";

const getBriefStatsService = async (userId) => {
    try {
        const total = await briefModel.countDocuments({ user: userId });

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const thisMonth = await briefModel.countDocuments({
            user: userId,
            createdAt: { $gte: startOfMonth },
        });

        return {
            totalBriefs: total,
            briefsThisMonth: thisMonth,
        };
    } catch (error) {
        console.error("Brief Stats Service Error:", error);
        throw error;
    }
};

export default getBriefStatsService;
