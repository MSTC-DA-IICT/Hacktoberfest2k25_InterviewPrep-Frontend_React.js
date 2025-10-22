/**
 * NAVBAR COMPONENT - Main navigation bar
 *
 * HACKTOBERFEST TODO:
 * This component displays the navigation bar with links and auth status.
 *
 * CONTRIBUTOR TASKS:
 * 1. Import Link from react-router-dom
 * 2. Import useAuth hook
 * 3. Display app logo/name
 * 4. Add navigation links:
 *    - Home
 *    - Questions
 *    - Submit Question (if authenticated)
 *    - Admin (if user is admin)
 * 5. Show user info and logout button if authenticated
 * 6. Show login/register links if not authenticated
 * 7. Make responsive with mobile menu (hamburger icon)
 * 8. Add styling with Tailwind CSS
 *
 * FEATURES TO IMPLEMENT:
 * - Responsive design (mobile menu)
 * - Active link highlighting
 * - User dropdown menu
 * - Logout functionality
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * TODO: IMPLEMENT NAVBAR COMPONENT
 *
 * Structure:
 * 1. Top navigation bar with logo
 * 2. Navigation links (Home, Questions, etc.)
 * 3. Right side: User menu or Login/Register
 * 4. Mobile hamburger menu
 *
 * States:
 * - mobileMenuOpen: boolean
 *
 * Conditional rendering:
 * - If authenticated: Show user name, Submit button, Logout
 * - If not authenticated: Show Login, Register buttons
 * - If admin: Show Admin link
 *
 * EXAMPLE STRUCTURE:
 * <nav className="bg-white shadow-md">
 *   <div className="container mx-auto px-4">
 *     <div className="flex justify-between items-center py-4">
 *       <Logo />
 *       <DesktopMenu />
 *       <UserSection />
 *       <MobileMenuButton />
 *     </div>
 *     <MobileMenu />
 *   </div>
 * </nav>
 */

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen((previousIsOpen) => !previousIsOpen);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  // Handle escape key to close mobile menu and focus management
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-open');
      
      // Focus the close button when menu opens
      const closeButton = document.querySelector('[aria-label="Close menu"]');
      if (closeButton) {
        closeButton.focus();
      }
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('mobile-menu-open');
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
      document.body.classList.remove('mobile-menu-open');
    };
  }, [mobileMenuOpen]);

  // Close menu when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeMobileMenu();
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            InterviewPrep
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition">
              Home
            </Link>
            <Link to="/questions" className="text-gray-700 hover:text-primary-600 transition">
              Questions
            </Link>

            {/* TODO: Show these links only if authenticated */}
            {isAuthenticated && (
              <>
                <Link to="/submit" className="text-gray-700 hover:text-primary-600 transition">
                  Submit Question
                </Link>
                {/* TODO: Show admin link only if user is admin */}
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary-600 transition">
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* TODO: Conditional rendering based on auth status */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-700 hover:text-primary-600">
                  {user?.name || 'Profile'}
                </Link>
                <button onClick={handleLogout} className="btn-secondary">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded p-2"
            onClick={toggleMobileMenu}
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {/* Animated Hamburger icon */}
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current mt-1 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current mt-1 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={handleOverlayClick}
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 id="mobile-menu-title" className="text-lg font-semibold text-gray-800">
              Menu
            </h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex flex-col h-full">
            <nav className="flex-1 px-4 py-6 space-y-2">
              {/* Navigation Links */}
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>

              <Link
                to="/questions"
                onClick={closeMobileMenu}
                className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Questions
              </Link>

              {/* Authenticated User Links */}
              {isAuthenticated && (
                <>
                  <Link
                    to="/submit"
                    onClick={closeMobileMenu}
                    className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Submit Question
                  </Link>

                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={closeMobileMenu}
                      className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Admin
                    </Link>
                  )}
                </>
              )}
            </nav>

            {/* User Section */}
            <div className="border-t border-gray-200 p-4">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center px-4 py-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user?.name || 'User'}</p>
                      <p className="text-sm text-gray-500">{user?.email || ''}</p>
                    </div>
                  </div>
                  
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
