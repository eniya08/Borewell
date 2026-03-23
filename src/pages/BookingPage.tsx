import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, User, Mail, Phone, Droplet, CheckCircle } from 'lucide-react';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export default function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check if user is signed in
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    if (!userLoggedIn) {
      setCheckingAuth(false);
      navigate("/user-signin");
      return;
    }
    setIsAuthenticated(true);
    setCheckingAuth(false);
  }, [navigate]);

  // Get logged-in user info
  const getUserEmail = () => localStorage.getItem("userEmail") || '';
  const getUserName = () => localStorage.getItem("loggedInUser") || '';

  const [formData, setFormData] = useState<BookingFormData>({
    name: getUserName(),
    email: getUserEmail(),
    phone: '',
    serviceType: location.state?.serviceType || 'General Inquiry',
    date: '',
    time: '',
    location: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Checking authentication...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verify user is still authenticated before submitting
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    const userEmail = localStorage.getItem("userEmail");
    
    if (!userLoggedIn || !userEmail) {
      alert('Your session has expired. Please sign in again.');
      navigate("/user-signin");
      return;
    }
    
    // Verify user has completed signup with valid credentials
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userExists = registeredUsers.some((u: any) => u.email === userEmail);
    
    if (!userExists) {
      alert('You must complete signup before booking. Redirecting to signup...');
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("loggedInUser");
      navigate("/user-signup");
      return;
    }
    
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.location) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Get existing bookings from localStorage
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      
      // Create new booking with unique ID and timestamp
      const newBooking = {
        id: Date.now().toString(),
        ...formData,
        status: 'pending',
        submittedAt: new Date().toLocaleString(),
        submittedDate: new Date().toISOString()
      };
      
      // Add to bookings list
      existingBookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));
      
      setLoading(false);
      setSubmitted(true);
      
      // Redirect to home after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 1500);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4"
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full text-center border border-white/10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h2>
          <p className="text-slate-300 mb-4">
            Your booking has been successfully submitted and is now pending admin approval.
          </p>
          
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-300">
              Booking ID: <span className="font-mono font-bold">{formData.email.split('@')[0]}-{new Date().getTime().toString().slice(-4)}</span>
            </p>
          </div>
          
          <p className="text-slate-400 text-sm mb-4">Redirecting to home page...</p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Back to Home
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-orange-500 hover:text-orange-400 font-semibold mb-8 transition"
      >
        <ArrowLeft size={20} />
        Back to Previous Page
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Droplet className="text-white" size={28} />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">Book Your Service</h1>
          <p className="text-slate-300">Fill in the details below to book your appointment</p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <User size={20} className="text-orange-500" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <motion.div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                    required
                  />
                </motion.div>

                {/* Email */}
                <motion.div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                    required
                  />
                </motion.div>

                {/* Phone */}
                <motion.div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Phone size={16} className="inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                    required
                  />
                </motion.div>

                {/* Service Type */}
                <motion.div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Droplet size={16} className="inline mr-2" />
                    Service Type *
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                    required
                  >
                    <option value="General Inquiry">Select a service</option>
                    <option value="Borewell Drilling">Borewell Drilling</option>
                    <option value="Borewell Cleaning">Borewell Cleaning</option>
                    <option value="Borewell Flushing">Borewell Flushing</option>
                    <option value="Pump Installation">Pump Installation</option>
                    <option value="Water Level Testing">Water Level Testing</option>
                    <option value="Maintenance Services">Maintenance Services</option>
                  </select>
                </motion.div>
              </div>
            </div>

            {/* Appointment Details Section */}
            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-orange-500" />
                Appointment Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date */}
                <motion.div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Service Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                    required
                  />
                </motion.div>

                {/* Time */}
                <motion.div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Clock size={16} className="inline mr-2" />
                    Preferred Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                    required
                  />
                </motion.div>

                {/* Location */}
                <motion.div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <MapPin size={16} className="inline mr-2" />
                    Service Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                    required
                  />
                </motion.div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="border-t border-slate-700 pt-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">Additional Notes (Optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Any special requirements or additional information..."
                rows={4}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition resize-none"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Confirm Booking
                </>
              )}
            </motion.button>

            <p className="text-xs text-slate-400 text-center">
              By booking, you agree to our terms and conditions. We'll send you a confirmation email shortly.
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
