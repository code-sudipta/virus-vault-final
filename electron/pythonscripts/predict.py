import joblib
import pandas as pd
import sys
import json

# Load the trained model
model = joblib.load("d:\\Final Year Project\\Virus Vault Final\\virus-vault-final\\electron\\ai_model\\antivirus_model.pkl")

new_file_data=sys.argv[1]

data_dict = json.loads(new_file_data)

# Convert to DataFrame
new_file_df = pd.DataFrame([data_dict])

# Predict if the file is malware (1) or safe (0)
prediction = model.predict(new_file_df)

print(prediction[0])