const BOOKINGS_KEY = "airportal_bookings";

function loadBookings() {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveBookings(bookings) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}
export async function createBooking(booking) {
  const bookings = loadBookings();
  const newBooking = {
    id: Date.now(),
    created_at: new Date().toISOString(),
    ...booking,
  };
  bookings.push(newBooking);
  saveBookings(bookings);
  return { data: newBooking };
}

// List bookings for one user
export async function listBookings(userId) {
  const bookings = loadBookings().filter((b) => b.userId === userId);
  return { data: bookings };
}
