from functools import wraps
from flask import request, jsonify
from utils.auth import decode_token, InvalidTokenError

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            token = token.replace('Bearer ', '')  # Remove 'Bearer ' if included
            decoded = decode_token(token)
            request.user = decoded['userName']
        except InvalidTokenError as e:
            return jsonify({'message': str(e)}), 401

        return f(*args, **kwargs)
    return decorator
