// src/pages/Home.jsx
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <div className="app-container">
      <h1 className="page-title">Search & Book Your Flight</h1>
      <p className="page-subtitle">
        Find flights, choose class, and confirm instantly.
      </p>

      <div className="mt-md">
        <SearchForm />
      </div>
    </div>
  );
}
