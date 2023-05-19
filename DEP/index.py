from fastapi import FastAPI
from routes.departments import department

app = FastAPI()

app.include_router(department)

# @app.get("/")
# def read():
#     return {"msg": "Hello World!!"}