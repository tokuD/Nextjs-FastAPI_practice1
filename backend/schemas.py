from typing import Union
from pydantic import BaseModel


class TaskBase(BaseModel):
    title: str
    is_completed: bool = False

    class Config:
        orm_mode = True


class TaskIn(TaskBase):
    pass


class TaskOut(TaskBase):
    id: int

class TaskUpdate(TaskBase):
    title: Union[str, None]
    is_completed: Union[bool, None]