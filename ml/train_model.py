# train_model.py
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import joblib

# ✅ Realistic and Balanced Dataset
X_train = [
    # 🍔 Food & Beverage
    "Starbucks Latte", "Dominos Pizza", "Zomato Order", "KFC Bucket", "Swiggy Lunch",
    "McDonalds", "Cafe Coffee Day", "Pizza Hut", "Burger King", "Food Court Meal",
    "Restaurant Dinner", "Chai Point", "Juice Shop", "Snacks Purchase", "Tea Stall",
    "Subway Sandwich", "Milk Purchase", "Grocery Snacks", "Dosa at Hotel",

    # 🚗 Transport
    "Uber Ride", "Ola Cab", "Train Ticket", "Metro Ticket", "Bus Fare",
    "Flight Booking", "Petrol Pump", "Diesel Refill", "Toll Payment", "Parking Fee",
    "Auto Rickshaw", "Fuel Station", "Cab Booking", "Monthly Pass", "E-Bike Ride",
    "EV Charging", "Scooter Ride", "Car Service", "Highway Toll",

    # 💡 Utilities
    "Electricity Bill", "Water Bill", "Gas Cylinder", "Internet Bill", "Phone Recharge",
    "Mobile Data Plan", "Broadband Payment", "Cable TV", "DTH Recharge", "Airtel Bill",
    "Jio Recharge", "Gas Refill", "Landline Payment", "Power Supply", "Monthly Utility",

    # 🎮 Entertainment
    "Movie Ticket", "Netflix Subscription", "Amazon Prime", "Hotstar Premium", "Cricket Match",
    "Concert Ticket", "Spotify Subscription", "Gaming Purchase", "BookMyShow", "YouTube Premium",
    "Theme Park", "Arcade Games", "Comedy Show", "Event Entry", "Cinema Booking",

    # 🛍️ Shopping
    "Amazon Order", "Flipkart Purchase", "Snapdeal Shopping", "Ajio Sale", "BigBasket Groceries",
    "Myntra Fashion", "Zara Clothing", "Nykaa Beauty", "Lifestyle Store", "DMart Purchase",
    "Grocery Shopping", "Mobile Purchase", "Electronics Store", "Clothing Store", "Online Order",

    # 🏥 Medical
    "Doctor Visit", "Hospital Bill", "Pharmacy Bill", "Medical Insurance", "Health Checkup",
    "Diagnostic Test", "Medicine Purchase", "Online Medicine", "Dental Appointment", "Eye Test",
    "Vaccination", "Clinic Visit", "Medical Store", "Surgery Payment", "Pathology Lab",

    # 💼 Others
    "Freelance Payment", "Charity Donation", "Gift Purchase", "Unknown Expense", "Random Payment",
    "One-time Payment", "Custom Expense", "Family Support", "Emergency Spend", "Miscellaneous Item",
    "Uncategorized", "Loan Repayment", "Insurance Premium", "Subscription Plan", "Rent Payment",
]

y_train = (
    ["Food & Beverage"] * 19 +
    ["Transport"] * 19 +
    ["Utilities"] * 15 +
    ["Entertainment"] * 15 +
    ["Shopping"] * 15 +
    ["Medical"] * 15 +
    ["Others"] * 15
)

# ✅ Train model
vectorizer = CountVectorizer()
X_vect = vectorizer.fit_transform(X_train)
model = MultinomialNB()
model.fit(X_vect, y_train)

# ✅ Save trained artifacts
joblib.dump(model, "category_model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("✅ Model and vectorizer trained and saved successfully.")
