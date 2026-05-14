import React from 'react';
import { Home, DollarSign, TrendingUp, Star, Users, Calendar } from 'lucide-react';

const KPICards = ({ stats }) => {
    if (!stats) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card animate-pulse h-28"></div>
        ))}
    </div>;

    const cards = [
        { title: 'Total Listings', value: stats.total_listings?.toLocaleString(), icon: Home, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { title: 'Average Price', value: `$${stats.average_price?.toFixed(2)}`, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { title: 'Highest Price', value: `$${stats.highest_price?.toLocaleString()}`, icon: TrendingUp, color: 'text-violet-400', bg: 'bg-violet-500/10' },
        { title: 'Total Reviews', value: stats.total_reviews?.toLocaleString(), icon: Users, color: 'text-pink-400', bg: 'bg-pink-500/10' },
        { title: 'Average Rating', value: stats.average_rating?.toFixed(2), icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        { title: 'Lowest Price', value: `$${stats.lowest_price?.toLocaleString()}`, icon: Calendar, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {cards.map((card, idx) => {
                const Icon = card.icon;
                return (
                    <div key={idx} className="glass-card group relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-in-out pointer-events-none" style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}></div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">{card.title}</h3>
                            <div className={`p-2 rounded-lg ${card.bg}`}>
                                <Icon size={18} className={card.color} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-slate-100 tracking-tight">{card.value}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default KPICards;
