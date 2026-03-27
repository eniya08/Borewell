import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, MessageCircle, AlertCircle, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  isBookingLink?: boolean;
};

// ─────────────────────────────────────────────
// Comprehensive borewell knowledge base
// ─────────────────────────────────────────────
const knowledgeBase = [
  // Farm / Agriculture
  {
    keywords: ['farm', 'agricultural', 'agriculture', 'land', 'field', 'crop', 'irrigation', 'paddy', 'vegetables', 'cultivation'],
    response: `Great choice! For agricultural or farm land, we recommend:\n• Depth: 300–600 feet depending on your soil and groundwater level\n• Soil type matters: normal soil is easier; hard rock needs more time and cost\n• For irrigation, a 5 HP or 7.5 HP submersible motor usually works well\n• Best drilled before the summer season for better water availability\n\nWould you like to book a free site inspection? 🚜`,
    isBookingLink: true
  },
  // Depth / Feet
  {
    keywords: ['how many feet', 'how deep', 'depth', 'feet', 'foot', 'meter', 'how much deep', 'how much feet', 'how far', 'how long'],
    response: `The drilling depth depends on your location and soil type:\n• Normal soil areas: 200–400 feet\n• Hard rock areas: 400–800 feet\n• Deep aquifer zones: 800–1200 feet\n\nWe always do a preliminary site assessment using scientific divining methods to recommend the optimal depth before drilling. This saves cost and ensures maximum water yield! 💧`
  },
  // Cost / Price / Rate
  {
    keywords: ['cost', 'price', 'rate', 'charge', 'fee', 'how much', 'estimate', 'budget', 'rupees', 'rs', '₹', 'expensive', 'cheap', 'affordable'],
    response: `Borewell drilling cost depends on 3 factors:\n• 🔹 Depth (per foot rate)\n• 🔹 Soil type (Normal soil: ₹80–120/ft | Hard rock: ₹150–220/ft)\n• 🔹 Location (Village / Town / City)\n\nFor an accurate estimate, please use our AI Cost Estimator page — it gives a detailed cost breakdown instantly! Or book a free site visit for a quotation.`,
    isBookingLink: true
  },
  // Drill / Drilling
  {
    keywords: ['drill', 'drilling', 'bore', 'borewell', 'dig', 'sink', 'start', 'begin', 'want to'],
    response: `We'd be happy to help you get started with borewell drilling! Here's our simple process:\n1️⃣ Contact us to book a site visit\n2️⃣ Our expert does a groundwater survey\n3️⃣ We select the best point for drilling\n4️⃣ Drilling begins with our heavy rigs\n5️⃣ Casing pipes and motor installation\n6️⃣ Water flow testing and handover\n\nReady to start? Book an appointment below! 💪`,
    isBookingLink: true
  },
  // Motor / Pump
  {
    keywords: ['motor', 'pump', 'submersible', 'hp', 'horsepower', 'electric', 'power', 'phase', 'single phase', 'three phase'],
    response: `We provide complete motor and submersible pump installation!\n• 1–2 HP: Suitable for small homes (200–300 ft depth)\n• 3–5 HP: For medium homes and small farms (300–500 ft)\n• 7.5–10 HP: For large farms and commercial use (500+ ft)\n\n⚡ We also set up the starter panel, cables, and electrical connections. All motors come with installation warranty!`
  },
  // Water
  {
    keywords: ['water', 'groundwater', 'drinking', 'potable', 'fresh water', 'pure water', 'water level', 'water table'],
    response: `Water availability depends on your location's geology:\n• We use scientific methods and traditional water divining to find the best groundwater point\n• We check groundwater level reports for your area before drilling\n• After drilling, we perform a water yield test to confirm flow rate\n• For drinking water, we can also suggest water purifier connections 💧\n\nWould you like us to assess your land's water potential?`,
    isBookingLink: true
  },
  // Soil Type
  {
    keywords: ['soil', 'rock', 'hard rock', 'granite', 'clay', 'sand', 'laterite', 'black soil', 'red soil'],
    response: `Soil type significantly affects borewell drilling:\n• 🟤 Normal/Sandy soil: Faster drilling, lower cost (₹80–120/ft)\n• 🪨 Hard rock/Granite: Slower, requires special drill bits (₹150–220/ft)\n• 🔵 Clay/Laterite: Moderate difficulty\n• Black cotton soil: Needs special casing to prevent collapse\n\nNot sure about your soil type? Our team will assess it during the free site inspection!`
  },
  // Time / How long / Duration
  {
    keywords: ['how long', 'time', 'days', 'duration', 'fast', 'quick', 'hours', 'when', 'schedule'],
    response: `Drilling timeline depends on depth and soil:\n• ⏱ Normal soil (300 ft): 1–2 days\n• ⏱ Hard rock (500 ft): 3–5 days\n• ⏱ Deep drilling (800+ ft): 7–10 days\n\nMotor installation typically takes 4–6 hours after drilling is complete. We work efficiently to minimize disruption to your property!`
  },
  // Maintenance / Service / Repair
  {
    keywords: ['maintenance', 'service', 'repair', 'fix', 'problem', 'issue', 'not working', 'broken', 'low water', 'less water', 'flushing', 'cleaning', 'flush'],
    response: `We offer complete maintenance and repair services:\n• 🔧 Borewell flushing (restores reduced water yield)\n• 🔧 Motor rewinding and replacement\n• 🔧 Pipe cleaning and descaling\n• 🔧 Water yield testing\n• 🔧 Emergency pump recovery\n• 🔧 Annual maintenance contracts\n\nIf your borewell water has reduced, flushing can usually solve it quickly! Book a service visit below.`,
    isBookingLink: true
  },
  // Location / Service Area
  {
    keywords: ['area', 'location', 'city', 'village', 'town', 'where', 'service', 'cover', 'reach', 'come', 'available', 'your area', 'near me'],
    response: `We serve a wide range of areas including villages, towns, and cities across the region.\n\n📍 Our team is mobile and fully equipped to travel to your location. Service charges vary slightly by distance.\n\nPlease book an appointment and mention your address — our team will confirm availability and schedule a visit!`,
    isBookingLink: true
  },
  // Booking / Appointment
  {
    keywords: ['book', 'appointment', 'hire', 'contact', 'visit', 'enquire', 'enquiry', 'call', 'schedule', 'help me'],
    response: `We'd love to help you! You can:\n📞 Call us directly for immediate assistance\n📅 Or book an appointment using the link below — our team will contact you within 24 hours to confirm your slot.`,
    isBookingLink: true
  },
  // Why borewell
  {
    keywords: ['why', 'benefit', 'advantage', 'need', 'important', 'useful', 'good', 'worth'],
    response: `Borewells offer many benefits:\n✅ Reliable water supply 24/7 — no depending on municipal water\n✅ Cost-effective in the long run\n✅ Essential for farming and agriculture\n✅ Increases property value\n✅ Great for areas with poor municipal supply\n✅ One-time investment, years of water!\n\nInterested in getting one for your property? Ask us anything!`
  },
  // Guarantee / Warranty
  {
    keywords: ['guarantee', 'warranty', 'assurance', 'promise', 'quality'],
    response: `We stand behind our work:\n✅ All drilling work comes with a site inspection before starting\n✅ Water yield is tested and confirmed before handover\n✅ Motor installation has a warranty period\n✅ We provide after-sales support for any issues\n✅ If water is not found at agreed depth — we re-assess and re-drill at no extra charge\n\nYour satisfaction is our priority! 🙏`
  },
  // Casing pipes
  {
    keywords: ['casing', 'pipe', 'pvc', 'upvc', 'steel pipe', 'pipe size', 'diameter'],
    response: `We use high-quality casing pipes to protect your borewell:\n• PVC/uPVC casing pipes (4.5", 6" diameter) — corrosion-resistant\n• MS/Steel casing for hard rock areas\n• Proper casing prevents sand inflow and borewell collapse\n• We always use ISI-marked pipes for reliability\n\nThe pipe size is selected based on pump size and water requirement.`
  },
  // Greetings
  {
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste', 'hai', 'helo'],
    response: `Hello! Welcome to Mahalakshmi Borewells! 🙏\n\nI'm your AI assistant and I can help you with:\n• Borewell drilling information\n• Cost estimates\n• Depth suggestions\n• Motor installation\n• Maintenance services\n• Booking appointments\n\nWhat would you like to know?`
  },
  // Thank you
  {
    keywords: ['thank', 'thanks', 'thank you', 'ok', 'okay', 'got it', 'understood', 'great', 'perfect'],
    response: `You're welcome! 😊 Feel free to ask anything else about our borewell services. We're always happy to help!`
  },
];

