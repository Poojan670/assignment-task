from fastapi import APIRouter

from src.api.v1.urls import user

api_router = APIRouter()
api_router.include_router(user.router, tags=["auth"])
