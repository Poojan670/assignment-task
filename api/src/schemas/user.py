import uuid
from datetime import datetime

from pydantic import BaseModel


class AuthUser(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    _id: uuid
    username: str
    created_at: datetime
    updated_at: datetime


class LoginResponse(BaseModel):
    access_token: str
    username: str
