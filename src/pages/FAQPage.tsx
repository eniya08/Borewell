import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronDown, HelpCircle, ArrowLeft } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    category: "Drilling",
    question: "How deep can you drill a borewell?",
    answer:
      "We can drill borewells up to 1500 feet deep depending on geological conditions. We perform site surveys and water level analysis to determine the optimal drilling depth for your location.",
  },
  {
    id: 2,
    category: "Drilling",
    question: "What's the best time to drill a borewell?",
    answer:
      "Borewells can be drilled any time during the year. However, drilling during pre-monsoon season (May-June) is ideal as it helps determine the actual water availability and yield.",
  },
  {
    id: 3,
    category: "Maintenance",
    question: "How often should I maintain my borewell?",
    answer:
      "We recommend maintenance twice a year including cleaning and system check-up. For high-usage areas, quarterly maintenance is advisable to ensure optimal performance.",
  },
  {
    id: 4,
    category: "Maintenance",
    question: "What are signs my borewell needs cleaning?",
    answer:
      "Reduced water flow, discolored water, sudden drop in water pressure, or sand/sediment in water are indicators that your borewell needs cleaning.",
  },
  {
    id: 5,
    category: "Pricing",
    question: "What's the cost of borewell drilling?",
    answer:
      "Costs vary based on depth, soil conditions, and location. Basic borewell drilling starts from ₹15,000. We provide free site surveys and accurate quotes based on specific requirements.",
  },
  {
    id: 6,
    category: "Pricing",
    question: "Do you offer payment plans?",
    answer:
      "Yes, we offer flexible payment options for all services. Contact us for details about installment plans and discounts for multiple services.",
  },
  {
    id: 7,
    category: "Warranty",
    question: "Do you provide warranty on services?",
    answer:
      "Yes, all drilling work is guaranteed for 2 years. Pump installation includes 1-year warranty. We also provide after-sales support and emergency repairs.",
  },
  {
    id: 8,
    category: "General",
    question: "How long does borewell drilling take?",
    answer:
      "A typical borewell takes 2-5 days depending on depth and soil conditions. We provide daily updates and can work on urgent projects.",
  },
];

const FAQPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openId, setOpenId] = useState<number | null>(null);

  const categories = ["All", ...new Set(faqItems.map((item) => item.category))];
  const filteredFAQs =
    selectedCategory === "All" ? faqItems : faqItems.filter((item) => item.category === selectedCategory);

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
        className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-b border-white/10 py-12"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/30 rounded-full flex items-center justify-center">
            <HelpCircle className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-300 text-lg">Find answers to common questions about our services</p>
        </div>
      </motion.section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
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
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {filteredFAQs.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all"
            >
              <button
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start gap-4 text-left flex-1">
                  <div className="flex-shrink-0 mt-1">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/30 text-blue-400 text-sm font-bold">
                      Q
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{item.question}</h3>
                    <p className="text-blue-400 text-sm mt-1">{item.category}</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: openId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10 px-6 py-4 bg-white/5"
                  >
                    <div className="flex gap-4">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-500/30 text-green-400 text-sm font-bold flex-shrink-0">
                        A
                      </span>
                      <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Still Have Questions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-gray-300 mb-6">
            Can't find the answer you're looking for? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919367666669"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
            >
              Call Us Now
            </a>
            <a
              href="/contact"
              className="px-6 py-3 border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 font-bold rounded-lg transition-colors"
            >
              Contact Support
            </a>
          </div>
        </motion.section>

        {/* Book Service CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#FF9900]/30 to-orange-600/30 border border-[#FF9900]/50 rounded-2xl p-8 text-center mt-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-6">
            Don't wait! Book our services today and get reliable water solutions.
          </p>
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
    </div>
  );
};

export default FAQPage;
