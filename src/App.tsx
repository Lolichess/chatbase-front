import { useEffect, useState } from "react";
import "./App.css";
import { SigninContext } from "./context";
import Router from "./routes";

function App() {
  const [user, setUser] = useState(null || "");

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <SigninContext.Provider value={{ user, setUser }}>
      <Router />
    </SigninContext.Provider>
  );
}

export default App;
