from fastapi import APIRouter
from config.db import conn
from models.index import departments
from schemas.departments import Departments
import json

department = APIRouter()

# @department.get("/")
# def read():
#     return {"msg": "Hello World!!"}

@department.get("/")
async def read_data():
    resultset = conn.execute(departments.select())
    results_as_dict = resultset.mappings().all()
    return results_as_dict

@department.get("/{id}")
async def read_data(id: int):
    resultset = conn.execute(departments.select().where(departments.c.DepartmentId == id))
    results_as_dict = resultset.mappings().all()
    return results_as_dict

@department.post("/")
async def write_data(department: Departments):
    conn.execute(departments.insert().values(
        DepartmentName=department.DepartmentName,
        DepartmentGeometry=department.DepartmentGeometry
    ))
    conn.commit()
    return "Added Successfully"

@department.delete("/{id}")
async def delete_data(id: int):
    resultset = conn.execute(departments.delete().where(departments.c.DepartmentId == id))
    conn.commit()
    # results_as_dict = resultset.mappings().all()
    return "Deleted Successfully"