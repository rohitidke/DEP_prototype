from fastapi import FastAPI
from routes.departments import department
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(department)

# @app.get("/")
# def read():
#     return {"msg": "Hello World!!"}