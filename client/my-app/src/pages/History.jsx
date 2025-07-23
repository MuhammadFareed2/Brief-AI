import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Link } from "react-router-dom"; // ✅ Add this

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
            <div className="p-4 font-['Poppins']">
                <h1 className="text-[20px] font-bold mb-4 text-gray-800">
                    Your Brief History
                </h1>

                {loading && (
                    <p className="text-[14px] text-gray-600">Loading briefs...</p>
                )}

                {!loading && briefs.length === 0 && (
                    <p className="text-[14px] text-gray-600">
                        No briefs found. Create some briefs to see them here.
                    </p>
                )}

                <div className="flex flex-col gap-4">
                    {briefs.map((brief) => (
                        <Link // ✅ Use Link instead of div
                            key={brief._id}
                            to={`/briefs/${brief._id}`}
                            className="p-4 border border-gray-200 rounded-md bg-white shadow-sm hover:shadow-md transition-shadow block"
                        >
                            <h2 className="text-[16px] font-semibold mb-2 text-gray-800">
                                Brief ID: {brief._id}
                            </h2>

                            <p className="text-[14px] text-gray-700 mb-1">
                                <span className="font-medium">Created:</span>{" "}
                                {new Date(brief.createdAt).toLocaleString()}
                            </p>

                            <p className="text-[14px] text-gray-700 mb-1">
                                <span className="font-medium">Raw Brief:</span>{" "}
                                {brief.rawBrief.slice(0, 100)}...
                            </p>

                            <p className="text-[14px] text-gray-700 mb-1">
                                <span className="font-medium">Structured:</span>{" "}
                                {brief.structuredBrief.slice(0, 100)}...
                            </p>

                            <p className="text-[13px] text-gray-600">
                                {brief.clarifyingQuestions.length} clarifying questions ·{" "}
                                {brief.missingInfo.length} missing info
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
