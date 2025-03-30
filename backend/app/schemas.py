from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class CategoryBase(BaseModel):
    name: str
    type: str
    icon: Optional[str] = None 

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int
    date_created: datetime
    last_edited: datetime

    class Config:
        orm_mode = True