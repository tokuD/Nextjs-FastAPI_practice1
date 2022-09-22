from fastapi import APIRouter, Depends
import schemas
from sqlalchemy.orm import Session
from database import get_db
import crud

router = APIRouter(
    prefix="/tasks",
    tags=["Task"],
)


@router.get("/", response_model=list[schemas.TaskOut])
def get_tasks(db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    return crud.get_tasks(db, skip, limit)


@router.get("/{id}", response_model=schemas.TaskOut)
def get_task(*, db: Session = Depends(get_db), id: int):
    return crud.get_task(db, id)


@router.post("/create")
def create_task(*, db: Session = Depends(get_db), task_in: schemas.TaskIn):
    return crud.create_task(db, task_in)


@router.delete("/delete")
def delete_task(*, db: Session = Depends(get_db), id: int):
    return crud.delete_task(db, id)


@router.put("/update")
def update_task(*, db: Session = Depends(get_db), id: int, task_in: schemas.TaskUpdate):
    return crud.update_task(db, id, task_in)
