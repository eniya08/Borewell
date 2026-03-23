import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Users, Clock, Award, ArrowRight, ArrowLeft } from "lucide-react";

interface ServiceDetail {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  features: string[];
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  pricing?: string;
}

const services: Record<string, ServiceDetail> = {
  drilling: {
    id: "drilling",
    title: "Borewell Drilling",
    shortDescription: "Professional drilling for residential, commercial, and agricultural borewells",
    description:
      "We specialize in professional borewell drilling services up to 1500 feet depth. Our expert team uses state-of-the-art drilling equipment to ensure precision, safety, and durability. We handle geological surveys, proper casing installation, and quality assurance.",
    image: "https://images.unsplash.com/photo-1581092160562-40fed08a5407?w=1200&h=600&fit=crop",
    features: [
      "Up to 1500 feet drilling depth",
      "Geological survey included",
      "Professional casing installation",
      "Quality assurance testing",
      "Expert team with 15+ years experience",
    ],
    benefits: [
      "Ensures continuous water supply",
      "Increases property value",
      "Reduces dependency on municipal water",
      "Cost-effective long-term solution",
      "Environment friendly water source",
    ],
    process: [
      {
        step: 1,
        title: "Site Assessment",
        description: "We analyze soil composition and groundwater levels to determine optimal drilling location.",
      },
      {
        step: 2,
        title: "Drilling",
        description: "Advanced drilling equipment ensures quick and precise borewell installation with minimal disruption.",
      },
      {
        step: 3,
        title: "Casing & Lining",
        description: "Professional casing prevents contamination and ensures borewell longevity.",
      },
      {
        step: 4,
        title: "Testing & Certification",
        description: "Water quality testing and performance verification before handover.",
      },
    ],
    pricing: "Starting from ₹15,000",
  },
  cleaning: {
    id: "cleaning",
    title: "Borewell Cleaning",
    shortDescription: "Thorough cleaning services to restore water flow and remove sediment build-up",
    description:
      "Over time, borewells accumulate sediment, silt, and mineral deposits that reduce water flow. Our professional cleaning service uses high-pressure jets and advanced techniques to restore your borewell to optimal performance.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=600&fit=crop",
    features: [
      "High-pressure jet cleaning",
      "Sediment and silt removal",
      "Non-destructive cleaning method",
      "Water quality restoration",
      "Quick turnaround time",
    ],
    benefits: [
      "Restores water flow efficiency",
      "Extends borewell lifespan",
      "Improves water quality",
      "Cost-effective maintenance",
      "Prevents pump damage",
    ],
    process: [
      {
        step: 1,
        title: "Inspection",
        description: "Detailed inspection to identify sediment levels and blockage areas.",
      },
      {
        step: 2,
        title: "Cleaning Treatment",
        description: "High-pressure water jets remove accumulated deposits and restore flow.",
      },
      {
        step: 3,
        title: "Flushing",
        description: "Complete flushing to remove all sediment particles from the borewell.",
      },
      {
        step: 4,
        title: "Quality Check",
        description: "Testing to ensure optimal water flow and quality restoration.",
      },
    ],
    pricing: "Starting from ₹8,000",
  },
  flushing: {
    id: "flushing",
    title: "Borewell Flushing",
    shortDescription: "High-pressure flushing to clear blockages and improve water yield",
    description:
      "Borewell flushing is essential maintenance to clear blockages caused by mineral deposits and debris. Our high-pressure flushing service improves water yield and prevents complete blockage.",
    image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&h=600&fit=crop",
    features: [
      "High-pressure flushing systems",
      "Blockage removal",
      "Water yield improvement",
      "Safe for all borewell types",
      "Emergency service available",
    ],
    benefits: [
      "Immediate water flow restoration",
      "Prevents future blockages",
      "Improves water pressure",
      "Extends equipment lifespan",
      "Economical maintenance solution",
    ],
    process: [
      {
        step: 1,
        title: "Diagnosis",
        description: "Identify blockage points and assess water flow capacity.",
      },
      {
        step: 2,
        title: "Flushing Operation",
        description: "High-pressure flushing clears blockages and restores free flow.",
      },
      {
        step: 3,
        title: "Sediment Removal",
        description: "Complete removal of loosened sediment and mineral deposits.",
      },
      {
        step: 4,
        title: "Flow Testing",
        description: "Verify improved water yield and pressure restoration.",
      },
    ],
    pricing: "Starting from ₹5,000",
  },
  pump: {
    id: "pump",
    title: "Pump Installation",
    shortDescription: "Expert installation of submersible and jet pumps for optimal water extraction",
    description:
      "Proper pump installation is crucial for efficient water extraction. Our technicians provide expert installation of submersible and jet pumps, ensuring optimal performance and longevity.",
    image: "https://images.unsplash.com/photo-1581092160562-40fed08a5408?w=1200&h=600&fit=crop",
    features: [
      "Submersible pump installation",
      "Jet pump installation",
      "Professional wiring and connections",
      "Pressure tank setup",
      "Warranty and after-sales support",
    ],
    benefits: [
      "Reliable water supply system",
      "Energy-efficient operations",
      "Professional installation ensures longevity",
      "24/7 water availability",
      "Easy maintenance access",
    ],
    process: [
      {
        step: 1,
        title: "Pump Selection",
        description: "Choose appropriate pump based on borewell depth and water requirements.",
      },
      {
        step: 2,
        title: "Installation",
        description: "Professional installation with proper piping and electrical connections.",
      },
      {
        step: 3,
        title: "Testing",
        description: "Comprehensive testing for proper functionality and pressure levels.",
      },
      {
        step: 4,
        title: "Handover",
        description: "Demonstration of operation and provision of maintenance guidelines.",
      },
    ],
    pricing: "Starting from ₹25,000",
  },
  waterLevel: {
    id: "waterLevel",
    title: "Water Level Checking",
    shortDescription: "Accurate measurement and analysis of groundwater levels before and after drilling",
    description:
      "Accurate water level measurement is essential for borewell planning and monitoring. We provide precise water level checking services using advanced equipment.",
    image: "https://images.unsplash.com/photo-1581092924270-8cbaeea4d4e9?w=1200&h=600&fit=crop",
    features: [
      "Digital water level measurement",
      "Pre and post-drilling analysis",
      "Seasonal variation tracking",
      "Detailed reports provided",
      "Groundwater assessment",
    ],
    benefits: [
      "Accurate borewell planning",
      "Optimal drilling depth determination",
      "Monitor groundwater trends",
      "Predict water availability",
      "Plan irrigation schedules",
    ],
    process: [
      {
        step: 1,
        title: "Initial Survey",
        description: "Assess current water table and seasonal variations.",
      },
      {
        step: 2,
        title: "Measurement",
        description: "Use advanced equipment for precise water level detection.",
      },
      {
        step: 3,
        title: "Analysis",
        description: "Analyze data and provide groundwater level reports.",
      },
      {
        step: 4,
        title: "Recommendations",
        description: "Provide expert recommendations for optimal borewell planning.",
      },
    ],
    pricing: "Starting from ₹2,000",
  },
  maintenance: {
    id: "maintenance",
    title: "Maintenance Services",
    shortDescription: "Regular maintenance and repair services to keep your borewell running efficiently",
    description:
      "Regular maintenance is key to the longevity of your borewell system. We offer comprehensive maintenance services including cleaning, repairs, and preventive care.",
    image: "https://images.unsplash.com/photo-1581092915962-8706672e5b5f?w=1200&h=600&fit=crop",
    features: [
      "Regular maintenance schedules",
      "Emergency repair services",
      "Preventive care programs",
      "Spare parts replacement",
      "System optimization",
    ],
    benefits: [
      "Extends equipment lifespan significantly",
      "Prevents unexpected breakdowns",
      "Maintains optimal water quality",
      "Reduces repair costs",
      "24/7 emergency support available",
    ],
    process: [
      {
        step: 1,
        title: "System Inspection",
        description: "Thorough inspection of entire borewell and pump system.",
      },
      {
        step: 2,
        title: "Maintenance",
        description: "Perform scheduled maintenance and necessary adjustments.",
      },
      {
        step: 3,
        title: "Repairs",
        description: "Address any issues found during inspection and service.",
      },
      {
        step: 4,
        title: "Documentation",
        description: "Provide maintenance records and recommendations for future care.",
      },
    ],
    pricing: "Annual packages starting from ₹10,000",
  },
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = services[serviceId || "drilling"];

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white text-xl">Service not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
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

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-96 flex items-center justify-center overflow-hidden"
      >
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-slate-900"></div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-center text-white"
        >
          <h1 className="text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{service.shortDescription}</p>
        </motion.div>
      </motion.section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Description */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-4">About This Service</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{service.description}</p>
        </motion.section>

        {/* Features & Benefits */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Features */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Award className="w-6 h-6 text-blue-400" />
              Key Features
            </h3>
            <ul className="space-y-3">
              {service.features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-gray-200"
                >
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          {/* Benefits */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              Benefits
            </h3>
            <ul className="space-y-3">
              {service.benefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-gray-200"
                >
                  <ArrowRight className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </div>

        {/* Process */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <Clock className="w-8 h-8 text-[#FF9900]" />
            Our Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((proc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {i < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-12 h-1 bg-[#FF9900]/30"></div>
                )}
                <div className="bg-gradient-to-br from-[#FF9900]/20 to-orange-600/20 border border-[#FF9900]/30 rounded-xl p-6 h-full">
                  <div className="w-10 h-10 bg-[#FF9900] rounded-full flex items-center justify-center text-white font-bold mb-4">
                    {proc.step}
                  </div>
                  <h4 className="font-bold text-white mb-2 text-lg">{proc.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{proc.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Pricing & CTA */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#FF9900]/30 to-orange-600/30 border border-[#FF9900]/50 rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-6 text-lg">{service.pricing}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const userLoggedIn = localStorage.getItem("userLoggedIn");
                if (userLoggedIn) {
                  navigate('/booking', { state: { serviceType: service.title } });
                } else {
                  navigate('/user-signin');
                }
              }}
              className="px-8 py-4 bg-[#FF9900] hover:bg-[#E68A00] text-white font-bold rounded-lg transition-colors shadow-lg shadow-[#FF9900]/30"
            >
              Book Service
            </motion.button>
            <button className="px-8 py-4 border-2 border-[#FF9900] text-[#FF9900] hover:bg-[#FF9900]/10 font-bold rounded-lg transition-colors">
              Get Quote
            </button>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Have Questions?</h3>
          <p className="text-gray-300 mb-6">
            Our expert team is ready to help. Contact us for more information or to schedule a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-white">
            <a
              href="tel:+919367666669"
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              📞 Call: +91 9367666669
            </a>
            <a
              href="mailto:info@mahalakshmi.com"
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              📧 Email: info@mahalakshmi.com
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ServiceDetail;
