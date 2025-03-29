import numpy as np
from fastapi import APIRouter, File, UploadFile
import joblib
from pydantic import BaseModel
import cv2
from PIL import Image
import io

router = APIRouter()
model = joblib.load("model/model.pkl")


@router.post("/")
async def predict_apparent_temp(file: UploadFile = File(...)):
    img_content = await file.read()
    image = Image.open(io.BytesIO(img_content)).convert("RGB")  # PIL 处理
    image = np.array(image)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    # predictions = model.predict(image)
    # labels, boxes, scores = predictions

    return {
        "data": (200, 300),
    }