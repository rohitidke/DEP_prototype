from sqlalchemy import create_engine
from sqlalchemy import MetaData

engine = create_engine("mysql+pymysql://root:root@localhost:3306/mytestdb")
meta = MetaData()
conn = engine.connect()