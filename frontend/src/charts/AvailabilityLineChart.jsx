import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AvailabilityLineChart = ({ data }) => {
    if (!data || data.length === 0) return (
        <div className="glass-card flex items-center justify-center h-[300px]">
            <p className="text-slate-500">Loading chart...</p>
        </div>
    );

    return (
        <div className="glass-card md:col-span-2">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Availability Trends</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9', borderRadius: '0.75rem' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '10px' }} />
                        <Line type="monotone" dataKey="Entire home" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="Private room" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                        <Line type="monotone" dataKey="Shared room" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AvailabilityLineChart;
