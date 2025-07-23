import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

export default function BriefDetails() {
    const { id } = useParams();
    const [brief, setBrief] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrief = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get(`https://brief-ai-zeta.vercel.app/api/briefs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBrief(data);
            } catch (err) {
                console.error("Error fetching brief:", err);
                alert("Could not load brief.");
            } finally {
                setLoading(false);
            }
        };

        fetchBrief();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="p-4 font-['Poppins']">
                    <h1 className="text-xl font-bold text-gray-800">Loading Brief...</h1>
                </div>
            </Layout>
        );
    }

    if (!brief) {
        return (
            <Layout>
                <div className="p-4 font-['Poppins']">
                    <h1 className="text-xl font-bold text-red-600">Brief not found</h1>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-4 font-['Poppins']">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Brief Details</h1>

                <div className="p-4 border border-gray-200 rounded-md bg-white shadow-sm">
                    <h2 className="text-lg font-semibold mb-2 text-gray-800">
                        ID: {brief._id}
                    </h2>

                    <p className="text-gray-700 mb-1">
                        <span className="font-medium">Created:</span>{" "}
                        {new Date(brief.createdAt).toLocaleString()}
                    </p>

                    <h3 className="text-md font-semibold mt-4 mb-2 text-gray-800">Raw Brief</h3>
                    <p className="text-gray-700 mb-2">{brief.rawBrief}</p>

                    <h3 className="text-md font-semibold mt-4 mb-2 text-gray-800">Structured Brief</h3>
                    <p className="text-gray-700 mb-2">{brief.structuredBrief}</p>

                    <h3 className="text-md font-semibold mt-4 mb-2 text-gray-800">Missing Information</h3>
                    <ul className="list-disc list-inside text-gray-700 mb-2">
                        {brief.missingInfo.length > 0 ? (
                            brief.missingInfo.map((item, i) => <li key={i}>{item}</li>)
                        ) : (
                            <li>None</li>
                        )}
                    </ul>

                    <h3 className="text-md font-semibold mt-4 mb-2 text-gray-800">Clarifying Questions</h3>
                    <ul className="list-decimal list-inside text-gray-700">
                        {brief.clarifyingQuestions.length > 0 ? (
                            brief.clarifyingQuestions.map((q, i) => <li key={i}>{q}</li>)
                        ) : (
                            <li>None</li>
                        )}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
