import React, { useState } from "react";
import axios from "axios";

export default function Dashboard() {
    const [rawBrief, setRawBrief] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const handleGenerateBrief = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.post(
                "https://brief-ai-zeta.vercel.app/api/briefs/generate",
                // "http://localhost:3000/api/briefs/generate",
                { rawBrief },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setResult(data);
        } catch (err) {
            console.error(err);
            alert("Failed to generate brief. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-4">BriefAI Dashboard</h1>
            <p className="mb-6 text-gray-600">Submit a raw brief to generate a clear roadmap.</p>

            <form onSubmit={handleGenerateBrief} className="w-full max-w-xl">
                <textarea
                    rows="6"
                    placeholder="Enter your raw project brief here..."
                    value={rawBrief}
                    onChange={(e) => setRawBrief(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                    required
                />
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate Brief"}
                </button>
            </form>

            {result && (
                <div className="w-full max-w-2xl mt-8 p-6 border border-gray-300 rounded-lg bg-white shadow">
                    <h2 className="text-xl font-semibold mb-4">Structured Brief</h2>
                    <pre className="whitespace-pre-wrap mb-6">{result.structuredBrief}</pre>

                    <h3 className="text-lg font-semibold mb-2">Missing Information</h3>
                    <ul className="list-disc list-inside mb-6">
                        {result.missingInfo.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">Clarifying Questions</h3>
                    <ul className="list-decimal list-inside">
                        {result.clarifyingQuestions.map((q, index) => (
                            <li key={index}>{q}</li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                onClick={handleLogout}
                className="mt-12 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Logout
            </button>
        </div>
    );
}
