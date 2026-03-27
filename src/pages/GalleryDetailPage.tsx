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
  // Heavy Equipment
  { id: 1, category: "Heavy Equipment", src: "/gallery/heavy_equipment_1_1774545694793.png", alt: "Borewell drilling machines", title: "Heavy Truck Rig", description: "Borewell drilling machines operating in rural setting.", views: 342, likes: 89 },
  { id: 2, category: "Heavy Equipment", src: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&h=600&fit=crop", alt: "Hydraulic drilling rigs", title: "Hydraulic Equipment", description: "Advanced hydraulic drilling rig at work.", views: 251, likes: 64 },
  { id: 3, category: "Heavy Equipment", src: "https://images.unsplash.com/photo-1621689037042-832145da556d?w=800&h=600&fit=crop", alt: "Truck mounted borewell rigs", title: "Truck Mounted Rig", description: "Heavy duty truck mounted drilling rig.", views: 421, likes: 95 },
  { id: 4, category: "Heavy Equipment", src: "https://images.unsplash.com/photo-1541888081182-356b4f620bd2?w=800&h=600&fit=crop", alt: "Compressor machines", title: "Air Compressors", description: "High capacity air compressors for flushing.", views: 189, likes: 45 },
  { id: 5, category: "Heavy Equipment", src: "https://images.unsplash.com/photo-1581092511106-c0eb6c1f8c9e?w=800&h=600&fit=crop", alt: "Drilling pipes and tools", title: "Drilling Pipes", description: "Heavy industrial drilling pipes and machinery.", views: 290, likes: 72 },
  { id: 6, category: "Heavy Equipment", src: "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?w=800&h=600&fit=crop", alt: "Heavy machinery on site", title: "Excavation Tools", description: "Specialized tools for hard rock drilling.", views: 334, likes: 81 },

  // Team Work
  { id: 7, category: "Team Work", src: "/gallery/team_work_1_1774545712844.png", alt: "Workers operating borewell machines", title: "Safety Crew", description: "Team planning drilling location outdoors.", views: 405, likes: 112 },
  { id: 8, category: "Team Work", src: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&h=600&fit=crop", alt: "Team planning drilling location", title: "Site Planning", description: "Engineers inspecting borewell site.", views: 276, likes: 58 },
  { id: 9, category: "Team Work", src: "https://images.unsplash.com/photo-1581092916564-8241b3d76b00?w=800&h=600&fit=crop", alt: "Engineers inspecting site", title: "Engineering Inspection", description: "Thorough inspection of groundwater points.", views: 342, likes: 88 },
  { id: 10, category: "Team Work", src: "https://images.unsplash.com/photo-1508344928928-76ad0b16f281?w=800&h=600&fit=crop", alt: "Safety gear usage", title: "Safety First", description: "Workers equipped with safety uniforms.", views: 201, likes: 49 },
  { id: 11, category: "Team Work", src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop", alt: "Engineers discussing blueprints", title: "Blueprint Analysis", description: "Analyzing geological data for drilling.", views: 310, likes: 76 },
  { id: 12, category: "Team Work", src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop", alt: "Coordinating placement", title: "Crew Coordination", description: "Coordinating the rig placement perfectly.", views: 250, likes: 62 },

  // Projects
  { id: 13, category: "Projects", src: "/gallery/projects_1_1774545736054.png", alt: "Completed borewell sites", title: "Agricultural Borewell", description: "Rural agricultural borewell yielding high water pressure.", views: 512, likes: 140 },
  { id: 14, category: "Projects", src: "https://images.unsplash.com/photo-1584485590518-a627bd3c224b?w=800&h=600&fit=crop", alt: "Rural projects", title: "Rural Project", description: "Completed rural groundwater well.", views: 290, likes: 65 },
  { id: 15, category: "Projects", src: "https://images.unsplash.com/photo-1581092160562-40fed08a5407?w=800&h=600&fit=crop", alt: "Water flow testing", title: "Yield Testing", description: "Successful water flow testing post-drilling.", views: 421, likes: 92 },
  { id: 16, category: "Projects", src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop", alt: "Customer handover moments", title: "Commercial Well", description: "Installed commercial grade well point.", views: 315, likes: 77 },
  { id: 17, category: "Projects", src: "https://images.unsplash.com/photo-1513828742140-ccaa28f3eda0?w=800&h=600&fit=crop", alt: "Farm irrigation", title: "Farm Irrigation", description: "Farm irrigation setup connected to borewell.", views: 388, likes: 88 },
  { id: 18, category: "Projects", src: "https://images.unsplash.com/photo-1457195740896-1c0b380fe7df?w=800&h=600&fit=crop", alt: "Pumping fresh water", title: "Pure Water Extraction", description: "Crystal clear water extraction system.", views: 450, likes: 105 },

  // Installation
  { id: 19, category: "Installation", src: "/gallery/installation_1_1774545785179.png", alt: "Submersible motor installation", title: "Motor Installation", description: "Workers installing a heavy submersible motor.", views: 280, likes: 63 },
  { id: 20, category: "Installation", src: "https://images.unsplash.com/photo-1581092518469-80fb78dbe0fc?w=800&h=600&fit=crop", alt: "Pipe installation inside borewell", title: "Drop Pipes", description: "Lowering uPVC delivery pipes.", views: 215, likes: 44 },
  { id: 21, category: "Installation", src: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=800&h=600&fit=crop", alt: "Electrical panel setup", title: "Starter Panel", description: "Safe and secure electrical panel wiring.", views: 195, likes: 38 },
  { id: 22, category: "Installation", src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop", alt: "Pump fitting", title: "Pump Assembly", description: "Expert submersible pump fitting details.", views: 320, likes: 85 },
  { id: 23, category: "Installation", src: "https://images.unsplash.com/photo-1581092162590-0b6dc0f8ab88?w=800&h=600&fit=crop", alt: "Casing pipes", title: "Casing Installation", description: "High durability casing pipe dropping.", views: 260, likes: 55 },
  { id: 24, category: "Installation", src: "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?w=800&h=600&fit=crop", alt: "Cables", title: "Waterproof Cabling", description: "Submersible heavily insulated cables.", views: 180, likes: 40 },

  // Maintenance
  { id: 25, category: "Maintenance", src: "/gallery/maintenance_1_1774545805461.png", alt: "Borewell flushing work", title: "High Pressure Flushing", description: "Air flushing removing silt and mud.", views: 442, likes: 95 },
  { id: 26, category: "Maintenance", src: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&h=600&fit=crop", alt: "Motor repair service", title: "Motor Repair", description: "Rewinding and repairing burnt motors.", views: 230, likes: 51 },
  { id: 27, category: "Maintenance", src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop", alt: "Pipe cleaning", title: "Pipeline Clearing", description: "Clearing blockages in water extraction.", views: 285, likes: 62 },
  { id: 28, category: "Maintenance", src: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop", alt: "Technician", title: "Expert Diagnostics", description: "Diagnosing yield and electrical faults.", views: 305, likes: 74 },
  { id: 29, category: "Maintenance", src: "https://images.unsplash.com/photo-1581092163190-6dae1b82776c?w=800&h=600&fit=crop", alt: "Checking electricals", title: "Voltage Check", description: "Ensuring stable phases for smooth pump run.", views: 198, likes: 42 },
  { id: 30, category: "Maintenance", src: "https://images.unsplash.com/photo-1581092334543-7f280a9fc6c5?w=800&h=600&fit=crop", alt: "System overhaul", title: "System Overhaul", description: "Complete system testing and revival.", views: 355, likes: 88 }
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
