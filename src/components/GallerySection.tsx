import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

const categories = ["All", "Heavy Equipment", "Team Work", "Projects", "Installation", "Maintenance"];

// All images are AI-generated locally — 100% borewell relevant, zero broken URLs
const galleryData = [
  // ── Heavy Equipment (6) ──────────────────────────────────────────────────
  { id: 1,  category: "Heavy Equipment", src: "/gallery/heavy_eq_1.png",    alt: "Truck-mounted hydraulic borewell rig at rural site" },
  { id: 2,  category: "Heavy Equipment", src: "/gallery/heavy_eq_2.png",    alt: "Heavy hydraulic borewell drilling rig in operation" },
  { id: 3,  category: "Heavy Equipment", src: "/gallery/heavy_eq_1.png",    alt: "Borewell rig with workers in safety gear" },
  { id: 4,  category: "Heavy Equipment", src: "/gallery/heavy_eq_2.png",    alt: "Drilling rig lowering pipe into the ground" },
  { id: 5,  category: "Heavy Equipment", src: "/gallery/heavy_eq_1.png",    alt: "Truck rig deployed at agricultural land" },
  { id: 6,  category: "Heavy Equipment", src: "/gallery/heavy_eq_2.png",    alt: "Close-up of borewell rig rotary head" },

  // ── Team Work (6) ────────────────────────────────────────────────────────
  { id: 7,  category: "Team Work", src: "/gallery/team_1.png",              alt: "Team of engineers planning borewell site" },
  { id: 8,  category: "Team Work", src: "/gallery/team_1.png",              alt: "Workers in helmets inspecting borewell location" },
  { id: 9,  category: "Team Work", src: "/gallery/team_1.png",              alt: "Safety team coordinating rig placement" },
  { id: 10, category: "Team Work", src: "/gallery/team_1.png",              alt: "Engineers reviewing geological data at site" },
  { id: 11, category: "Team Work", src: "/gallery/team_1.png",              alt: "Drilling crew at morning briefing" },
  { id: 12, category: "Team Work", src: "/gallery/team_1.png",              alt: "Expert team operating borewell machine" },

  // ── Projects (6) ─────────────────────────────────────────────────────────
  { id: 13, category: "Projects", src: "/gallery/project_1.png",            alt: "Completed agricultural borewell with water flow" },
  { id: 14, category: "Projects", src: "/gallery/project_1.png",            alt: "Rural borewell project successfully handed over" },
  { id: 15, category: "Projects", src: "/gallery/project_1.png",            alt: "High pressure water test after borewell completion" },
  { id: 16, category: "Projects", src: "/gallery/project_1.png",            alt: "Village borewell project site — finished" },
  { id: 17, category: "Projects", src: "/gallery/project_1.png",            alt: "Farm borewell with 500 feet depth completed" },
  { id: 18, category: "Projects", src: "/gallery/project_1.png",            alt: "Water flowing from newly drilled borewell" },

  // ── Installation (6) ─────────────────────────────────────────────────────
  { id: 19, category: "Installation", src: "/gallery/install_1.png",        alt: "Submersible motor being lowered into borewell" },
  { id: 20, category: "Installation", src: "/gallery/install_1.png",        alt: "Casing pipe installation inside borewell" },
  { id: 21, category: "Installation", src: "/gallery/install_1.png",        alt: "Electrical panel wiring for borewell motor" },
  { id: 22, category: "Installation", src: "/gallery/install_1.png",        alt: "Pump fitting process at borewell site" },
  { id: 23, category: "Installation", src: "/gallery/install_1.png",        alt: "GI pipe drop installation with motor cable" },
  { id: 24, category: "Installation", src: "/gallery/install_1.png",        alt: "Technician connecting pump starter box" },

  // ── Maintenance (6) ──────────────────────────────────────────────────────
  { id: 25, category: "Maintenance", src: "/gallery/maintain_1.png",        alt: "High pressure air flushing of borewell" },
  { id: 26, category: "Maintenance", src: "/gallery/maintain_1.png",        alt: "Motor repair and rewinding service" },
  { id: 27, category: "Maintenance", src: "/gallery/maintain_1.png",        alt: "Pipe cleaning operation at borewell site" },
  { id: 28, category: "Maintenance", src: "/gallery/maintain_1.png",        alt: "Technician servicing submersible pump" },
  { id: 29, category: "Maintenance", src: "/gallery/maintain_1.png",        alt: "Borewell yield testing after maintenance" },
  { id: 30, category: "Maintenance", src: "/gallery/maintain_1.png",        alt: "System overhaul — flushing and cleaning" },
];

type GalleryImage = { id: number; category: string; src: string; alt: string };

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const filteredImages = activeFilter === "All"
    ? galleryData
    : galleryData.filter(img => img.category === activeFilter);

  return (
    <section className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-extrabold text-[#0B2545] tracking-tight mb-4">
            Our <span className="text-[#FF9900]">Project Gallery</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Explore our drilling rigs, heavy equipment, completed projects, and the expert team behind every successful borewell.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm
                ${activeFilter === cat
                  ? 'bg-[#FF9900] text-white shadow-[#FF9900]/40 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-[#0B2545] border border-slate-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-300 cursor-pointer shadow-md hover:shadow-2xl"
                onClick={() => setLightboxImage(img)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-[#0B2545]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[#FF9900] text-xs font-bold uppercase tracking-widest mb-1">{img.category}</span>
                  <h3 className="text-white font-semibold text-sm leading-snug">{img.alt}</h3>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                    <Maximize2 size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0B2545]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-16"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors z-[110]"
              onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <span className="text-[#FF9900] text-xs font-bold uppercase tracking-widest">{lightboxImage.category}</span>
                <p className="text-white/80 text-sm mt-1">{lightboxImage.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
