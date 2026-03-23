import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Drill, Droplets, Waves, Settings, Gauge, WrenchIcon } from "lucide-react";

const services = [
  { icon: Drill, title: "Borewell Drilling", desc: "Professional drilling for residential, commercial, and agricultural borewells up to 1500 ft depth.", id: "drilling" },
  { icon: Droplets, title: "Borewell Cleaning", desc: "Thorough cleaning services to restore water flow and remove sediment build-up.", id: "cleaning" },
  { icon: Waves, title: "Borewell Flushing", desc: "High-pressure flushing to clear blockages and improve water yield.", id: "flushing" },
  { icon: Settings, title: "Pump Installation", desc: "Expert installation of submersible and jet pumps for optimal water extraction.", id: "pump" },
  { icon: Gauge, title: "Water Level Checking", desc: "Accurate measurement and analysis of groundwater levels before and after drilling.", id: "waterLevel" },
  { icon: WrenchIcon, title: "Maintenance Services", desc: "Regular maintenance and repair services to keep your borewell running efficiently.", id: "maintenance" },
];

const ServicesSection = () => {
  const navigate = useNavigate();
  return (
  <section id="services" className="section-padding bg-section-alt">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Our <span className="text-primary">Services</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          We offer a complete range of borewell services to meet all your groundwater needs.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc, i) => (
          <motion.div
            key={svc.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            onClick={() => navigate(`/service/${svc.id}`)}
            className="group bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover-lift hover:border-primary/50 transition-all cursor-pointer"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <svc.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors">{svc.title}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed italic">"{svc.desc}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default ServicesSection;
