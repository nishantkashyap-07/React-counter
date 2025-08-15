import React from 'react';
import { Save, RotateCcw } from 'lucide-react';
import './Settings.css';

const Settings = ({
  step,
  setStep,
  allowNegative,
  setAllowNegative,
  upperBound,
  setUpperBound,
  lowerBound,
  setLowerBound,
  theme,
  setTheme
}) => {
  const handleResetSettings = () => {
    setStep(1);
    setAllowNegative(false);
    setUpperBound(100);
    setLowerBound(0);
    setTheme('light');
  };

  const handleStepChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 100) {
      setStep(value);
    }
  };

  const handleUpperBoundChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > lowerBound && value <= 10000) {
      setUpperBound(value);
    }
  };

  const handleLowerBoundChange = (e) => {
    const value = parseInt(e.target.value);
    if (value < upperBound && value >= -10000) {
      setLowerBound(value);
    }
  };

  return (
    <div className="settings-content">
      <div className="settings-section">
        <h3>Counter Configuration</h3>
        
        <div className="setting-group">
          <label htmlFor="step-size" className="setting-label">
            Step Size
          </label>
          <div className="input-group">
            <input
              id="step-size"
              type="number"
              min="1"
              max="100"
              value={step}
              onChange={handleStepChange}
              className="setting-input"
            />
            <span className="input-suffix">units</span>
          </div>
          <p className="setting-description">
            Amount to increment/decrement by each time
          </p>
        </div>

        <div className="setting-group">
          <label htmlFor="upper-bound" className="setting-label">
            Upper Bound
          </label>
          <div className="input-group">
            <input
              id="upper-bound"
              type="number"
              min={lowerBound + 1}
              max="10000"
              value={upperBound}
              onChange={handleUpperBoundChange}
              className="setting-input"
            />
            <span className="input-suffix">max</span>
          </div>
          <p className="setting-description">
            Maximum value the counter can reach
          </p>
        </div>

        <div className="setting-group">
          <label htmlFor="lower-bound" className="setting-label">
            Lower Bound
          </label>
          <div className="input-group">
            <input
              id="lower-bound"
              type="number"
              min="-10000"
              max={upperBound - 1}
              value={lowerBound}
              onChange={handleLowerBoundChange}
              className="setting-input"
            />
            <span className="input-suffix">min</span>
          </div>
          <p className="setting-description">
            Minimum value the counter can reach
          </p>
        </div>
      </div>

      <div className="settings-section">
        <h3>Behavior Options</h3>
        
        <div className="setting-group">
          <div className="toggle-group">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={allowNegative}
                onChange={(e) => setAllowNegative(e.target.checked)}
                className="toggle-input"
              />
              <span className="toggle-slider"></span>
              <span className="toggle-text">Allow Negative Values</span>
            </label>
          </div>
          <p className="setting-description">
            Enable counter to go below zero
          </p>
        </div>
      </div>

      <div className="settings-section">
        <h3>Appearance</h3>
        
        <div className="setting-group">
          <label className="setting-label">Theme</label>
          <div className="theme-options">
            <label className="theme-option">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === 'light'}
                onChange={(e) => setTheme(e.target.value)}
                className="theme-input"
              />
              <div className="theme-preview light">
                <div className="theme-sun">☀️</div>
                <span>Light</span>
              </div>
            </label>
            
            <label className="theme-option">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={(e) => setTheme(e.target.value)}
                className="theme-input"
              />
              <div className="theme-preview dark">
                <div className="theme-moon">🌙</div>
                <span>Dark</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-actions">
                 <button
           className="reset-button"
           onClick={handleResetSettings}
           type="button"
         >
           <RotateCcw size={24} />
           Reset to Defaults
         </button>
        
        <div className="settings-info">
          <p>Settings are automatically saved to your browser</p>
        </div>
      </div>
    </div>
  );
};

export default Settings; 