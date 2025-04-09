import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import test, predict

load_dotenv()
BASE_URL = os.getenv("BASE_PREFIX", "")

def create_app():
    app = FastAPI()

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173",
                       "https://wearwise-tryiton.onrender.com/",
                       "https://wearwise-tryiton.onrender.com"],
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["*"],
    )
    app.include_router(test.router, prefix=f"{BASE_URL}/test")
    app.include_router(predict.router, prefix=f"{BASE_URL}/predict")

    return app
