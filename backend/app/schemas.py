from datetime import datetime
from typing import Optional
from pydantic import BaseModel


############################################################
######################### CATEGORY #########################
############################################################

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

############################################################
######################### PASSWORD #########################
############################################################

class PasswordBase(BaseModel):
    categoryid: int
    usage: str
    username: str
    password: str

class PasswordCreate(PasswordBase):
    pass

class PasswordResponse(PasswordBase):
    id: int
    date_created: datetime
    last_edited: datetime

    class Config:
        orm_mode = True

