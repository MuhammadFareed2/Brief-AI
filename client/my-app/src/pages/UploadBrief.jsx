import React, { useState, useEffect } from "react";
import axios from "axios";
import ScrollContainer from "react-indiana-drag-scroll";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

export default function UploadBrief() {
    const [rawBrief, setRawBrief] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleGenerateBrief = async () => {
        setLoading(true);
        setResult(null);
        try {
            const token = localStorage.getItem("token");
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
            fetchHistory();
        } catch (err) {
            console.error(err);
            setModalMessage("Failed to generate brief. Check console for details.");
            setModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const fetchHistory = async () => {
        try {
            setHistoryLoading(true);
            const token = localStorage.getItem("token");
            const { data } = await axios.get(
                "https://brief-ai-zeta.vercel.app/api/briefs/history",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setHistory(data);
        } catch (err) {
            console.error("Error fetching history:", err);
        } finally {
            setHistoryLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <Layout>
            {modalOpen && (
                <Modal
                    title="Error"
                    body={modalMessage}
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
            )}

            <div className="w-full h-full flex flex-col gap-4 py-4 px-4 font-['Poppins'] box-border">
                {/* Stepper */}
                <ScrollContainer
                    className="md:w-full flex scroll-w-fix p-2 rounded-lg bg-gray-200 cursor-grab"
                    vertical={false}
                    hideScrollbars={true}
                >
                    <div
                        className={`flex-shrink-0 flex items-center justify-center w-40 h-14 p-2 rounded-md text-[10px] border-[1px] ${rawBrief
                            ? "bg-green-100 border-green-700"
                            : "bg-gray-100 border-gray-400"
                            }`}
                    >
                        {rawBrief ? "Brief Added" : "Enter Raw Brief"}
                    </div>

                    <div className="flex items-center flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-gray-600"></div>
                        <div className="h-[1.5px] w-20 bg-gray-600"></div>
                        <div className="h-2 w-2 rounded-full bg-gray-600"></div>

                        <button
                            onClick={handleGenerateBrief}
                            disabled={!rawBrief || loading}
                            className={`flex items-center justify-center w-40 h-14 p-2 rounded-md text-[10px] border-[1px] ${!rawBrief || loading
                                ? "bg-blue-100 text-gray-500 border-blue-300 cursor-not-allowed"
                                : "bg-blue-600 text-white border-blue-800 hover:bg-blue-700 cursor-pointer"
                                }`}
                        >
                            {loading ? "Generating..." : "Generate Structured Brief"}
                        </button>
                    </div>

                    {result && (
                        <div className="flex items-center flex-shrink-0">
                            <div className="h-2 w-2 rounded-full bg-gray-600"></div>
                            <div className="h-[1.5px] w-20 bg-gray-600"></div>
                            <div className="h-2 w-2 rounded-full bg-gray-600"></div>

                            <div className="flex items-center justify-center w-40 h-14 p-2 rounded-md text-[10px] border-[1px] bg-green-100 border-green-700">
                                Structured Brief Ready
                            </div>
                        </div>
                    )}
                </ScrollContainer>

                {/* Main Grid */}
                <div className="flex md:flex-row flex-col gap-4">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4 md:w-[30%] w-full">
                        <div>
                            <label
                                htmlFor="rawBrief"
                                className="text-[12px] font-medium text-gray-700"
                            >
                                Raw Brief
                            </label>
                            <textarea
                                id="rawBrief"
                                rows="8"
                                placeholder="Paste your raw project brief here..."
                                value={rawBrief}
                                onChange={(e) => setRawBrief(e.target.value)}
                                className="w-full p-4 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Brief History */}
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[12px] font-semibold text-gray-700">
                                Recent Briefs
                            </h2>

                            {historyLoading ? (
                                <Loader />
                            ) : history.length === 0 ? (
                                <p className="text-[12px] text-gray-500">No briefs yet.</p>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {history.slice(0, 5).map((brief) => (
                                        <Link
                                            key={brief._id}
                                            to={`/briefs/${brief._id}`}
                                            className="text-[12px] text-blue-600 hover:underline border border-gray-200 rounded-md p-2 bg-white shadow-sm"
                                        >
                                            {brief.rawBrief.slice(0, 40)}...
                                        </Link>
                                    ))}
                                    <Link
                                        to="/history"
                                        className="text-[12px] text-blue-600 hover:underline mt-2"
                                    >
                                        See all briefs →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-2 md:w-[70%] w-full">
                        {result && (
                            <>
                                <div className="p-4 border border-gray-200 rounded-md bg-white shadow-sm">
                                    <h2 className="text-[13px] font-semibold mb-2 text-gray-800">
                                        Structured Brief
                                    </h2>
                                    <p className="text-[12px] text-gray-700 whitespace-pre-wrap">
                                        {result.structuredBrief}
                                    </p>
                                </div>

                                <div className="p-4 border border-gray-200 rounded-md bg-white shadow-sm">
                                    <h3 className="text-[13px] font-semibold mb-2 text-gray-800">
                                        Missing Information
                                    </h3>
                                    <ul className="list-disc list-inside text-[12px] text-gray-700">
                                        {result.missingInfo.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-4 border border-gray-200 rounded-md bg-white shadow-sm">
                                    <h3 className="text-[13px] font-semibold mb-2 text-gray-800">
                                        Clarifying Questions
                                    </h3>
                                    <ul className="list-decimal list-inside text-[12px] text-gray-700">
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
