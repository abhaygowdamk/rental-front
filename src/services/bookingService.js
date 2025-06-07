// Create a new booking
// Create a new booking (send full booking object)
const API_BASE = "http://localhost:5000";

export async function createBooking(booking) {
  const response = await fetch(`${API_BASE}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (!response.ok) throw new Error("Failed to create booking");
  return response.json();
}

// Delete a booking by bookingId (admin)
export async function deleteBooking(bookingId) {
  const response = await fetch(`${API_BASE}/admin/bookings/${bookingId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete booking');
  return response.json();
}

// Get all bookings for a user
export async function getUserBookings(userId) {
  const response = await fetch(`${API_BASE}/api/bookings/user/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch bookings");
  return response.json();
}
