import { getBriefsByUser } from "../db/getHistory.js";

const getHistoryService = async (userId) => {
    try {
        const briefs = await getBriefsByUser(userId);
        return briefs;
    } catch (error) {
        console.error("BriefAI GetHistory Service Error:", error);
        throw error;
    }
};

export default getHistoryService;
