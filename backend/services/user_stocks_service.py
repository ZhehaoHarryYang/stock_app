from models.mongo_connection import get_collection

def get_favorite_stocks(userName):
    # Retrieve the UserFavorite collection
    collection_user_favorites = get_collection('UserFavorite')
    
    # Retrieve the StockList collection
    collection_stocks = get_collection('StockList')
    
    # Find the user document
    user = collection_user_favorites.find_one({'userName': userName})
    
    # If the user document does not exist, create it with an empty favorite_stocks list
    if not user:
        collection_user_favorites.insert_one({'userName': userName, 'favorite_stocks': []})
        return []
    
    # Get the list of favorite stock symbols from the user document
    favorite_stock_symbols = user.get('favorite_stocks', [])
    
    # Query the StockList collection to get details of the favorite stocks
    if favorite_stock_symbols:
        # Find stocks where the symbol is in the list of favorite_stock_symbols
        stocks_cursor = collection_stocks.find({'symbol': {'$in': favorite_stock_symbols}})
    else:
        # No favorite stocks, return an empty list
        return []

    # Convert cursor to list and ensure ObjectId is converted to string
    stocks = []
    for stock in stocks_cursor:
        stock['_id'] = str(stock['_id'])  # Ensure ObjectId is converted to string
        stocks.append(stock)
    
    return stocks


def add_favorite_stock(userName, stock):
    collection = get_collection('UserFavorite')
    result = collection.update_one(
        {"userName": userName},
        {"$addToSet": {"favorite_stocks": stock}}
    )
    return result.matched_count > 0

def remove_favorite_stock(userName, stock):
    collection = get_collection('UserFavorite')

    result = collection.update_one(
        {"userName": userName},
        {"$pull": {"favorite_stocks": stock}}
    )
    return result.matched_count > 0

def add_compare_stock(userName, stock):
    collection = get_collection('UserFavorite')
    result = collection.update_one(
        {"userName": userName},
        {"$set": {"compare_stocks": stock}}
    )
    return result.matched_count > 0

def get_compare_stocks(userName):
    # Retrieve the UserFavorite collection
    collection_user_favorites = get_collection('UserFavorite')
    
    # Find the user document
    user = collection_user_favorites.find_one({'userName': userName})
    
     # If the user document does not exist or `compare_stocks` field is missing
    if not user or 'compare_stocks' not in user:
        # Create or update the document with an empty compare_stocks list
        collection_user_favorites.update_one(
            {'userName': userName},
            {'$set': {'compare_stocks': ['-Select-', '-Select-', '-Select-', '-Select-']}},
            upsert=True  # Create the document if it does not exist
        )
        
    # Get the list of favorite stock symbols from the user document
    compare_stock_symbols = user.get('compare_stocks', ['-Select-', '-Select-', '-Select-', '-Select-'])
    
    return compare_stock_symbols


def get_stock_List():
    collection_Stocks = get_collection('StockList')
    stocks_cursor = collection_Stocks.find()
    stocks = []
    for stock in stocks_cursor:
        stocks.append(stock['symbol'])
    return stocks
