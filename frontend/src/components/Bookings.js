import React, { useState, useEffect } from "react";
import axios from "axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    client_id: "",
    tour_id: "",
    booking_date: "",
    status: "Pending",
  });
  const [editingBooking, setEditingBooking] = useState(null);
  const [clients, setClients] = useState([]); 
  const [tours, setTours] = useState([]); 

  useEffect(() => {
    axios
      .get("/api/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((err) => console.error(err));

    axios
      .get("/api/clients")
      .then((response) => setClients(response.data))
      .catch((err) => console.error(err));

    axios
      .get("/api/tours")
      .then((response) => setTours(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({
      ...newBooking,
      [name]: value,
    });
  };
  const formatDate = (date) => {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString('en-GB', options); // DD/MM/YYYY
  };
  const handleCreateBooking = (e) => {
  e.preventDefault();
  axios
    .post("/api/bookings", newBooking)
    .then((response) => {
      const newBookingId = response.data.id;

      
      axios
        .get(`/api/bookings/${newBookingId}`)
        .then((updatedResponse) => {
          const updatedBooking = updatedResponse.data;
          setBookings([...bookings, updatedBooking]);
          resetForm();
        })
        .catch((err) => console.error("data error!", err));
    })
    .catch((err) => console.error("create error!", err));
};

  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
    setNewBooking(booking);
  };

  const handleUpdateBooking = (e) => {
    e.preventDefault();
    axios
      .put(`/api/bookings/${editingBooking.id}`, newBooking)
      .then((response) => {
        setBookings(
          bookings.map((booking) =>
            booking.id === editingBooking.id ? response.data : booking
          )
        );
        resetForm();
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteBooking = (id) => {
    axios
      .delete(`/api/bookings/${id}`)
      .then(() => setBookings(bookings.filter((booking) => booking.id !== id)))
      .catch((err) => console.error(err));
  };

  const resetForm = () => {
    setEditingBooking(null);
    setNewBooking({
      client_id: "",
      tour_id: "",
      booking_date: "",
      status: "Pending",
    });
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="editing-heading">{editingBooking ? "Update booking" : "Add booking"}</h2>
        <form onSubmit={editingBooking ? handleUpdateBooking : handleCreateBooking}>
          <div className="input-group">
            <label>Client</label>
            <select
              name="client_id"
              value={newBooking.client_id}
              onChange={handleInputChange}
            >
              <option value="">Choose a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.email}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Tour</label>
            <select
              name="tour_id"
              value={newBooking.tour_id}
              onChange={handleInputChange}
            >
              <option value="">Choose a tour</option>
              {tours.map((tour) => (
                <option key={tour.id} value={tour.id}>
                  {tour.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Booking date</label>
            <input
              type="date"
              name="booking_date"
              value={newBooking.booking_date}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Status</label>
            <select
              name="status"
              value={newBooking.status}
              onChange={handleInputChange}
            >
              <option value="Pending">Pending</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">
            {editingBooking ? "Update booking" : "Add booking"}
          </button>
        </form>
      </div>

      <div className="main-table">
        <div style={{ overflowX: "auto", overflowY: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Tour</th>
                <th>Booking date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.ClientBooking ? booking.ClientBooking.email : "N/A"}</td>
                  <td>{booking.TourBooking ? booking.TourBooking.name : "N/A"}</td>
                  <td>{formatDate(booking.booking_date)}</td>
                  <td>{["Pending", "pending"].includes(booking.status) ? "Pending" : booking.status}</td>
                  <td className="action-buttons">
                    <button
                      className="action-btn"
                      onClick={() => handleEditBooking(booking)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => handleDeleteBooking(booking.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
