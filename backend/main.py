from fastapi import FastAPI
from core.app import create_app
import uvicorn

app = create_app()



if __name__ == "__main__":
    host = "0.0.0.0"
    port = 8000
    print(f"🚀 FastAPI server running at: http://{host}:{port}")
    uvicorn.run("main:app", host=host, port=port, reload=True)

