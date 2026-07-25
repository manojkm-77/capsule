from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Float
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from pydantic import BaseModel
import os, uuid, hashlib, secrets

DB = "sqlite:///capsule.db"
engine = create_engine(DB, connect_args={"check_same_thread": False})
Base = declarative_base()
SessionLocal = sessionmaker(bind=engine)

class UserDB(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True)
    email = Column(String, unique=True)
    name = Column(String)
    pw_hash = Column(String)

class ProductDB(Base):
    __tablename__ = "products"
    id = Column(String, primary_key=True)
    name = Column(String)
    meta = Column(String)
    color = Column(String)
    stock = Column(Integer)
    drop = Column(String)

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Seed
sess = SessionLocal()
if not sess.query(UserDB).first():
    pw = hashlib.sha256(b"capsule").hexdigest()
    sess.add(UserDB(id=str(uuid.uuid4()), email="admin@capsule.in", name="Admin", pw_hash=pw))
if not sess.query(ProductDB).first():
    for p in [
        {"name":"Court Blue Fitted","meta":"6-PANEL / CURVED BRIM","color":"#2B3A67","stock":3,"drop":"004"},
        {"name":"Capsule Orange Snap","meta":"SNAPBACK / FLAT BRIM","color":"#FF5A29","stock":12,"drop":"004"},
        {"name":"Sticker Yellow Dad Hat","meta":"UNSTRUCTURED / DAD FIT","color":"#FFD23F","stock":8,"drop":"003"},
    ]:
        sess.add(ProductDB(id=str(uuid.uuid4())[:8], **p))
    sess.commit()
sess.close()

# Auth helpers
TOKEN_STORE = {}

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@app.get("/api/health")
def health(): return {"status":"ok"}

@app.post("/api/auth/login")
def login(data: dict, db=Depends(get_db)):
    user = db.query(UserDB).filter_by(email=data.get("email")).first()
    pw = hashlib.sha256(data.get("password","").encode()).hexdigest()
    if not user or user.pw_hash != pw: raise HTTPException(401,"Invalid")
    token = secrets.token_urlsafe(24)
    TOKEN_STORE[token] = user.id
    return {"token":token,"user":{"email":user.email,"name":user.name}}

@app.get("/api/products")
def list_products(db=Depends(get_db)):
    return [{"id":p.id,"name":p.name,"meta":p.meta,"color":p.color,"stock":p.stock,"drop":p.drop} for p in db.query(ProductDB).all()]

@app.post("/api/products")
def create(data: dict, db=Depends(get_db)):
    p = ProductDB(id=str(uuid.uuid4())[:8], **data)
    db.add(p); db.commit(); return {"ok":True,"id":p.id}

@app.put("/api/products/{pid}")
def update(pid:str, data: dict, db=Depends(get_db)):
    p = db.query(ProductDB).filter_by(id=pid).first()
    if not p: raise HTTPException(404)
    for k,v in data.items(): setattr(p,k,v)
    db.commit(); return {"ok":True}

@app.delete("/api/products/{pid}")
def delete(pid:str, db=Depends(get_db)):
    p = db.query(ProductDB).filter_by(id=pid).first()
    if p: db.delete(p); db.commit()
    return {"ok":True}

app.mount("/", StaticFiles(directory="frontend", html=True), name="static")
