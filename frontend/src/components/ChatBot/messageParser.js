class CustomMessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowercaseMessage = message.toLowerCase();
    // Check for specific stock search
    const findStockRegex = /find (\w+)/; // Regex to capture stock symbol after 'find'
    const match = lowercaseMessage.match(findStockRegex);
    
    if (match) {
      const stockSymbol = match[1].toUpperCase(); // Get the stock symbol and convert to uppercase
      this.actionProvider.handleSearchQuery(stockSymbol); // Handle search specific stock query
    } else if (lowercaseMessage.includes('active')) {
      this.actionProvider.handleActiveStockQuery(); // Execute your stock-related action
    } else if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
      this.actionProvider.handleGreeting(); // Execute your greeting action
    } else if (lowercaseMessage.includes('trend')) {
      this.actionProvider.handleTrendingStocksQuery(); // Handle trending stocks query
    } else if (lowercaseMessage.includes('gain')) {
      this.actionProvider.handleTopGainerQuery(); // Handle top gainer stocks query
    } else if (lowercaseMessage.includes('lose')) {
      this.actionProvider.handleTopLoserQuery(); // Handle top loser stocks query
    } else if (lowercaseMessage.includes('year gain')) {
      this.actionProvider.handleYearGainerQuery(); // Handle year gainer stocks query
    } else if (lowercaseMessage.includes('year lose')) {
      this.actionProvider.handleYearLoserQuery(); // Handle year loser stocks query
    } else if (lowercaseMessage.includes('mega') || lowercaseMessage.includes('big')) {
      this.actionProvider.handleMegaQuery(); // Handle mega stocks query
    } else {
      // Default response for unrecognized queries
      this.actionProvider.handleUnknownQuery(); // Handle unknown queries
    }
  }
}

export default CustomMessageParser;
