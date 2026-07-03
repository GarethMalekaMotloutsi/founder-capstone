import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchItems } from "../data/items";
import type { Category, Item } from "../data/types";
import "../styles/HomePage.css";


export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"all" | Category>("all");
  const [price, setPrice] = useState<"all" | "free" | "paid">("all");

  useEffect(() => {
    fetchItems().then((data) =>
      setItems(data.filter((item) => item.status !== "removed"))
    );
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || item.category === category;

      const isFree =
        item.price === null || item.price.amountCents === 0;

      const matchesPrice =
        price === "all" ||
        (price === "free" && isFree) ||
        (price === "paid" && !isFree);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [items, search, category, price]);

  return (
    <main className="home-page">

<header className="navbar">
  <div className="logo">
    <span>🏡</span>
    <h2>ShareSpace</h2>
  </div>

  <nav>
    <Link to="/">Home</Link>
    <Link to="/login">Sign In</Link>
  </nav>
</header>

<section className="hero">
  <h1>Borrow Smarter. Share Locally.</h1>

  <p>
    Find tools, equipment, and everyday items from trusted people in your community.
    Save money, reduce waste, and make the most of what your neighbourhood has to offer.
  </p>
</section>


<div className="search-bar">
  
        <input
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as "all" | Category)
          }
        >
          <option value="all">All Categories</option>
          <option value="power-tools">Power Tools</option>
          <option value="hand-tools">Hand Tools</option>
          <option value="garden">Garden</option>
          <option value="kitchen">Kitchen</option>
          <option value="outdoor">Outdoor</option>
          <option value="party">Party</option>
        </select>

        <select
          value={price}
          onChange={(e) =>
            setPrice(e.target.value as "all" | "free" | "paid")
          }
        >
          <option value="all">All Prices</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>

<div className="items-grid">

        {filteredItems.map((item) => {
          const image =
            item.photoUrls[0] ??
            "https://via.placeholder.com/600x400?text=No+Image";

          const free =
            item.price === null || item.price.amountCents === 0;

          return (
<div key={item.id} className="item-card">

<img
  src={image}
  alt={item.title}
  className="item-image"
/>

              <div className="item-content">
                <h3>{item.title}</h3>
<span className="category-badge">
  {item.category.replace("-", " ")}
</span>

<p className="owner-name">
  👤 {item.owner.displayName}
</p>

<p className="item-meta">
  ⭐{" "}
  {item.owner.rating === null
    ? "No ratings yet"
    : `${item.owner.rating} (${item.owner.ratingCount} reviews)`}
</p>

<p className="item-meta">
  📍{" "}
  {item.distanceKm === null
    ? "Distance unavailable"
    : `${item.distanceKm} km away`}
</p>

<div className="price-badge">
  {free
    ? "🆓 Free to Borrow"
    : `💰 R${(item.price!.amountCents / 100).toFixed(2)} / ${item.price!.period}`}
</div>

                <br />
                <br />

<Link
  to={`/item/${item.id}`}
  className="details-button"
>
  View Details
</Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}