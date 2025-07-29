import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    pdf,
} from "@react-pdf/renderer";
import Loader from "../components/Loader";

// PDF styles
const pdfStyles = StyleSheet.create({
    page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
    section: { marginBottom: 20 },
    title: { fontSize: 16, marginBottom: 8, fontWeight: "bold" },
    listItem: { marginLeft: 10, marginBottom: 4 },
});

// Memoized PDF component
const BriefPDF = React.memo(({ brief, selectedSections }) => (
    <Document>
        <Page size="A4" style={pdfStyles.page}>
            <Text>Brief Created: {new Date(brief.createdAt).toLocaleString()}</Text>

            {selectedSections.raw && (
                <View style={pdfStyles.section}>
                    <Text style={pdfStyles.title}>Raw Brief</Text>
                    <Text>{brief.rawBrief || "N/A"}</Text>
                </View>
            )}

            {selectedSections.structured && (
                <View style={pdfStyles.section}>
                    <Text style={pdfStyles.title}>Structured Brief</Text>
                    <Text>{brief.structuredBrief || "N/A"}</Text>
                </View>
            )}

            {selectedSections.missing && (
                <View style={pdfStyles.section}>
                    <Text style={pdfStyles.title}>Missing Information</Text>
                    {brief.missingInfo?.length ? (
                        brief.missingInfo.map((item, i) => (
                            <Text key={i} style={pdfStyles.listItem}>• {item}</Text>
                        ))
                    ) : (
                        <Text>None</Text>
                    )}
                </View>
            )}

            {selectedSections.questions && (
                <View style={pdfStyles.section}>
                    <Text style={pdfStyles.title}>Clarifying Questions</Text>
                    {brief.clarifyingQuestions?.length ? (
                        brief.clarifyingQuestions.map((q, i) => (
                            <Text key={i} style={pdfStyles.listItem}>{i + 1}. {q}</Text>
                        ))
                    ) : (
                        <Text>None</Text>
                    )}
                </View>
            )}
        </Page>
    </Document>
));

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

    const handleManualDownload = async () => {
        const doc = (
            <BriefPDF brief={brief} selectedSections={selectedSections} />
        );
        const blob = await pdf(doc).toBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `brief-${id}.pdf`;
        a.click();
    };

    if (loading) {
        return (
            <>
                <Loader fullscreen />
            </>
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Brief Details</h1>
                    <button
                        onClick={() => setShowExportOptions(!showExportOptions)}
                        className="bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700 transition"
                    >
                        Export as PDF
                    </button>
                </div>

                {showExportOptions && (
                    <div className="mb-6 bg-white p-5 rounded-lg shadow border border-gray-200">
                        <p className="text-gray-800 font-semibold mb-3">Choose what to export:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            {["raw", "structured", "missing", "questions"].map((key) => (
                                <label key={key} className="inline-flex items-center gap-2 text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={selectedSections[key]}
                                        onChange={() => handleCheckboxChange(key)}
                                        className="accent-blue-600"
                                    />
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </label>
                            ))}
                        </div>

                        <div className="mt-4">
                            <button
                                onClick={handleManualDownload}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                            >
                                Download PDF
                            </button>
                        </div>
                    </div>
                )}

                <div className="space-y-6">
                    <p className="text-sm text-gray-500">
                        Created: {new Date(brief.createdAt).toLocaleString()}
                    </p>

                    {selectedSections.raw && (
                        <SectionCard title="Raw Brief" color="border-green-500">
                            <p className="whitespace-pre-line text-sm">{brief.rawBrief || "N/A"}</p>
                        </SectionCard>
                    )}

                    {selectedSections.structured && (
                        <SectionCard title="Structured Brief" color="border-blue-500">
                            <p className="whitespace-pre-line text-sm">{brief.structuredBrief || "N/A"}</p>
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

const SectionCard = ({ title, color, children }) => (
    <div className={`bg-white p-5 rounded-md shadow border-t-4 ${color}`}>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
        <div>{children}</div>
    </div>
);
