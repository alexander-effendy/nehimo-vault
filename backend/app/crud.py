from sqlalchemy.orm import Session
from . import models, schemas

############################################################
######################### CATEGORY #########################
############################################################

# POST CATEGORIES
def create_category(db: Session, category: schemas.CategoryCreate):
    print("Validated data:", category.dict())
    db_category = models.Category(name=category.name, type=category.type, icon=category.icon)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

# GET ALL CATEGORIES
def get_categories(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Category).all()

# GET SPECIFIC CATEGORIES
def get_category(db: Session, category_id: int):
    return db.query(models.Category).filter(models.Category.id == category_id).first()

# def update_category(db: Session, category_id: int, category_update: schemas.CategoryCreate):
#     db_category = get_category(db, category_id)
#     if db_category:
#         db_category.name = category_update.name
#         db_category.type = category_update.type
#         db_category.icon = category_update.icon
#         db.commit()
#         db.refresh(db_category)
#     return db_category

# def delete_category(db: Session, category_id: int):
#     db_category = get_category(db, category_id)
#     if db_category:
#         db.delete(db_category)
#         db.commit()
#     return db_category

############################################################
######################### PASSWORD #########################
############################################################

# GET ALL CATEGORIES
def get_passwords(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Password).offset(skip).limit(limit).all()

# GET SPECIFIC CATEGORIES
def get_passwords_by_category(db: Session, category_id: int):
    return db.query(models.Password).filter(models.Password.categoryid == category_id).all()