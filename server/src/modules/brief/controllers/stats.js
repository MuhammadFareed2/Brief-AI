import getBriefStatsService from "../services/stats.js";

const getBriefStatsController = async (req, res) => {
    try {
        const stats = await getBriefStatsService(req.user.id);
        res.status(200).json(stats);
    } catch (error) {
        console.error("Brief Stats Controller Error:", error);
        res.status(500).json({ error: "Failed to get brief stats." });
    }
};

export default getBriefStatsController;
