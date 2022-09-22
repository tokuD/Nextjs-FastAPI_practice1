from sqlalchemy import (
    Column,
    Boolean,
    Integer,
    String,
)
from database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    is_completed = Column(Boolean, default=False)
