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

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
                <p className="text-slate-500 mt-1">Track your briefing analytics and performance.</p>
            </div>

            {!loading && stats ? (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <StatCard
                            title="Total Briefs"
                            value={stats.totalBriefs}
                            trend="+12%" // Placeholder trend
                            trendUp={true}
                            colorClass="bg-blue-500"
                        />
                        <StatCard
                            title="Briefs This Month"
                            value={stats.briefsThisMonth}
                            trend="+5%"
                            trendUp={true}
                            colorClass="bg-indigo-500"
                        />
                        <StatCard
                            title="Avg. Clarifications"
                            value={stats.clarificationLoadPerBrief || 0}
                            trend="-2%"
                            trendUp={false}
                            colorClass="bg-emerald-500"
                        />
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
                        {/* Bar Chart - Last 30 Days */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-slate-800">Activity (Last 30 Days)</h3>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={stats.briefsPerDay || []}
                                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="day"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 12 }}
                                            dy={10}
                                            tickFormatter={(d) => {
                                                const date = new Date(d);
                                                return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
                                            }}
                                        />
                                        <YAxis
                                            allowDecimals={false}
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 12 }}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            cursor={{ fill: '#f8fafc' }}
                                        />
                                        <Bar
                                            dataKey="count"
                                            fill="#4f46e5"
                                            radius={[4, 4, 0, 0]}
                                            barSize={20}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Line Chart - Weekly Briefs */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-slate-800">Weekly Trends</h3>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={stats.briefsPerWeek || []}
                                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="week"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 12 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            allowDecimals={false}
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 12 }}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#0ea5e9"
                                            strokeWidth={3}
                                            dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </>
            ) : !loading ? (
                <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
                    <div className="text-slate-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No stats available</h3>
                    <p className="text-slate-500 mt-1">Start by uploading a brief to see analytics here.</p>
                </div>
            ) : null}
        </Layout>
    );
}

function StatCard({ title, value, trend, trendUp, colorClass }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200 group">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-slate-500 text-sm font-medium mb-1">{title}</h4>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{value ?? "0"}</h2>
                </div>
                <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}>
                    {/* We can use an icon here based on title/color */}
                    <div className={`w-6 h-6 rounded-full ${colorClass} opacity-80`}></div>
                </div>
            </div>

            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span className={`font-medium ${trendUp ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                        {trendUp ? '↑' : '↓'} {trend}
                    </span>
                    <span className="text-slate-400 ml-2">vs last month</span>
                </div>
            )}
        </div>
    );
}
