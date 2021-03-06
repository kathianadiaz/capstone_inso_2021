import models
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from database import engine 
from organization.routes import router as OrganizationRouter
from user.routes import router as UserRouter
from authentication.routes import router as AuthRouter
from join_requests.routes import router as JoinRequestRouter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins= ["http://localhost", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(OrganizationRouter)
app.include_router(UserRouter)
app.include_router(AuthRouter)
app.include_router(JoinRequestRouter)

@app.get("/")
async def root():
    return {"message": "Hello World"}