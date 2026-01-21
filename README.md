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

### Navigate to Your Project Location

1. **Create a new folder for your project:**

   **On Windows:**
   - Open File Explorer (Windows key + E)
   - Navigate to where you want to create the project (e.g., `C:\Users\YourUsername\Documents`)
   - Right-click in the folder and select "New" → "Folder"
   - Name it something like "react-projects"
   - Right-click the folder → "Copy as path" to get the full path
   
   **On Mac:**
   - Open Finder
   - Navigate to where you want to create the project (e.g., `/Users/YourUsername/Documents`)
   - Right-click (or Control+click) and select "New Folder"
   - Name it something like "react-projects"
   - Right-click the folder → Hold Option key → "Copy as Pathname" to get the full path

2. **Open a terminal and navigate to your new folder:**

   **On Windows:**
   - Open Command Prompt or PowerShell (search "cmd" or "powershell" in Start menu)
   - Navigate to your folder:
   ```bash
   cd "C:\Users\YourUsername\Documents\react-projects"
   ```
   - Verify your location:
   ```bash
   cd
   ```
   
   **On Mac:**
   - Open Terminal (search "Terminal" in Spotlight or find in Applications → Utilities)
   - Navigate to your folder:
   ```bash
   cd ~/Documents/react-projects
   ```
   - Verify your location:
   ```bash
   pwd
   ```

3. Run Vite's project creation command:
```bash
npm create vite@latest
```

4. Follow the prompts:
   - **Project name:** your choice
   - **Package name:** your choice
   - **Framework:** React
   - **Variant:** JavaScript
   - **Install dependencies now:** Yes
   
   > **Note:** You may see additional prompts (e.g., experimental features or other options). For this workshop, you can typically select "No" for these. If unsure, feel free to ask!
   
   After the installation completes, Vite may automatically start the dev server. If it does, you'll see output in your terminal. **Press Ctrl+C (Windows) or Control+C (Mac)** to stop it for now—we'll start it again after navigating into the project folder.

5. **Navigate into your new project folder:**
   ```bash
   cd your-project-name
   ```
   Replace `your-project-name` with whatever you named your project in step 4.

6. Start the dev server:
```bash
npm run dev
```

7. Open the local URL in your browser (e.g., `http://localhost:5173`).  
   You should see the default Vite React page.

---

## Prepare Your Project

1. **Locate the `src` folder in your project and delete `index.css`:**
   - In VS Code, find the `src` folder in the file explorer on the left
   - Right-click on `index.css` inside the `src` folder
   - Select "Delete" from the menu

2. **Remove the import from `main.jsx`:**
   - Open `main.jsx` (also in the `src` folder)
   - Find and delete this line:
```javascript
- import './index.css';
```
   - **Save the file** (Ctrl+S on Windows, Cmd+S on Mac)
   
   > **💾 Remember to save!** In VS Code, unsaved files show a white dot (●) next to the filename in the tab. After saving, the dot disappears.

3. **Create a new file: `Counter.jsx`**
   - In the `src` folder, right-click and select "New File"
   - Name it **`Counter.jsx`** (capital C is important!)
   
   > **Note:** `.jsx` files are React components that can contain HTML-like JSX syntax. Case sensitivity matters—`Counter.jsx` and `counter.jsx` are different files!

---

## Create the Counter Component

