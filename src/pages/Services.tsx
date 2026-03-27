import React from 'react';
import { motion } from 'framer-motion';
import { Drill, Settings, Droplets, Wrench, ArrowRight, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const serviceDetails = [
  {
    id: "drilling",
    icon: Drill,
    title: "Borewell Drilling",
    description: "Our core expertise lies in precision borewell drilling. We utilize advanced rigs capable of drilling through both normal soil and tough hard rock formations. Whether you need a 300ft borewell for your home or an 800+ft deep well for agriculture, our experienced operators ensure clean and efficient drilling with maximal water yield.",
    imageColor: "from-[#133C55] to-[#386FA4]"
  },
  {
    id: "motor",
    icon: Settings,
    title: "Motor Installation",
    description: "A borewell is incomplete without the right extraction machinery. We provide end-to-end motor and submersible pump installation services. Our technicians help select the appropriate horsepower (HP) and pump phase based on your well's depth and water table, ensuring longevity and consistent water pressure.",
    imageColor: "from-[#386FA4] to-[#59A5D8]"
  },
  {
    id: "flushing",
    icon: Droplets,
    title: "Borewell Flushing",
    description: "Over time, borewells accumulate silt, mud, and mineral scaling that obstructs natural water veins. Our high-pressure air flushing process revitalizes your borewell, clearing blockages and dramatically improving water output without needing to drill a new hole.",
    imageColor: "from-[#59A5D8] to-[#91E5F6]"
  },
  {
    id: "maintenance",
    icon: Wrench,
    title: "Maintenance and Repair",
    description: "We offer comprehensive service contracts and emergency repair calls. From broken pump recovery, cable replacements, to yield testing and casing repairs, our rapid response team is equipped to solve any groundwater infrastructure problems quickly.",
    imageColor: "from-[#0B2545] to-[#133C55]"
  }
];

const Services = () => {
  const navigate = useNavigate();

  const handleEnquire = (serviceTitle: string) => {
    const isLoggedIn = localStorage.getItem("userLoggedIn");
    if (isLoggedIn) {
      navigate("/booking", { state: { serviceType: serviceTitle } });
    } else {
      navigate("/user-signin", { state: { redirectTo: "/booking", serviceType: serviceTitle } });
    }
  };

  return (
    <main className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-[#0B2545] tracking-tight mb-4"
          >
            Our Professional <span className="text-[#386FA4]">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg leading-relaxed"
          >
            Mahalakshmi Borewells provides end-to-end groundwater solutions. From discovering water to delivering it straight to your tanks.
          </motion.p>
        </div>

        {/* Services List */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {serviceDetails.map((svc, idx) => (
            <motion.div 
              key={svc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-8 bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-slate-100 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              
              {/* Icon / Image Splash */}
              <div className={`w-full md:w-1/3 aspect-square rounded-2xl bg-gradient-to-br ${svc.imageColor} flex items-center justify-center p-8 shadow-inner transform transition-transform hover:scale-105`}>
                <svc.icon className="w-full h-full text-white/90" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="w-full md:w-2/3 space-y-4">
                <h2 className="text-3xl font-bold text-[#133C55]">{svc.title}</h2>
                <p className="text-slate-600 leading-relaxed text-lg pb-4">
                  {svc.description}
                </p>
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleEnquire(svc.title)}
                    className="inline-flex items-center gap-2 bg-[#386FA4] hover:bg-[#133C55] text-white font-semibold py-3 px-6 rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    {localStorage.getItem("userLoggedIn") ? (
                      <><ArrowRight size={18} /> Enquire Now</>
                    ) : (
                      <><LogIn size={18} /> Sign In to Enquire</>
                    )}
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
};

export default Services;
