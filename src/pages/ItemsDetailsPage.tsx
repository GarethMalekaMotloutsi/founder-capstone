import { Link, useParams } from "react-router-dom";
import { ITEMS } from "../data/items";
import "../styles/ItemsDetailsPage.css";

export default function ItemsDetailsPage() {
  const { id } = useParams();

  const item = ITEMS.find((i) => i.id === id);

  if (!item) {
    return <h2 style={{ padding: 20 }}>Item not found.</h2>;
  }

  const image =
    item.photoUrls[0] ??
    "https://via.placeholder.com/600x400?text=No+Image";

  const free =
    item.price === null || item.price.amountCents === 0;

  return (
    <main className="details-page">

      <Link to="/">← Back</Link>

<img
  src={image}
  alt={item.title}
  className="details-image"
/>

      <h1 className="details-title">{item.title}</h1>

<span className="category-badge">
  {item.category.replace("-", " ")}
</span>

      <p>{item.description}</p>

<p className="details-info">
  👤 <strong>{item.owner.displayName}</strong>
</p>

<p className="details-info">
  ⭐{" "}
        {item.owner.rating === null
          ? "No ratings yet"
          : `${item.owner.rating} ⭐`}
      </p>

<p className="details-info">
  📍{" "}
        {item.distanceKm === null
          ? "Unavailable"
          : `${item.distanceKm} km`}
      </p>

      <div className="details-price">
        {free
          ? "FREE"
          : `R${(item.price!.amountCents / 100).toFixed(2)}/${item.price!.period}`}
      </div>

      {item.status === "available" ? (
        <Link to={`/booking/${item.id}`}>
          <button>Book Now</button>
        </Link>
      ) : (
        <button disabled>Not Available</button>
      )}
    </main>
  );
}