import { useState, useEffect } from "react";

const url = "https://YOUR-DOMAIN-HERE"
export default function Counter({ showHistory, showControls }) {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  const increment = () => {
    const next = count + 1;
    setCount(next);
    setHistory([...history, next]);
    fetch(`${url}/firebase/set`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({current_value: next, history: [...history, next]})
    });
  };

  const decrement = () => {
    const next = count - 1;
    setCount(next);
    setHistory([...history, next]);
    fetch(`${url}/firebase/set`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({current_value: next, history: [...history, next]}),
    });
  };

  // -------------------------------
  // fetch users: api call to flask server
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${url}/firebase/set`)
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error("Failed to fetch users:", err));
    fetch(`${url}/firebase/get`)
        .then((res) => res.json())
        .then((data) => {
            if (data.current_value !== undefined && data.history !== undefined) {
                setCount(data.current_value)
                setHistory(data.history)
            }
        })
  }, []);
  // -------------------------------

  return (
    <div style={styles.container}>
      <h1>Click Counter</h1>

      <h2>{count}</h2>

      {showControls && (
        <div style={styles.buttons}>
          <button style={styles.button} onClick={decrement}>-1</button>
          <button style={styles.button} onClick={increment}>+1</button>
        </div>
      )}

      {showHistory && (
        <p style={styles.history}>
          {history.join(" → ") || "No clicks yet"}
        </p>
      )}

      {/* Simple users display */}
      <div style={{ marginTop: "32px", textAlign: "center" }}>
        <h2>Users from API</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.age} years old)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
  },

  buttons: {
    display: "flex",
    gap: "10px",
  },

  button: {
    padding: "10px 16px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
    backgroundColor: "white",
  },

  history: {
    fontSize: "16px",
    maxWidth: "300px",
    textAlign: "center",
    color: "#555",
  },
};
