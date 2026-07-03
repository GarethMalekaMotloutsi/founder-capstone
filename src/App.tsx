import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ItemDetailsPage from "./pages/ItemsDetailsPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/item/:id" element={<ItemDetailsPage />} />
      <Route path="/booking/:id" element={<BookingPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
