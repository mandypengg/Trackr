from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.auth import get_current_user
from app.parser import parse_csv, parse_excel, dataframe_to_applications
from typing import List

router = APIRouter(prefix="/applications", tags=["Applications"])


# CREATE - Add a new application
@router.post("/", response_model=schemas.ApplicationResponse)
def create_application(
    application: schemas.ApplicationCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    new_app = models.Application(**application.model_dump(), user_id=current_user.id)
    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    return new_app


# READ ALL - Get all applications for the current user
@router.get("/", response_model=List[schemas.ApplicationResponse])
def get_applications(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return (
        db.query(models.Application)
        .filter(models.Application.user_id == current_user.id)
        .all()
    )


# READ ONE - Get a single application by ID (must belong to current user)
@router.get("/{app_id}", response_model=schemas.ApplicationResponse)
def get_application(
    app_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    app = (
        db.query(models.Application)
        .filter(
            models.Application.id == app_id,
            models.Application.user_id == current_user.id,
        )
        .first()
    )
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app


# UPDATE - Edit an application (must belong to current user)
@router.put("/{app_id}", response_model=schemas.ApplicationResponse)
def update_application(
    app_id: int,
    updated: schemas.ApplicationUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    app = (
        db.query(models.Application)
        .filter(
            models.Application.id == app_id,
            models.Application.user_id == current_user.id,
        )
        .first()
    )
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    for key, value in updated.model_dump(exclude_unset=True).items():
        setattr(app, key, value)
    db.commit()
    db.refresh(app)
    return app


# DELETE - Remove an application (must belong to current user)
@router.delete("/{app_id}")
def delete_application(
    app_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    app = (
        db.query(models.Application)
        .filter(
            models.Application.id == app_id,
            models.Application.user_id == current_user.id,
        )
        .first()
    )
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    db.delete(app)
    db.commit()
    return {"message": "Application deleted successfully"}


# UPLOAD - Parse and import a CSV or Excel file (scoped to current user)
@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    file_bytes = await file.read()
    filename = file.filename.lower()

    try:
        if filename.endswith(".csv"):
            df = parse_csv(file_bytes)
        elif filename.endswith(".xlsx"):
            df = parse_excel(file_bytes)
        else:
            raise HTTPException(
                status_code=400, detail="Only .csv and .xlsx files are supported"
            )

        applications = dataframe_to_applications(df)

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    saved = []
    for app_data in applications:
        new_app = models.Application(**app_data, user_id=current_user.id)
        db.add(new_app)
        db.commit()
        db.refresh(new_app)
        saved.append(new_app)

    return {"message": f"{len(saved)} applications imported successfully", "imported": len(saved)}