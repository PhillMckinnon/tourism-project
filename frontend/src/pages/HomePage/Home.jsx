import React, { useState, useEffect } from "react";
import axios from "axios";
const Home = ( { handleLogout } ) => {
  const [bookings, setBookings] = useState([]);
  const [tours, setTours] = useState([]);
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  const [clientId, setClientId] = useState(null);
  const [newBooking, setNewBooking] = useState({
    tour_id: "",
    booking_date: "",
  });
  const [editingBooking, setEditingBooking] = useState(null);

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await axios.get("http://192.168.66.59:5000/api/clients");
                const client = response.data.find((c) => c.email === email);
                if (client) {
                    setClientId(client.id);
                    fetchBookings(client.id);
                }
            } catch (error) {
                console.error("Error fetching client data:", error);
            }
        };

        const fetchTours = async () => {
            try {
                const response = await axios.get("http://192.168.66.59:5000/api/tours");
                setTours(response.data);
            } catch (error) {
                console.error("Error fetching tours:", error);
            }
        };

        const fetchBookings = async (clientId) => {
            try {
                const response = await axios.get("http://192.168.66.59:5000/api/bookings");
                setBookings(response.data.filter((booking) => booking.client_id === clientId));
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        if (email) {
            fetchClientData();
            fetchTours();
        }
    }, [email]);
  const formatDate = (date) => {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString('en-GB', options); // DD/MM/YYYY
  };

const bookTour = async (e, tourId) => {
  e.preventDefault(); 
  if (!clientId) return;
  try {
    await axios.post("http://192.168.66.59:5000/api/bookings", {
      client_id: clientId,
      tour_id: tourId,
      booking_date: new Date().toISOString(),
      status: "Pending",
    });
    window.location.reload();
  } catch (error) {
    console.error("Error booking tour:", error);
  }
};
  const resetForm = () => {
    setEditingBooking(null);
    setNewBooking({
      tour_id: "",
      booking_date: "",
    });
  };
  const handleDeleteBooking = (id) => {
    axios
      .delete(`/api/bookings/${id}`)
      .then(() => setBookings(bookings.filter((booking) => booking.id !== id)))
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({
      ...newBooking,
      [name]: value,
    });
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>📍Book a tour</h2>
<form onSubmit={(e) => bookTour(e, newBooking.tour_id)}>
          <div className="input-group">
            <label>Tour</label>
            <select
              name="tour_id"
              value={newBooking.tour_id}
              onChange={handleInputChange}
            >
              <option value="">Choose a tour</option>
              {tours
                .filter((tour) => tour.available)
                .map((tour) => (
                  <option key={tour.id} value={tour.id}>
                {tour.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-btn">
            Book this tour
          </button>
        </form>
      </div>

      <div className="main-table">
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Tour</th>
                <th>Booking date</th>
                <th>Departure date</th>
                <th>Return date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.TourBooking.name}</td>
                  <td>{formatDate(booking.booking_date)}</td>
                  <td>{formatDate(booking.TourBooking.departure_date)}</td>
                  <td>{formatDate(booking.TourBooking.return_date)}</td>
                  <td>{booking.status}</td>
                  <td className="action-buttons">
                    <button
                      className="action-btn"
                      onClick={() => handleDeleteBooking(booking.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
 <button className="logout-btn-home" onClick={handleLogout}>Exit</button>

    </div>

  );
};

export default Home;
