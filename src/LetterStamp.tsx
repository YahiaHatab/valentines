import React from 'react';
import './LetterStamp.css';

interface LetterStampProps {
  onClick: () => void;
}

const LetterStamp: React.FC<LetterStampProps> = ({ onClick }) => {
  return (
    <div className="letter-stamp-container" onClick={onClick}>
      <div className="wax-seal">
        <span className="heart-icon">❤️</span>
      </div>
      <p className="stamp-instruction">Click to Open</p>
    </div>
  );
};

export default LetterStamp;