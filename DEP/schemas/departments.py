from pydantic import BaseModel, Field, Json

class Departments(BaseModel):
    DepartmentName: str
    DepartmentGeometry: Json
