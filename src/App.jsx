import { useState } from "react";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { Route, Routes } from "react-router-dom";
import Chat from "./Pages/Chat";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Auth/PrivateRoute";
import AdminRoute from "./Auth/AdminRoute";


function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/dashboard" element={
        <AdminRoute>
          <Dashboard />
        </AdminRoute>
      }/>

      <Route path="/chat" element={
        <PrivateRoute >
          <Chat />
        </PrivateRoute>
      }
      />
    </Routes>
  );
}

export default App;
