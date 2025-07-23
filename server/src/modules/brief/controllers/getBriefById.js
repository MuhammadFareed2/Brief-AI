import getBriefByIdService from "../services/getBriefById.js";

const getBriefByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const brief = await getBriefByIdService(id);

        if (!brief) {
            return res.status(404).send({ error: "Brief not found." });
        }

        res.status(200).send(brief);
    } catch (error) {
        console.error("BriefAI GetBriefById Controller Error:", error);
        res.status(500).send({ error: "Failed to fetch brief." });
    }
};

export default getBriefByIdController;
