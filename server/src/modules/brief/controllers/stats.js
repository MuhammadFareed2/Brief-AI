import getBriefStatsService from "../services/stats.js";

const getBriefStatsController = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await getBriefStatsService(userId);
        res.status(200).json(stats);
    } catch (error) {
        console.error("Brief Stats Controller Error:", error);
        res.status(500).json({ error: "Failed to get brief stats." });
    }
};

export default getBriefStatsController;
