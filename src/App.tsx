import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";

import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import Estimator from "./pages/Estimator";
import NotFound from "./pages/NotFound";
import UserSignUp from "./pages/UserSignUp";
import UserSignIn from "./pages/UserSignIn";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ServiceDetail from "./pages/ServiceDetail";

import BookingPage from "./pages/BookingPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/user-signup" element={<UserSignUp />} />
          <Route path="/user-signin" element={<UserSignIn />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Booking & Profile Routes */}
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/profile" element={<UserProfile />} />

          {/* Detail Pages */}
          <Route path="/service/:serviceId" element={<ServiceDetail />} />

          <Route path="/testimonials" element={<TestimonialsPage />} />

          {/* Main Layout Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="projects" element={<Projects />} />

            <Route path="estimator" element={<Estimator />} />
            <Route path="contact" element={<Contact />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
