# app/controllers/user_controller.py
from flask import Blueprint, request, jsonify
from services.user_service import authenticate_user, create_user, fetch_user_account, update_user_password, update_user_email, delete_user
from utils.auth import create_token
from middleware.authMiddle import token_required

user_controller = Blueprint('user_controller', __name__)

@user_controller.route('/login', methods=['POST'])
def login():
    data = request.json
    userName = data.get('userName')
    password = data.get('password')

    success, message = authenticate_user(userName, password)
    if success:
        token = create_token(userName)
        return jsonify({'token': token}), 200
    else:
        return jsonify({'message': message}), 400

@user_controller.route('/logout', methods=['POST'])
def logout():
    # Typically, you'd handle client-side token removal or blacklisting on logout
    return jsonify({'message': 'Logged out successfully'}), 200


@user_controller.route('/create-account', methods=['POST'])
def create_account():
    data = request.json
    userName = data.get('userName')
    email = data.get('email')
    password = data.get('password')

    success, message = create_user(userName, email, password)
    if success:
        return jsonify({'message': 'Account created successfully'}), 201
    else:
        return jsonify({'message': message}), 400


@user_controller.route('/user-account/<userName>', methods=['GET'])
@token_required
def get_user_account(userName):
    user = fetch_user_account(userName)
    return jsonify({'user': user})


@user_controller.route('/user-account/<userName>/password', methods=['PUT'])
def update_password(userName):
    data = request.json
    current_password = data.get('currentPassword')
    new_password = data.get('newPassword')

    success, message = update_user_password(userName, current_password, new_password)
    
    if success:
        return jsonify({'message': message}), 201
    else:
        return jsonify({'message': message}), 400
    
@user_controller.route('/user-account/<userName>/email', methods=['PUT'])
def update_email(userName):
    data = request.json
    email = data.get('email')

    success, message = update_user_email(userName, email)
    
    if success:
        return jsonify({'message': message}), 201
    else:
        return jsonify({'message': message}), 400

@user_controller.route('/delete-account/<userName>', methods=['DELETE'])
def delete_account(userName):
    data = request.json
    password = data.get('password')

    success, message = delete_user(userName, password)
    if success:
        return jsonify({'message': message}), 201
    else:
        return jsonify({'message': message}), 400