"use client";

import { useAuthStore } from '@/store/useAuthStore';
import { useLogout, useCurrentUser } from '@/hooks/api/useAuth';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const { mutate: logout, isPending } = useLogout();
  
  // This automatically fetches the user data on mount using the HttpOnly cookie
  const { data, isLoading: isFetchingUser } = useCurrentUser();

  if (isLoading || isFetchingUser) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <button
          onClick={() => logout()}
          disabled={isPending}
          className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors text-red-400 hover:text-red-300"
        >
          {isPending ? "Logging out..." : "Log out"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Mock Data Cards for Aesthetic */}
        <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-zinc-400">Welcome Back</h3>
          <p className="mt-2 text-2xl font-semibold break-all">{user?.email || 'Authenticated User'}</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-zinc-400">Total Requests</h3>
          <p className="mt-2 text-2xl font-semibold">1,248</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-zinc-400">System Status</h3>
          <p className="mt-2 flex items-center text-2xl font-semibold text-emerald-400">
            <span className="mr-2 h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></span>
            Operational
          </p>
        </div>
      </div>
    </div>
  );
}
