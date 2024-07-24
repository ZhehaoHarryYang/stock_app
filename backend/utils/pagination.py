# backend/utils/pagination.py

def paginate(collection, page, limit):
    total = collection.count_documents({})
    data = list(collection.find().skip((page - 1) * limit).limit(limit))
    return data, total
