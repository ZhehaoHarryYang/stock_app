import { getMostActive, getStocks, getTopGainers, getTopLosers, getTrendingNow, getYearGainers, getYearLosers, getStockDetail } from "../../api/stocks";

class CustomActionProvider {
  constructor(createChatBotMessage, setState, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setState;
    this.setStateFunc = setStateFunc; // In case additional state management logic is needed
  }

  // Handle greeting messages
  handleGreeting() {
    const message = this.createChatBotMessage("Hello! How can I assist you today?");
    this.updateChatbotState(message);
  }

  // Handle active stock query
  async handleActiveStockQuery() {
    try {
      const stockData = await getMostActive();
      const limitedStockData = stockData.slice(0, 10);

      const stockMessage = this.createChatBotMessage(
        "Here are the most active stocks today:", {
          widget: "stockList",
          withAvatar: true,
          payload: limitedStockData // Pass the stock data as payload
        }
      );

      this.updateChatbotState(stockMessage);
    } catch (error) {
      const errorMessage = this.createChatBotMessage(
        "Sorry, I couldn't fetch the most active stocks at the moment."
      );
      this.updateChatbotState(errorMessage);
    }
  }

  // Handle top gainer stocks query
  async handleTopGainerQuery() {
    try {
      const stockData = await getTopGainers();
      const limitedStockData = stockData.slice(0, 10);

      const stockMessage = this.createChatBotMessage(
        "Here are the top gainers today:", {
          widget: "stockList",
          withAvatar: true,
          payload: limitedStockData // Pass the stock data as payload
        }
      );

      this.updateChatbotState(stockMessage);
    } catch (error) {
      const errorMessage = this.createChatBotMessage(
        "Sorry, I couldn't fetch the top gainers at the moment."
      );
      this.updateChatbotState(errorMessage);
    }
  }

  // Handle top loser stocks query
  async handleTopLoserQuery() {
    try {
      const stockData = await getTopLosers();
      const limitedStockData = stockData.slice(0, 10);

      const stockMessage = this.createChatBotMessage(
        "Here are the top losers today:", {
          widget: "stockList",
          withAvatar: true,
          payload: limitedStockData // Pass the stock data as payload
        }
      );

      this.updateChatbotState(stockMessage);
    } catch (error) {
      const errorMessage = this.createChatBotMessage(
        "Sorry, I couldn't fetch the top losers at the moment."
      );
      this.updateChatbotState(errorMessage);
    }
  }

  // Handle trending stocks query
  async handleTrendingStocksQuery() {
    try {
      const stockData = await getTrendingNow();
      const limitedStockData = stockData.slice(0, 10);

      const stockMessage = this.createChatBotMessage(
        "Here are the trending stocks right now:", {
          widget: "stockList",
          withAvatar: true,
          payload: limitedStockData // Pass the stock data as payload
        }
      );

      this.updateChatbotState(stockMessage);
    } catch (error) {
      const errorMessage = this.createChatBotMessage(
        "Sorry, I couldn't fetch the trending stocks at the moment."
      );
      this.updateChatbotState(errorMessage);
    }
  }

  // Handle year gainers query
  async handleYearGainerQuery() {
    try {
      const stockData = await getYearGainers();
      const limitedStockData = stockData.slice(0, 10);

      const stockMessage = this.createChatBotMessage(
        "Here are the year gainers:", {
          widget: "stockList",
          withAvatar: true,
          payload: limitedStockData // Pass the stock data as payload
        }
      );

      this.updateChatbotState(stockMessage);
    } catch (error) {
      const errorMessage = this.createChatBotMessage(
        "Sorry, I couldn't fetch the year gainers at the moment."
      );
      this.updateChatbotState(errorMessage);
    }
  }

  // Handle year losers query
  async handleYearLoserQuery() {
    try {
      const stockData = await getYearLosers();
      const limitedStockData = stockData.slice(0, 10);

      const stockMessage = this.createChatBotMessage(
        "Here are the year losers:", {
          widget: "stockList",
          withAvatar: true,
          payload: limitedStockData // Pass the stock data as payload
        }
      );

      this.updateChatbotState(stockMessage);
    } catch (error) {
      const errorMessage = this.createChatBotMessage(
        "Sorry, I couldn't fetch the year losers at the moment."
      );
      this.updateChatbotState(errorMessage);
    }
  }

   // Handle mega stock query
   async handleMegaQuery() {
    try {
      const stockData = await getStocks();
      const limitedStockData = stockData.stocks.slice(0,10);
      const stockMessage = this.createChatBotMessage(
        "Here are the most gigantic stocks today:", {
          widget: "stockList",
          withAvatar: true,
          payload: limitedStockData // Pass the stock data as payload
        }
      );

      this.updateChatbotState(stockMessage);
    } catch (error) {
      const errorMessage = this.createChatBotMessage(
        "Sorry, I couldn't fetch the most capitalized stocks at the moment."
      );
      this.updateChatbotState(errorMessage);
    }
  }

  async handleSearchQuery(stockSymbol) {
    try {
      const stockData = await getStockDetail(stockSymbol); // Fetch stock data by symbol
  
      // Check if the stock data is valid or if the stock is not found
      if (!stockData || !stockData.stock) {
        const notFoundMessage = this.createChatBotMessage(
          `Sorry, I couldn't find any information for ${stockSymbol}. Please check the symbol and try again.`
        );
        this.updateChatbotState(notFoundMessage);
        return;
      }
  
      const data = stockData.stock; // Assuming stock data exists
      const message = this.createChatBotMessage(
        `Here is the information for ${stockSymbol}:`, {
          widget: "stockDetail",
          payload: data // Pass the stock data as payload
        }
      );
  
      this.updateChatbotState(message);
    } catch (error) {
      const errorMessage = this.createChatBotMessage(
        `Sorry, I couldn't find information for ${stockSymbol}.`
      );
      this.updateChatbotState(errorMessage);
    }
  }
  

  // Method to update the chatbot's state
  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }

  // Add more action handlers as needed
  handleUnknownQuery() {
    const message = this.createChatBotMessage("I'm sorry, I haven't learned that yet.");
    this.updateChatbotState(message);
  }
}


export default CustomActionProvider;
