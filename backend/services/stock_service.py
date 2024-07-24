from models.mongo_connection import get_collection, get_database

def get_stocks_data(page, limit):
    db = get_database()
    collection_Stocks = get_collection(db, 'StockList')
    
    total_stocks = collection_Stocks.count_documents({})
    
    # Fetch stocks data with skip and limit
    stocks_cursor = collection_Stocks.find().skip((page - 1) * limit).limit(limit)
    
    # Convert cursor to list and ensure ObjectId is converted to string
    stocks = []
    for stock in stocks_cursor:
        stock['_id'] = str(stock['_id'])
        stocks.append(stock)
    
    return stocks, total_stocks

def get_top_gainers():
    db = get_database()
    collection_gainers = get_collection(db, 'top_gainers')
    
    gainers = list(collection_gainers.find())
    
    # Convert ObjectId to string
    for gainer in gainers:
        gainer['_id'] = str(gainer['_id'])
        
    return gainers

def get_top_losers():
    db = get_database()
    collection_losers = get_collection(db, 'top_losers')
    
    losers = list(collection_losers.find())
    
    # Convert ObjectId to string
    for loser in losers:
        loser['_id'] = str(loser['_id'])
        
    return losers

def get_stock_detail_data(symbol):
    db = get_database()
    collection_Stocks = get_collection(db, 'stock_details')
    
    stock = collection_Stocks.find_one({'symbol': symbol})
    if stock:
        stock['_id'] = str(stock['_id'])
    return stock


def get_stock_historical_data(symbol):
    db = get_database()
    collection_Stocks = get_collection(db, 'HistoryPrice')
    
    stock = collection_Stocks.find_one({'symbol': symbol})
    if stock:
        stock['_id'] = str(stock['_id'])
    return stock

