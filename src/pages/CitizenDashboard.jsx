import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Plus, Clock, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function CitizenDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'reports'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reportsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReports(reportsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching real-time reports: ", error);
      // orderBy requires an index if combined with where(), 
      // check console for Firebase index creation link if it fails.
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'In Progress': return <AlertCircle className="w-5 h-5 text-blue-400" />;
      case 'Resolved': return <CheckCircle className="w-5 h-5 text-green-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20';
      case 'In Progress': return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
      case 'Resolved': return 'bg-green-400/10 text-green-400 border-green-400/20';
      default: return 'bg-gray-400/10 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-12 container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Citizen Dashboard</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>

      <div className="glass-card p-6 rounded-2xl mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-full border border-primary/30">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Logged in as</p>
            <p className="font-bold text-lg">{currentUser?.email}</p>
          </div>
        </div>
        <Link to="/citizen/report" className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <Plus className="w-5 h-5" /> New Report
        </Link>
      </div>

      <div className="mb-8 md:hidden">
        <Link to="/citizen/report" className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <Plus className="w-5 h-5" /> New Report
        </Link>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-6">My Reports Feed</h2>
        
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center p-8 bg-surface/50 rounded-lg border border-white/5">
            <p className="text-gray-400 italic">You haven't submitted any reports yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-surface/50 border border-white/5 p-5 rounded-xl hover:border-white/10 transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-white/10 bg-surface">
                      <img src={report.placeholderImage} alt={report.category} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{report.category}</h3>
                      <p className="text-gray-400 text-sm mt-1 mb-2 line-clamp-2">{report.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> 
                          {report.location?.lat.toFixed(4)}, {report.location?.lng.toFixed(4)}
                        </span>
                        <span>•</span>
                        <span>{report.createdAt?.toDate().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusColor(report.status)}`}>
                    {getStatusIcon(report.status)}
                    <span className="font-medium text-sm">{report.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
