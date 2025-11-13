'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api-client';

interface LeaderboardUser {
  rank: number;
  name: string;
  totalPoints: number;
  reportCount: number;
  verifiedCount: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userRank, setUserRank] = useState<LeaderboardUser | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      // leaderboard is implemented in the shame router under /api/shame/leaderboard
      const response = await apiFetch('/shame/leaderboard');

      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }

      const data = await response.json();

      // Normalize leaderboard entries to frontend shape
      const list = (data.leaderboard || []).map((u: Record<string, unknown>) => ({
        rank: u.rank as number,
        name: u.name as string,
        totalPoints: (u.total_points as number) ?? (u.totalPoints as number),
        reportCount: (u.report_count as number) ?? (u.reportCount as number),
        verifiedCount: (u.verified_count as number) ?? (u.verifiedCount as number),
      }));

      setLeaderboard(list);
      const ur = data.user_rank || data.userRank || null;
      setUserRank(ur ? { rank: ur.rank as number, name: ur.name as string, totalPoints: (ur.total_points as number) || 0, reportCount: (ur.report_count as number) || 0, verifiedCount: (ur.verified_count as number) || 0 } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `${rank}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <h1 className="text-2xl font-bold text-blue-600">eLAWDIYA</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/shame" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Hall of Shame
              </Link>
              <Link href="/report" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Report Violation
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">🏆 Leaderboard</h1>
            <p className="text-xl opacity-90">
              Top contributors to making roads safer through traffic violation reporting
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* User's Rank */}
        {userRank && (
          <div className="bg-linear-to-r from-purple-50 to-blue-50 rounded-lg shadow p-6 mb-8 border-2 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Your Rank</p>
                <p className="text-3xl font-bold text-purple-600">#{userRank.rank}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">{userRank.totalPoints} points</p>
                <p className="text-sm text-gray-600">{userRank.verifiedCount} verified reports</p>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Top Contributors</h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading leaderboard...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4">
              {error}
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No leaderboard data available yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Reports
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Verified
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leaderboard.map((user) => (
                    <tr key={user.rank} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-2xl">{getMedalEmoji(user.rank)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-lg font-bold text-purple-600">{user.totalPoints}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.reportCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                          {user.verifiedCount}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link href="/report" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 inline-block">
            Start Contributing
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">
              © 2024 eLAWDIYA Traffic Violation Reporting System. Making roads safer together.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
