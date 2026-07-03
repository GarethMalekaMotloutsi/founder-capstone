# Decision Log

## Decision 1: Focus on a Minimum Viable Product

**Context**

The project brief included many features that could not realistically be completed within a single sprint.

**Options I considered**

- Try to build every requested feature.
- Focus on the core marketplace experience.

**What I chose and why**

I chose to build a working MVP that allows users to browse items, search, filter, view details and complete a booking. This delivers the main value of the application while keeping the project stable.

**What I gave up**

Features such as messaging, reviews, maps and wishlists were postponed.

---

## Decision 2: Use React Router

**Context**

The application contains multiple pages.

**Options I considered**

- Display everything in one component.
- Use React Router.

**What I chose and why**

I used React Router because it creates a cleaner project structure and makes navigation easier.

**What I gave up**

An additional dependency had to be installed.

---

## Decision 3: Use the provided mock API

**Context**

The starter project included both the ITEMS array and a fake asynchronous `fetchItems()` function.

**Options I considered**

- Read directly from the array.
- Use the provided asynchronous function.

**What I chose and why**

I used `fetchItems()` because it better represents how data would be loaded from a real backend in production.

**What I gave up**

A small loading delay.

---

## Decision 4: Handle incomplete data

**Context**

Some items had missing photos, ratings, prices and distances.

**Options I considered**

- Assume all data existed.
- Handle every edge case.

**What I chose and why**

I handled missing values so the application remains usable even when some information is unavailable.

**What I gave up**

Slightly more UI logic.

---

## Decision 5: Do not force login

**Context**

The founder suggested forcing users to log in before browsing.

**Options I considered**

- Force authentication.
- Allow browsing first.

**What I chose and why**

I allowed browsing before login because it provides a better user experience and lets users understand the platform before creating an account.

**What I gave up**

Collecting user registrations earlier.

---

## Decision 6: Keep the booking process simple

**Context**

The booking system could become very complex.

**Options I considered**

- Build a full booking management system.
- Create a two-step booking flow.

**What I chose and why**

I implemented a simple booking flow that meets the project requirements while remaining easy to understand.

**What I gave up**

Advanced booking features.

---

## Decision 7: Use client-side filtering

**Context**

The application uses mock data.

**Options I considered**

- Server-side filtering.
- Client-side filtering.

**What I chose and why**

Filtering on the client side is sufficient for mock data and keeps the implementation straightforward.

**What I gave up**

Scalability for very large datasets.

---

## Decision 8: Prioritise functionality over polish

**Context**

The deadline required careful prioritisation.

**Options I considered**

- Spend more time on advanced styling.
- Complete all required functionality first.

**What I chose and why**

I prioritised delivering a fully working application before investing additional time in visual polish.

**What I gave up**

Some advanced styling and animations.