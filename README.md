🎬 Book-My-Movie

A Full-Stack Movie Ticket Booking Application

Book-My-Movie is a full-stack React + Node.js movie ticket booking application inspired by platforms like BookMyShow.
It supports user authentication, movie discovery via TMDb API, seat selection, Stripe payments, booking management, and a full Admin Dashboard for managing movies and shows.

This project was built collaboratively over 2 months by:

Rounak — Frontend (React UI, booking flow, contexts, seat layout)

Pradipta — Backend (Node/Express API, MongoDB, Inngest flows, Stripe payment system)

⭐ Key Features (Explained in Detail)

This section explains the whole project in a simple, beginner-friendly way so any new learner can understand how each part works.

🎬 1. Movie Data Fetched Dynamically From TMDb API

Instead of storing posters, descriptions, genres, or ratings in our own database, we use the TMDb API to fetch movie details in real time.

What happens behind the scenes:

The frontend asks our backend for movie data

The backend sends a request to TMDb

TMDb responds with:

Movie poster

Title

Overview

Genres

Ratings

Release date

This keeps our app always updated with the latest movies—just like a real professional ticket-booking platform.

🔐 2. Authentication & Role Management With Clerk

To keep the app secure, we added Clerk, a modern authentication service.

Clerk provides:

Sign-up / log-in

Google login

Secure JSON web tokens

Session handling

User profile information

We use Clerk metadata to identify two types of users:

Normal User → can browse movies, select seats, make payments, view bookings

Admin → can access the Admin Dashboard to manage movie listings and pricing

This creates a real-world structure used by professional production apps.

🎟️ 3. Realistic Seat Layout and Booking Logic

One of the most advanced features of the project is the realistic seat selection system.

We built a cinema-style seating layout where:

Grey seats → Available

Green seats → Selected

Red seats → Already booked

When a user selects seats:

Seats are temporarily “locked”

The backend verifies they’re still available

If the user pays successfully, the seats become permanently booked

If the user leaves or doesn’t pay → seats unlock automatically

This logic is also assisted by Inngest, which ensures no double-booking and handles edge cases like abandoned payments.

💳 4. Stripe Payment Integration (Test Mode)

Users can complete their ticket purchase using Stripe (in test mode).

Here is the booking flow:

User selects their seats

Backend creates a Stripe Checkout Session

User completes payment using test card

Stripe sends a webhook to the backend

Inngest processes the event and:

Marks seats as booked

Updates booking history

Sends confirmation to user

This setup mimics real-world payment systems used in production apps.

🧑‍💼 5. Admin Dashboard for Movie & Show Management

Admins can:

Add new movies to display on the site

Set custom pricing for each movie

Create showtimes

Manage existing listings

Mark movies as active/inactive

These admin actions are saved in MongoDB and displayed immediately in the user interface.

This makes the system fully dynamic and manageable without editing code.

⚙️ 6. Backend API With Express, MongoDB & Mongoose

Our backend includes:

Models (Movie, Show, Booking, User)

Controllers for each feature

Routes for CRUD operations

Middlewares for:

Authentication

Error handling

Validation

Database connection using Mongoose

Every interaction in the app flows through well-structured controllers—for clean, maintainable code.

🚀 7. Event-Driven Backend With Inngest

Instead of handling all logic inside controllers, we use Inngest—a modern task/event system.

Inngest handles:

Payment success events (from Stripe)

Seat locking timers

Booking confirmations

Database consistency checks

This ensures:

No double bookings

No race conditions

Automatic cleanup of timed-out bookings

It makes the backend more robust, scalable, and production-ready.

🧠 8. Rich Frontend Architecture With React Context

The React client uses multiple contexts:

Auth Context from Clerk

Booking Context for seat selections

Movie Context for caching movie details

Admin Context for dashboard operations

These contexts help us hide complexity, manage global state, and make the UI update instantly across all pages.
