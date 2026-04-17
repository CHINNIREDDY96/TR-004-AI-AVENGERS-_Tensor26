import React, { useState } from "react";

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await res.json();

      if (data.status === "success") {
  setLoggedIn(true);

  // store role in browser
  localStorage.setItem("role", data.role);
}      else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server not reachable. Please check backend.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>🏦 Microfinance Officer Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef2f7",
    fontFamily: "Segoe UI"
  },

  box: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    width: "300px",
    textAlign: "center"
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none"
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#1e3a8a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  error: {
    color: "red",
    marginTop: "10px"
  }
};

export default Login;