from fastapi import APIRouter


router = APIRouter()


@router.get("/")
def test_api():
    return {"message": "Test API is working!"}




@router.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}