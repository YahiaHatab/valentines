import React from 'react';
import './Ribbon.css';

interface RibbonProps {
  onClick: () => void;
}

const Ribbon: React.FC<RibbonProps> = ({ onClick }) => {
  return (
    <div className="ribbon-container" onClick={onClick}>
      <div className="ribbon-strip"></div>
      <div className="ribbon-end"></div>
      <p className="ribbon-text">Pull for Memories!</p>
    </div>
  );
};

export default Ribbon;