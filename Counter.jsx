import { useState } from "react";

export default function Counter({ showHistory, showControls }) {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  const increment = () => {
    const next = count + 1;
    setCount(next);
    setHistory([...history, next]);
  };

  const decrement = () => {
    const next = count - 1;
    setCount(next);
    setHistory([...history, next])
  };

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
