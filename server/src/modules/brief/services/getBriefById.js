import { getBriefById } from "../db/getBriefById.js";

const getBriefByIdService = async (briefId) => {
    try {
        const brief = await getBriefById(briefId);
        return brief;
    } catch (error) {
        console.error("BriefAI GetBriefById Service Error:", error);
        throw error;
    }
};

export default getBriefByIdService;
