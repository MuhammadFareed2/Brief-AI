import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import axios from "axios";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line
} from "recharts";

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const { data } = await axios.get("https://brief-ai-zeta.vercel.app/api/briefs/stats", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch stats:", error);
                setModalMessage("Failed to load stats.");
                setModalOpen(true);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <Layout>
            {loading && <Loader fullscreen />}
            <Modal
                title="Error"
                body={modalMessage}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />

            <div className="mb-6 px-4">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
            </div>

            {!loading && stats ? (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 px-4">
                        <StatCard title="Total Briefs" value={stats.totalBriefs} color="bg-blue-500" />
                        <StatCard title="This Month" value={stats.briefsThisMonth} color="bg-green-500" />
                        <StatCard title="Avg. Follow-up Questions" value={stats.clarificationLoadPerBrief || 0} color="bg-yellow-500" />
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 pb-10">
                        {/* Bar Chart - Last 30 Days */}
                        <div className="bg-white p-6 rounded-lg shadow-md border overflow-x-auto">
                            <h3 className="text-lg font-semibold mb-4">Briefs Per Day (Last 30 Days)</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart
                                    data={stats.briefsPerDay || []}
                                    margin={{ top: 5, right: 30, left: 10, bottom: 30 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="day"
                                        angle={-45}
                                        textAnchor="end"
                                        tickFormatter={(d) => {
                                            const date = new Date(d);
                                            return date.toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short"
                                            });
                                        }}
                                        height={50}
                                    />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Line Chart - Weekly Briefs */}
                        <div className="bg-white p-6 rounded-lg shadow-md border">
                            <h3 className="text-lg font-semibold mb-4">Briefs Per Week (Last 4 Weeks)</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart
                                    data={stats.briefsPerWeek || []}
                                    margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="week" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="count" stroke="#ef4444" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            ) : !loading ? (
                <p className="text-red-500 px-4">No stats found.</p>
            ) : null}
        </Layout>
    );
}

function StatCard({ title, value, color }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border flex flex-col justify-between">
            <div>
                <h4 className="text-gray-500 text-sm">{title}</h4>
                <h2 className="text-2xl font-bold mt-2">{value ?? "N/A"}</h2>
            </div>
            <div className={`mt-4 w-12 h-1 rounded ${color}`}></div>
        </div>
    );
}
