'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api-client';

interface PendingReport {
  id: string;
  violationType: string;
  location: string;
  description: string;
  image: string;
  reporterName: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [pendingReports, setPendingReports] = useState<PendingReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalReports: 0,
    verifiedReports: 0,
    pendingReports: 0,
  });

  useEffect(() => {
    const userType = localStorage.getItem('user_type');
    if (userType !== 'admin' && userType !== 'super_admin') {
      router.push('/dashboard');
    } else {
      setIsAdmin(true);
      fetchAdminData();
    }
  }, [router]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      const response = await apiFetch('/admin/verify', {
        authToken: token || undefined,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch admin data');
      }

      const data = await response.json();

      // Normalize backend snake_case fields to frontend-friendly camelCase
      const pending = (data.pendingReports || []).map((r: Record<string, unknown>) => ({
        id: r.id as string,
        violationType: r.violation_type as string,
        location: r.location as string,
        description: r.description as string,
        image: (r.image_url as string) || (r.image as string),
        reporterName: r.reporter_name as string,
        createdAt: r.created_at as string,
        status: r.status as string,
        pointsAwarded: r.points_awarded as number,
      }));

      setPendingReports(pending);
      setStats(data.stats || {});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (reportId: string, verified: boolean) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await apiFetch('/admin/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        authToken: token || undefined,
        // backend expects report_id in snake_case
        body: JSON.stringify({ report_id: reportId, verified }),
      });

      if (!response.ok) {
        throw new Error('Failed to update report');
      }

      // Remove the report from the list
      setPendingReports(pendingReports.filter((r) => r.id !== reportId));
      fetchAdminData(); // Refresh stats
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_type');
    router.push('/');
  };

  if (!isAdmin) {
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
                <span className="ml-2 text-sm text-gray-500">Admin</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
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
            <div className="text-3xl font-bold text-blue-600">{stats.totalReports}</div>
            <div className="text-gray-600 text-sm">Total Reports</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-green-600">{stats.verifiedReports}</div>
            <div className="text-gray-600 text-sm">Verified Reports</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-yellow-600">{stats.pendingReports}</div>
            <div className="text-gray-600 text-sm">Pending Review</div>
          </div>
        </div>

        {/* Pending Reports */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Pending Report Verification</h2>
            <p className="text-sm text-gray-600 mt-1">Review and verify traffic violation reports</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4">
              {error}
            </div>
          ) : pendingReports.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">No pending reports</p>
              <p className="text-sm">All reports have been reviewed!</p>
            </div>
          ) : (
            <div className="p-6">
              <div className="space-y-6">
                {pendingReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Report Details */}
                      <div className="md:col-span-2">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold text-lg text-gray-900">
                            {report.violationType === 'car' ? '🚗' : '🏍️'} {report.violationType.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                            ⏳ PENDING
                          </span>
                        </div>
                        <p className="text-gray-700 font-medium mb-2">{report.location}</p>
                        {report.description && (
                          <p className="text-gray-600 text-sm mb-2">{report.description}</p>
                        )}
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>Reported by {report.reporterName}</span>
                          <span>•</span>
                          <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Image & Actions */}
                      <div>
                        {report.image && (
                          <div className="mb-4">
                            <img
                              src={report.image}
                              alt="Report"
                              className="w-full h-32 object-cover rounded-md"
                            />
                          </div>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleVerify(report.id, true)}
                            className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                          >
                            ✅ Verify
                          </button>
                          <button
                            onClick={() => handleVerify(report.id, false)}
                            className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                          >
                            ❌ Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link href="/" className="block text-center text-gray-600 hover:text-gray-700 text-sm mt-6">
          Back to home
        </Link>
      </div>
    </div>
  );
}
