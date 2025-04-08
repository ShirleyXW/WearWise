from gradio_client import Client, handle_file
from fastapi import APIRouter, File, UploadFile
import tempfile
import logging
import mimetypes
import os

router = APIRouter()
client = Client("Shirley96/eye-detector-api")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.post("/")
async def predict_eye_position(file: UploadFile = File(...)):
    try:
        content_type = file.content_type or "image/jpeg"
        ext = mimetypes.guess_extension(content_type) or ".jpg"

        with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp_file:
            tmp_file.write(await file.read())
            tmp_file_path = tmp_file.name

        result = client.predict(
            image=handle_file(tmp_file_path),
            api_name="/predict"
        )

        logger.info(f"Prediction result: {result}")
        return {"data": result}

    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return {"data": [], "error": str(e)}

    finally:
        if os.path.exists(tmp_file_path):
            os.remove(tmp_file_path)
