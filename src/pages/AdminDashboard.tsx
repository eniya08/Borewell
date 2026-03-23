import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Image,
  CheckCircle,
  Clock,
  X,
  Upload,
  Trash2,
  Eye,
  FileText,
  BarChart3,
  Check,
  Edit,
} from "lucide-react";

interface BookingRequest {
  id: number;
  userName: string;
  email: string;
  phone: string;
  serviceType: string;
  location: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  uploadedDate: string;
}

interface BlogImageData {
  id: number;
  title: string;
  currentUrl: string;
  newUrl: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "images" | "gallery" | "settings">(
    "overview"
  );

  // Initialize bookings from localStorage
  const initializeBookings = (): BookingRequest[] => {
    const storedBookings = localStorage.getItem("bookings");
    if (storedBookings) {
      try {
        const parsed = JSON.parse(storedBookings);
        // Convert fetched bookings to BookingRequest format
        return parsed.map((booking: any, idx: number) => ({
          id: idx + 1,
          userName: booking.name || "User",
          email: booking.email || "",
          phone: booking.phone || "",
          serviceType: booking.serviceType || "General Inquiry",
          location: booking.location || "",
          date: booking.date || new Date().toISOString().split('T')[0],
          status: (booking.status?.toLowerCase() as "pending" | "approved" | "rejected") || "pending",
        }));
      } catch (error) {
        // If parsing fails, return sample data
        return [
          {
            id: 1,
            userName: "Rajesh Kumar",
            email: "rajesh@email.com",
            phone: "+91 9876543210",
            serviceType: "Borewell Drilling",
            location: "Bangalore",
            date: "2024-03-20",
            status: "pending",
          },
          {
            id: 2,
            userName: "Priya Sharma",
            email: "priya@email.com",
            phone: "+91 9123456789",
            serviceType: "Borewell Cleaning",
            location: "Pune",
            date: "2024-03-18",
            status: "approved",
          },
          {
            id: 3,
            userName: "Amit Patel",
            email: "amit@email.com",
            phone: "+91 8765432101",
            serviceType: "Pump Installation",
            location: "Mumbai",
            date: "2024-03-15",
            status: "pending",
          },
        ];
      }
    } else {
      // Return sample data if no bookings in localStorage
      return [
        {
          id: 1,
          userName: "Rajesh Kumar",
          email: "rajesh@email.com",
          phone: "+91 9876543210",
          serviceType: "Borewell Drilling",
          location: "Bangalore",
          date: "2024-03-20",
          status: "pending",
        },
        {
          id: 2,
          userName: "Priya Sharma",
          email: "priya@email.com",
          phone: "+91 9123456789",
          serviceType: "Borewell Cleaning",
          location: "Pune",
          date: "2024-03-18",
          status: "approved",
        },
        {
          id: 3,
          userName: "Amit Patel",
          email: "amit@email.com",
          phone: "+91 8765432101",
          serviceType: "Pump Installation",
          location: "Mumbai",
          date: "2024-03-15",
          status: "pending",
        },
      ];
    }
  };

