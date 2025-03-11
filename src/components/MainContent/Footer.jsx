import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <nav className="footer-nav">
        <ul>
          <li><a href="/pro">Pro</a></li>
          <li><a href="/enterprise">Enterprise</a></li>
          <li><a href="/api">API</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/careers">Careers</a></li>
          <li><a href="/store">Store</a></li>
          <li><a href="/finance">Finance</a></li>
          <li>
            <a href="/language">
              English
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
      
      <button className="help-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </button>
    </footer>
  );
};

export default Footer;