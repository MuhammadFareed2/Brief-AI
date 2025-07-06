import generateBriefService from "../services/generate.js";

const generateBriefController = async (req, res) => {
    try {
        const brief = await generateBriefService(req.body);
        res.status(200).send(brief);
    } catch (error) {
        console.error("BriefAI Controller Error:", error);
        res.status(500).send({ error: "Failed to generate brief." });
    }
};

export default generateBriefController;
