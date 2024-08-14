from flask import Blueprint, request, jsonify
from services.user_stocks_service import get_favorite_stocks, add_favorite_stock, remove_favorite_stock, get_stock_List, add_compare_stock, get_compare_stocks
from middleware.authMiddle import token_required


favorites_bp = Blueprint('favorites', __name__)

@favorites_bp.route('/favorites/<userName>', methods=['GET'])
@token_required
def get_favorites(userName):
    stocks = get_favorite_stocks(userName)
    if stocks is not None:
        return jsonify(stocks)
    return jsonify({"message": "User not found"}), 404

@favorites_bp.route('/favorites/<userName>', methods=['POST'])
def add_favorite(userName):
    data = request.json
    stock = data.get('stock')
    if not stock:
        return jsonify({"message": "Stock is required"}), 400
    if add_favorite_stock(userName, stock):
        return jsonify({"message": "Stock added to favorites"})
    return jsonify({"message": "User not found"}), 404

@favorites_bp.route('/favorites/<userName>', methods=['DELETE'])
def remove_favorite(userName):
    data = request.json
    stock = data.get('stock')
    if not stock:
        return jsonify({"message": "Stock is required"}), 400
    if remove_favorite_stock(userName, stock):
        return jsonify({"message": "Stock removed from favorites"})
    return jsonify({"message": "User not found"}), 404


@favorites_bp.route('/stockList', methods=['GET'])
def get_stocks_List():
    stocks = get_stock_List()
    return jsonify({'stocks': stocks})


@favorites_bp.route('/compare/<userName>', methods=['GET'])
@token_required
def get_compare(userName):
    stocks = get_compare_stocks(userName)
    if stocks is not None:
        return jsonify(stocks)
    return jsonify({"message": "User not found"}), 404


@favorites_bp.route('/compare/<userName>', methods=['POST'])
def add_compare(userName):
    data = request.json
    stock = data.get('stock')
    if not stock:
        return jsonify({"message": "Stock is required"}), 400
    if add_compare_stock(userName, stock):
        return jsonify({"message": "Stock added to favorites"})
    return jsonify({"message": "User not found"}), 404