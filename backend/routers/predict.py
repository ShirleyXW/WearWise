import numpy as np
from fastapi import APIRouter, File, UploadFile
import joblib
from pydantic import BaseModel
import cv2
from PIL import Image
import io
import logging
import os
from detecto import utils
from detecto.core import Model
from detecto.visualize import show_labeled_image

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()
model = Model.load('model/model_weights.pth', ['eye',])

# Set threshold
thresh = 0.6

@router.post("/")
async def predict_apparent_temp(file: UploadFile = File(...)):
    img_content = await file.read()
    image = Image.open(io.BytesIO(img_content)).convert("RGB")  # PIL 处理
    image = np.array(image)
    # image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    try:
        labels, boxes, scores = model.predict(image)
        # Filter results based on threshold
        filtered_indices = np.where(scores > thresh)
        filtered_scores = scores[filtered_indices]
        filtered_boxes = boxes[filtered_indices]
        if len(filtered_scores) > 2:
            returned_boxes = filtered_boxes.tolist()[:-1]
        else:
            returned_boxes = filtered_boxes.tolist()
        logger.info(f"filtered_boxes: {filtered_boxes}")
        logger.info(f"labels: {labels}, scores: {filtered_scores}")
        return {
            "data": returned_boxes,
        }
    except Exception as e:
        print(f"Error in model prediction: {e}")
        return {
            "data": [],
        }

