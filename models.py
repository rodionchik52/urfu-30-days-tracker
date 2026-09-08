import uuid

from sqlalchemy import Column, DateTime, Integer, String, func
from sqlalchemy.dialects.postgresql import JSONB

from .database import Base


class Profile(Base):
    """
    Одна строка на браузер/пользователя. Пользователь определяется
    по httpOnly-cookie (uid), которую сервер выставляет сам при первом
    обращении — на клиенте никаких токенов хранить не нужно.

    profile     — анкета студента (имя, группа, направление и т.д.) или NULL
    task_state  — статусы задач { "<task_id>": {status, note, ts, ...}, ... }
    start_date  — дата начала отсчёта 30 дней (ISO-строка) или NULL
    """

    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    uid = Column(
        String(36),
        unique=True,
        nullable=False,
        index=True,
        default=lambda: str(uuid.uuid4()),
    )
    profile = Column(JSONB, nullable=True)
    task_state = Column(JSONB, nullable=False, default=dict)
    start_date = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
