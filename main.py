import uuid
from typing import Any, Dict, Optional

from fastapi import Depends, FastAPI, Request, Response
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy.orm import Session

from .database import Base, engine, get_db
from .models import Profile

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Трекер первокурсника ИРИТ-РТФ УрФУ — API")

COOKIE_NAME = "tracker_uid"
COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 5  # 5 лет


# ---------- схемы запросов ----------
class StateIn(BaseModel):
    task_state: Dict[str, Any] = {}


class StartDateIn(BaseModel):
    value: Optional[str] = None


class ProfileIn(BaseModel):
    profile: Optional[Dict[str, Any]] = None


# ---------- определение пользователя по cookie ----------
def get_or_create_profile(request: Request, response: Response, db: Session) -> Profile:
    uid = request.cookies.get(COOKIE_NAME)
    row = None
    if uid:
        row = db.query(Profile).filter(Profile.uid == uid).first()

    if row is None:
        uid = str(uuid.uuid4())
        row = Profile(uid=uid, profile=None, task_state={}, start_date=None)
        db.add(row)
        db.commit()
        db.refresh(row)
        response.set_cookie(
            COOKIE_NAME,
            uid,
            max_age=COOKIE_MAX_AGE,
            httponly=True,
            samesite="lax",
        )
    return row


# ---------- API ----------
@app.get("/api/bootstrap")
def bootstrap(request: Request, response: Response, db: Session = Depends(get_db)):
    row = get_or_create_profile(request, response, db)
    return {
        "profile": row.profile,
        "task_state": row.task_state or {},
        "start_date": row.start_date,
    }


@app.put("/api/state")
def put_state(
    payload: StateIn,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
):
    row = get_or_create_profile(request, response, db)
    row.task_state = payload.task_state
    db.commit()
    return {"ok": True}


@app.put("/api/start-date")
def put_start_date(
    payload: StartDateIn,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
):
    row = get_or_create_profile(request, response, db)
    row.start_date = payload.value
    db.commit()
    return {"ok": True}


@app.put("/api/profile")
def put_profile(
    payload: ProfileIn,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
):
    row = get_or_create_profile(request, response, db)
    row.profile = payload.profile
    db.commit()
    return {"ok": True}


@app.post("/api/reset")
def reset(request: Request, response: Response, db: Session = Depends(get_db)):
    row = get_or_create_profile(request, response, db)
    row.profile = None
    row.task_state = {}
    row.start_date = None
    db.commit()
    return {"ok": True}


# ---------- статика фронтенда (index.html / style.css / script.js) ----------
# Регистрируется последним: конкретные /api/* маршруты выше имеют приоритет,
# а всё остальное отдаётся как статические файлы браузеру.
app.mount("/", StaticFiles(directory="/app/frontend", html=True), name="frontend")
