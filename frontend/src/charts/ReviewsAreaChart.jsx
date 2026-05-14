import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ReviewsAreaChart = ({ data }) => {
    if (!data || data.length === 0) return (
        <div className="glass-card flex items-center justify-center h-[300px]">
            <p className="text-slate-500">Loading chart...</p>
        </div>
    );

    return (
        <div className="glass-card">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Reviews Distribution</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="bracket" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9', borderRadius: '0.75rem' }}
                            formatter={(value) => [value.toLocaleString(), 'Reviews']}
                        />
                        <Area type="monotone" dataKey="reviews" stroke="#f43f5e" fillOpacity={1} fill="url(#colorReviews)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ReviewsAreaChart;
