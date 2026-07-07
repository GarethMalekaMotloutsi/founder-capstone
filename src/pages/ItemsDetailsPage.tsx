import { Link, useParams } from "react-router-dom";
import { ITEMS } from "../data/items";
import "../styles/ItemsDetailsPage.css";

export default function ItemsDetailsPage() {
  const { id } = useParams();

  const item = ITEMS.find((i) => i.id === id);

  if (!item) {
    return (
      <main className="details-page">
        <h2>Item not found.</h2>
        <Link to="/">← Back to Home</Link>
      </main>
    );
  }

  const image =
    item.photoUrls[0] ??
    "https://via.placeholder.com/900x500?text=No+Image";

  const free =
    item.price === null || item.price.amountCents === 0;

  return (
    <main className="details-page">
      <Link to="/" className="back-link">
        ← Back to Marketplace
      </Link>

      <img
        src={image}
        alt={item.title}
        className="details-image"
      />

      <div className="details-layout">
        <section className="details-main">
          <span className="category-badge">
            {item.category.replace("-", " ")}
          </span>

          <h1 className="details-title">
            {item.title}
          </h1>

          <p className="details-description">
            {item.description}
          </p>

          <div className="owner-card">
            <h3>Owner Information</h3>

            <p className="details-info">
              👤 <strong>{item.owner.displayName}</strong>
            </p>

            <p className="details-info">
              ⭐{" "}
              {item.owner.rating === null
                ? "No ratings yet"
                : `${item.owner.rating} (${item.owner.ratingCount} reviews)`}
            </p>

            <p className="details-info">
              📍{" "}
              {item.distanceKm === null
                ? "Distance unavailable"
                : `${item.distanceKm} km away`}
            </p>
          </div>
        </section>

        <aside className="booking-card">
          <h2>Rental Summary</h2>

          <div className="details-price">
            {free
              ? "🆓 Free to Borrow"
              : `💰 R${(
                  item.price!.amountCents / 100
                ).toFixed(2)} / ${item.price!.period}`}
          </div>

          <p className="status-text">
            Status:
            <strong>
              {" "}
              {item.status === "available"
                ? "Available"
                : "Not Available"}
            </strong>
          </p>

          {item.status === "available" ? (
            <Link to={`/booking/${item.id}`}>
              <button className="book-button">
                Book This Item
              </button>
            </Link>
          ) : (
            <button
              className="book-button"
              disabled
            >
              Not Available
            </button>
          )}
        </aside>
      </div>
    </main>
  );
}