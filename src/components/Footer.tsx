import { Droplets, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Clock } from "lucide-react";

const Footer = () => (
  <footer className="bg-navy text-navy-foreground">
    {/* Main Footer Content */}
    <div className="container mx-auto py-16 px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand & Description */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="h-7 w-7 text-secondary" />
            <span className="font-heading text-xl font-bold">Mahalakshmi Borewells</span>
          </div>
          <p className="text-sm text-navy-foreground/70 leading-relaxed mb-6">
            Trusted borewell drilling services since 2009. Delivering reliable water solutions for homes, farms, and businesses.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Facebook, label: "Facebook" },
              { Icon: Instagram, label: "Instagram" },
              { Icon: Twitter, label: "Twitter" },
              { Icon: Youtube, label: "YouTube" }
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                className="w-10 h-10 rounded-full bg-navy-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold mb-4 text-sm tracking-wide uppercase">Quick Links</h4>
          <ul className="space-y-3 text-sm text-navy-foreground/70">
            {["Home", "About", "Services", "Projects", "Gallery", "Contact"].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="hover:text-secondary transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-heading font-semibold mb-4 text-sm tracking-wide uppercase">Services</h4>
          <ul className="space-y-3 text-sm text-navy-foreground/70">
            {["Borewell Drilling", "Water Maintenance", "Pump Installation", "Water Testing", "Consultation"].map((service) => (
              <li key={service}>
                <a href="#" className="hover:text-secondary transition-colors">
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-heading font-semibold mb-4 text-sm tracking-wide uppercase">Contact</h4>
          <div className="space-y-4 text-sm text-navy-foreground/70">
            <div className="flex gap-3">
              <Phone className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-navy-foreground font-semibold">+91 XXXXX XXXXX</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-navy-foreground font-semibold">info@mahalakshmi.com</p>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p>Location, City</p>
                <p>State - PIN Code</p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div>
          <h4 className="font-heading font-semibold mb-4 text-sm tracking-wide uppercase">Business Hours</h4>
          <div className="space-y-3 text-sm text-navy-foreground/70">
            <div className="flex gap-3">
              <Clock className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p><span className="text-navy-foreground font-semibold">Mon - Fri:</span> 8:00 AM - 6:00 PM</p>
                <p><span className="text-navy-foreground font-semibold">Sat:</span> 8:00 AM - 4:00 PM</p>
                <p><span className="text-navy-foreground font-semibold">Sun:</span> Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-navy-foreground/10 my-12"></div>

      {/* Footer Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-navy-foreground/60">
        <p>© {new Date().getFullYear()} Mahalakshmi Borewells Services. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-secondary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-secondary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-secondary transition-colors">
            Sitemap
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
