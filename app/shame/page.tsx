'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api-client';

interface Offender {
  violationType: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  statistics: {
    totalViolations: number;
    latestViolation: string;
    averageConfidence: number;
    uniqueReporters: number;
    totalPointsAwarded: number;
  };
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface HallOfShameData {
  offenders: Offender[];
  overallStats: {
    totalVerifiedReports: number;
    uniqueLocations: number;
    uniqueReporters: number;
    violationsByType: {
      car: number;
      bike: number;
    };
    averageDetectionConfidence: number;
    totalPointsAwarded: number;
  };
  recentActivity: Array<{
    id: string;
    violationType: string;
    location: {
      address: string;
      latitude: number;
      longitude: number;
    };
    timestamp: string;
    detectionConfidence: number;
    reporterName: string;
  }>;
}

export default function HallOfShame() {
  const [data, setData] = useState<HallOfShameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vehicleFilter, setVehicleFilter] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('30');

  const fetchHallOfShameData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: '50',
        // backend expects snake_case query params
        ...(vehicleFilter !== 'all' && { vehicle_type: vehicleFilter }),
        time_range: timeRange,
      } as Record<string, string>);

      const response = await apiFetch(`/shame/top-offenders?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Hall of Shame data');
      }
      const result = await response.json();

      // Normalize backend response keys (snake_case) to frontend-friendly camelCase
      const backend = result.data || {};
      const normalized: HallOfShameData = {
        offenders: backend.offenders || [],
        overallStats: backend.overall_stats || backend.overallStats || {},
        recentActivity: backend.recent_activity || backend.recentActivity || [],
      };

      setData(normalized);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHallOfShameData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleFilter, timeRange]);

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskLevelIcon = (level: string) => {
    switch (level) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '⚡';
      case 'low': return '✅';
      default: return '📍';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
                <span className="ml-2 text-sm text-gray-500">Hall of Shame</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/leaderboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Leaderboard
              </Link>
              <Link href="/report" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Report Violation
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-linear-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">🚨 Hall of Shame</h1>
            <p className="text-xl opacity-90">
              Traffic violation hotspots identified through community reporting
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Type
              </label>
              <select
                value={vehicleFilter}
                onChange={(e) => setVehicleFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Vehicles</option>
                <option value="car">Cars Only</option>
                <option value="bike">Bikes Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Range
              </label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 3 months</option>
                <option value="365">Last year</option>
                <option value="all">All time</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading Hall of Shame data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchHallOfShameData}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : data ? (
          <>
            {/* Statistics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-blue-600">{data.overallStats.totalVerifiedReports}</div>
                <div className="text-sm text-gray-600">Total Verified Reports</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-green-600">{data.overallStats.uniqueLocations}</div>
                <div className="text-sm text-gray-600">Problem Locations</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-purple-600">{data.overallStats.uniqueReporters}</div>
                <div className="text-sm text-gray-600">Active Reporters</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-orange-600">{data.overallStats.violationsByType.car}</div>
                <div className="text-sm text-gray-600">Car Violations</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-teal-600">{data.overallStats.violationsByType.bike}</div>
                <div className="text-sm text-gray-600">Bike Violations</div>
              </div>
            </div>

            {/* Top Offenders */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Top Violation Hotspots</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Locations with the most repeated traffic violations
                </p>
              </div>
              <div className="p-6">
                {data.offenders.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-4">🎉</div>
                    <p>No violation hotspots found for the selected filters.</p>
                    <p className="text-sm mt-2">Keep reporting to help identify problem areas!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {data.offenders.map((offender, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-lg text-gray-900">
                                #{index + 1} Problem Location
                              </h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRiskLevelColor(offender.riskLevel)}`}>
                                {getRiskLevelIcon(offender.riskLevel)} {offender.riskLevel.toUpperCase()} RISK
                              </span>
                            </div>
                            <p className="text-gray-700 mb-3">{offender.location.address}</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Total Violations:</span>
                                <span className="ml-2 font-semibold text-red-600">{offender.statistics.totalViolations}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Vehicle Type:</span>
                                <span className="ml-2 font-semibold capitalize">
                                  {offender.violationType?.includes('car') ? '🚗 Car' : '🏍️ Bike'}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500">Latest:</span>
                                <span className="ml-2">{formatDate(offender.statistics.latestViolation)}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Confidence:</span>
                                <span className="ml-2 font-semibold">
                                  {(offender.statistics.averageConfidence * 100).toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Violations</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Latest verified traffic violation reports
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {data.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            {activity.violationType?.includes('car') ? '🚗 Car' : '🏍️ Bike'} Violation
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-600 text-sm">
                            Reported by {activity.reporterName || 'Anonymous'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.location.address}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(activity.timestamp)} • {(activity.detectionConfidence * 100).toFixed(1)}% confidence
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : null}
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
