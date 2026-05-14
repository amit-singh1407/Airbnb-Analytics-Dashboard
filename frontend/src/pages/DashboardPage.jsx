import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import KPICards from '../components/KPICards';
import RoomTypePieChart from '../charts/RoomTypePieChart';
import NeighborhoodBarChart from '../charts/NeighborhoodBarChart';
import AvailabilityLineChart from '../charts/AvailabilityLineChart';
import ReviewsAreaChart from '../charts/ReviewsAreaChart';
import ListingsTable from '../components/ListingsTable';
import { Code, Download, Sparkles } from 'lucide-react';

const DashboardPage = () => {
    const { stats, roomTypes, neighborhoodPrices, availability, reviewsAnalysis, loading, error } = useDashboardData();

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="glass-card text-center max-w-md">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-red-500 text-2xl">!</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-200 mb-2">Error Loading Data</h2>
                    <p className="text-slate-400">{error}</p>
                    <button onClick={() => window.location.reload()} className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-10">
            {/* Hero Section */}
            <div className="glass-card mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-slate-400 mb-2">
                            Airbnb Analytics Dashboard
                        </h1>
                        <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
                            A production-ready full-stack analytics platform. Explore real Airbnb dataset insights with interactive visualizations, KPI tracking, and deep data analysis built with React, Recharts, and Flask.
                        </p>
                        
                        <div className="flex items-center gap-3 mt-4">
                            <span className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">React (Vite)</span>
                            <span className="px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">Tailwind CSS</span>
                            <span className="px-3 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">Flask</span>
                            <span className="px-3 py-1 text-xs font-medium bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-full">Pandas</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button onClick={() => window.open('http://localhost:5000/api/export-csv', '_blank')} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-all text-sm font-medium">
                            <Download size={16} />
                            Export CSV
                        </button>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-200 hover:bg-white text-slate-900 rounded-lg transition-all text-sm font-medium shadow-lg shadow-slate-200/10">
                            <Code size={16} />
                            GitHub
                        </a>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <KPICards stats={stats} />

            {/* Insights Banner */}
            {stats && (
                <div className="mb-8 p-4 rounded-xl bg-linear-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/20 flex items-start gap-4 shadow-inner">
                    <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
                        <Sparkles className="text-blue-400" size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-blue-200 mb-1">AI-Powered Insights</h4>
                        <p className="text-xs text-blue-100/70 leading-relaxed">
                            Based on the current dataset, <span className="font-semibold text-white">Entire home/apt</span> is the most popular room type. The average nightly price sits at <span className="font-semibold text-white">${stats.average_price?.toFixed(2)}</span>. Listings with high review counts tend to have pricing concentrated around the lower-mid range.
                        </p>
                    </div>
                </div>
            )}

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <RoomTypePieChart data={roomTypes} />
                <NeighborhoodBarChart data={neighborhoodPrices} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <AvailabilityLineChart data={availability} />
                <ReviewsAreaChart data={reviewsAnalysis} />
            </div>

            {/* Listings Table */}
            <ListingsTable />

        </div>
    );
};

export default DashboardPage;
