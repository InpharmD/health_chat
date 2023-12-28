import React, { useState, useEffect } from 'react';

const TypingEffect = ({ Message }) => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    const typingTimeout = setTimeout(() => {
      setText(Message);
      setIsTyping(false);
    }, 5000); // Adjust the delay to match the desired typing speed
    return () => clearTimeout(typingTimeout); // Clean up the timeout if the component is unmounted
  }, [Message]);

  return (
    <div>
      {text}
      {isTyping && <span className="animate-pulse">...</span>}
    </div>
  );
};

export default TypingEffect;
