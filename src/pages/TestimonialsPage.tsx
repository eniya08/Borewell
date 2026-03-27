import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Star, MessageSquare, ArrowLeft } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  service: string;
  rating: number;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Karur",
    service: "Borewell Drilling",
    rating: 5,
    text: "Excellent service! The team was professional and completed the work within the promised timeline. Water quality is excellent and the yield is very good. Highly recommended!",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Namakkal",
    service: "Borewell Cleaning",
    rating: 5,
    text: "My borewell was losing water flow. After their cleaning service, it's back to normal! The team was courteous and the work was done efficiently. Great value for money.",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Coimbatore",
    service: "Pump Installation",
    rating: 4,
    text: "Professional installation and good after-sales support. The pump is working smoothly and I appreciate their maintenance reminders. Would definitely use them again.",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Kavya Reddy",
    location: "Salem",
    service: "Maintenance Services",
    rating: 5,
    text: "Been using their maintenance services for 2 years now. Very reliable and they catch problems before they become serious. Excellent customer service!",
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Manish Singh",
    location: "Karur",
    service: "Borewell Flushing",
    rating: 5,
    text: "Quick response to my emergency call. They came on the same day and fixed the blockage. Professional team and affordable pricing. Highly satisfied!",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Divya Menon",
    location: "Namakkal",
    service: "Water Level Checking",
    rating: 4,
    text: "Very thorough analysis and detailed report. Helped me plan my new borewell properly. Their expertise is evident. Will definitely recommend to friends.",
    image: "https://i.pravatar.cc/150?img=6",
  },
];

const TestimonialsPage = () => {
  const navigate = useNavigate();
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
        className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-b border-white/10 py-12"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/30 rounded-full flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Customer Reviews</h1>
          <p className="text-gray-300 text-lg">
            Hear from our satisfied customers about their experience with us
          </p>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-4 mt-12 mb-12"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Happy Customers", value: "1500+" },
            { label: "Average Rating", value: "4.8/5" },
            { label: "Years Experience", value: "15+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6 text-center"
            >
              <p className="text-gray-300 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-purple-400">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Reviews Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-purple-500/30 transition-all group hover:shadow-lg hover:shadow-purple-500/20"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.text}"</p>

              {/* Divider */}
              <div className="h-px bg-white/10 mb-6"></div>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-purple-500/50"
                />
                <div className="flex-1">
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-xs text-gray-400 mb-1">{testimonial.location}</p>
                  <p className="text-xs text-purple-400 font-semibold">{testimonial.service}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 mb-16"
      >
        <div className="bg-gradient-to-r from-purple-500/30 to-purple-600/30 border border-purple-500/50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Satisfied Customers</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Experience professional borewell services with guaranteed satisfaction
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-purple-500/30">
              Get Started Today
            </button>
            <button className="px-8 py-4 border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 font-bold rounded-lg transition-colors">
              Request a Quote
            </button>
          </div>
        </div>
      </motion.section>

      {/* Rating Breakdown */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 mb-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Rating Breakdown</h2>
        <div className="space-y-6">
          {[
            { stars: 5, count: 450, percentage: 90 },
            { stars: 4, count: 45, percentage: 9 },
            { stars: 3, count: 5, percentage: 1 },
          ].map((item) => (
            <div key={item.stars}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-400">{item.count} reviews</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Book Service CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-[#FF9900]/30 to-orange-600/30 border border-[#FF9900]/50 rounded-2xl p-12 text-center mt-12 mx-4 mb-12"
      >
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
        <p className="text-gray-300 mb-6 text-lg">Join thousands of satisfied customers who trust us with their water solutions</p>
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

export default TestimonialsPage;
