import React from "react";
import { AuthProvider } from "./components/auth/AuthProvider";
import Routes from "./Routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
