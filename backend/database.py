import configparser
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

config = configparser.ConfigParser()

with open('config.ini') as f:
    config.read_file(f)

db = config['dev-database']

SQLALCHEMY_DATABASE_URL = f'postgresql://{db["username"]}:{db["password"]}@{db["url"]}/{db["name"]}'

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency
def get_db():
    """Dependency to establish a database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