// ─────────────────────────────────────────────
// Smart response engine
// ─────────────────────────────────────────────
function generateResponse(userText: string): Message {
  const text = userText.toLowerCase().trim();

  for (const entry of knowledgeBase) {
    const matched = entry.keywords.some(keyword => text.includes(keyword));
    if (matched) {
      return {
        id: Date.now().toString(),
        text: entry.response,
        sender: 'bot',
        isBookingLink: entry.isBookingLink ?? false,
      };
    }
  }

  // Fallback — try to be helpful instead of dismissive
  return {
    id: Date.now().toString(),
    text: `Thank you for your question! For the best answer, our team can assist you directly.\n\nYou may also want to ask about:\n💬 Drilling depth suggestions\n💬 Borewell cost estimates\n💬 Motor installation\n💬 Maintenance services\n\nOr book a free consultation with us!`,
    sender: 'bot',
    isBookingLink: true,
  };
}

const AiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      text: 'Hello! I am the Mahalakshmi AI Assistant. I can help you with borewell drilling, costs, depth suggestions, motor installation, and more. What would you like to know? 💧',
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/booking' || location.pathname === '/appointment') {
      setIsOpen(false);
    }
  }, [location.pathname]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) setTimeout(scrollToBottom, 100);
  }, [messages, isTyping, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user'
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(newUserMsg.text);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-[360px] md:w-[400px] max-h-[600px] z-[99] bg-[#0B2545] rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#133C55] p-4 flex items-center justify-between text-white border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#386FA4] to-[#91E5F6] flex items-center justify-center shadow-inner">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] leading-tight">Mahalakshmi AI</h3>
                  <p className="text-[11px] text-[#91E5F6] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} className="text-white/80 hover:text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4 h-[360px]">
              <AnimatePresence>
                {messages.map(message => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-[88%] gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${message.sender === 'user' ? 'bg-[#386FA4] text-white' : 'bg-[#133C55] text-white'}`}>
                        {message.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                      </div>
                      <div className={`p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-[#386FA4] text-white rounded-tr-sm shadow-sm'
                          : 'bg-white text-slate-800 rounded-tl-sm shadow-sm border border-slate-100'
                      }`}>
                        <p className="text-[13px] leading-relaxed whitespace-pre-line">{message.text}</p>
                        {message.isBookingLink && (
                          <div className="mt-2 pt-2 border-t border-slate-100">
                            <Link
                              to="/booking"
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#386FA4] hover:text-[#133C55] transition-colors bg-blue-50 px-2.5 py-1.5 rounded-md w-full"
                            >
                              <AlertCircle size={14} />
                              Book Service Now
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#133C55] text-white flex shrink-0 items-center justify-center mt-1">
                      <Bot size={12} />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 flex gap-1 items-center h-9">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white p-3 border-t border-slate-200 shrink-0">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask anything about borewell..."
                  className="w-full bg-slate-50 border border-slate-200 text-[13px] text-slate-800 rounded-full pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-[#386FA4] focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-1.5 p-2 bg-[#386FA4] text-white rounded-full hover:bg-[#133C55] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-gradient-to-r from-[#133C55] to-[#386FA4] rounded-full flex items-center justify-center shadow-2xl border-2 border-white"
        aria-label="Toggle AI Chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={26} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={26} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default AiChatbot;
