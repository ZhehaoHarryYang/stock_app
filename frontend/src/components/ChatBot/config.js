import StockListWidget from './widgets/StockListWidget';
import StockDetailWidget from './widgets/StockDetailWidget';
import { createChatBotMessage } from "react-chatbot-kit";

const botName = "StockBot";

const initialMessages = [
  createChatBotMessage(`Hi, I'm ${botName}! I’m here to help you with all your stock inquiries.`),
  createChatBotMessage(
    "You can ask me about various stock-related topics, such as:"
  ),
  createChatBotMessage(
    "1. **Find a specific stock**: Just say 'Find [stock symbol]' to get detailed information."
  ),
  createChatBotMessage(
    "2. **Trending stocks**: Ask me about the 'trending stocks' to see what's hot right now."
  ),
  createChatBotMessage(
    "3. **Top gainers or losers**: You can ask for 'top gainers' or 'top losers' to see stocks that have changed the most today."
  ),
  createChatBotMessage(
    "4. **Yearly performance**: Inquire about 'year gainers' or 'year losers' to get insights into stock performance over the last year."
  ),
  createChatBotMessage(
    "5. **Active stocks**: Type 'active stocks' to see the most actively traded stocks."
  ),
  createChatBotMessage(
    "Feel free to type your questions, and I'll do my best to assist you!"
  )
];

const config = {
    botName: 'StockBot',
    initialMessages: initialMessages
    ,
    widgets: [
      {
        widgetName: 'stockList',
        widgetFunc: (props) => <StockListWidget {...props} />, // Component for displaying the stock list
      },
      {
        widgetName: 'stockDetail',
        widgetFunc: (props) => <StockDetailWidget {...props} />, // Component for displaying stock details
      },
    ],
    customStyles: {
      botMessageBox: {
        backgroundColor: '#2c3e50', // Background color for bot messages
        color: '#fff', // Text color for bot messages
      },
      chatButton: {
        backgroundColor: '#4CAF50', // Background color for the chat button
        color: '#fff', // Text color for the chat button
      },
    },
};

// Ensure that the `initialMessages` are set correctly and are in the expected format.
// Check if you need to adjust any styling or if other components are affecting the visibility of the messages.

export default config;
