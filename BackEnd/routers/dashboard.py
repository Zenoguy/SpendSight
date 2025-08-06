from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard-data")
def get_dashboard_data():
    return {
        "categorySpending": [
            {"category": "Groceries", "amount": 320},
            {"category": "Utilities", "amount": 150},
            {"category": "Entertainment", "amount": 210},
            {"category": "Transport", "amount": 85},
            {"category": "Dining Out", "amount": 170}
        ],
        "monthlySpending": [
            {"month": "Jan", "amount": 450},
            {"month": "Feb", "amount": 560},
            {"month": "Mar", "amount": 610},
            {"month": "Apr", "amount": 480},
            {"month": "May", "amount": 530}
        ],
        "vendorSpending": [
            {"vendor": "Amazon", "amount": 300, "transactions": 5},
            {"vendor": "Walmart", "amount": 220, "transactions": 4},
            {"vendor": "Uber", "amount": 85, "transactions": 3},
            {"vendor": "Netflix", "amount": 60, "transactions": 2}
        ]
    }
