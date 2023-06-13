from fastapi import FastAPI
from routes.departments import department
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from pydantic import BaseModel

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


class Datarequest(BaseModel):
    application: str
    table: str

def create_db_connection(application):
    if application=="harran_university":
        return mysql.connector.connect(
            host="localhost",
            user="root",
            password="root",
            database="mytestdb",
            port=3306
        )
    elif application=="webapp":
        return mysql.connector.connect(
            host="localhost",
            user="root",
            password="root",
            database="geostalovr",
            port=3306
        )

# @app.get("/")
# def read():
#     return {"msg": "Hello World!!"}

@app.post("/fetch_data")
def fetch_data(request: Datarequest):
    # Create a database connection
    connection = create_db_connection(request.application)

    # Define your SQL query
    query = "SELECT * FROM "+request.table

    # Execute the query
    cursor = connection.cursor()
    cursor.execute(query)

    # Fetch all the data
    data = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    connection.close()

    return {"data": data}