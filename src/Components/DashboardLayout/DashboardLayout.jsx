// src/Components/Admin/DashboardLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-600    text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <NavLink to="products" className="block text-2xl font-semibold hover:text-white">Projects</NavLink>

      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-[#F2F2F2]">
        <Outlet />
      </main>
    </div>
  );
}
