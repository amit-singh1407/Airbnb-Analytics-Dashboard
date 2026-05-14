import pandas as pd
import numpy as np
import random
import os

# Set random seed for reproducibility
np.random.seed(42)

NUM_ROWS = 5000

# Data configurations
neighbourhood_groups = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']
room_types = ['Entire home/apt', 'Private room', 'Shared room', 'Hotel room']

# Probabilities for realistic distributions
ng_probs = [0.44, 0.41, 0.11, 0.03, 0.01]
rt_probs = [0.52, 0.45, 0.02, 0.01]

# Base coordinates (NYC)
lat_center = 40.7128
lon_center = -74.0060

data = {
    'id': range(10000, 10000 + NUM_ROWS),
    'name': [f"Beautiful {np.random.choice(room_types)} in {np.random.choice(neighbourhood_groups)}" for _ in range(NUM_ROWS)],
    'host_name': [f"Host_{i}" for i in range(NUM_ROWS)],
    'neighbourhood_group': np.random.choice(neighbourhood_groups, NUM_ROWS, p=ng_probs),
    'neighbourhood': [f"Neighborhood_{np.random.randint(1, 50)}" for _ in range(NUM_ROWS)],
    'latitude': np.random.normal(lat_center, 0.05, NUM_ROWS),
    'longitude': np.random.normal(lon_center, 0.05, NUM_ROWS),
    'room_type': np.random.choice(room_types, NUM_ROWS, p=rt_probs),
    'price': np.clip(np.random.normal(150, 100, NUM_ROWS), 20, 10000).astype(int),
    'minimum_nights': np.clip(np.random.exponential(3, NUM_ROWS), 1, 365).astype(int),
    'number_of_reviews': np.clip(np.random.exponential(20, NUM_ROWS), 0, 500).astype(int),
    'last_review': pd.date_range(start='2022-01-01', end='2024-01-01', periods=NUM_ROWS).strftime('%Y-%m-%d').tolist(),
    'reviews_per_month': np.clip(np.random.normal(1.5, 1, NUM_ROWS), 0, 10).round(2),
    'calculated_host_listings_count': np.clip(np.random.exponential(1.5, NUM_ROWS), 1, 50).astype(int),
    'availability_365': np.random.randint(0, 365, NUM_ROWS),
    'rating': np.clip(np.random.normal(4.5, 0.5, NUM_ROWS), 1.0, 5.0).round(2)
}

# Add some correlations: Entire homes cost more
for i in range(NUM_ROWS):
    if data['room_type'][i] == 'Entire home/apt':
        data['price'][i] += 100
    elif data['room_type'][i] == 'Shared room':
        data['price'][i] = max(20, data['price'][i] - 50)
    
    # Manhattan costs more
    if data['neighbourhood_group'][i] == 'Manhattan':
        data['price'][i] += 50

# Introduce some missing values to test robustness
missing_idx = np.random.choice(NUM_ROWS, int(NUM_ROWS * 0.05), replace=False)
for idx in missing_idx:
    data['reviews_per_month'][idx] = np.nan
    data['last_review'][idx] = np.nan
    data['rating'][idx] = np.nan

df = pd.DataFrame(data)

# Save to CSV
script_dir = os.path.dirname(os.path.abspath(__file__))
output_path = os.path.join(script_dir, 'airbnb_realistic_dataset.csv')
df.to_csv(output_path, index=False)
print(f"Dataset generated at {output_path}")