The Counter component will handle:
- The current counter value
- Increment and decrement logic
- History tracking
- Conditional rendering of buttons and history
```javascript
// Import useState hook from React - this lets us manage state in our component
import { useState } from "react";

// Props:
// - showHistory: whether to display the click history
// - showControls: whether to display increment/decrement buttons
export default function Counter({ showHistory = false, showControls = true }) {
  // useState creates a state variable 'count' and a function 'setCount' to update it
  const [count, setCount] = useState(0);       // starts at 0
  
  // Another state variable to keep track of all the numbers we've clicked through
  const [history, setHistory] = useState([]);  // starts as empty array

  // Function to increment the counter
  const increment = () => {
    const next = count + 1;              // calculate new value
    setCount(next);                      // update the counter
    setHistory([...history, next]);      // add to history (... spreads existing values)
  };

  // Function to decrement the counter
  const decrement = () => {
    const next = count - 1;              // calculate new value
    setCount(next);                      // update the counter
    setHistory([...history, next]);      // add to history
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

  // Return the JSX (HTML-like code) to render
  return (
    <div style={styles.container}>
      <h1>Click Counter</h1>
      {/* Display the current count in curly braces to show the variable */}
      <h2>{count}</h2>

      {/* Conditional rendering: only show buttons if showControls is true */}
      {showControls && (
        <div style={styles.buttons}>
          {/* onClick calls our functions when buttons are clicked */}
          <button style={styles.button} onClick={decrement}>-1</button>
          <button style={styles.button} onClick={increment}>+1</button>
        </div>
      )}

      {/* Conditional rendering: only show history if showHistory is true */}
      {showHistory && (
        <p style={styles.history}>
          {/* Join array with arrows, or show "No clicks yet" if empty */}
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

## Install React Router

Before we can add routing, we need to install the React Router package.

> **Why install packages?** Packages are pre-written code libraries that add functionality to your app. Instead of writing routing logic from scratch, we can use `react-router-dom` which is battle-tested and maintained by the community. This saves time and ensures reliability!

1. **Stop the dev server if it's running:** Press **Ctrl+C** (Windows) or **Control+C** (Mac) in the terminal

2. **Install React Router and any other needed packages:**
```bash
npm install react-router-dom
```
   This is the only additional package needed for this workshop beyond what Vite already installed (React and ReactDOM).

3. **Wait for the installation to complete.** You'll see packages being added to your `node_modules` folder.

4. **Restart the dev server:**
```bash
npm run dev
```

---

## Set Up Routing in App.jsx

**What is routing?** Routing lets you create different "pages" in your React app without actually loading new HTML files. When you click a link, React updates what's displayed without refreshing the browser—this makes your app feel fast and smooth!

We'll use **React Router** to create two routes:
- `/` → Counter with buttons
- `/history` → Counter history only

**The following code will replace** the existing code in `App.jsx` that was generated by Vite:
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

1. **Make sure your dev server is running:**
   - If it's already running from earlier, keep it running! When you save files, the browser automatically updates (this is called "hot reload")
   - If you need to stop the server: Press **Ctrl+C** (Windows) or **Cmd+C** (Mac) in the terminal
   - To restart it:
   ```bash
   npm run dev
   ```

2. Open the browser to your local URL (e.g., `http://localhost:5173`)
3. On `/`, click the counter buttons — the number should increase/decrease
4. Click **View History →** to navigate to `/history` — only the history shows
5. Click **← Back** to return to the counter

> **💡 Tip:** Try making changes to the code and saving—watch the browser update instantly without refreshing!

---

## Recap & Key Takeaways

✅ **Components** can be reused with different props  
✅ **State** can persist within a component while switching routes  
✅ **React Router** allows single-page navigation without page reloads  
✅ **Inline styling** is enough for simple demos

---

## Optional: Customize Styling with App.css

Want to change the overall look and feel of your app? Vite generated an `App.css` file that you can modify!

**What is App.css?** This is a stylesheet that contains CSS rules for styling your app. While we used inline styles in the Counter component, you can also use CSS files for global styling or more complex layouts.

### How to Modify App.css:

1. **Open `App.css`** in the `src` folder

2. **Experiment with the existing styles:** The default file includes:
   ```css
   #root {
     max-width: 1280px;
     margin: 0 auto;
     padding: 2rem;
     text-align: center;
   }
   ```
   - Try changing `max-width` to `800px` for a narrower layout
   - Change `padding` to `4rem` for more spacing
   - Modify `text-align` to `left` for left-aligned content

3. **Change colors:** Look for color values (like `#888` or `#646cffaa`) and replace them with your favorites:
   - `#ff6b6b` for red
   - `#4ecdc4` for teal
   - `#95e1d3` for mint green

4. **Modify animations:** The file includes logo spinning animations you can adjust:
   ```css
   @keyframes logo-spin {
     from { transform: rotate(0deg); }
     to { transform: rotate(360deg); }
   }
   ```
   - Speed up/slow down by changing the animation duration in the `@media` section

5. **Save and watch the changes** appear instantly in your browser!

> **💡 Tip:** CSS styles in `App.css` apply globally across your app, while inline styles (like in Counter.jsx) only apply to specific components. Use whichever approach makes sense for your project!
