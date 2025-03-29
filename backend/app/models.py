# app/models.py
from sqlalchemy import Column, Integer, String, DateTime, func
from .database import Base

class Category(Base):
    __tablename__ = "category"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    type = Column(String(100), nullable=False)
    date_created = Column(DateTime, nullable=False, default=func.now())
    last_edited = Column(DateTime, nullable=False, default=func.now(), onupdate=func.now())
    icon = Column(String, nullable=True)