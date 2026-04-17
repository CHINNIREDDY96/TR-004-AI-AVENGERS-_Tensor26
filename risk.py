def calculate_risk(b):
    score = 0

    if b["missed_payments"] > 3:
        score += 40
    elif b["missed_payments"] > 1:
        score += 20

    if b["income"] < 5000:
        score += 25

    if b["region_stress"] > 0.7:
        score += 20

    emi_ratio = b["emi"] / b["income"]
    if emi_ratio > 0.5:
        score += 15

    return score


def risk_category(score):
    if score > 60:
        return "High"
    elif score > 30:
        return "Medium"
    return "Low"


def risk_driver(b):
    if b["missed_payments"] > 3:
        return "Frequent missed payments"
    elif b["income"] < 5000:
        return "Low income"
    elif b["region_stress"] > 0.7:
        return "Regional stress"
    return "Moderate pressure"


def recommendation(score):
    if score > 60:
        return "Reduce EMI and extend tenure"
    elif score > 30:
        return "Flexible repayment"
    return "No action needed"


def enrich(b):
    score = calculate_risk(b)
    return {
        **b,
        "risk_score": score,
        "risk_level": risk_category(score),
        "driver": risk_driver(b),
        "recommendation": recommendation(score),
    }
