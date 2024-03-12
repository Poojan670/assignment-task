from pymongo import MongoClient

from src.core.config import settings

client = MongoClient(f"mongodb://{settings.MONGO_HOST}:{settings.MONGO_PORT}/")
db = client[f"{settings.MONGO_DB_NAME}"]
users_collection = db["users"]
