import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const NeighborhoodBarChart = ({ data }) => {
    if (!data || data.length === 0) return (
        <div className="glass-card flex items-center justify-center h-[300px]">
            <p className="text-slate-500">Loading chart...</p>
        </div>
    );

    return (
        <div className="glass-card">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Avg Price by Neighborhood</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="neighborhood" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                        <Tooltip 
                            cursor={{ fill: '#334155', opacity: 0.4 }}
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9', borderRadius: '0.75rem' }}
                            formatter={(value) => [`$${value.toFixed(2)}`, 'Avg Price']}
                        />
                        <Bar dataKey="price" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default NeighborhoodBarChart;
