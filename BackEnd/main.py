from fastapi import FastAPI
from routers import dashboard
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




app.include_router(dashboard.router, prefix="/api")
"""
app.include_router(auth.router, prefix="/api")
app.include_router(upload.router, prefix="/api")
"""