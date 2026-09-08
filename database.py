import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Пример: postgresql+psycopg2://tracker:tracker@db:5432/tracker
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://tracker:tracker@db:5432/tracker",
)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
