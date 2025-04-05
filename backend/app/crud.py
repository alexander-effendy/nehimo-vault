from sqlalchemy.orm import Session
from . import models, schemas

######################################################################################
###################################### CATEGORY ######################################
######################################################################################

# POST CATEGORIES
def create_category(db: Session, category: schemas.CategoryCreate):
    print("Validated data:", category.dict())
    db_category = models.Category(name=category.name, type=category.type, icon=category.icon, colour=category.colour)
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

# UPDATE CATEGORY
def update_category(db: Session, category_id: int, category_update: schemas.CategoryUpdate):
    db_category = db.query(models.Category).filter(models.Category.id == category_id).first();
    if db_category:
        for field, value in category_update.dict(exclude_unset=True).items():
            setattr(db_category, field, value)
        db.commit()
        db.refresh(db_category)
    return db_category

# DELETE CATEGORY
def delete_category(db: Session, categoryId: int):
    db_category = get_category(db, categoryId)
    if db_category:
        db.delete(db_category)
        db.commit()
    return db_category

######################################################################################
###################################### PASSWORD ######################################
######################################################################################

# GET ALL CATEGORIES
def get_passwords(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Password).offset(skip).limit(limit).all()

# GET SPECIFIC CATEGORIES
def get_passwords_by_category(db: Session, category_id: int):
    return db.query(models.Password).filter(models.Password.categoryid == category_id).all()

# POST PASSWORD
def create_password(db: Session, password: schemas.PasswordCreate):
    print('creating password')
    print(password)
    db_password = models.Password(categoryid=password.categoryid, usage=password.usage, username=password.username, password=password.password)
    db.add(db_password)
    db.commit()
    db.refresh(db_password)
    return db_password