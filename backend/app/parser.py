import pandas as pd
from io import BytesIO

COLUMN_MAPPING = {
    "company name": "company",
    "company": "company",
    "organization": "company",
    "role": "role",
    "position": "role",
    "job title": "role",
    "date applied": "date_applied",
    "applied on": "date_applied",
    "status": "status",
    "stage": "status",
    "notes": "notes",
    "comments": "notes"
}

def normalize_columns(df):
    df.columns = [col.strip().lower() for col in df.columns]
    df = df.rename(columns=COLUMN_MAPPING)
    return df

def parse_csv(file_bytes):
    df = pd.read_csv(BytesIO(file_bytes))
    df = normalize_columns(df)
    return df

def parse_excel(file_bytes):
    df = pd.read_excel(BytesIO(file_bytes))
    df = normalize_columns(df)
    return df

def dataframe_to_applications(df):
    required = ["company", "role"]
    for col in required:
        if col not in df.columns:
            raise ValueError(f"Missing required column: '{col}'")

    df = df.where(pd.notnull(df), None)

    applications = []
    for _, row in df.iterrows():
        app = {
            "company": row.get("company"),
            "role": row.get("role"),
            "date_applied": str(row["date_applied"]) if row.get("date_applied") else None,
            "status": row.get("status") or "Applied",
            "notes": row.get("notes"),
        }
        applications.append(app)
    return applications
    