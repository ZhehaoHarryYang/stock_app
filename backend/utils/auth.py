import jwt
import datetime
from flask import current_app

SECRET_KEY = 'your_secret_key'  # Replace with your actual secret key

class InvalidTokenError(Exception):
    pass

def create_token(userName):
    expiration = datetime.datetime.utcnow() + datetime.timedelta(minutes=20)  # Token valid for 5 minutes
    token = jwt.encode({
        'userName': userName,
        'exp': expiration
    }, SECRET_KEY, algorithm='HS256')
    return token

def decode_token(token):
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return decoded
    except jwt.ExpiredSignatureError:
        raise InvalidTokenError('Token has expired.')
    except jwt.InvalidTokenError:
        raise InvalidTokenError('Invalid token.')
