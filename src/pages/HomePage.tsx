import { useEffect, useMemo, useState } from "react";
import { fetchItems } from "../data/items";
import type { Category, Item } from "../data/types";

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
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
      <h1>Neighbourhood Marketplace</h1>

      <p>Borrow instead of buying.</p>

      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: 20,
        }}
      >
        {filteredItems.map((item) => {
          const image =
            item.photoUrls[0] ??
            "https://via.placeholder.com/600x400?text=No+Image";

          const free =
            item.price === null || item.price.amountCents === 0;

          return (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <img
                src={image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: 16 }}>
                <h3>{item.title}</h3>

                <p>{item.owner.displayName}</p>

                <p>
                  {item.owner.rating === null
                    ? "No ratings yet"
                    : `${item.owner.rating} ⭐`}
                </p>

                <p>
                  {item.distanceKm === null
                    ? "Distance unavailable"
                    : `${item.distanceKm} km away`}
                </p>

                <strong>
                  {free
                    ? "FREE"
                    : `R${(item.price!.amountCents / 100).toFixed(2)}/${item.price!.period}`}
                </strong>

                <br />
                <br />

                <a href={`/item/${item.id}`}>
                  View Item
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}