import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# -----------------------------
# Load dataset
# -----------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / 'data' / 'training_dataset.csv'

df = pd.read_csv(DATA_PATH)

# -----------------------------
# Target column
# -----------------------------
TARGET = 'recommended_workout'

# -----------------------------
# Features used by the API
# (must match api/main.py exactly)
# -----------------------------
FEATURES = [
    'age',
    'gender',
    'height_cm',
    'weight_kg',
    'bmi',
    'goal',
    'activity_level',
    'equipment_access',
    'sleep_hours',
    'days_since_last_workout',
    'weekly_workouts',
    'estimated_calories',
    'recovery_score'
]

# Keep only required columns
df = df[FEATURES + [TARGET]].copy()

# -----------------------------
# Encode categorical columns
# -----------------------------
encoders = {}

categorical_columns = [
    'gender',
    'goal',
    'activity_level',
    'equipment_access'
]

for col in categorical_columns:
    encoder = LabelEncoder()
    df[col] = encoder.fit_transform(df[col].astype(str))
    encoders[col] = encoder

# -----------------------------
# Encode target
# -----------------------------
target_encoder = LabelEncoder()
df[TARGET] = target_encoder.fit_transform(df[TARGET].astype(str))

# -----------------------------
# Split features and labels
# -----------------------------
X = df[FEATURES]
y = df[TARGET]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# -----------------------------
# Train model
# -----------------------------
model = RandomForestClassifier(
    n_estimators=300,
    max_depth=12,
    random_state=42
)

model.fit(X_train, y_train)

# -----------------------------
# Evaluate
# -----------------------------
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)

print(f'Accuracy: {accuracy:.2f}')

# -----------------------------
# Save model files into /models
# -----------------------------
MODELS_DIR = BASE_DIR / 'models'
MODELS_DIR.mkdir(exist_ok=True)

joblib.dump(model, MODELS_DIR / 'workout_model.pkl')
joblib.dump(encoders, MODELS_DIR / 'encoders.pkl')
joblib.dump(target_encoder, MODELS_DIR / 'target_encoder.pkl')

print('Model saved successfully!')
print(f'Model files saved in: {MODELS_DIR}')