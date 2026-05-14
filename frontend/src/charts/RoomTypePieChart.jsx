import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f43f5e'];

const RoomTypePieChart = ({ data }) => {
    if (!data || data.length === 0) return (
        <div className="glass-card flex items-center justify-center h-[300px]">
            <p className="text-slate-500">Loading chart...</p>
        </div>
    );

    return (
        <div className="glass-card">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Room Type Distribution</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9', borderRadius: '0.75rem' }}
                            itemStyle={{ color: '#e2e8f0' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RoomTypePieChart;
