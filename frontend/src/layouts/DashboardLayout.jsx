import React, { useState } from 'react';
import { LayoutDashboard, TableProperties, Settings, Menu, Bell, Search, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Listings', path: '/listings', icon: TableProperties },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200">
            {/* Sidebar */}
            <aside className={`transition-all duration-300 ease-in-out border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800">
                    {sidebarOpen && (
                        <div className="flex items-center gap-2 font-bold text-xl text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
                            AirbnbAnalytics
                        </div>
                    )}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white mx-auto">
                        <Menu size={20} />
                    </button>
                </div>
                
                <nav className="flex-1 px-3 py-6 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link key={item.name} to={item.path} className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'}`}>
                                <Icon size={20} className={isActive ? 'text-blue-400' : ''} />
                                {sidebarOpen && <span className="font-medium">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>
                
                {sidebarOpen && (
                    <div className="p-4 border-t border-slate-800">
                        <div className="glass rounded-xl p-4 text-sm text-slate-400 text-center">
                            <p className="font-semibold text-slate-300 mb-1">Pro Plan</p>
                            <p className="text-xs mb-3">Get advanced analytics</p>
                            <button className="w-full bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg py-2 font-medium transition-all shadow-lg shadow-blue-500/20">
                                Upgrade
                            </button>
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Navbar */}
                <header className="h-16 glass z-10 flex items-center justify-between px-6 border-b border-slate-800/50">
                    <div className="flex items-center gap-4 w-1/3">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input type="text" placeholder="Search analytics..." className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200 placeholder-slate-500" />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-slate-900"></span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-linear-to-tr from-blue-500 to-emerald-400 p-0.5 cursor-pointer">
                            <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
                                <User size={16} className="text-slate-300" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
