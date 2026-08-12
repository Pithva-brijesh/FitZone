from fastapi import FastAPI
from pydantic import BaseModel
from pathlib import Path
import joblib
import pandas as pd

app = FastAPI(title="FitZone AI API")

# --------------------------------------------------
# Load trained model and encoders
# --------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"

model = joblib.load(MODELS_DIR / "workout_model.pkl")
encoders = joblib.load(MODELS_DIR / "encoders.pkl")
target_encoder = joblib.load(MODELS_DIR / "target_encoder.pkl")

# --------------------------------------------------
# Feature order (must match training)
# --------------------------------------------------
FEATURES = [
    "age",
    "gender",
    "height_cm",
    "weight_kg",
    "bmi",
    "goal",
    "activity_level",
    "equipment_access",
    "sleep_hours",
    "days_since_last_workout",
    "weekly_workouts",
    "estimated_calories",
    "recovery_score"
]

# --------------------------------------------------
# Request schema
# --------------------------------------------------
class UserProfile(BaseModel):
    age: int
    gender: str
    height_cm: float
    weight_kg: float
    bmi: float
    goal: str
    activity_level: str
    equipment_access: str
    sleep_hours: float
    days_since_last_workout: int
    weekly_workouts: int
    estimated_calories: int
    recovery_score: int

# --------------------------------------------------
# Health check
# --------------------------------------------------
@app.get("/")
def home():
    return {"message": "FitZone AI API is running"}

# --------------------------------------------------
# Prediction endpoint
# --------------------------------------------------
@app.post("/predict")
def predict(profile: UserProfile):
    try:
        data = profile.model_dump()

        # Encode categorical values
        for col in ["gender", "goal", "activity_level", "equipment_access"]:
            if data[col] not in encoders[col].classes_:
                return {
                    "error": f"Unknown value for {col}: {data[col]}",
                    "allowed_values": encoders[col].classes_.tolist()
                }
            data[col] = encoders[col].transform([data[col]])[0]

        # Build dataframe in the exact training order
        df = pd.DataFrame([[data[f] for f in FEATURES]], columns=FEATURES)

        # Predict probabilities
        probabilities = model.predict_proba(df)[0]
        top_indices = probabilities.argsort()[-3:][::-1]

        top_predictions = [
            {
                "workout": target_encoder.inverse_transform([i])[0],
                "probability": round(float(probabilities[i]), 4),
            }
            for i in top_indices
        ]

        return {
            "recommended_workout": top_predictions[0]["workout"],
            "confidence": round(top_predictions[0]["probability"], 4),
            "top_predictions": top_predictions,
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}