  const [bookings, setBookings] = useState<BookingRequest[]>(initializeBookings());

  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1581092160562-40fed08a5407?w=600&h=400&fit=crop",
      alt: "Borewell drilling equipment",
      uploadedDate: "2024-03-15",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop",
      alt: "Drilling team at work",
      uploadedDate: "2024-03-14",
    },
  ]);

  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [blogImages, setBlogImages] = useState<BlogImageData[]>([
    { id: 1, title: "The Complete Guide to Borewell Drilling", currentUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop&q=80", newUrl: "" },
    { id: 2, title: "Understanding Water Quality Testing", currentUrl: "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=800&h=500&fit=crop&q=80", newUrl: "" },
    { id: 3, title: "Latest Drilling Technologies in Borewell Industry", currentUrl: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=500&fit=crop&q=80", newUrl: "" },
    { id: 4, title: "Pump Installation Best Practices", currentUrl: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=500&fit=crop&q=80", newUrl: "" },
    { id: 5, title: "Seasonal Borewell Maintenance Checklist", currentUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop&q=80", newUrl: "" },
    { id: 6, title: "Troubleshooting Common Borewell Problems", currentUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop&q=80", newUrl: "" },
    { id: 7, title: "Cost Analysis: Investing in a Borewell", currentUrl: "https://images.unsplash.com/photo-1579621970563-430f63602022?w=800&h=500&fit=crop&q=80", newUrl: "" },
    { id: 8, title: "Environmental Impact of Borewell Drilling", currentUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=500&fit=crop&q=80", newUrl: "" },
    { id: 9, title: "Selecting the Right Borewell Depth", currentUrl: "https://images.unsplash.com/photo-1581092160562-40fed08a5407?w=800&h=500&fit=crop&q=80", newUrl: "" },
  ]);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!adminLoggedIn) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminEmail");
    navigate("/");
  };

  const handleApproveBooking = (id: number) => {
    const updatedBookings = bookings.map((b) => 
      b.id === id ? { ...b, status: "approved" as const } : b
    );
    setBookings(updatedBookings);
    
    // Update localStorage with approved status
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const bookingIndex = storedBookings.findIndex((b: any) => b.email === bookings.find(x => x.id === id)?.email);
    if (bookingIndex >= 0) {
      storedBookings[bookingIndex].status = "approved";
      localStorage.setItem("bookings", JSON.stringify(storedBookings));
    }
    
    setSelectedBooking(null);
  };

  const handleRejectBooking = (id: number) => {
    const updatedBookings = bookings.map((b) => 
      b.id === id ? { ...b, status: "rejected" as const } : b
    );
    setBookings(updatedBookings);
    
    // Update localStorage with rejected status
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const bookingIndex = storedBookings.findIndex((b: any) => b.email === bookings.find(x => x.id === id)?.email);
    if (bookingIndex >= 0) {
      storedBookings[bookingIndex].status = "rejected";
      localStorage.setItem("bookings", JSON.stringify(storedBookings));
    }
    
    setSelectedBooking(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        if (!file.type.includes("image")) {
          setUploadError("Please upload images only");
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          setUploadError("File size must be less than 5MB");
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage: GalleryImage = {
            id: Math.max(...images.map((i) => i.id), 0) + 1,
            src: e.target?.result as string,
            alt: file.name,
            uploadedDate: new Date().toISOString().split("T")[0],
          };
          setImages([...images, newImage]);
          setUploadError("");
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteImage = (id: number) => {
    setImages(images.filter((i) => i.id !== id));
  };

  const handleUpdateBlogImage = (id: number) => {
    const newUrl = blogImages.find(img => img.id === id)?.newUrl;
    if (newUrl && newUrl.trim()) {
      setBlogImages(blogImages.map(img => 
        img.id === id ? { ...img, currentUrl: newUrl, newUrl: "" } : img
      ));
      
      // Save to localStorage for persistence
      const storedBlogImages = JSON.parse(localStorage.getItem("blogPostImages") || "{}");
      storedBlogImages[id] = newUrl;
      localStorage.setItem("blogPostImages", JSON.stringify(storedBlogImages));
      
      setEditingBlogId(null);
      alert("Image URL updated successfully!");
    } else {
      alert("Please enter a valid image URL");
    }
  };

  const handleRevertBlogImage = (id: number) => {
    setBlogImages(blogImages.map(img => 
      img.id === id ? { ...img, newUrl: "" } : img
    ));
    setEditingBlogId(null);
  };

  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const approvedCount = bookings.filter((b) => b.status === "approved").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-xs text-gray-400">Mahalakshmi Borewells</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "bookings", label: "Bookings", icon: CheckCircle },
            { id: "images", label: "Image Manager", icon: Image },
            { id: "gallery", label: "Gallery", icon: Upload },
            { id: "settings", label: "Settings", icon: FileText },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={`py-4 px-2 flex items-center gap-2 border-b-2 transition-all font-medium text-sm ${
                activeTab === id
                  ? "border-red-500 text-red-400"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  label: "Total Bookings",
                  value: bookings.length,
                  color: "from-blue-500 to-blue-600",
                  icon: CheckCircle,
                },
                {
                  label: "Pending Approvals",
                  value: pendingCount,
                  color: "from-yellow-500 to-yellow-600",
                  icon: Clock,
                },
                {
                  label: "Approved",
                  value: approvedCount,
                  color: "from-green-500 to-green-600",
                  icon: CheckCircle,
                },
                {
                  label: "Gallery Images",
                  value: images.length,
                  color: "from-purple-500 to-purple-600",
                  icon: Image,
                },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl text-white shadow-lg`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-80">{stat.label}</p>
                        <p className="text-3xl font-bold mt-2">{stat.value}</p>
                      </div>
                      <Icon className="w-8 h-8 opacity-30" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Recent Bookings</h3>
              <div className="space-y-3">
                {bookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-white">{booking.userName}</p>
                      <p className="text-sm text-gray-400">{booking.serviceType}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : booking.status === "approved"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Booking Requests</h2>
              <div className="flex gap-2">
                {["pending", "approved"].map((status) => (
                  <div
                    key={status}
                    className="px-4 py-2 bg-white/10 rounded-lg text-sm text-gray-300"
                  >
                    {status === "pending" ? "🟡" : "🟢"}{" "}
                    {status.charAt(0).toUpperCase() + status.slice(1)}:{" "}
                    {bookings.filter((b) => b.status === status).length}
                  </div>
                ))}
              </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {bookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all cursor-pointer group"
                  onClick={() => setSelectedBooking(booking)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                    <div>
                      <p className="text-xs text-gray-400">Customer</p>
                      <p className="font-semibold text-white">{booking.userName}</p>
                      <p className="text-xs text-gray-400">{booking.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Service</p>
                      <p className="font-semibold text-white">{booking.serviceType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Location</p>
                      <p className="font-semibold text-white">{booking.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Date</p>
                      <p className="font-semibold text-white">{booking.date}</p>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : booking.status === "approved"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      {booking.status === "pending" && (
                        <span className="text-xs text-blue-300 font-semibold group-hover:block hidden">Click to approve</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Gallery Management</h2>
              <label className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg cursor-pointer hover:from-purple-600 hover:to-purple-700 transition-all flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Images
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {uploadError && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {uploadError}
              </div>
            )}

            {/* Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/20"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <div className="p-3 bg-white/10">
                    <p className="text-xs text-gray-300 truncate">{image.alt}</p>
                    <p className="text-xs text-gray-500">{image.uploadedDate}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Image Manager Tab */}
        {activeTab === "images" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Blog Post Image Manager</h2>
              <p className="text-gray-400 text-sm">Edit and update images displayed in blog posts</p>
            </div>

            {/* Blog Images Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {blogImages.map((blogImage) => (
                <motion.div
                  key={blogImage.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 space-y-4"
                >
                  {/* Blog Post Title */}
                  <h3 className="text-lg font-semibold text-white line-clamp-2">
                    {blogImage.title}
                  </h3>

                  {/* Current Image Preview */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Current Image
                    </label>
                    <div className="relative h-40 bg-white/5 rounded-lg overflow-hidden border border-white/10">
                      <img
                        src={blogImage.currentUrl}
                        alt={blogImage.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'%3E%3Crect fill='%23333' width='800' height='500'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23999'%3EImage not available%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </div>

                  {/* Edit Mode Toggle */}
                  {editingBlogId === blogImage.id ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 pt-4 border-t border-white/10"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          New Image URL
                        </label>
                        <input
                          type="text"
                          value={blogImage.newUrl}
                          onChange={(e) => {
                            setBlogImages(
                              blogImages.map((img) =>
                                img.id === blogImage.id
                                  ? { ...img, newUrl: e.target.value }
                                  : img
                              )
                            );
                          }}
                          placeholder="Enter image URL (e.g., https://unsplash.com/...)"
                          className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>

                      {/* URL Preview */}
                      {blogImage.newUrl && (
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-300">
                            URL Preview
                          </label>
                          <div className="relative h-32 bg-white/5 rounded-lg overflow-hidden border border-white/10">
                            <img
                              src={blogImage.newUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'%3E%3Crect fill='%23333' width='800' height='500'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23999'%3EInvalid URL or failed to load%3C/text%3E%3C/svg%3E";
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateBlogImage(blogImage.id)}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all flex items-center justify-center gap-2 font-medium"
                        >
                          <Check className="w-4 h-4" />
                          Update
                        </button>
                        <button
                          onClick={() => handleRevertBlogImage(blogImage.id)}
                          className="flex-1 px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 rounded-lg transition-all flex items-center justify-center gap-2 font-medium"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => setEditingBlogId(blogImage.id)}
                      className="w-full px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all flex items-center justify-center gap-2 font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Image URL
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <p className="text-sm text-blue-200">
                💡 <strong>Tip:</strong> You can use Unsplash URLs with quality parameters like{" "}
                <code className="bg-black/30 px-2 py-1 rounded text-xs">
                  ?w=800&h=500&fit=crop&q=80
                </code>{" "}
                for optimal image loading.
              </p>
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">Settings</h2>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Admin Email
                </label>
                <p className="px-4 py-2 bg-white/5 rounded-lg text-gray-300">
                  {localStorage.getItem("adminEmail")}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Booking Detail Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBooking(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 pt-24 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/20 rounded-2xl max-w-md w-full max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
                <h3 className="text-xl font-bold text-white">Booking Details</h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                <DetailItem label="Customer Name" value={selectedBooking.userName} />
                <DetailItem label="Email" value={selectedBooking.email} />
                <DetailItem label="Phone" value={selectedBooking.phone} />
                <DetailItem label="Service" value={selectedBooking.serviceType} />
                <DetailItem label="Location" value={selectedBooking.location} />
                <DetailItem label="Date" value={selectedBooking.date} />
                <DetailItem
                  label="Status"
                  value={
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedBooking.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : selectedBooking.status === "approved"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {selectedBooking.status.charAt(0).toUpperCase() +
                        selectedBooking.status.slice(1)}
                    </span>
                  }
                />
                </div>
              </div>

              <div className="border-t border-white/10 p-6 flex-shrink-0">
                {selectedBooking.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApproveBooking(selectedBooking.id)}
                      className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors active:scale-95"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => handleRejectBooking(selectedBooking.id)}
                      className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors active:scale-95"
                    >
                      ✗ Reject
                    </button>
                  </div>
                )}
                {selectedBooking.status !== "pending" && (
                  <div className="p-3 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-200 text-sm text-center">
                    This booking has already been {selectedBooking.status}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) => (
  <div>
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <p className="text-white font-medium">{value}</p>
  </div>
);

export default AdminDashboard;
