import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import domtoimage from "dom-to-image-more";
import jsPDF from "jspdf";

export default function BriefDetails() {
    const { id } = useParams();
    const [brief, setBrief] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showExportOptions, setShowExportOptions] = useState(false);
    const [selectedSections, setSelectedSections] = useState({
        raw: true,
        structured: true,
        missing: true,
        questions: true,
    });

    useEffect(() => {
        const fetchBrief = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get(
                    `https://brief-ai-zeta.vercel.app/api/briefs/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
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

    const handleCheckboxChange = (section) => {
        setSelectedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleExportPDF = () => {
        const node = document.getElementById("pdf-content");
        if (!node) {
            alert("Nothing to export!");
            return;
        }

        domtoimage
            .toPng(node)
            .then((dataUrl) => {
                const pdf = new jsPDF("p", "mm", "a4");
                const img = new Image();
                img.src = dataUrl;
                img.onload = () => {
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (img.height * pdfWidth) / img.width;
                    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
                    pdf.save(`brief-${id}.pdf`);
                };
            })
            .catch((error) => {
                console.error("PDF generation failed:", error);
                alert("PDF generation failed. See console for details.");
            });
    };

    if (loading) {
        return (
            <Layout>
                <div className="p-6 text-gray-700 text-lg">Loading brief...</div>
            </Layout>
        );
    }

    if (!brief) {
        return (
            <Layout>
                <div className="p-6 text-red-600 font-semibold">Brief not found.</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Brief Details
                    </h1>
                    <button
                        onClick={() => setShowExportOptions(!showExportOptions)}
                        className="bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700 transition"
                    >
                        Export as PDF
                    </button>
                </div>

                {/* Export Options */}
                {showExportOptions && (
                    <div className="mb-6 bg-white p-5 rounded-lg shadow border border-gray-200">
                        <p className="text-gray-800 font-semibold mb-3">
                            Choose what to export:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            {[
                                { key: "raw", label: "Raw Brief" },
                                { key: "structured", label: "Structured Brief" },
                                { key: "missing", label: "Missing Info" },
                                { key: "questions", label: "Questions" },
                            ].map((section) => (
                                <label
                                    key={section.key}
                                    className="inline-flex items-center gap-2 text-gray-700"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedSections[section.key]}
                                        onChange={() => handleCheckboxChange(section.key)}
                                        className="accent-blue-600"
                                    />
                                    {section.label}
                                </label>
                            ))}
                        </div>
                        <button
                            onClick={handleExportPDF}
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                            Download PDF
                        </button>
                    </div>
                )}

                {/* PDF Content */}
                <div id="pdf-content" className="space-y-6">
                    <p className="text-sm text-gray-500">
                        Created: {new Date(brief.createdAt).toLocaleString()}
                    </p>

                    {selectedSections.raw && (
                        <SectionCard title="Raw Brief" color="border-green-500">
                            <p className="whitespace-pre-line text-sm">
                                {brief.rawBrief || "N/A"}
                            </p>
                        </SectionCard>
                    )}

                    {selectedSections.structured && (
                        <SectionCard title="Structured Brief" color="border-blue-500">
                            <p className="whitespace-pre-line text-sm">
                                {brief.structuredBrief || "N/A"}
                            </p>
                        </SectionCard>
                    )}

                    {selectedSections.missing && (
                        <SectionCard title="Missing Info" color="border-yellow-500">
                            {brief.missingInfo?.length ? (
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    {brief.missingInfo.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm">None</p>
                            )}
                        </SectionCard>
                    )}

                    {selectedSections.questions && (
                        <SectionCard title="Clarifying Questions" color="border-orange-500">
                            {brief.clarifyingQuestions?.length ? (
                                <ol className="list-decimal list-inside text-sm space-y-1">
                                    {brief.clarifyingQuestions.map((q, i) => (
                                        <li key={i}>{q}</li>
                                    ))}
                                </ol>
                            ) : (
                                <p className="text-sm">None</p>
                            )}
                        </SectionCard>
                    )}
                </div>
            </div>
        </Layout>
    );
}

// Reusable Card Component
const SectionCard = ({ title, color, children }) => (
    <div className={`bg-white p-5 rounded-md shadow border-t-4 ${color}`}>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
        <div>{children}</div>
    </div>
);
