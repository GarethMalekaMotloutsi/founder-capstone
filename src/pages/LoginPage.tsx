import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoggedIn(true);
  }

  if (loggedIn) {
    return (
      <main style={{ maxWidth: 500, margin: "40px auto", padding: 20 }}>
        <h1>Welcome!</h1>
        <p>You have successfully signed in.</p>

        <Link to="/">Go to Marketplace</Link>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 500, margin: "40px auto", padding: 20 }}>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <br />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <label>Password</label>
        <br />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Sign In</button>
      </form>
    </main>
  );
}