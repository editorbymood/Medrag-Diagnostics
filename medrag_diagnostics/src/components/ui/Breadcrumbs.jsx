import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumbs = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  const routeMap = {
    '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/new-case-symptom-input': { label: 'Symptom Input', icon: 'Stethoscope', parent: '/dashboard' },
    '/document-upload': { label: 'Document Upload', icon: 'Upload', parent: '/new-case-symptom-input' },
    '/ai-diagnosis-results': { label: 'AI Results', icon: 'Brain', parent: '/document-upload' },
    '/login': { label: 'Login', icon: 'LogIn' },
    '/register': { label: 'Register', icon: 'UserPlus' },
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const currentPath = location?.pathname;
    const breadcrumbs = [];
    
    // Build breadcrumb trail
    let path = currentPath;
    while (path && routeMap?.[path]) {
      const route = routeMap?.[path];
      breadcrumbs?.unshift({
        label: route?.label,
        path: path,
        icon: route?.icon,
        isActive: path === currentPath
      });
      path = route?.parent;
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on login/register pages or if only one item
  if (breadcrumbs?.length <= 1 || location?.pathname === '/login' || location?.pathname === '/register') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      {breadcrumbs?.map((crumb, index) => (
        <React.Fragment key={crumb?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={16} className="text-muted-foreground/50" />
          )}
          
          {crumb?.isActive ? (
            <div className="flex items-center space-x-2 text-foreground font-medium">
              <Icon name={crumb?.icon} size={16} />
              <span>{crumb?.label}</span>
            </div>
          ) : (
            <Link
              to={crumb?.path}
              className="flex items-center space-x-2 hover:text-foreground transition-colors duration-200"
            >
              <Icon name={crumb?.icon} size={16} />
              <span>{crumb?.label}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;