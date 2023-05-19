from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, JSON
from config.db import meta

departments = Table(
    'employeeapp_departments', meta,
    Column('DepartmentId', Integer, primary_key=True),
    Column('DepartmentName', String(255)),
    Column('DepartmentGeometry', JSON)
)