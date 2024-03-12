from datetime import datetime, timedelta
from typing import Any

from fastapi import APIRouter, Request, HTTPException, Body
from passlib.context import CryptContext

from src import schemas
from src.api.deps import create_access_token
from src.core.config import settings
from src.db import users_collection

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/sign-up", response_model=schemas.UserResponse, status_code=201)
async def create_user(
        *,
        request: Request,
        username: str = Body(...),
        password: str = Body(...),
) -> Any:
    """
    Create new user
    """
    existing_user = users_collection.find_one({"username": username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    new_user = {
        "username": username,
        "password": pwd_context.hash(password),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }

    result = users_collection.insert_one(new_user)
    if result.inserted_id:
        new_user["_id"] = str(result.inserted_id)
        return new_user
    else:
        raise HTTPException(status_code=500, detail="Error creating user")


@router.post("/login", response_model=schemas.LoginResponse, status_code=201)
async def login(
        *,
        request: Request,
        username: str = Body(...),
        password: str = Body(...),
) -> Any:
    """
    Login User
    """
    existing_user = users_collection.find_one({"username": username})
    if not existing_user:
        raise HTTPException(status_code=400, detail="User not found")
    if not pwd_context.verify(password, existing_user["password"]):
        raise HTTPException(detail="Incorrect username/password", status_code=400)

    access_token = create_access_token(existing_user["_id"],
                                       expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    return {
        "access_token": access_token,
        "username": existing_user["username"]
    }
