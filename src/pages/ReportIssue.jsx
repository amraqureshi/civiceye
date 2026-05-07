import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, MapPin, Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  "Potholes",
  "Garbage Overflow",
  "Water Leakage",
  "Electricity Outage",
  "Illegal Road Occupation",
  "Unsafe Construction"
];

export default function ReportIssue() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [locating, setLocating] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Local preview only, no Firebase Storage upload as requested
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getLocation = () => {
    setLocating(true);
    setError('');
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocating(false);
      },
      (err) => {
        setError("Failed to get location. Please enable location services.");
        setLocating(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      setError("Please tag your location before submitting.");
      return;
    }

    setSubmitting(true);
    setError('');
    
    try {
      await addDoc(collection(db, "reports"), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        category,
        description,
        location,
        status: "Pending",
        createdAt: serverTimestamp(),
        // Using local base64 preview for demonstration as Firebase Storage is skipped
        placeholderImage: imagePreview || "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=400"
      });
      
      setSuccess(true);
      setTimeout(() => navigate('/citizen'), 2000);
    } catch (err) {
      console.error("Error submitting report: ", err);
      setError("Failed to submit report. Please try again.");
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center glass-card p-12 rounded-2xl max-w-md w-full">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Report Submitted!</h2>
          <p className="text-gray-400 mb-8">Thank you for helping keep the city safe. Authorities have been notified.</p>
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      <div className="container mx-auto max-w-2xl">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Dashboard
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-2xl border border-white/10"
        >
          <h1 className="text-3xl font-bold mb-2">Report an Issue</h1>
          <p className="text-gray-400 mb-8">Fill out the details below to notify city officials.</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-6 flex items-start gap-3 text-sm">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Issue Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-surface/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-all appearance-none"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat} className="bg-surface">{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
              <textarea 
                required
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide details about the issue..."
                className="w-full bg-surface/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-all resize-none"
              ></textarea>
            </div>

            {/* Location Tagging */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
              {location ? (
                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-green-400 font-medium text-sm">Location Tagged Successfully</p>
                      <p className="text-gray-400 text-xs">{location.lat.toFixed(5)}, {location.lng.toFixed(5)}</p>
                    </div>
                  </div>
                  <button type="button" onClick={getLocation} className="text-xs text-primary hover:underline">Retag</button>
                </div>
              ) : (
                <button 
                  type="button"
                  onClick={getLocation}
                  disabled={locating}
                  className="w-full flex items-center justify-center gap-2 border border-dashed border-white/20 hover:border-primary hover:bg-primary/5 rounded-lg p-6 text-gray-400 hover:text-white transition-all disabled:opacity-50"
                >
                  <MapPin className="w-6 h-6" />
                  {locating ? 'Acquiring GPS...' : 'Tag Current Location (Required)'}
                </button>
              )}
            </div>

            {/* Photo Upload Placeholder */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Photo Proof (Optional)</label>
              {imagePreview ? (
                <div className="relative rounded-lg overflow-hidden h-48 border border-white/10">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 bg-black/50 p-2 rounded-full hover:bg-black/80 backdrop-blur-md transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="w-full flex flex-col items-center justify-center border border-dashed border-white/20 hover:border-primary hover:bg-primary/5 rounded-lg p-8 cursor-pointer transition-all">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-gray-400 text-sm">Click to select an image</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              )}
            </div>

            <button 
              type="submit"
              disabled={submitting || !location}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] disabled:opacity-50 mt-4 text-lg"
            >
              {submitting ? 'Submitting Report...' : 'Submit Report'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
