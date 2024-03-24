import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class User(BaseModel):
    id: str = Field(default=lambda: str(uuid.uuid4()), alias="_id")
    username: str
    email: str
    created_at: Optional[datetime] = Field(default=datetime.utcnow)
    updated_at: Optional[datetime] = None

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f5d",
                "username": "poojan",
                "email": "example@example.com",
                "created_at": "2022-03-12T10:00:00",
                "updated_at": "2022-03-12T10:00:00"
            }
        }
