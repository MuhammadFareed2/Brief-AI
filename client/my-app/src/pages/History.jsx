import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function History() {
    const [briefs, setBriefs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBriefs = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get("https://brief-ai-zeta.vercel.app/api/briefs/history", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
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
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">📚 Your Brief History</h1>

                {loading && <p>Loading briefs...</p>}

                {!loading && briefs.length === 0 && (
                    <p>No briefs found. Create some briefs to see them here!</p>
                )}

                <div className="flex flex-col gap-4">
                    {briefs.map((brief) => (
                        <div
                            key={brief._id}
                            className="p-4 border border-gray-300 rounded-lg bg-white shadow"
                        >
                            <h2 className="text-lg font-semibold mb-2">
                                🗂️ Brief ID: {brief._id}
                            </h2>
                            <p className="text-gray-700 mb-2">
                                <strong>Created At:</strong>{" "}
                                {new Date(brief.createdAt).toLocaleString()}
                            </p>
                            <p className="text-gray-800 mb-2">
                                <strong>Raw Brief:</strong> {brief.rawBrief.slice(0, 100)}...
                            </p>
                            <p className="text-gray-800 mb-2">
                                <strong>Structured:</strong>{" "}
                                {brief.structuredBrief.slice(0, 100)}...
                            </p>
                            <p className="text-gray-600 text-sm">
                                ❓ {brief.clarifyingQuestions.length} clarifying questions · ❌{" "}
                                {brief.missingInfo.length} missing info
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
