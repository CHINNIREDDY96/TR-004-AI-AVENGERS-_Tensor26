import React, { useEffect, useState } from "react";

function BorrowerDetail({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/borrowers/${id}`)
      .then(res => res.json())
      .then(setData);
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={styles.box}>
      <h3>👤 Borrower Details</h3>

      <p><b>ID:</b> {data.application_id}</p>
      <p><b>Name:</b> {data.name}</p>
      <p><b>Risk Level:</b> {data.risk_level}</p>
      <p><b>Driver:</b> {data.driver}</p>

      {/* 🆕 NEW DETAILS */}
      <hr />

      <p><b>Loan Amount:</b> ₹{data.loan_amount}</p>
      <p><b>Tenure:</b> {data.tenure_months} months</p>
      <p><b>Total Installments:</b> {data.total_installments}</p>
      <p><b>Delayed Repayments:</b> {data.delayed_repayments}</p>
      <p><b>Livelihood:</b> {data.livelihood}</p>
      <p><b>Income Level:</b> {data.income_level}</p>

      <hr />

      <p><b>Recommendation:</b> {data.recommendation}</p>
    </div>
  );
}

const styles = {
  box: {
    marginTop: "20px",
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
  }
};

export default BorrowerDetail;