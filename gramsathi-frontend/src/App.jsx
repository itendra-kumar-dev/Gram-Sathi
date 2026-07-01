import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddEquipment from "./pages/AddEquipment";
import MyListings from "./pages/MyListings";
import EditEquipment from "./pages/EditEquipment";

import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* ================= Public Routes ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* ================= Protected Routes ================= */}

      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/add-equipment"
          element={<AddEquipment />}
        />

        <Route
          path="/my-listings"
          element={<MyListings />}
        />

        <Route
          path="/edit-equipment/:id"
          element={<EditEquipment />}
        />

        {/* Future Routes */}

        {/* <Route
          path="/profile"
          element={<Profile />}
        /> */}

        {/* <Route
          path="/my-bookings"
          element={<MyBookings />}
        /> */}
      </Route>
    </Routes>
  );
}

export default App;