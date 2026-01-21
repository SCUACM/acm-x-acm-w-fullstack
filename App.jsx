import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Counter from "./Counter";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Counter showHistory={false} showControls={true}/>
              <Link to="/history" style={linkStyle}>
                View History →
              </Link>
            </>
          }
        />
        <Route
          path="/history"
          element={
            <>
              <Counter showHistory={true} showControls={false}/>
              <Link to="/" style={linkStyle}>
                ← Back
              </Link>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const linkStyle = {
  position: "fixed",
  bottom: "20px",
  textDecoration: "none",
  fontWeight: "bold",
};
