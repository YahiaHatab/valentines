import React, { useState } from 'react';
import './App.css';
import MedievalLetter from './MedievalLetter';
import ImageGallery from '././ImageGallery';
import Confetti from 'react-confetti'; // Import Confetti component

function App() {
  const [response, setResponse] = useState<'initial' | 'yes' | 'no'>('initial');
  const [noClickCount, setNoClickCount] = useState(0);
  const [currentFunnyMessage, setCurrentFunnyMessage] = useState('');
  const [isLetterOpen, setIsLetterOpen] = useState(false); // New state for letter opening
  const [isRibbonPulled, setIsRibbonPulled] = useState(false); // New state for ribbon pull

  const funnyMessages = [
    "You're sweet, but my heart is currently in a committed relationship with pizza. It's complicated.",
    "Are you sure? My heart is breaking... but mostly it's just confused.",
    "Come on, give a knight a chance!",
    "Is that your final answer? The dragon will be very disappointed.",
    "My liege, prithee reconsider! My quest depends on it!",
    "The stars foresee a 'Yes' in your future. Don't fight destiny!",
    "My horse just told me you said 'Yes'. Don't make my horse a liar.",
    "Is this some kind of jest, fair maiden?",
    "But... but I brought you flowers (digitally)!",
    "My squire says you're just playing hard to get. Is he right?",
    "My heart is now a deflated balloon. You monster. 😂",
  ];

  const letterContent = `My Dearest [Jangonty],

In this age of chivalry and romance, my heart doth yearn for thine. Like a knight seeking his lady's favor, I humbly present this query to thee.

Thy beauty doth outshine the fairest stars, and thy laughter is sweeter than the minstrel's song. Each moment spent in thy presence is a treasure more precious than any king's ransom.

With deepest admiration and affection, I ask thee, wilt thou be my Valentine, and grace my days with thy most cherished company?

Forever Thine,
[Yahia]`;

  const placeholderImages = [
    '/images/Gina1.jpeg', // Replace with your actual image path, e.g., /images/your_first_photo.jpg
    '/images/Gina2.jpeg', // Replace with your actual image path
    '/images/Gina3.jpeg', // Replace with your actual image path
    '/images/Gina4.jpeg', // Replace with your actual image path
    // Add more image paths here as needed
  ];

  const handleYes = async () => {
    setResponse('yes');
    // Send 'yes' response to backend
    await fetch('/api/response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ response: 'yes' }),
    });
  };

  const handleNoClick = () => {
    setNoClickCount(prevCount => prevCount + 1);
    const randomIndex = Math.floor(Math.random() * funnyMessages.length);
    setCurrentFunnyMessage(funnyMessages[randomIndex]);
  };

  const handleRibbonPull = () => {
    setIsRibbonPulled(true);
  };

  const getYesButtonStyles = () => {
    const basePadding = 15; // px
    const baseFontSize = 1.3; // em
    const sizeIncrement = 2; // px per click
    const fontIncrement = 0.1; // em per click

    return {
      padding: `${basePadding + noClickCount * sizeIncrement}px ${basePadding * 2 + noClickCount * sizeIncrement * 2}px`,
      fontSize: `${baseFontSize + noClickCount * fontIncrement}em`,
    };
  };

  const getNoButtonStyles = () => {
    const basePadding = 15; // px
    const baseFontSize = 1.3; // em
    const sizeDecrement = 1; // px per click
    const fontDecrement = 0.05; // em per click

    // Ensure button doesn't disappear completely
    const currentPadding = Math.max(5, basePadding - noClickCount * sizeDecrement);
    const currentFontSize = Math.max(0.5, baseFontSize - noClickCount * fontDecrement);

    return {
      padding: `${currentPadding}px ${currentPadding * 2}px`,
      fontSize: `${currentFontSize}em`,
    };
  };

  return (
    <div className="App">
      {response === 'yes' && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}
      {response === 'yes' && (
        <>
          <MedievalLetter
            content={letterContent}
            isOpen={response === 'yes'} // Letter is ready to be opened after 'yes'
            onStampClick={() => setIsLetterOpen(true)}
            isRibbonPulled={isRibbonPulled}
            onRibbonPull={handleRibbonPull}
          />
          {isLetterOpen && <ImageGallery images={placeholderImages} isPulled={isRibbonPulled} />}
        </>
      )}

      <header className="App-header">
        <h1>Do you want to be my Valentine?</h1>
        {response === 'initial' && (
          <div className="buttons-container">
            <button onClick={handleYes} style={getYesButtonStyles()}>Yes</button>
            <button onClick={handleNoClick} style={getNoButtonStyles()}>No</button>
          </div>
        )}
        {response === 'initial' && noClickCount > 0 && (
          <p className="funny-message">{currentFunnyMessage}</p>
        )}
        {response === 'yes' && (
          <p className="response-message">Yay! I knew you'd say yes! ❤️</p>
        )}
      </header>
    </div>
  );
}

export default App;
