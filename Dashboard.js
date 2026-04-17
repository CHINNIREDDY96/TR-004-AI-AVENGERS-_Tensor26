import React, { useEffect, useState } from "react";
import BorrowerDetail from "./BorrowerDetail";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const role = localStorage.getItem("role");

function Dashboard() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/borrowers")
      .then(res => res.json())
      .then(setData)
      .catch(err => console.log("Fetch error:", err));
  }, []);

  // 📊 Risk counts
  const high = data.filter(b => b.risk_level === "High").length;
  const medium = data.filter(b => b.risk_level === "Medium").length;
  const low = data.filter(b => b.risk_level === "Low").length;
  
  const sendAlert = (borrower) => {
    const time = new Date().toLocaleString();

    return {
      sms: `📩 SMS sent to ${borrower.name} (${borrower.application_id}) at ${time}`,
      email: `📧 Email sent to ${borrower.name} (${borrower.application_id}) at ${time}`
    };
  };

  const predictFutureRisk = (b) => {
    let score = 0;

    // 📊 rule-based AI logic (simple ML simulation)

    if (b.risk_level === "High") score += 70;
    if (b.risk_level === "Medium") score += 40;
    if (b.risk_level === "Low") score += 10;

    if (b.delayed_repayments > 3) score += 20;
    if (b.delayed_repayments > 5) score += 30;

    if (b.income_level === "Low") score += 20;

    // normalize max 100
    if (score > 100) score = 100;

    let futureRisk = "Low";
    if (score > 70) futureRisk = "High";
    else if (score > 40) futureRisk = "Medium";

    return {
      score,
      futureRisk
    };
  };


  // 📊 Chart data
  const chartData = [
    { name: "High Risk", value: high },
    { name: "Medium Risk", value: medium },
    { name: "Low Risk", value: low }
  ];

  const COLORS = ["#ef4444", "#f59e0b", "#22c55e"];

  // 🔍 Search filter
  const filtered = data.filter(b =>
    b.application_id.toLowerCase().includes(search.toLowerCase())
  );
  
  const highRiskBorrowers = data.filter(b => b.risk_level === "High");

  const handleLogout = () => {
  localStorage.removeItem("role");  // 👈 clear role
  window.location.reload();         // 👈 reset app
};

  return (
    <div style={styles.page}>

      {/* 🏦 HEADER */}
      <div style={styles.header}>
       <h2>
  🏦 Microfinance Risk Intelligence Dashboard
  <span style={{
  marginLeft: "15px",
  padding: "5px 10px",
  borderRadius: "20px",
  background: role === "manager" ? "#f59e0b" : "#22c55e",
  color: "white",
  fontSize: "14px"
}}>
  {role}
</span>
</h2>

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <div style={{ padding: "20px" }}>

        {/* 📊 CARDS */}
        <div style={styles.cardRow}>
          <div style={{ ...styles.card, borderLeft: "6px solid #ef4444" }}>
            <h4>High Risk</h4>
            <h1>{high}</h1>
          </div>

          <div style={{ ...styles.card, borderLeft: "6px solid #f59e0b" }}>
            <h4>Medium Risk</h4>
            <h1>{medium}</h1>
          </div>

          <div style={{ ...styles.card, borderLeft: "6px solid #22c55e" }}>
            <h4>Low Risk</h4>
            <h1>{low}</h1>
          </div>
        </div>

        {/* 🔍 SEARCH */}
        <input
          placeholder="Search Application ID (e.g., APP001)"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.search}
        />
        {/* 🚨 HIGH RISK ALERT SECTION */}
        {highRiskBorrowers.length > 0 && (
          <div style={styles.alertBox}>
            <h3>⚠️ ALERT: High Risk Borrowers</h3>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {highRiskBorrowers.map(b => {
                const alert = sendAlert(b);

                return (
                  <div
                    key={b.application_id}
                    style={styles.alertCard}
                    onClick={() => setSelected(b.application_id)}
                  >
                    <h4>{b.name}</h4>

                    <p><b>ID:</b> {b.application_id}</p>

                    <p style={{ color: "red", fontWeight: "bold" }}>
                      🔴 HIGH RISK
                    </p>

                    {/* 📩 SIMULATED ALERTS */}
                    <p style={{ fontSize: "12px", color: "green" }}>
                      {alert.sms}
                    </p>

                    <p style={{ fontSize: "12px", color: "blue" }}>
                      {alert.email}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {role === "manager" && (
  <div style={{
    marginTop: "20px",
    padding: "15px",
    background: "#fff3cd",
    borderRadius: "10px"
  }}>
    <h3>👨‍💼 Manager Insights</h3>
    <p>Total Loan Portfolio: {data.length}</p>
    <p>High Risk Exposure: {high}</p>
    <p>Action Required Cases: {high + medium}</p>
  </div>
)}
        {/* 📊 CHART */}
        <div style={styles.chartBox}>
          <h3>📊 Risk Distribution</h3>

          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* 📋 TABLE */}
        <div style={styles.tableBox}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Risk</th>
                <th style={styles.th}>Driver</th>
                <th style={styles.th}>Action</th>
                <th style={styles.th}>AI Future Risk</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(b => (
                <tr
                  key={b.application_id}
                  onClick={() => setSelected(b.application_id)}
                  style={{ cursor: "pointer" }}
                >
                  <td style={styles.td}>{b.application_id}</td>
                  <td style={styles.td}>{b.name}</td>

                  <td style={{
                    ...styles.td,
                    fontWeight: "bold",
                    color:
                      b.risk_level === "High"
                        ? "#ef4444"
                        : b.risk_level === "Medium"
                        ? "#f59e0b"
                        : "#22c55e"
                  }}>
                    {b.risk_level}
                  </td>

                  <td style={styles.td}>{b.driver}</td>
                  <td style={styles.td}>{b.recommendation}</td>

                  {/* 🧠 AI FUTURE RISK */}
                  <td style={{
                    ...styles.td,
                    fontWeight: "bold",
                    color:
                      predictFutureRisk(b).futureRisk === "High"
                        ? "red"
                        : predictFutureRisk(b).futureRisk === "Medium"
                        ? "orange"
                        : "green"
                  }}>
                    {predictFutureRisk(b).futureRisk}
                    <br />
                    <span style={{ fontSize: "12px", color: "#555" }}>
                      ({predictFutureRisk(b).score}% risk score)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 👤 DETAIL VIEW */}
        {selected && <BorrowerDetail id={selected} />}

      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    fontFamily: "Segoe UI, Arial",
    background: "#eef2f7",
    minHeight: "100vh"
  },

  header: {
    background: "linear-gradient(90deg, #0f172a, #1e3a8a)",
    color: "white",
    padding: "18px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  },

  logoutBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  cardRow: {
    display: "flex",
    gap: "20px",
    marginTop: "20px"
  },

  card: {
    flex: 1,
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    textAlign: "center"
  },

  search: {
    marginTop: "20px",
    padding: "12px",
    width: "320px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none"
  },

  chartBox: {
    marginTop: "20px",
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
  },

  tableBox: {
    marginTop: "20px",
    background: "white",
    padding: "15px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
  },

  th: {
    padding: "12px",
    background: "#f1f5f9",
    textAlign: "left",
    fontSize: "14px"
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    fontSize: "14px"
  },

  alertBox: {
    marginTop: "20px",
    background: "#fff5f5",
    border: "2px solid #ef4444",
    padding: "15px",
    borderRadius: "12px"
  },

  alertCard: {
    background: "white",
    padding: "12px",
    borderRadius: "10px",
    minWidth: "200px",
    borderLeft: "5px solid #ef4444",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  }
};

export default Dashboard;