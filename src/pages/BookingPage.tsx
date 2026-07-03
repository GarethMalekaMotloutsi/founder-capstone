import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function BookingPage() {
  const { id } = useParams();

  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [agreed, setAgreed] = useState(false);

  if (step === 3) {
    return (
      <main style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
        <h1>Booking Confirmed 🎉</h1>

        <p>Your booking request has been submitted successfully.</p>

        <p>
          <strong>Item ID:</strong> {id}
        </p>

        <p>
          <strong>From:</strong> {startDate}
        </p>

        <p>
          <strong>To:</strong> {endDate}
        </p>

        <Link to="/">Return Home</Link>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h1>Book Item</h1>

      {step === 1 && (
        <>
          <label>Start Date</label>

          <br />

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <br />
          <br />

          <label>End Date</label>

          <br />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <br />
          <br />

          <button
            disabled={!startDate || !endDate}
            onClick={() => setStep(2)}
          >
            Continue
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Confirm Booking</h3>

          <p>Item: {id}</p>

          <p>
            {startDate} → {endDate}
          </p>

          <label>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />

            {" "}I agree to the owner's terms.
          </label>

          <br />
          <br />

          <button
            disabled={!agreed}
            onClick={() => setStep(3)}
          >
            Confirm Booking
          </button>
        </>
      )}
    </main>
  );
}