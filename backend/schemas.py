from pydantic import BaseModel


class TaskBase(BaseModel):
    title: str
    is_completed: bool = False

    class Config:
        orm_mode = True


class TaskIn(TaskBase):
    pass


class TaskOut(TaskBase):
    pass

class TaskUpdate(TaskBase):
    title: str | None
    is_completed: bool | None