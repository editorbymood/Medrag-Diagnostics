import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationHeader = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Features', href: '#features' },
    { label: 'Demo', href: '#demo' },
    { label: 'Security', href: '#security' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-card/95 backdrop-blur-md border-b border-border shadow-medical' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-xl shadow-medical group-hover:shadow-medical-lg transition-all duration-300"
            >
              <Icon name="Activity" size={24} color="white" />
            </motion.div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-foreground">MedRAG</h1>
              <p className="text-xs lg:text-sm text-muted-foreground -mt-1">Diagnostics</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems?.map((item, index) => (
              <motion.a
                key={item?.href}
                href={item?.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-muted-foreground hover:text-foreground font-medium transition-colors duration-200 relative group"
                onClick={(e) => {
                  e?.preventDefault();
                  const element = document.querySelector(item?.href);
                  if (element) {
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {item?.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="font-medium">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="font-medium px-6">
                Get Started Free
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </motion.div>
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-card/95 backdrop-blur-md border-t border-border"
          >
            <div className="px-4 py-6 space-y-4">
              {navigationItems?.map((item) => (
                <a
                  key={item?.href}
                  href={item?.href}
                  className="block py-2 text-muted-foreground hover:text-foreground font-medium transition-colors duration-200"
                  onClick={(e) => {
                    e?.preventDefault();
                    const element = document.querySelector(item?.href);
                    if (element) {
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }
                    setIsMenuOpen(false);
                  }}
                >
                  {item?.label}
                </a>
              ))}
              
              <div className="pt-4 border-t border-border space-y-3">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-center">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full justify-center">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </motion.header>
  );
};

export default NavigationHeader;