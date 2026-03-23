import { useState, useEffect } from "react";
import { X, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CallbackPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // Show popup when mouse leaves the viewport at the top
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShown) {
                setIsOpen(true);
                setHasShown(true);
            }
        };

        // Also show after 30 seconds if not shown yet
        const timeout = setTimeout(() => {
            if (!hasShown) {
                setIsOpen(true);
                setHasShown(true);
            }
        }, 30000);

        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            document.removeEventListener("mouseleave", handleMouseLeave);
            clearTimeout(timeout);
        };
    }, [hasShown]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden"
                    >
                        <div className="p-8">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Close"
                            >
                                <X className="h-6 w-6" />
                            </button>

                            <h2 className="text-3xl font-bold text-gray-900 leading-tight">Leaving so soon?</h2>
                            <h3 className="text-2xl font-bold text-[#FF9900] mb-6">Tell us what you were looking for!</h3>

                            <p className="text-gray-600 font-medium mb-4">Share your number to get a call-back.</p>

                            <form className="flex mb-4" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
                                <div className="flex w-full border border-gray-300 rounded-l-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#FF9900] focus-within:border-[#FF9900]">
                                    <div className="flex items-center px-3 bg-gray-50 border-r border-gray-300">
                                        <span className="text-xl mr-2">🇮🇳</span>
                                        <span className="text-gray-700 font-medium">+91</span>
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="81234 56789"
                                        className="w-full px-4 py-3 outline-none"
                                        required
                                        pattern="[0-9]{10}"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-[#FFE0B2] hover:bg-[#FFD180] text-[#E65100] font-bold px-6 py-3 rounded-r-md transition-colors flex items-center whitespace-nowrap"
                                >
                                    <PhoneCall className="w-5 h-5 mr-2" />
                                    Call me back
                                </button>
                            </form>

                            <p className="text-sm text-gray-400 italic mb-6">Rest assured, your details are secure with us.</p>

                            <div className="space-y-2 text-gray-600">
                                <p>
                                    Have a custom requirement? <a href="/contact" className="text-[#FF9900] hover:underline" onClick={() => setIsOpen(false)}>Write to us</a>
                                </p>
                                <p>
                                    In a hurry? <span className="text-[#FF9900]">Call us now +91 9367666669</span>
                                </p>
                                <p className="text-xs text-gray-400 italic mt-2">
                                    *Please keep 0 or +91 before the number you dial.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CallbackPopup;
