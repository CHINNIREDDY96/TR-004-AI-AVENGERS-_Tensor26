from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- LOGIN USERS ----------------
users = {
    "admin": {"password": "1234", "role": "manager"},
    "officer": {"password": "pass123", "role": "officer"}
}

class LoginData(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(data: LoginData):
    if data.username in users and users[data.username]["password"] == data.password:
        return {
            "status": "success",
            "message": "Login successful",
            "user": data.username,
            "role": users[data.username]["role"]
        }

    return {
        "status": "failed",
        "message": "Invalid credentials"
    }

# ---------------- BORROWERS DATA ----------------
borrowers = [
    {
        "application_id": "APP001",
        "name": "Ravi Kumar",
        "risk_level": "High",
        "driver": "Income drop, missed EMIs",
        "recommendation": "Restructure EMI / extend tenure",

        # 🆕 NEW FIELDS
        "total_installments": 24,
        "delayed_repayments": 6,
        "livelihood": "Farmer",
        "income_level": "Low",
        "loan_amount": 50000,
        "tenure_months": 24
    },
    {
        "application_id": "APP002",
        "name": "Sita Devi",
        "risk_level": "Low",
        "driver": "Stable income",
        "recommendation": "Continue regular repayment",

        "total_installments": 12,
        "delayed_repayments": 0,
        "livelihood": "Tailoring",
        "income_level": "Medium",
        "loan_amount": 30000,
        "tenure_months": 12
    },
    {
        "application_id": "APP003",
        "name": "John",
        "risk_level": "Medium",
        "driver": "Seasonal income variation",
        "recommendation": "Small EMI adjustment",

        "total_installments": 18,
        "delayed_repayments": 3,
        "livelihood": "Daily Wage Worker",
        "income_level": "Low",
        "loan_amount": 40000,
        "tenure_months": 18
    },
    {
      "application_id": "APP004",
      "name": "Lakshmi",
      "risk_level": "High",
      "driver": "Multiple missed EMIs and income instability",
      "recommendation": "Immediate restructuring and EMI reduction",

      "total_installments": 24,
      "delayed_repayments": 9,
      "livelihood": "Small Shop Owner",
      "income_level": "Low",
      "loan_amount": 60000,
      "tenure_months": 24
    },
    {
      "application_id": "APP005",
      "name": "Arjun",
      "risk_level": "Low",
      "driver": "Stable salary and timely repayments",
      "recommendation": "Continue regular repayment",

      "total_installments": 12,
      "delayed_repayments": 0,
      "livelihood": "Private Employee",
      "income_level": "High",
      "loan_amount": 80000,
      "tenure_months": 12
    },
    {   
      "application_id": "APP006",
      "name": "Meena",
      "risk_level": "Medium",
      "driver": "Occasional repayment delays due to medical expenses",
      "recommendation": "Flexible EMI schedule",

      "total_installments": 20,
      "delayed_repayments": 4,
      "livelihood": "Tailoring",
      "income_level": "Medium",
      "loan_amount": 45000,
      "tenure_months": 20
    },
    {
      "application_id": "APP007",
      "name": "Ramesh",
      "risk_level": "High",
      "driver": "Agriculture loss due to poor rainfall",
      "recommendation": "Loan restructuring with grace period",

      "total_installments": 24,
      "delayed_repayments": 10,
      "livelihood": "Farmer",
      "income_level": "Low",
      "loan_amount": 70000,
      "tenure_months": 24
    },
    {
      "application_id": "APP008",
      "name": "Priya",
      "risk_level": "Low",
      "driver": "Consistent income and strong repayment history",
      "recommendation": "No changes required",

      "total_installments": 10,
      "delayed_repayments": 0,
      "livelihood": "Teacher",
      "income_level": "High",
      "loan_amount": 50000,
      "tenure_months": 10
   },
   {
      "application_id": "APP009",
      "name": "Suresh",
      "risk_level": "Medium",
      "driver": "Seasonal business fluctuations",
      "recommendation": "Slight EMI extension",

      "total_installments": 18,
      "delayed_repayments": 5,
      "livelihood": "Street Vendor",
      "income_level": "Low",
      "loan_amount": 30000,
      "tenure_months": 18
    },
    {
      "application_id": "APP010",
      "name": "Anitha",
      "risk_level": "High",
      "driver": "High debt burden and irregular income",
      "recommendation": "Debt consolidation and restructuring",

      "total_installments": 30,
      "delayed_repayments": 12,
      "livelihood": "Self-employed",
      "income_level": "Low",
      "loan_amount": 90000,
      "tenure_months": 30
    },
    {
      "application_id": "APP011",
      "name": "Vikram",
      "risk_level": "Low",
      "driver": "Stable corporate salary",
      "recommendation": "Continue existing plan",

      "total_installments": 15,
      "delayed_repayments": 0,
      "livelihood": "Software Engineer",
      "income_level": "High",
      "loan_amount": 150000,
      "tenure_months": 15
    },
{
  "application_id": "APP012",
  "name": "Divya",
  "risk_level": "Medium",
  "driver": "Temporary income drop due to job change",
  "recommendation": "Short-term EMI relaxation",

  "total_installments": 16,
  "delayed_repayments": 3,
  "livelihood": "Retail Worker",
  "income_level": "Medium",
  "loan_amount": 55000,
  "tenure_months": 16
},
{
  "application_id": "APP013",
  "name": "Karthik",
  "risk_level": "High",
  "driver": "Repeated EMI defaults and unstable income",
  "recommendation": "Immediate recovery action plan",

  "total_installments": 24,
  "delayed_repayments": 11,
  "livelihood": "Construction Worker",
  "income_level": "Low",
  "loan_amount": 65000,
  "tenure_months": 24
},
{
  "application_id": "APP014",
  "name": "Bharathi",
  "risk_level": "Medium",
  "driver": "Irregular seasonal income from agriculture support work",
  "recommendation": "Flexible EMI schedule with seasonal adjustment",

  "total_installments": 18,
  "delayed_repayments": 4,
  "livelihood": "Agricultural Labourer",
  "income_level": "Low",
  "loan_amount": 42000,
  "tenure_months": 18
},
{
  "application_id": "APP015",
  "name": "Senthil",
  "risk_level": "Low",
  "driver": "Stable government job income",
  "recommendation": "Continue standard repayment",

  "total_installments": 20,
  "delayed_repayments": 0,
  "livelihood": "Government Employee",
  "income_level": "High",
  "loan_amount": 120000,
  "tenure_months": 20
},
{
  "application_id": "APP016",
  "name": "Geetha",
  "risk_level": "High",
  "driver": "Multiple EMI delays due to family medical expenses",
  "recommendation": "Temporary EMI suspension and restructuring",

  "total_installments": 24,
  "delayed_repayments": 8,
  "livelihood": "Home-Based Business",
  "income_level": "Low",
  "loan_amount": 75000,
  "tenure_months": 24
},
{
  "application_id": "APP017",
  "name": "Manoj",
  "risk_level": "Medium",
  "driver": "Business revenue fluctuation in local market",
  "recommendation": "Reduce EMI amount temporarily",

  "total_installments": 15,
  "delayed_repayments": 3,
  "livelihood": "Small Trader",
  "income_level": "Medium",
  "loan_amount": 50000,
  "tenure_months": 15
},
{
  "application_id": "APP018",
  "name": "Revathi",
  "risk_level": "Low",
  "driver": "Consistent tailoring business income",
  "recommendation": "No changes required",

  "total_installments": 12,
  "delayed_repayments": 0,
  "livelihood": "Tailor",
  "income_level": "Medium",
  "loan_amount": 35000,
  "tenure_months": 12
},
{
  "application_id": "APP019",
  "name": "Dinesh",
  "risk_level": "High",
  "driver": "High debt burden and unstable freelance income",
  "recommendation": "Debt restructuring and EMI reduction",

  "total_installments": 30,
  "delayed_repayments": 13,
  "livelihood": "Freelancer",
  "income_level": "Low",
  "loan_amount": 95000,
  "tenure_months": 30
},
{
  "application_id": "APP020",
  "name": "Kavitha",
  "risk_level": "Medium",
  "driver": "Occasional income drops due to part-time work",
  "recommendation": "Slight EMI extension with review after 6 months",

  "total_installments": 16,
  "delayed_repayments": 5,
  "livelihood": "Part-time Worker",
  "income_level": "Low",
  "loan_amount": 48000,
  "tenure_months": 16
}
]

# ---------------- GET ALL BORROWERS ----------------
@app.get("/borrowers")
def get_borrowers():
    return borrowers

# ---------------- GET SINGLE BORROWER ----------------
@app.get("/borrowers/{app_id}")
def get_borrower(app_id: str):
    for b in borrowers:
        if b["application_id"] == app_id:
            return b
    return {"error": "Borrower not found"}