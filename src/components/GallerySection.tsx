import { motion } from "framer-motion";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop", alt: "Borewell drilling rig in operation" },
  { src: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=600&h=400&fit=crop", alt: "Heavy drilling equipment at site" },
  { src: "https://images.unsplash.com/photo-1581092511106-c0eb6c1f8c9e?w=600&h=400&fit=crop", alt: "Water well construction work" },
  { src: "https://images.unsplash.com/photo-1581092916564-8241b3d76b00?w=600&h=400&fit=crop", alt: "Professional drilling team at work" },
  { src: "https://images.unsplash.com/photo-1581092162384-8987c1d64719?w=600&h=400&fit=crop", alt: "Submersible pump installation" },
  { src: "https://images.unsplash.com/photo-1581092160562-40fed08a5407?w=600&h=400&fit=crop", alt: "Borewell maintenance and service" },
];

const GallerySection = () => (
  <section id="gallery" className="section-padding bg-background">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Our <span className="text-primary">Gallery</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          See our equipment, work sites, and team in action.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-xl overflow-hidden aspect-[3/2] group"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
