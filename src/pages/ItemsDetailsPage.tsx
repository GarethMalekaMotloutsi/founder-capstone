import { Link, useParams } from "react-router-dom";
import { ITEMS } from "../data/items";

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
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <Link to="/">← Back</Link>

      <img
        src={image}
        alt={item.title}
        style={{
          width: "100%",
          maxHeight: 450,
          objectFit: "cover",
          borderRadius: 10,
          marginTop: 20,
        }}
      />

      <h1>{item.title}</h1>

      <p>{item.description}</p>

      <p>
        <strong>Owner:</strong> {item.owner.displayName}
      </p>

      <p>
        <strong>Rating:</strong>{" "}
        {item.owner.rating === null
          ? "No ratings yet"
          : `${item.owner.rating} ⭐`}
      </p>

      <p>
        <strong>Distance:</strong>{" "}
        {item.distanceKm === null
          ? "Unavailable"
          : `${item.distanceKm} km`}
      </p>

      <h2>
        {free
          ? "FREE"
          : `R${(item.price!.amountCents / 100).toFixed(2)}/${item.price!.period}`}
      </h2>

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