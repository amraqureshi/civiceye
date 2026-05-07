import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Shield, Clock, AlertCircle, CheckCircle, MapPin, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function OfficialDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'reports'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reportsData = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      }));
      setReports(reportsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching all reports: ", error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  async function handleStatusChange(reportId, newStatus) {
    try {
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, { status: newStatus });
    } catch (error) {
      console.error("Failed to update status", error);
    }
  }

  const stats = {
    pending: reports.filter(r => r.status === 'Pending').length,
    inProgress: reports.filter(r => r.status === 'In Progress').length,
    resolved: reports.filter(r => r.status === 'Resolved').length,
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'In Progress': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Resolved': return 'text-green-400 bg-green-400/10 border-green-400/20';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-12 container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Official Dashboard</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>

      <div className="glass-card p-6 rounded-2xl mb-8 flex items-center gap-4 border-secondary/30">
        <div className="bg-secondary/20 p-3 rounded-full border border-secondary/30">
          <Shield className="w-8 h-8 text-secondary" />
        </div>
        <div>
          <p className="text-gray-400 text-sm">Official Account</p>
          <p className="font-bold text-lg">{currentUser?.email}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Reports Feed */}
        <div className="glass-card p-6 rounded-2xl lg:col-span-2 order-2 lg:order-1">
          <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
            <span>Incoming Reports</span>
            <span className="bg-white/10 text-xs py-1 px-2 rounded-full font-normal">{reports.length} total</span>
          </h2>
          
          {loading ? (
            <div className="flex justify-center p-8">
              <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : reports.length === 0 ? (
            <div className="bg-surface/50 rounded-lg p-8 text-center text-gray-500 border border-white/5">
              No active reports in the system.
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="bg-surface/50 border border-white/5 p-5 rounded-xl flex flex-col md:flex-row gap-4">
                  <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-white/10 bg-surface">
                    <img src={report.placeholderImage} alt={report.category} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg text-white">{report.category}</h3>
                      <div className="relative group">
                        <select 
                          value={report.status}
                          onChange={(e) => handleStatusChange(report.id, e.target.value)}
                          className={`appearance-none outline-none text-xs font-bold px-3 py-1.5 pr-8 rounded-full border cursor-pointer ${getStatusColor(report.status)}`}
                        >
                          <option value="Pending" className="bg-surface text-white">Pending</option>
                          <option value="In Progress" className="bg-surface text-white">In Progress</option>
                          <option value="Resolved" className="bg-surface text-white">Resolved</option>
                        </select>
                        <ChevronDown className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-70" />
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-3">{report.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> 
                        {report.location?.lat.toFixed(4)}, {report.location?.lng.toFixed(4)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {report.userEmail}
                      </span>
                      <span>{report.createdAt?.toDate().toLocaleTimeString()} • {report.createdAt?.toDate().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="order-1 lg:order-2 space-y-6">
          <div className="glass-card p-6 rounded-2xl sticky top-24">
            <h2 className="text-xl font-bold mb-6">Live Statistics</h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center border-b border-white/5 pb-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-5 h-5 text-yellow-400" /> Pending
                </div>
                <span className="font-bold text-xl text-yellow-400">{stats.pending}</span>
              </li>
              <li className="flex justify-between items-center border-b border-white/5 pb-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <AlertCircle className="w-5 h-5 text-blue-400" /> In Progress
                </div>
                <span className="font-bold text-xl text-blue-400">{stats.inProgress}</span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-400" /> Resolved
                </div>
                <span className="font-bold text-xl text-green-400">{stats.resolved}</span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-500 text-center uppercase tracking-wider">Status Overview</p>
              <div className="flex h-2 w-full bg-surface rounded-full overflow-hidden mt-3">
                {reports.length > 0 ? (
                  <>
                    <div style={{ width: `${(stats.resolved / reports.length) * 100}%` }} className="bg-green-400"></div>
                    <div style={{ width: `${(stats.inProgress / reports.length) * 100}%` }} className="bg-blue-400"></div>
                    <div style={{ width: `${(stats.pending / reports.length) * 100}%` }} className="bg-yellow-400"></div>
                  </>
                ) : (
                  <div className="w-full bg-white/5"></div>
                )}
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
