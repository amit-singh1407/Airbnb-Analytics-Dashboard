import React, { useState, useEffect } from 'react';
import { getListings } from '../services/api';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

const ListingsTable = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('price');
    const [sortDesc, setSortDesc] = useState(true);
    const [loading, setLoading] = useState(false);
    const limit = 10;

    const fetchListings = async () => {
        setLoading(true);
        try {
            const res = await getListings({ page, limit, search, sort_by: sortBy, sort_desc: sortDesc });
            setData(res.data);
            setTotal(res.total);
        } catch (err) {
            console.error("Error fetching listings:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchListings();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [page, search, sortBy, sortDesc]);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortDesc(!sortDesc);
        } else {
            setSortBy(field);
            setSortDesc(true);
        }
    };

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="glass-card mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-xl font-semibold text-slate-200">Recent Listings</h3>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search listings..." 
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-300 uppercase bg-slate-800/50">
                        <tr>
                            <th className="px-6 py-4 font-medium">Name</th>
                            <th className="px-6 py-4 font-medium">Host</th>
                            <th className="px-6 py-4 font-medium">Neighborhood</th>
                            <th className="px-6 py-4 font-medium cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('price')}>
                                <div className="flex items-center gap-1">Price <ArrowUpDown size={14} /></div>
                            </th>
                            <th className="px-6 py-4 font-medium cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('rating')}>
                                <div className="flex items-center gap-1">Rating <ArrowUpDown size={14} /></div>
                            </th>
                            <th className="px-6 py-4 font-medium">Reviews</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" className="px-6 py-8 text-center">Loading data...</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan="6" className="px-6 py-8 text-center">No listings found</td></tr>
                        ) : (
                            data.map((item, idx) => (
                                <tr key={item.id} className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-slate-900/20'}`}>
                                    <td className="px-6 py-4 font-medium text-slate-200 truncate max-w-[200px]" title={item.listing_name}>{item.listing_name}</td>
                                    <td className="px-6 py-4">{item.host_name}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-800 text-slate-300 py-1 px-2 rounded-md text-xs border border-slate-700">{item.neighborhood}</span>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-emerald-400">${item.price}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <span className="text-amber-400">★</span> {item.rating?.toFixed(1) || 'N/A'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{item.number_of_reviews}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-6">
                <span className="text-sm text-slate-500">
                    Showing <span className="font-medium text-slate-300">{(page - 1) * limit + (data.length > 0 ? 1 : 0)}</span> to <span className="font-medium text-slate-300">{Math.min(page * limit, total)}</span> of <span className="font-medium text-slate-300">{total}</span>
                </span>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setPage(p => Math.max(1, p - 1))} 
                        disabled={page === 1}
                        className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button 
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                        disabled={page === totalPages || totalPages === 0}
                        className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListingsTable;
