from init_path import *

from models.mongo_connection import get_collection
from fuzzywuzzy import fuzz

def search_stocks(query):
    collection = get_collection('StockList')
    
    # Find all stocks
    all_stocks = collection.find()
    
    # Filter stocks using fuzzy matching
    results = []
    for stock in all_stocks:
        # Check for fuzzy match in symbol or name
        symbol_score = fuzz.partial_ratio(query.lower(), stock.get('symbol', '').lower())
        name_score = fuzz.partial_ratio(query.lower(), stock.get('name', '').lower())
        
        if symbol_score > 75 or name_score > 75:  # Adjust threshold as needed
            stock['_id'] = str(stock['_id'])
            results.append(stock)

    return results


def get_stocks_data(page, limit):
    collection_Stocks = get_collection('StockList')
    
    total_stocks = collection_Stocks.count_documents({})
    
    # Fetch stocks data with skip and limit
    stocks_cursor = collection_Stocks.find().sort('MarketCapValue', -1).skip((page - 1) * limit).limit(limit)
    
    # Convert cursor to list and ensure ObjectId is converted to string
    stocks = []
    for stock in stocks_cursor:
        stock['_id'] = str(stock['_id'])
        
        stocks.append(stock)

    return stocks, total_stocks

def get_top_gainers():
    collection_gainers = get_collection('top_gainers')
    
    gainers = list(collection_gainers.find())
    
    # Convert ObjectId to string
    for gainer in gainers:
        gainer['_id'] = str(gainer['_id'])
        
    return gainers

def get_top_losers():
    collection_losers = get_collection('top_losers')
    
    losers = list(collection_losers.find())
    
    # Convert ObjectId to string
    for loser in losers:
        loser['_id'] = str(loser['_id'])
        
    return losers

def get_stock_detail_data(symbol):
    collection_Stocks = get_collection('stock_details')
    collection_news = get_collection('stock_news')

    # Fetch stock details
    stock = collection_Stocks.find_one({'symbol': symbol})

    # Fetch news (assuming it's a single document)
    news = collection_news.find_one({'symbol': symbol})

    # Convert _id fields to strings
    if stock:
        stock['_id'] = str(stock['_id'])
    if news:
        news['_id'] = str(news['_id'])

    return stock, news


def get_stock_historical_data(symbol):
    collection_Stocks = get_collection('HistoryPrice')
    stock = collection_Stocks.find_one({'symbol': symbol})
    if stock:
        stock['_id'] = str(stock['_id'])
    return stock

