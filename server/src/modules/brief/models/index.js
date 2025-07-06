import mongoose, { Schema } from "mongoose";

const briefSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rawBrief: {
            type: String,
            required: true,
        },
        structuredBrief: {
            type: String,
        },
        missingInfo: {
            type: [String],
            default: [],
        },
        clarifyingQuestions: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

const briefModel = mongoose.model("Brief", briefSchema);
export default briefModel;
