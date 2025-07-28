import briefModel from "../models/index.js";
import mongoose from "mongoose";

const getBriefStatsService = async (userId) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thirtyDaysAgo = new Date(now.getTime() - 29 * 24 * 60 * 60 * 1000);
    const fourWeeksAgo = new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000);

    const pipeline = [
        { $match: { user: new mongoose.Types.ObjectId(userId) } },
        {
            $facet: {
                totalBriefs: [{ $count: "count" }],
                briefsThisMonth: [
                    { $match: { createdAt: { $gte: startOfMonth } } },
                    { $count: "count" }
                ],
                briefsPerDayRaw: [
                    { $match: { createdAt: { $gte: thirtyDaysAgo } } },
                    {
                        $group: {
                            _id: {
                                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                            },
                            count: { $sum: 1 }
                        }
                    },
                    { $sort: { _id: 1 } }
                ],
                briefsPerWeek: [
                    { $match: { createdAt: { $gte: fourWeeksAgo } } },
                    {
                        $group: {
                            _id: {
                                year: { $isoWeekYear: "$createdAt" },
                                week: { $isoWeek: "$createdAt" }
                            },
                            count: { $sum: 1 }
                        }
                    },
                    { $sort: { "_id.year": 1, "_id.week": 1 } }
                ],
                completionRatio: [
                    {
                        $group: {
                            _id: null,
                            total: { $sum: 1 },
                            completed: {
                                $sum: {
                                    $cond: [{ $eq: ["$status", "completed"] }, 1, 0]
                                }
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            ratio: {
                                $cond: [
                                    { $eq: ["$total", 0] },
                                    0,
                                    { $round: [{ $divide: ["$completed", "$total"] }, 2] }
                                ]
                            }
                        }
                    }
                ],
                clarificationLoad: [
                    {
                        $group: {
                            _id: null,
                            avgQuestions: {
                                $avg: { $size: { $ifNull: ["$clarifyingQuestions", []] } }
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            avgQuestions: { $round: ["$avgQuestions", 1] }
                        }
                    }
                ]
            }
        }
    ];

    const result = await briefModel.aggregate(pipeline);
    const data = result[0];

    // Format past 30 days
    const fullDays = [];
    for (let i = 0; i < 30; i++) {
        const date = new Date(thirtyDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
        const iso = date.toISOString().split("T")[0]; // YYYY-MM-DD
        fullDays.push({ day: iso, count: 0 });
    }

    // Fill in counts from MongoDB result
    const raw = data.briefsPerDayRaw || [];
    const countMap = {};
    raw.forEach((entry) => {
        countMap[entry._id] = entry.count;
    });

    const briefsPerDay = fullDays.map((entry) => ({
        day: entry.day,
        count: countMap[entry.day] || 0
    }));

    return {
        totalBriefs: data.totalBriefs[0]?.count || 0,
        briefsThisMonth: data.briefsThisMonth[0]?.count || 0,
        briefsPerDay,
        briefsPerWeek: (data.briefsPerWeek || []).map((w) => ({
            week: `W${w._id.week}`,
            count: w.count,
        })),
        briefCompletionRatio: data.completionRatio[0]?.ratio || 0,
        clarificationLoadPerBrief: data.clarificationLoad[0]?.avgQuestions || 0
    };
};

export default getBriefStatsService;
