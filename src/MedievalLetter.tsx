import React, { useState } from 'react';
import './MedievalLetter.css';
import LetterStamp from './LetterStamp'; // Import the LetterStamp component
import Ribbon from './Ribbon'; // Import the Ribbon component

interface MedievalLetterProps {
  content: string;
  isOpen: boolean; // Prop from parent to indicate if letter is ready to be opened
  onStampClick: () => void; // Callback for when the stamp is clicked
  isRibbonPulled: boolean; // New prop for ribbon state
  onRibbonPull: () => void; // New prop for ribbon click handler
}

const MedievalLetter: React.FC<MedievalLetterProps> = ({ content, isOpen, onStampClick, isRibbonPulled, onRibbonPull }) => {
  const [isLetterContentVisible, setIsLetterContentVisible] = useState(false);

  const handleStampClick = () => {
    setIsLetterContentVisible(true);
    onStampClick(); // Notify parent that stamp was clicked
  };

  return (
    <div className={`medieval-letter-container ${isLetterContentVisible ? 'open' : ''}`}>
      {/* Render Ribbon first so it can be behind other elements */}
      {isLetterContentVisible && !isRibbonPulled && (
        <Ribbon onClick={onRibbonPull} />
      )}
      <div className="envelope-body-base"></div> {/* The main part of the envelope */}
      <div className="parchment-content"> {/* This will hold the actual letter text */}
        {isLetterContentVisible && <p>{content}</p>}
      </div>
      <div className="envelope-left-flap"></div>
      <div className="envelope-right-flap"></div>
      <div className="envelope-bottom-flap"></div>
      <div className="envelope-top-flap">
        {!isLetterContentVisible && isOpen && (
          <LetterStamp onClick={handleStampClick} />
        )}
      </div>
    </div>
  );
};

export default MedievalLetter;