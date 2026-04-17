import random

borrowers = []   # ✅ THIS MUST EXIST

livelihoods = ["Farmer", "Vendor", "Tailor", "Driver"]
purposes = ["Agriculture", "Business", "Education", "Medical"]

for i in range(1, 51):
    income = random.randint(3000, 15000)
    missed = random.randint(0, 5)

    borrower = {
        "application_id": f"APP{i:03}",
        "name": f"Borrower {i}",
        "income": income,
        "livelihood": random.choice(livelihoods),
        "loan_amount": random.randint(10000, 100000),
        "tenure": random.choice([12, 24, 36]),
        "interest": random.randint(10, 24),
        "purpose": random.choice(purposes),
        "missed_payments": missed,
        "region_stress": round(random.uniform(0.3, 0.9), 2),
    }

    borrower["emi"] = borrower["loan_amount"] / borrower["tenure"]

    borrowers.append(borrower)
    