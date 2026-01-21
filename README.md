# React Front End Workshop 


A simple React app to demonstrate components, state, and routing.  
Participants will build a counter that tracks clicks and can view the history on a separate page.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Create the Project](#create-the-project)
- [Prepare Your Project](#prepare-your-project)
- [Create the Counter Component](#create-the-counter-component)
- [Set Up Routing in App.jsx](#set-up-routing-in-appjsx)
- [Run and Test](#run-and-test)
- [Recap & Key Takeaways](#recap--key-takeaways)

---

## Prerequisites

Make sure you have **Node.js** installed:

1. Go to [https://nodejs.org/en/download](https://nodejs.org/en/download)
2. Install Node.js following the instructions for your OS
3. Verify installation in your terminal:
```bash
node -v
npm -v
```

You should see version numbers for both Node and npm.

---

## Create the Project

1. Open a terminal and navigate to the folder where you want to create your project:
```bash
pwd
```

2. Run Vite's project creation command:
```bash
npm create vite@latest
```

3. Follow the prompts:
   - **Project name:** your choice
   - **Package name:** your choice
   - **Framework:** React
   - **Variant:** JavaScript
   - **Install dependencies now:** Yes

4. Start the dev server:
```bash
npm run dev
```

5. Open the local URL in your browser (e.g., `http://localhost:5173`).  
   You should see the default Vite React page.

---

## Prepare Your Project

1. **Delete `index.css`**

2. **Remove the import from `main.jsx`:**
```javascript
- import './index.css';
```

3. In the `src` folder, create a new file: **`Counter.jsx`**

---

## Create the Counter Component

The Counter component will handle:
- The current counter value
- Increment and decrement logic
- History tracking
- Conditional rendering of buttons and history
```javascript
import { useState } from "react";

// Props:
// - showHistory: whether to display the click history
// - showControls: whether to display increment/decrement buttons
export default function Counter({ showHistory = false, showControls = true }) {
  const [count, setCount] = useState(0);       // current counter value
  const [history, setHistory] = useState([]);  // store previous values

  // Increment the counter
  const increment = () => {
    const next = count + 1;
    setCount(next);
    setHistory([...history, next]);
  };

  // Decrement the counter
  const decrement = () => {
    const next = count - 1;
    setCount(next);
    setHistory([...history, next]);
  };

  // Inline styles for simplicity
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

  return (
    <div style={styles.container}>
      <h1>Click Counter</h1>
      <h2>{count}</h2>

      {/* Render buttons only if showControls is true */}
      {showControls && (
        <div style={styles.buttons}>
          <button style={styles.button} onClick={decrement}>-1</button>
          <button style={styles.button} onClick={increment}>+1</button>
        </div>
      )}

      {/* Render history only if showHistory is true */}
      {showHistory && (
        <p style={styles.history}>
          {history.join(" → ") || "No clicks yet"}
        </p>
      )}
    </div>
  );
}
```

**Explanation for beginners:**
- `useState` keeps track of the current value and the history
- `showControls` and `showHistory` allow the same component to be reused on multiple pages
- Buttons update state and the history array

---

## Set Up Routing in App.jsx

We'll use **React Router** to create two routes:
- `/` → Counter with buttons
- `/history` → Counter history only
```javascript
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Counter from "./Counter";

export default function App() {
  const linkStyle = {
    position: "fixed",
    bottom: "20px",
    textDecoration: "none",
    fontWeight: "bold",
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Home page: counter + buttons */}
        <Route
          path="/"
          element={
            <>
              <Counter showHistory={false} showControls={true} />
              <Link to="/history" style={linkStyle}>View History →</Link>
            </>
          }
        />

        {/* History page: counter + history only */}
        <Route
          path="/history"
          element={
            <>
              <Counter showHistory={true} showControls={false} />
              <Link to="/" style={linkStyle}>← Back</Link>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
```

**Explanation:**
- `BrowserRouter` enables routing
- `<Routes>` contains all route definitions
- `<Route path="/" element={...}>` renders the homepage
- `<Link>` updates the URL without refreshing the page

---

## Run and Test

1. Start the server (if not already running):
```bash
npm run dev
```

2. Open the browser to your local URL
3. On `/`, click the counter buttons — the number should increase/decrease
4. Click **View History →** to navigate to `/history` — only the history shows
5. Click **← Back** to return to the counter

---

## Recap & Key Takeaways

✅ **Components** can be reused with different props  
✅ **State** can persist within a component while switching routes  
✅ **React Router** allows single-page navigation without page reloads  
✅ **Inline styling** is enough for simple demos
