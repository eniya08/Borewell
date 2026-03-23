import { motion } from "framer-motion";
import { Shield, Clock, Wrench, IndianRupee } from "lucide-react";

const reasons = [
  { icon: Shield, title: "Experienced Team", desc: "Skilled professionals with 15+ years of drilling expertise." },
  { icon: Wrench, title: "Modern Equipment", desc: "Latest hydraulic rigs and advanced technology for precision drilling." },
  { icon: IndianRupee, title: "Affordable Pricing", desc: "Competitive rates without compromising on quality or safety." },
  { icon: Clock, title: "Fast Service", desc: "Quick turnaround with timely project completion guaranteed." },
];

const AboutSection = () => (
  <section id="about" className="section-padding bg-background relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />

    <div className="container mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground tracking-tight">
          About <span className="text-primary italic">Mahalakshmi Borewells</span>
        </h2>
        <p className="mt-6 text-muted-foreground text-lg md:text-xl leading-relaxed">
          Mahalakshmi Borewells Services is a trusted name in the water drilling industry.
          Established over 15 years ago, we specialize in providing comprehensive borewell
          solutions with a commitment to excellence and sustainability.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {reasons.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group bg-card rounded-3xl p-8 border border-border/50 hover-lift text-center"
          >
            <div className="mx-auto w-20 h-20 rounded-2xl bg-accent/50 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-12 transition-all duration-300">
              <item.icon className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-heading font-bold text-xl text-foreground mb-3">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm font-medium">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
