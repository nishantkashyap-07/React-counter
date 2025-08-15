import React from 'react';
import { Settings, Sun, Moon } from 'lucide-react';
import './Header.css';

const Header = ({ theme, onThemeChange, onSettingsToggle }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-title">
            <span className="title-icon">🔢</span>
            React Counter
          </h1>
          <p className="app-subtitle">Interactive Counter with Advanced Features</p>
        </div>
        
        <div className="header-right">
                     <button
             className="theme-toggle"
             onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
             aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
           >
             {theme === 'light' ? <Moon size={28} /> : <Sun size={28} />}
           </button>
          
          <button
            className="settings-button"
            onClick={onSettingsToggle}
            aria-label="Open settings"
          >
            <Settings size={28} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 