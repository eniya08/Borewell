import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, LogOut, CalendarCheck, AlertCircle,
  Clock, CheckCircle, XCircle, ChevronRight, Droplets, MapPin
} from 'lucide-react';

interface Booking {
  id: string;
  serviceType: string;
  appointmentDate?: string;
  date?: string;
  location?: string;
  depth?: string;
  description?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  submittedAt: string;
}

interface UserData {
  name: string;
  email: string;
  phone?: string;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'bg-orange-100 text-orange-700 border border-orange-200',
    icon: Clock,
    dot: 'bg-orange-500'
  },
  confirmed: {
    label: 'Confirmed',
    color: 'bg-green-100 text-green-700 border border-green-200',
    icon: CheckCircle,
    dot: 'bg-green-500'
  },
  completed: {
    label: 'Completed',
    color: 'bg-blue-100 text-blue-700 border border-blue-200',
    icon: CheckCircle,
    dot: 'bg-blue-500'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-700 border border-red-200',
    icon: XCircle,
    dot: 'bg-red-500'
  }
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('loggedInUser');

    if (!userLoggedIn || !userEmail) {
      navigate('/user-signin', { state: { redirectTo: '/profile' } });
      return;
    }

    // Get full user info from registeredUsers
    const registeredUsers: UserData[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const fullUser = registeredUsers.find((u: any) => u.email === userEmail);

    setUserData({
      name: userName || fullUser?.name || 'User',
      email: userEmail,
      phone: (fullUser as any)?.phone || ''
    });

    // Get this user's bookings only
    const allBookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
    const userBookings = allBookings
      .filter((b: any) => b.email === userEmail)
      .map((b: any) => ({
        ...b,
        status: b.status === 'approved' ? 'confirmed' : (b.status === 'rejected' ? 'cancelled' : b.status)
      }));
    setBookings(userBookings.reverse()); // newest first
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userId');
    navigate('/');
    window.location.reload(); // refresh navbar state
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20">
        <div className="animate-pulse text-[#133C55] text-lg font-medium">Loading profile...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#0B2545] to-[#386FA4] rounded-3xl p-8 text-white shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner border-2 border-white/30 flex-shrink-0">
              <span className="text-3xl font-extrabold text-white">
                {userData?.name?.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-extrabold tracking-tight">{userData?.name}</h1>
              <div className="flex flex-col md:flex-row gap-3 mt-3">
                <span className="flex items-center justify-center md:justify-start gap-2 text-[#91E5F6] text-sm">
                  <Mail size={15} />
                  {userData?.email}
                </span>
                {userData?.phone && (
                  <span className="flex items-center justify-center md:justify-start gap-2 text-[#91E5F6] text-sm">
                    <Phone size={15} />
                    {userData.phone}
                  </span>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs px-4 py-1.5 rounded-full font-semibold">
                  {bookings.length} Booking{bookings.length !== 1 ? 's' : ''}
                </span>
                <span className="bg-green-500/20 border border-green-400/30 text-green-300 text-xs px-4 py-1.5 rounded-full font-semibold">
                  ● Active Member
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/booking')}
                className="flex items-center gap-2 bg-[#FF9900] hover:bg-[#E68A00] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-md text-sm"
              >
                <CalendarCheck size={16} />
                Book Service
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white/10 hover:bg-red-500/30 text-white hover:text-red-200 font-semibold px-5 py-2.5 rounded-xl transition-all border border-white/20 text-sm"
              >
                <LogOut size={16} />
                Logout
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Booking Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total', count: bookings.length, color: 'text-slate-700', bg: 'bg-white' },
            { label: 'Pending', count: bookings.filter(b => b.status === 'pending').length, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Completed', count: bookings.filter(b => b.status === 'completed').length, color: 'text-blue-600', bg: 'bg-blue-50' },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-2xl p-5 shadow-sm border border-slate-100 text-center`}>
              <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.count}</p>
              <p className="text-slate-500 text-sm font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* My Bookings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#133C55] flex items-center justify-center">
              <CalendarCheck size={16} className="text-white" />
            </div>
            <h2 className="text-xl font-extrabold text-[#0B2545]">My Bookings</h2>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-slate-100">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets size={28} className="text-slate-400" />
              </div>
              <h3 className="text-slate-600 font-semibold text-lg mb-2">No bookings found.</h3>
              <p className="text-slate-400 text-sm mb-6">You haven't booked any service yet. Get started below!</p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                onClick={() => navigate('/booking')}
                className="bg-[#386FA4] hover:bg-[#133C55] text-white font-semibold px-8 py-3 rounded-full transition-colors"
              >
                Book Your First Service
              </motion.button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking, idx) => {
                const status = booking.status || 'pending';
                const config = statusConfig[status] || statusConfig.pending;
                const StatusIcon = config.icon;
                const dateStr = booking.appointmentDate || booking.date || '—';

                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Left: service info */}
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#386FA4]/10 flex items-center justify-center flex-shrink-0">
                          <Droplets size={22} className="text-[#386FA4]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#0B2545] text-lg">{booking.serviceType}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <CalendarCheck size={13} />
                              {dateStr}
                            </span>
                            {booking.location && (
                              <span className="flex items-center gap-1.5">
                                <MapPin size={13} />
                                {booking.location}
                              </span>
                            )}
                            {booking.depth && (
                              <span className="flex items-center gap-1.5">
                                <Droplets size={13} />
                                Depth: {booking.depth}
                              </span>
                            )}
                            {booking.description && (
                              <span className="flex items-center gap-1.5">
                                <AlertCircle size={13} />
                                {booking.description.slice(0, 60)}{booking.description.length > 60 ? '...' : ''}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-1">Submitted: {booking.submittedAt}</p>
                        </div>
                      </div>

                      {/* Right: status badge */}
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold ${config.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
                          {config.label}
                        </span>
                        <ChevronRight size={18} className="text-slate-300" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

      </div>
    </main>
  );
};

export default UserProfile;
