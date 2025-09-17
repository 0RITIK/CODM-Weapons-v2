import { motion } from "framer-motion";
import { Github, Twitter, MessageCircle, Mail } from "lucide-react";

export const Footer = () => {
  const socialLinks = [
    { name: "GitHub", icon: Github, href: "#", color: "hover:text-primary" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-secondary" },
    { name: "Discord", icon: MessageCircle, href: "#", color: "hover:text-accent" },
    { name: "Email", icon: Mail, href: "#", color: "hover:text-destructive" }
  ];

  const footerLinks = [
    {
      title: "Weapons",
      links: [
        { name: "Assault Rifles", href: "#" },
        { name: "SMGs", href: "#" },
        { name: "Snipers", href: "#" },
        { name: "LMGs", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Weapon Stats", href: "#" },
        { name: "Tier Lists", href: "#" },
        { name: "Guides", href: "#" },
        { name: "Meta Analysis", href: "#" }
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Discord Server", href: "#" },
        { name: "Reddit", href: "#" },
        { name: "YouTube", href: "#" },
        { name: "Tournaments", href: "#" }
      ]
    }
  ];

  return (
    <footer className="relative bg-card/50 backdrop-blur-sm border-t border-border/30 pt-20 pb-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      
      <div className="relative container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">🔫</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neon-primary">
                  CODM WEAPONS
                </h3>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">HUB</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Your ultimate destination for Call of Duty Mobile weapon statistics, 
              guides, and community insights. Master the meta, dominate the battlefield.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className={`p-3 rounded-lg bg-muted/20 border border-border/30 text-muted-foreground transition-all duration-300 ${social.color} hover:bg-muted/40 hover:border-current hover:shadow-glow-primary`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-lg font-bold text-neon-secondary mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 mb-12 border border-border/30"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold text-neon-primary mb-4">
              Stay Updated with Meta Changes
            </h4>
            <p className="text-muted-foreground mb-6">
              Get notified about weapon balances, new releases, and community events
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background border border-border/50 rounded-lg focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
              <button className="btn-primary px-8 py-3 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/30"
        >
          <p className="text-muted-foreground mb-4 md:mb-0">
            © 2024 CODM Weapons Hub. Made with ❤️ by the community, for the community.
          </p>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};