import { motion } from "framer-motion";
import { MapPin, ArrowDown, Star } from "lucide-react";

const projects = [
  { location: "Bangalore Rural", depth: "450 ft", feedback: "Excellent service! Water found at 350 ft. Very professional team.", rating: 5 },
  { location: "Mysore District", depth: "600 ft", feedback: "Mahalakshmi Borewells delivered on time. Great water yield for our farm.", rating: 5 },
  { location: "Hassan", depth: "380 ft", feedback: "Affordable and reliable. The team was knowledgeable and efficient.", rating: 4 },
  { location: "Tumkur", depth: "520 ft", feedback: "Second borewell with Mahalakshmi Borewells. Consistent quality every time.", rating: 5 },
  { location: "Mandya", depth: "700 ft", feedback: "Deep drilling executed perfectly. Highly recommend their services.", rating: 5 },
  { location: "Chitradurga", depth: "480 ft", feedback: "Quick turnaround and excellent water quality. Very satisfied.", rating: 4 },
];

const ProjectsSection = () => (
  <section id="projects" className="section-padding bg-section-alt">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Completed <span className="text-primary">Projects</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          A glimpse at some of our successfully completed borewell projects.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-card rounded-xl p-6 shadow-sm border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="h-4 w-4" />
                <span className="font-heading font-semibold text-sm">{proj.location}</span>
              </div>
              <div className="flex items-center gap-1 text-secondary">
                <ArrowDown className="h-4 w-4" />
                <span className="font-semibold text-sm">{proj.depth}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic leading-relaxed">"{proj.feedback}"</p>
            <div className="flex gap-0.5 mt-3">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  className={`h-4 w-4 ${s < proj.rating ? "text-yellow-500 fill-yellow-500" : "text-border"}`}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
