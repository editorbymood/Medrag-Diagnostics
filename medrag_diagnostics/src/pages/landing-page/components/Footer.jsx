import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const Footer = () => {
  const footerLinks = {
    product: {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Demo', href: '#demo' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'API Documentation', href: '/docs' },
        { label: 'Integrations', href: '/integrations' },
        { label: 'Roadmap', href: '/roadmap' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'News & Press', href: '/press' },
        { label: 'Contact', href: '/contact' },
        { label: 'Partners', href: '/partners' },
        { label: 'Blog', href: '/blog' }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Documentation', href: '/docs' },
        { label: 'Community', href: '/community' },
        { label: 'Status', href: '/status' },
        { label: 'Training', href: '/training' },
        { label: 'Webinars', href: '/webinars' }
      ]
    },
    legal: {
      title: 'Legal & Compliance',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'HIPAA Compliance', href: '/hipaa' },
        { label: 'Security', href: '/security' },
        { label: 'Cookies Policy', href: '/cookies' },
        { label: 'Data Processing', href: '/data-processing' }
      ]
    }
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: 'Linkedin', href: 'https://linkedin.com/company/medrag' },
    { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com/medrag' },
    { name: 'Facebook', icon: 'Facebook', href: 'https://facebook.com/medrag' },
    { name: 'YouTube', icon: 'Youtube', href: 'https://youtube.com/c/medrag' },
    { name: 'GitHub', icon: 'Github', href: 'https://github.com/medrag' }
  ];

  const certifications = [
    { name: 'HIPAA', icon: 'Shield' },
    { name: 'SOC 2', icon: 'Lock' },
    { name: 'ISO 27001', icon: 'CheckCircle' },
    { name: 'FDA', icon: 'Award' }
  ];

  const handleLinkClick = (href) => {
    if (href?.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
                  <Icon name="Activity" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">MedRAG</h1>
                  <p className="text-sm text-muted-foreground -mt-1">Diagnostics</p>
                </div>
              </Link>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Revolutionizing healthcare with AI-powered diagnostic assistance that improves accuracy, reduces errors, and enhances patient outcomes for medical professionals worldwide.
              </p>

              {/* Newsletter Signup */}
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3">Stay Updated</h4>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                  <Button size="sm" className="px-4">
                    <Icon name="Send" size={16} />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Get updates on new features and medical AI insights
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks?.map((social) => (
                  <motion.a
                    key={social?.name}
                    href={social?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-muted hover:bg-primary/10 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                    aria-label={social?.name}
                  >
                    <Icon name={social?.icon} size={16} className="text-muted-foreground group-hover:text-primary" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks)?.map(([key, section]) => (
              <div key={key}>
                <h4 className="font-semibold text-foreground mb-4">{section?.title}</h4>
                <ul className="space-y-3">
                  {section?.links?.map((link) => (
                    <li key={link?.label}>
                      {link?.href?.startsWith('#') ? (
                        <button
                          onClick={() => handleLinkClick(link?.href)}
                          className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                        >
                          {link?.label}
                        </button>
                      ) : (
                        <Link
                          to={link?.href}
                          className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                        >
                          {link?.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Security & Compliance</h4>
              <p className="text-sm text-muted-foreground">
                Trusted by healthcare institutions worldwide
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              {certifications?.map((cert) => (
                <motion.div
                  key={cert?.name}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Icon name={cert?.icon} size={16} className="text-success" />
                  <span>{cert?.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
              <p>© 2024 MedRAG Diagnostics, Inc. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Privacy
                </Link>
                <Link to="/terms" className="hover:text-foreground transition-colors">
                  Terms
                </Link>
                <Link to="/cookies" className="hover:text-foreground transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle"></div>
                <span>System Status: Operational</span>
              </div>
              <Link to="/status" className="hover:text-foreground transition-colors">
                View Status
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;