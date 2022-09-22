from fastapi import HTTPException, status
from sqlalchemy.orm import Session
import models, schemas


def get_tasks(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Task).offset(skip).limit(limit).all()


def get_task(db: Session, id: int):
    db_task = db.query(models.Task).filter(models.Task.id == id).first()
    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"The task with id:{id} is not found.",
        )
    return db_task


def create_task(db: Session, task_in: schemas.TaskIn):
    new_task = models.Task(**task_in.dict())
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return {"message": "success"}


def delete_task(db: Session, id: int):
    db_task = db.query(models.Task).filter(models.Task.id == id)
    if not db_task.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"The task with id:{id} is not found.",
        )
    db_task.delete()
    db.commit()
    return {"message": "success"}

def update_task(db: Session, id: int, task_in: schemas.TaskUpdate):
    db_task = db.query(models.Task).filter(models.Task.id == id)
    if not db_task.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"The task with id:{id} is not found.",
        )
    db_task.update(task_in.dict())
    db.commit()
    return db_task.first()
