import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0A] text-white">
      {/* Premium minimal header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="flex h-16 items-center px-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
            <span className="text-sm font-bold tracking-widest text-white">A</span>
          </div>
          <h2 className="ml-4 text-lg font-semibold tracking-tight">Vanguard Dashboard</h2>
        </div>
      </header>
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
