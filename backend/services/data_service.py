import pandas as pd
import numpy as np
import os

class DataService:
    def __init__(self):
        self.df = None
        self.load_data()

    def load_data(self):
        script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        dataset_path = os.path.join(script_dir, 'dataset', 'airbnb_realistic_dataset.csv')
        try:
            self.df = pd.read_csv(dataset_path)
            # Fill NaNs for JSON serialization
            self.df.fillna({'reviews_per_month': 0, 'rating': self.df['rating'].mean(), 'last_review': 'N/A'}, inplace=True)
            print(f"Data loaded successfully. Rows: {len(self.df)}")
        except Exception as e:
            print(f"Error loading dataset: {e}")
            self.df = pd.DataFrame()

    def get_stats(self):
        if self.df.empty: return {}
        
        return {
            'total_listings': int(len(self.df)),
            'average_price': float(self.df['price'].mean()),
            'highest_price': int(self.df['price'].max()),
            'lowest_price': int(self.df['price'].min()),
            'total_reviews': int(self.df['number_of_reviews'].sum()),
            'average_rating': float(self.df['rating'].mean())
        }

    def get_room_types(self):
        if self.df.empty: return []
        
        counts = self.df['room_type'].value_counts()
        return [{'name': k, 'value': int(v)} for k, v in counts.items()]

    def get_neighborhood_prices(self):
        if self.df.empty: return []
        
        avg_prices = self.df.groupby('neighborhood')['price'].mean().reset_index()
        # Sort by price descending
        avg_prices = avg_prices.sort_values(by='price', ascending=False).head(10)
        return [{'neighborhood': row['neighborhood'], 'price': float(row['price'])} for _, row in avg_prices.iterrows()]

    def get_availability(self):
        if self.df.empty: return []
        # Simulate availability trends over next 6 months for a chart based on room types
        # This is a mock trend since we only have static availability_365
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        trends = []
        for month in months:
            trends.append({
                'month': month,
                'Entire home': int(np.random.normal(500, 50)),
                'Private room': int(np.random.normal(300, 30)),
                'Shared room': int(np.random.normal(50, 10))
            })
        return trends

    def get_reviews_analysis(self):
        if self.df.empty: return []
        # Group by rating brackets to show review distribution
        bins = [0, 1, 2, 3, 4, 4.5, 5]
        labels = ['0-1', '1-2', '2-3', '3-4', '4-4.5', '4.5-5']
        self.df['rating_bracket'] = pd.cut(self.df['rating'], bins=bins, labels=labels, include_lowest=True)
        counts = self.df.groupby('rating_bracket', observed=False)['number_of_reviews'].sum()
        
        return [{'bracket': k, 'reviews': int(v)} for k, v in counts.items()]

    def get_listings(self, page=1, limit=10, search="", min_price=0, max_price=10000, sort_by="price", sort_desc=True):
        if self.df.empty: return {'data': [], 'total': 0, 'page': page, 'limit': limit}
        
        filtered_df = self.df.copy()
        
        # Filtering
        if search:
            filtered_df = filtered_df[filtered_df['listing_name'].str.contains(search, case=False, na=False) | 
                                      filtered_df['neighborhood'].str.contains(search, case=False, na=False)]
            
        filtered_df = filtered_df[(filtered_df['price'] >= min_price) & (filtered_df['price'] <= max_price)]
        
        # Sorting
        if sort_by in filtered_df.columns:
            filtered_df = filtered_df.sort_values(by=sort_by, ascending=not sort_desc)
            
        # Pagination
        total = len(filtered_df)
        start_idx = (page - 1) * limit
        end_idx = start_idx + limit
        
        paginated_df = filtered_df.iloc[start_idx:end_idx]
        
        # Clean data for JSON
        paginated_df = paginated_df.replace({np.nan: None})
        
        return {
            'data': paginated_df.to_dict(orient='records'),
            'total': total,
            'page': page,
            'limit': limit
        }
