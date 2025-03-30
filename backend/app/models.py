# app/models.py
from sqlalchemy import Column, Integer, String, DateTime, func, ForeignKey, TEXT
from sqlalchemy.orm import relationship
from .database import Base

class Category(Base):
    __tablename__ = "category"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    type = Column(String(100), nullable=False)
    date_created = Column(DateTime, nullable=False, default=func.now())
    last_edited = Column(DateTime, nullable=False, default=func.now(), onupdate=func.now())
    icon = Column(String, nullable=True)

class Password(Base):
    __tablename__ = "password"
    id = Column(Integer, primary_key=True, index=True)
    categoryid = Column(Integer, ForeignKey('category.id'))
    usage = Column(TEXT, nullable=False)
    username = Column(TEXT, nullable=False)
    password=Column(TEXT, nullable=False)
    date_created = Column(DateTime, nullable=False, default=func.now())
    last_edited = Column(DateTime, nullable=False, default=func.now(), onupdate=func.now())
    category = relationship("Category")
