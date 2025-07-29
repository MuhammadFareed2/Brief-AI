import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function History() {
    const [briefs, setBriefs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBriefs = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get(
                    "https://brief-ai-zeta.vercel.app/api/briefs/history",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setBriefs(data);
            } catch (error) {
                console.error("Error fetching briefs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBriefs();
    }, []);

    return (
        <Layout>
            <div className="w-full min-h-screen px-6 py-8 font-sans">
                <h1 className="text-2xl font-bold mb-6 text-gray-900">
                    Your Brief History
                </h1>

                {loading && (
                    <p className="text-gray-600 text-sm">Loading briefs...</p>
                )}

                {!loading && briefs.length === 0 && (
                    <p className="text-gray-600 text-sm">
                        No briefs found. Start by creating one.
                    </p>
                )}

                <div className="flex flex-col gap-4">
                    {briefs.map((brief) => (
                        <Link
                            key={brief._id}
                            to={`/briefs/${brief._id}`}
                            className="bg-white p-5 border border-gray-200 rounded-md shadow-sm hover:shadow-md hover:border-blue-500 transition-all"
                        >
                            <p className="text-sm text-gray-500 mb-1">
                                Created on: {new Date(brief.createdAt).toLocaleString()}
                            </p>

                            <p className="text-gray-800 text-sm mb-1 line-clamp-2">
                                <span className="font-medium">Raw:</span>{" "}
                                {brief.rawBrief || "N/A"}
                            </p>

                            <p className="text-gray-800 text-sm mb-1 line-clamp-2">
                                <span className="font-medium">Structured:</span>{" "}
                                {brief.structuredBrief || "N/A"}
                            </p>

                            <p className="text-xs text-gray-600">
                                {brief.clarifyingQuestions?.length || 0} clarifying questions ·{" "}
                                {brief.missingInfo?.length || 0} missing info
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>

    );
}
