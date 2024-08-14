import bcrypt
from pymongo.errors import DuplicateKeyError
from models.mongo_connection import get_collection

def hash_password(password):
    # Hash a password for storing
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def check_password(hashed_password, password):
    # Check that an unhashed password matches the hashed password
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)

def authenticate_user(userName, password):
    collection = get_collection('UserCredential')

    usr = collection.find_one({'userName': userName})
    if not usr or not check_password(usr.get('password'), password):
        return False, 'Invalid user name or password'
    
    return True, 'Authenticated'

def create_user(userName, email, password):
    collection = get_collection('UserCredential')

    # Check if userName or email already exists
    existing_user = collection.find_one({'$or': [{'userName': userName}, {'email': email}]})
    
    if existing_user:
        if existing_user.get('userName') == userName:
            return False, 'Username already exists'
        if existing_user.get('email') == email:
            return False, 'Email already exists'
    
    try:
        hashed_password = hash_password(password)
        user_doc = {
            'userName': userName,
            'email': email,
            'password': hashed_password
        }
        result = collection.insert_one(user_doc)
        if result.inserted_id:
            return True, 'User created successfully'
        else:
            return False, 'Failed to create user'
    except DuplicateKeyError:
        # This will handle cases where duplicate key errors occur due to race conditions
        return False, 'Username or email already exists'
    

def fetch_user_account(userName):
    collection = get_collection('UserCredential')
    user = collection.find_one({'userName': userName})
    if user:
        user['_id'] = str(user['_id'])
        user['password'] = str(user['password'])
    return user

def update_user_password(username, current_password, new_password):
    collection = get_collection('UserCredential')
    user = collection.find_one({'userName': username})
    
    if not user:
        return False, 'User not found'
    
    if not check_password(user['password'], current_password):
        return False, 'Invalid current password'
    
    hashed_new_password = hash_password(new_password)
    collection.update_one({'userName': username}, {'$set': {'password': hashed_new_password}})
    
    return True, 'Password updated successfully'

def update_user_email(username, email):
    collection = get_collection('UserCredential')
    user = collection.find_one({'userName': username})
    
    if not user:
        return False, 'User not found'
    
    collection.update_one({'userName': username}, {'$set': {'email': email}})
    
    return True, 'Email updated successfully'


def delete_user(userName, password):
    collection_user = get_collection('UserCredential')
    collection_user_stock = get_collection('UserFavorite')
    user = collection_user.find_one({'userName' : userName})
    if check_password(user['password'], password):
        collection_user.delete_one({'userName': userName})
        collection_user_stock.delete_one({'userName': userName})
        return True, 'User Successfully deleted'
    elif not check_password(user['password'], password):
        return False, 'Invalid password'
    else:
        return False, 'User deletion failed'
