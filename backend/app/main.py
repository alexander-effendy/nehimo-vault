from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import engine, SessionLocal, Base
from fastapi.middleware.cors import CORSMiddleware
import json

# Create database tables (for development; in production, consider migrations)
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # List the allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency for getting DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


##########################################################################################################
################################################ CATEGORY ################################################
##########################################################################################################

# POST CATEGORIES
@app.post("/categories/", response_model=schemas.CategoryResponse)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    return crud.create_category(db, category)

# GET ALL CATEGORIES
@app.get("/categories/", response_model=list[schemas.CategoryResponse])
def read_categories(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_categories(db, skip, limit)

# GET SPECIFIC CATEGORIES
@app.get("/categories/{category_id}", response_model=schemas.CategoryResponse)
def read_category(category_id: int, db: Session = Depends(get_db)):
    db_category = crud.get_category(db, category_id)
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    return db_category

# UPDATE CATEGORY
@app.put("/categories/{category_id}", response_model=schemas.CategoryResponse)
def update_category(category_id: int, category_update: schemas.CategoryCreate, db: Session = Depends(get_db)):
    db_category = crud.update_category(db, category_id, category_update)
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return db_category

# DELETE CATEGORY
@app.delete("/categories/{category_id}", response_model=schemas.CategoryResponse)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    db_category = crud.delete_category(db, category_id)
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return db_category

##########################################################################################################
################################################ PASSWORD ################################################
##########################################################################################################

# GET ALL PASSWORDS
@app.get("/passwords/", response_model=list[schemas.PasswordResponse])
def read_passwords(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    print('getting passwords now!!!')
    return crud.get_passwords(db, skip, limit)

# GET SPECIFIC PASSWORDS FOR A SPECIFIC CATEGORY
@app.get("/passwords/{category_id}", response_model=schemas.PasswordResponse)
def read_passwords_by_category(category_id: int, db: Session = Depends(get_db)):
    db_passwords = crud.get_passwords_by_category(db, category_id)
    if not db_passwords:
        raise HTTPException(status_code=404, detail="Passwords with the category not found")
    return db_passwords

# ADD PASSWORD
@app.post("/passwords/", response_model=schemas.PasswordResponse)
def create_password(password: schemas.PasswordCreate, db: Session = Depends(get_db)):
    return crud.create_password(db, password)

# DELETE PASSWORD
@app.delete("/passwords/{password_id}", response_model=schemas.PasswordResponse)
def delete_password(password_id: int, db: Session = Depends(get_db)):
    db_password = crud.delete_password(db, password_id)
    if db_password is None:
        raise HTTPException(status_code=404, detail="Password not found")
    return db_password

# UPDATE PASSWORD
@app.put("/passwords/{password_id}", response_model=schemas.PasswordResponse)
def update_password(password_update: schemas.PasswordUpdate, db: Session = Depends(get_db)):
    db_password = crud.update_password(db, password_id=password_update.passwordid, password_update=password_update)
    if db_password is None:
        raise HTTPException(status_code=404, detail="Password not found")
    return db_password