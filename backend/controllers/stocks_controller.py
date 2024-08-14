from flask import Blueprint, jsonify, request
from services.stock_service import get_stocks_data, get_top_gainers, get_top_losers, get_stock_detail_data, get_stock_historical_data, search_stocks

stocks_bp = Blueprint('stocks', __name__)

@stocks_bp.route('/stocks', methods=['GET'])
def get_stocks():
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 20))
    stocks, total = get_stocks_data(page, limit)
    return jsonify({'stocks': stocks, 'total': total})

@stocks_bp.route('/stocks/top-gainers', methods=['GET'])
def get_top_gainers_route():
    top_gainers = get_top_gainers()
    return jsonify(top_gainers)

@stocks_bp.route('/stocks/top-losers', methods=['GET'])
def get_top_losers_route():
    top_losers = get_top_losers()
    return jsonify(top_losers)

@stocks_bp.route('/stocks/<symbol>', methods=['GET'])
def get_stock_detail(symbol):
    stock, news = get_stock_detail_data(symbol)
    return jsonify({'stock': stock, 'news': news})

@stocks_bp.route('/stocks/<symbol>/historical', methods=['GET'])
def get_stock_historical(symbol):
    stock_detail = get_stock_historical_data(symbol)
    return jsonify(stock_detail)

@stocks_bp.route('/stocks/search', methods=['GET'])
def search():
    # Get the search query from the request arguments
    query = request.args.get('query', '')
    
    # Search for stocks
    stocks = search_stocks(query)
    
    # Return the results as JSON
    return jsonify(stocks)

