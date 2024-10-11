import React, { useState } from 'react';
import { Chatbot } from 'react-chatbot-kit';
import config from '../ChatBot/config';
import CustomMessageParser from '../ChatBot/messageParser';
import CustomActionProvider from '../ChatBot/actionProvider';
import 'react-chatbot-kit/build/main.css';
import './ChatbotStyles.css'; // Import the CSS file

const ChatbotComponent = () => {
  const [isVisible, setIsVisible] = useState(false); // Toggle visibility
  const [isExpanded, setIsExpanded] = useState(false); // Toggle size

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleSize = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      <button
        onClick={toggleVisibility}
        style={{
          padding: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '10px',
        }}
      >
        {isVisible ? 'Hide Chat' : 'Utilize Our Chat Bot to Efficiently Explore !!'}
      </button>

      {/* Conditionally render the chatbot */}
      {isVisible && (
        <div
          style={{
            width: isExpanded ? '700px' : '350px', // Change width based on state
            height: isExpanded ? '700px' : '500px', // Change height based on state
            overflow: 'hidden',
            transition: 'width 0.3s, height 0.3s', // Smooth transition for size change
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            position: 'relative', // Ensure the button is positioned correctly inside the chat area
          }}
        >
          {/* Place the button at the top right of the chatbot */}
          <button
            onClick={toggleSize}
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              padding: '5px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              zIndex: 1, // Ensure it appears above other elements
            }}
          >
            {isExpanded ? 'Shrink' : 'Expand'}
          </button>

          <Chatbot 
            config={config} 
            messageParser={CustomMessageParser} 
            actionProvider={CustomActionProvider} 
          />
        </div>
      )}
    </div>
  );
};

export default ChatbotComponent;
