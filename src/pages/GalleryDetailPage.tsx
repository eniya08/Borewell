import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Share2, Eye, ArrowLeft } from "lucide-react";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  views: number;
  likes: number;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1581092160562-40fed08a5407?w=600&h=400&fit=crop",
    alt: "Drilling rig equipment",
    category: "Heavy Equipment",
    title: "Advanced Drilling Rig",
    description: "Our state-of-the-art drilling equipment capable of reaching up to 1500 feet deep.",
    views: 234,
    likes: 45,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop",
    alt: "Drilling team at work",
    category: "Team Work",
    title: "Expert Drilling Team",
    description: "Our skilled team performing professional borewell drilling operations.",
    views: 189,
    likes: 38,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=600&h=400&fit=crop",
    alt: "Water construction",
    category: "Projects",
    title: "Water Well Construction",
    description: "Completed borewell project with professional casing and installation.",
    views: 312,
    likes: 67,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1581092924270-8cbaeea4d4e9?w=600&h=400&fit=crop",
    alt: "Pump installation",
    category: "Installation",
    title: "Submersible Pump Setup",
    description: "Professional pump installation with complete electrical setup.",
    views: 156,
    likes: 29,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1581092915962-8706672e5b5f?w=600&h=400&fit=crop",
    alt: "Maintenance work",
    category: "Maintenance",
    title: "System Maintenance",
    description: "Regular maintenance ensuring optimal borewell performance.",
    views: 203,
    likes: 41,
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1581092941395-60ae96f88bd8?w=600&h=400&fit=crop",
    alt: "Site preparation",
    category: "Projects",
    title: "Site Preparation",
    description: "Initial site assessment and preparation for borewell drilling.",
    views: 278,
    likes: 53,
  },
];

const categories = ["All", ...new Set(galleryItems.map((item) => item.category))];

const GalleryPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="fixed top-24 left-4 z-50 flex items-center gap-2 text-orange-500 hover:text-orange-400 font-semibold transition"
      >
        <ArrowLeft size={20} />
        Back
      </motion.button>

      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#FF9900]/20 to-orange-600/20 border-b border-white/10 py-12"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Our Gallery</h1>
          <p className="text-gray-300 text-lg">
            Explore our completed projects, equipment, and team in action
          </p>
        </div>
      </motion.section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-[#FF9900] text-white shadow-lg shadow-[#FF9900]/50"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedImage(item)}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#FF9900]/50 transition-all h-64">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-200 text-sm mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {item.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" /> {item.likes}
                      </span>
                    </div>
                    <span className="px-2 py-1 bg-[#FF9900]/30 rounded">{item.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Image Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 pt-24"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 rounded-2xl overflow-hidden max-w-2xl w-full border border-white/20"
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-[#FF9900]/30 text-[#FF9900] rounded-full text-sm font-semibold">
                    {selectedImage.category}
                  </span>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">{selectedImage.title}</h2>
                <p className="text-gray-300 mb-6">{selectedImage.description}</p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#FF9900] hover:bg-[#E68A00] text-white rounded-lg transition-colors">
                    <Heart className="w-4 h-4" />
                    Like ({selectedImage.likes})
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Book Service CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-[#FF9900]/30 to-orange-600/30 border border-[#FF9900]/50 rounded-2xl p-12 text-center mt-12 mx-4 mb-12 max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Book Our Services?</h2>
        <p className="text-gray-300 mb-6 text-lg">Get your borewell drilling and maintenance done by our expert team</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const userLoggedIn = localStorage.getItem("userLoggedIn");
            if (userLoggedIn) {
              navigate('/booking');
            } else {
              navigate('/user-signin');
            }
          }}
          className="px-8 py-4 bg-[#FF9900] hover:bg-[#E68A00] text-white font-bold rounded-lg transition-colors shadow-lg shadow-[#FF9900]/30"
        >
          Book Service Now
        </motion.button>
      </motion.section>
    </div>
  );
};

export default GalleryPage;
