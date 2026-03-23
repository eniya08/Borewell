import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar } from 'lucide-react';

interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  date: string;
  description: string;
}

const Appointment = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  const [formData, setFormData] = useState<AppointmentFormData>({
    name: '',
    email: '',
    phone: '',
    serviceType: 'Borewell Drilling',
    date: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if user is signed in
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("loggedInUser");
    
    if (!userLoggedIn || !userEmail) {
      setCheckingAuth(false);
      navigate("/user-signin", { replace: true });
      return;
    }
    
    // Verify user exists in registered users
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userExists = registeredUsers.some((u: any) => u.email === userEmail);
    
    if (!userExists) {
      // Invalid session - clear storage and redirect to signup
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("loggedInUser");
      navigate("/user-signup", { replace: true });
      return;
    }
    
    // Set form data with authenticated user info
    setFormData(prev => ({
      ...prev,
      name: userName || '',
      email: userEmail || '',
    }));
    
    setIsAuthenticated(true);
    setCheckingAuth(false);
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-xl text-white">Checking authentication...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <p className="text-white text-lg mb-4">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

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
    
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
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
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceType: formData.serviceType,
        date: formData.date,
        description: formData.description,
        location: '',
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
          
          <h2 className="text-3xl font-bold text-white mb-2">Appointment Confirmed!</h2>
          <p className="text-slate-300 mb-4">
            Your appointment has been successfully scheduled and is pending admin approval.
          </p>
          <p className="text-sm text-slate-400">Redirecting to home...</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <main className="pt-32 pb-16 min-h-screen bg-section-alt">
      <div className="container mx-auto max-w-2xl px-4">
        <h1 className="text-4xl font-heading font-extrabold text-foreground mb-8 text-center">Book an Appointment</h1>
        <div className="bg-card p-8 rounded-2xl shadow-sm border border-border/50">
          <p className="text-muted-foreground text-center mb-6">Fill out the form below and our team will get back to you shortly.</p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name (Read-only since logged in) */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                readOnly
                className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 text-foreground focus:outline-none opacity-75 cursor-not-allowed" 
              />
              <p className="text-xs text-muted-foreground">Auto-filled from your account</p>
            </div>

            {/* Email (Read-only since logged in) */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                readOnly
                className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 text-foreground focus:outline-none opacity-75 cursor-not-allowed" 
              />
              <p className="text-xs text-muted-foreground">Auto-filled from your account</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number *</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none" 
                  placeholder="+91 9876543210"
                  required
                />
              </div>

              {/* Service */}
              <div className="space-y-2">
                <label htmlFor="serviceType" className="text-sm font-medium text-foreground">Service Required</label>
                <select 
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option>Borewell Drilling</option>
                  <option>Borewell Cleaning</option>
                  <option>Pump Installation</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium text-foreground">Preferred Date *</label>
              <input 
                type="date" 
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>

            {/* Additional Details */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-foreground">Additional Details</label>
              <textarea 
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none" 
                placeholder="How can we help you?"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Appointment;
