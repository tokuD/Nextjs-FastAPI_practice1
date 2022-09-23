from fastapi import FastAPI
from database import engine
from fastapi.middleware.cors import CORSMiddleware
import models
from routers import task

models.Base.metadata.create_all(bind=engine)

origins = [
    "http://todofront-fh6j.vercel.app",
    "https://todofront-fh6j.vercel.app",
    "http://todofront-fh6j.vercel.app/",
    "https://todofront-fh6j.vercel.app/",
    "http://localhost",
    "http://localhost:3000",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(task.router)


@app.get("/")
def root():
    return {"message": "Hello World"}
