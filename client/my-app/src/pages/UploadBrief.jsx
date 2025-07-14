import React, { useState } from "react";
import axios from "axios";
import ScrollContainer from "react-indiana-drag-scroll";
import Layout from "../components/Layout";

export default function UploadBrief() {
    const [rawBrief, setRawBrief] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGenerateBrief = async () => {
        setLoading(true);
        setResult(null);

        try {
            const token = localStorage.getItem("token");

            console.log("📌 Token used for /generate:", token);

            const { data } = await axios.post(
                "https://brief-ai-zeta.vercel.app/api/briefs/generate",
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
        <Layout>
            <div className="w-full h-full flex flex-col gap-4 p-4 font-['Poppins'] box-border">
                {/* Stepper */}
                <ScrollContainer
                    className="md:w-full flex scroll-w-fix p-2 rounded-lg bg-gray-100 cursor-grab"
                    vertical={false}
                    hideScrollbars={true}
                >
                    {/* Step 1 */}
                    <div className="flex-shrink-0 flex items-center justify-center w-48 h-16 p-2 rounded-md text-xs border bg-blue-100 border-blue-800">
                        1️⃣ Enter Raw Brief
                    </div>

                    {/* Connector */}
                    <div className="flex items-center flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-gray-600"></div>
                        <div className="h-[1.5px] w-20 bg-gray-600"></div>
                        <div className="h-2 w-2 rounded-full bg-gray-600"></div>
                        <button
                            onClick={handleGenerateBrief}
                            disabled={!rawBrief || loading}
                            className={`flex items-center justify-center w-48 h-16 p-2 rounded-md text-xs border ${rawBrief && !loading
                                ? "bg-blue-600 text-white cursor-pointer"
                                : "bg-blue-100 text-black cursor-not-allowed"
                                } border-blue-800`}
                        >
                            {loading ? "Generating..." : "2️⃣ Generate Structured Brief"}
                        </button>
                    </div>

                    {result && (
                        <div className="flex items-center flex-shrink-0">
                            <div className="h-2 w-2 rounded-full bg-gray-600"></div>
                            <div className="h-[1.5px] w-20 bg-gray-600"></div>
                            <div className="h-2 w-2 rounded-full bg-gray-600"></div>
                            <div className="flex items-center justify-center w-48 h-16 p-2 rounded-md text-xs border bg-green-200 border-green-800">
                                ✅ Brief Ready!
                            </div>
                        </div>
                    )}
                </ScrollContainer>

                {/* Input + Output */}
                <div className="flex md:flex-row flex-col gap-4">
                    {/* Input */}
                    <div className="flex flex-col gap-2 md:w-1/2 w-full">
                        <textarea
                            rows="8"
                            placeholder="Enter your raw project brief..."
                            value={rawBrief}
                            onChange={(e) => setRawBrief(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    {/* Output */}
                    <div className="flex flex-col gap-4 md:w-1/2 w-full">
                        {result && (
                            <>
                                <div className="p-4 border border-gray-300 rounded-lg bg-white shadow">
                                    <h2 className="text-lg font-semibold mb-2">📌 Structured Brief</h2>
                                    <pre className="whitespace-pre-wrap">{result.structuredBrief}</pre>
                                </div>

                                <div className="p-4 border border-gray-300 rounded-lg bg-white shadow">
                                    <h3 className="text-md font-semibold mb-2">❌ Missing Information</h3>
                                    <ul className="list-disc list-inside">
                                        {result.missingInfo.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-4 border border-gray-300 rounded-lg bg-white shadow">
                                    <h3 className="text-md font-semibold mb-2">❓ Clarifying Questions</h3>
                                    <ul className="list-decimal list-inside">
                                        {result.clarifyingQuestions.map((q, idx) => (
                                            <li key={idx}>{q}</li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
