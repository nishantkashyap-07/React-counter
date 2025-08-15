import React, { useState, useEffect } from 'react';
import { Plus, Minus, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';
import './Counter.css';

const Counter = ({
  count,
  onIncrement,
  onDecrement,
  onReset,
  isIncrementDisabled,
  isDecrementDisabled,
  step,
  upperBound,
  lowerBound,
  allowNegative
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  // Animation effect when count changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [count]);

  const handleIncrement = () => {
    setLastAction('increment');
    onIncrement();
  };

  const handleDecrement = () => {
    setLastAction('decrement');
    onDecrement();
  };

  const handleReset = () => {
    setLastAction('reset');
    onReset();
  };

  // Determine count color based on value and bounds
  const getCountColor = () => {
    if (count === 0) return 'neutral';
    if (count > 0) return 'positive';
    return 'negative';
  };

  // Get progress percentage for visual indicator
  const getProgressPercentage = () => {
    if (allowNegative) {
      const range = upperBound - lowerBound;
      const position = count - lowerBound;
      return Math.max(0, Math.min(100, (position / range) * 100));
    } else {
      return Math.max(0, Math.min(100, (count / upperBound) * 100));
    }
  };

  return (
    <div className="counter-container">
      <div className="counter-card">
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <div className="bounds-info">
            <span className="bound-label">
              {allowNegative ? lowerBound : 0}
            </span>
            <span className="bound-label">{upperBound}</span>
          </div>
        </div>

        {/* Main Counter Display */}
        <div className={`counter-display ${isAnimating ? 'animate' : ''} ${getCountColor()}`}>
          <div className="counter-value">
            {count.toLocaleString()}
          </div>
          <div className="counter-label">
            Current Value
          </div>
        </div>

        {/* Step Information */}
                 <div className="step-info">
           <div className="step-badge">
             <TrendingUp size={24} />
             <span>Step: {step}</span>
           </div>
           {!allowNegative && (
             <div className="step-badge">
               <TrendingDown size={24} />
               <span>Min: {lowerBound}</span>
             </div>
           )}
         </div>

        {/* Action Buttons */}
        <div className="counter-actions">
                     <button
             className={`action-button decrement ${isDecrementDisabled ? 'disabled' : ''}`}
             onClick={handleDecrement}
             disabled={isDecrementDisabled}
             aria-label={`Decrease by ${step}`}
           >
             <Minus size={32} />
             <span className="button-text">-{step}</span>
           </button>

           <button
             className="action-button reset"
             onClick={handleReset}
             aria-label="Reset counter to zero"
           >
             <RotateCcw size={32} />
             <span className="button-text">Reset</span>
           </button>

           <button
             className={`action-button increment ${isIncrementDisabled ? 'disabled' : ''}`}
             onClick={handleIncrement}
             disabled={isIncrementDisabled}
             aria-label={`Increase by ${step}`}
           >
             <Plus size={32} />
             <span className="button-text">+{step}</span>
           </button>
        </div>

        {/* Status Messages */}
        <div className="status-messages">
          {isIncrementDisabled && (
            <div className="status-message warning">
              Maximum value ({upperBound}) reached
            </div>
          )}
          {isDecrementDisabled && !allowNegative && (
            <div className="status-message warning">
              Minimum value ({lowerBound}) reached
            </div>
          )}
          {count === 0 && (
            <div className="status-message info">
              Counter is at zero
            </div>
          )}
          {count < 0 && (
            <div className="status-message info">
              Negative values are enabled
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button
            className="quick-button"
            onClick={() => {
              const newCount = Math.max(lowerBound, count - step * 5);
              if (allowNegative || newCount >= lowerBound) {
                // Use the parent's state management
                for (let i = 0; i < 5; i++) {
                  if (!isDecrementDisabled) {
                    onDecrement();
                  }
                }
              }
            }}
            disabled={isDecrementDisabled}
          >
            -{step * 5}
          </button>
          <button
            className="quick-button"
            onClick={() => {
              const newCount = Math.min(upperBound, count + step * 5);
              // Use the parent's state management
              for (let i = 0; i < 5; i++) {
                if (!isIncrementDisabled) {
                  onIncrement();
                }
              }
            }}
            disabled={isIncrementDisabled}
          >
            +{step * 5}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter; 