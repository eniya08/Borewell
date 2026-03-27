import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Droplets, ChevronDown, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const borewellItems = [
  { label: "Borewell Drilling", href: "/service/drilling" },
  { label: "Borewell Cleaning", href: "/service/cleaning" },
  { label: "Borewell Flushing", href: "/service/flushing" },
  { label: "Pump Installation", href: "/service/pump" },
  { label: "Water Level Checking", href: "/service/waterLevel" },
  { label: "Maintenance Services", href: "/service/maintenance" },
];



const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/services", hasDropdown: true, dropdownItems: borewellItems },
  { label: "ESTIMATOR", href: "/estimator" },

  { label: "REVIEWS", href: "/testimonials" },
  { label: "CONTACT", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUserName(loggedInUser);
    }

    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = () => {
      const user = localStorage.getItem("loggedInUser");
      setIsLoggedIn(!!user);
      setUserName(user || "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Handle scroll to hide navbar on admin dashboard
  useEffect(() => {
    const handleScroll = () => {
      // Only hide navbar on admin-dashboard
      if (location.pathname === "/admin-dashboard") {
        const currentScrollY = window.scrollY;
        
        // Show navbar when scrolling up or at the top
        if (currentScrollY < lastScrollY || currentScrollY < 50) {
          setShowNavbar(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
          // Hide navbar when scrolling down
          setShowNavbar(false);
        }
        
        setLastScrollY(currentScrollY);
      } else {
        // Always show navbar on other pages
        setShowNavbar(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, location.pathname]);

  return (
    <motion.header 
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Main Navbar */}
      <nav className="bg-[#404040]/80 backdrop-blur-md shadow-sm border-b border-white/10">
        <div className="container mx-auto px-4 flex items-center justify-between py-3 md:py-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-50">
            <Droplets className="h-8 w-8 text-[#FF9900]" />
            <span className="font-heading text-xl font-extrabold text-white tracking-wider">
              Mahalakshmi<span className="text-[#FF9900]"> Borewells</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `flex items-center text-[13px] font-bold tracking-wider transition-colors py-2 ${
                        isActive && link.href !== "#" ? "text-[#FF9900]" : "text-white hover:text-[#FF9900]"
                      }`
                    }
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown className="ml-1 w-3.5 h-3.5" />}
                  </NavLink>

                  {/* Dropdown Menu */}
                  {link.hasDropdown && link.dropdownItems && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={
                        openDropdown === link.label
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: -10, pointerEvents: "none" }
                      }
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-0 w-48 bg-[#333333] rounded-md shadow-lg py-2 border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
                    >
                      {link.dropdownItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="block px-4 py-2.5 text-sm text-white hover:bg-[#FF9900] hover:text-white transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const userLoggedIn = localStorage.getItem("userLoggedIn");
                const userEmail = localStorage.getItem("userEmail");
                
                if (!userLoggedIn || !userEmail) {
                  navigate("/user-signin");
                  return;
                }
                
                // Verify user is properly registered
                const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                const userExists = registeredUsers.some((u: any) => u.email === userEmail);
                
                if (!userExists) {
                  // Clear invalid session
                  localStorage.removeItem("userLoggedIn");
                  localStorage.removeItem("userEmail");
                  localStorage.removeItem("loggedInUser");
                  navigate("/user-signup");
                } else {
                  navigate("/appointment");
                }
              }}
              className="bg-[#FF9900] hover:bg-[#E68A00] text-white text-xs font-bold px-5 py-2.5 rounded transition-colors whitespace-nowrap tracking-wider ml-2"
            >
              BOOK APPOINTMENT
            </motion.button>

            {/* Auth Section */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/20">
              {isLoggedIn ? (
                /* Profile Menu */
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 bg-[#FF9900]/20 hover:bg-[#FF9900]/30 text-[#FF9900] text-xs font-bold px-4 py-2.5 rounded transition-colors border border-[#FF9900]/50"
                  >
                    <User size={16} />
                    {userName}
                    <ChevronDown size={16} className={`transition-transform ${showProfileMenu ? "rotate-180" : ""}`} />
                  </motion.button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-white text-sm font-semibold">Welcome!</p>
                          <p className="text-[#FF9900] text-xs">{userName}</p>
                        </div>
                        
                        <motion.button
                          whileHover={{ backgroundColor: "rgba(255, 153, 0, 0.2)" }}
                          onClick={() => {
                            setShowProfileMenu(false);
                            navigate("/profile");
                          }}
                          className="w-full px-4 py-3 text-left flex items-center gap-2 text-white hover:text-[#FF9900] font-semibold text-sm transition-colors border-b border-white/10"
                        >
                          <User size={16} />
                          My Profile
                        </motion.button>

                        <motion.button
                          whileHover={{ backgroundColor: "rgba(255, 153, 0, 0.2)" }}
                          onClick={() => {
                            localStorage.removeItem("loggedInUser");
                            setIsLoggedIn(false);
                            setUserName("");
                            setShowProfileMenu(false);
                            navigate("/");
                          }}
                          className="w-full px-4 py-3 text-left flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold text-sm transition-colors"
                        >
                          <LogOut size={16} />
                          Logout
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Auth Buttons */
                <>
                  <Link
                    to="/user-signin"
                    className="text-white hover:text-[#FF9900] text-xs font-bold px-4 py-2.5 transition-colors"
                  >
                    SIGN IN
                  </Link>
                  <Link
                    to="/user-signup"
                    className="border border-[#FF9900] text-[#FF9900] hover:bg-[#FF9900] hover:text-white text-xs font-bold px-4 py-2.5 rounded transition-colors"
                  >
                    SIGN UP
                  </Link>
                  <Link
                    to="/admin-login"
                    className="text-red-400 hover:text-red-300 text-xs font-bold px-4 py-2.5 transition-colors"
                  >
                    ADMIN
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="flex xl:hidden items-center gap-4 z-50">
            <button
              onClick={() => {
                const userLoggedIn = localStorage.getItem("userLoggedIn");
                const userEmail = localStorage.getItem("userEmail");
                
                if (!userLoggedIn || !userEmail) {
                  navigate("/user-signin");
                  return;
                }
                
                // Verify user is properly registered
                const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                const userExists = registeredUsers.some((u: any) => u.email === userEmail);
                
                if (!userExists) {
                  // Clear invalid session
                  localStorage.removeItem("userLoggedIn");
                  localStorage.removeItem("userEmail");
                  localStorage.removeItem("loggedInUser");
                  navigate("/user-signup");
                } else {
                  navigate("/appointment");
                }
              }}
              className="bg-[#FF9900] text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-[#E68A00] transition-colors"
            >
              BOOK
            </button>
            <button
              className="text-white hover:text-[#FF9900] transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="xl:hidden bg-[#333333] border-t border-white/10 overflow-hidden absolute top-full left-0 right-0 shadow-xl"
            >
              <ul className="flex flex-col py-2 px-4">
                {navLinks.map((link) => (
                  <li key={link.label} className="border-b border-white/5 last:border-0">
                    <NavLink
                      to={link.href}
                      onClick={() => !link.hasDropdown && setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between py-3 font-bold text-sm tracking-wider ${
                          isActive && link.href !== "#" ? "text-[#FF9900]" : "text-white"
                        }`
                      }
                    >
                      {link.label}
                      {link.hasDropdown && <ChevronDown className="w-4 h-4 opacity-50" />}
                    </NavLink>

                    {/* Mobile Dropdown */}
                    {link.hasDropdown && link.dropdownItems && (
                      <div className="bg-[#2a2a2a] pl-4 py-1">
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block py-2 text-xs text-white/80 hover:text-[#FF9900] transition-colors"
                          >
                            • {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}

                {/* Mobile Auth Links */}
                <li className="border-t border-white/10 mt-2 pt-2">
                  <Link
                    to="/user-signin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center py-3 font-bold text-sm text-white hover:text-[#FF9900] transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user-signup"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center py-3 font-bold text-sm text-white hover:text-[#FF9900] transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin-login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center py-3 font-bold text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    Admin Login
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;
