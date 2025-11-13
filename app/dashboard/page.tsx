'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api-client';

interface Report {
  id: string;
  violationType: string;
  location: string;
  description: string;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  pointsAwarded?: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({ name: '', email: '', totalPoints: 0 });

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/login');
    } else {
      setIsLoggedIn(true);
      fetchDashboardData();
    }
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      const response = await apiFetch('/reports', {
        authToken: token || undefined,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();

      // Backend returns an array of reports for the current user (not wrapped)
      const rawReports = Array.isArray(data) ? data : data.reports || [];

      // Normalize each report's snake_case to camelCase expected by UI
      const mapped: Report[] = rawReports.map((r: Record<string, unknown>) => ({
        id: r.id as string,
        violationType: r.violation_type as string,
        location: r.location as string,
        description: r.description as string,
        status: r.status as string,
        createdAt: r.created_at as string,
        pointsAwarded: (r.points_awarded as number) || (r.pointsAwarded as number) || 0,
      }));

      setReports(mapped);

      const totalPoints = mapped.reduce((acc: number, x: Report) => acc + (x.pointsAwarded || 0), 0);

      // Fetch current user profile from backend
      try {
        const profileRes = await apiFetch('/auth/me', {
          authToken: token || undefined,
        });
        if (profileRes.ok) {
          const profile = await profileRes.json();
          setUserData({ name: profile.name || '', email: profile.email || '', totalPoints: profile.total_points || totalPoints });
          // store for other pages
          localStorage.setItem('user_name', profile.name || '');
          localStorage.setItem('user_type', profile.role || localStorage.getItem('user_type') || 'user');
        } else {
          setUserData({ name: localStorage.getItem('user_name') || '', email: '', totalPoints });
        }
      } catch {
        setUserData({ name: localStorage.getItem('user_name') || '', email: '', totalPoints });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_type');
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return '✅';
      case 'rejected':
        return '❌';
      default:
        return '⏳';
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
              <span className="text-gray-700 text-sm">{userData.name}</span>
              <Link href="/report" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                New Report
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-blue-600">{reports.length}</div>
            <div className="text-gray-600 text-sm">Total Reports</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-green-600">
              {reports.filter((r) => r.status === 'verified').length}
            </div>
            <div className="text-gray-600 text-sm">Verified Reports</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-purple-600">{userData.totalPoints}</div>
            <div className="text-gray-600 text-sm">Total Points</div>
          </div>
        </div>

        {/* Reports */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Reports</h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4">
              {error}
            </div>
          ) : reports.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">No reports yet</p>
              <Link href="/report" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Create your first report
              </Link>
            </div>
          ) : (
            <div className="p-6">
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold text-lg text-gray-900">
                            {report.violationType === 'car' ? '🚗' : '🏍️'} {report.violationType.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(report.status)}`}>
                            {getStatusIcon(report.status)} {report.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{report.location}</p>
                        {report.description && (
                          <p className="text-gray-600 text-sm mb-2">{report.description}</p>
                        )}
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                          {report.pointsAwarded && (
                            <span className="text-purple-600 font-semibold">+{report.pointsAwarded} points</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex space-x-4">
          <Link href="/shame" className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700">
            View Hall of Shame
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-700">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
