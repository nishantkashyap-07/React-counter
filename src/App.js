import React, { useState, useEffect } from 'react';
import './App.css';
import Counter from './components/Counter';
import Settings from './components/Settings';
import Header from './components/Header';
import { Settings as SettingsIcon, X } from 'lucide-react';

function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [allowNegative, setAllowNegative] = useState(false);
  const [upperBound, setUpperBound] = useState(100);
  const [lowerBound, setLowerBound] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState('light');

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('counterSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setStep(settings.step || 1);
      setAllowNegative(settings.allowNegative || false);
      setUpperBound(settings.upperBound || 100);
      setLowerBound(settings.lowerBound || 0);
      setTheme(settings.theme || 'light');
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      step,
      allowNegative,
      upperBound,
      lowerBound,
      theme
    };
    localStorage.setItem('counterSettings', JSON.stringify(settings));
  }, [step, allowNegative, upperBound, lowerBound, theme]);

  const increment = () => {
    setCount(prevCount => {
      const newCount = prevCount + step;
      return newCount <= upperBound ? newCount : prevCount;
    });
  };

  const decrement = () => {
    setCount(prevCount => {
      const newCount = prevCount - step;
      return (allowNegative || newCount >= lowerBound) ? newCount : prevCount;
    });
  };

  const reset = () => {
    setCount(0);
  };

  const isIncrementDisabled = count + step > upperBound;
  const isDecrementDisabled = !allowNegative && count - step < lowerBound;

  return (
    <div className={`app ${theme}`}>
      <div className="app-container">
        <Header 
          theme={theme} 
          onThemeChange={setTheme}
          onSettingsToggle={() => setShowSettings(!showSettings)}
        />
        
        <main className="main-content">
          <Counter
            count={count}
            onIncrement={increment}
            onDecrement={decrement}
            onReset={reset}
            isIncrementDisabled={isIncrementDisabled}
            isDecrementDisabled={isDecrementDisabled}
            step={step}
            upperBound={upperBound}
            lowerBound={lowerBound}
            allowNegative={allowNegative}
          />
        </main>

        {showSettings && (
          <div className="settings-overlay">
            <div className="settings-modal">
              <div className="settings-header">
                <h2>Settings</h2>
                                 <button 
                   className="close-button"
                   onClick={() => setShowSettings(false)}
                   aria-label="Close settings"
                 >
                   <X size={28} />
                 </button>
              </div>
              <Settings
                step={step}
                setStep={setStep}
                allowNegative={allowNegative}
                setAllowNegative={setAllowNegative}
                upperBound={upperBound}
                setUpperBound={setUpperBound}
                lowerBound={lowerBound}
                setLowerBound={setLowerBound}
                theme={theme}
                setTheme={setTheme}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 