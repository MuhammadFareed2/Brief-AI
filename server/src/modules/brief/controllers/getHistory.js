import getHistoryService from "../services/getHistory.js";

const getHistoryController = async (req, res) => {
    try {
        const userId = req.user.id;

        const briefs = await getHistoryService(userId);

        res.status(200).send(briefs);
    } catch (error) {
        console.error("BriefAI GetHistory Controller Error:", error);
        res.status(500).send({ error: "Failed to fetch brief history." });
    }
};

export default getHistoryController;
