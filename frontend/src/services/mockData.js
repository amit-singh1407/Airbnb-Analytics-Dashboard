export const MOCK_STATS = {
    total_listings: 10000,
    average_price: 154.25,
    highest_price: 1250,
    lowest_price: 25,
    total_reviews: 45230,
    average_rating: 4.75
};

export const MOCK_ROOM_TYPES = [
    { name: 'Entire home', value: 6500 },
    { name: 'Private room', value: 3200 },
    { name: 'Shared room', value: 300 }
];

export const MOCK_NEIGHBORHOOD_PRICES = [
    { neighborhood: 'Manhattan', price: 210.50 },
    { neighborhood: 'Brooklyn', price: 145.20 },
    { neighborhood: 'Queens', price: 98.40 },
    { neighborhood: 'Staten Island', price: 85.10 },
    { neighborhood: 'Bronx', price: 78.30 },
    { neighborhood: 'Williamsburg', price: 185.60 },
    { neighborhood: 'DUMBO', price: 250.00 },
    { neighborhood: 'Astoria', price: 110.20 },
    { neighborhood: 'Harlem', price: 125.40 },
    { neighborhood: 'SoHo', price: 295.00 }
];

export const MOCK_AVAILABILITY = [
    { month: 'Jan', 'Entire home': 480, 'Private room': 290, 'Shared room': 45 },
    { month: 'Feb', 'Entire home': 510, 'Private room': 310, 'Shared room': 55 },
    { month: 'Mar', 'Entire home': 550, 'Private room': 330, 'Shared room': 60 },
    { month: 'Apr', 'Entire home': 490, 'Private room': 305, 'Shared room': 50 },
    { month: 'May', 'Entire home': 530, 'Private room': 325, 'Shared room': 58 },
    { month: 'Jun', 'Entire home': 580, 'Private room': 350, 'Shared room': 65 }
];

export const MOCK_REVIEWS_ANALYSIS = [
    { bracket: '0-1', reviews: 450 },
    { bracket: '1-2', reviews: 1200 },
    { bracket: '2-3', reviews: 3500 },
    { bracket: '3-4', reviews: 8900 },
    { bracket: '4-4.5', reviews: 15400 },
    { bracket: '4.5-5', reviews: 15780 }
];

export const MOCK_LISTINGS = {
    data: Array.from({ length: 10 }).map((_, i) => ({
        id: 1000 + i,
        listing_name: `Luxury Apartment ${i + 1}`,
        host_name: `Host ${i + 1}`,
        neighborhood: ['Manhattan', 'Brooklyn', 'Queens'][i % 3],
        room_type: ['Entire home', 'Private room'][i % 2],
        price: 100 + (i * 25),
        minimum_nights: 2,
        number_of_reviews: 10 + (i * 5),
        rating: 4.5 + (i * 0.05),
        availability_365: 200 + (i * 10)
    })),
    total: 100,
    page: 1,
    limit: 10
};
