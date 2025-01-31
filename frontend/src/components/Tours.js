import React, { useState, useEffect } from "react";
import axios from "axios";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [newTour, setNewTour] = useState({
    country_id: "",
    name: "",
    description: "",
    price: "",
    departure_date: "",
    return_date: "",
    available: true,
  });
  const [editingTour, setEditingTour] = useState(null);
  const [countries, setCountries] = useState([]); 
  function decodeUnicode(str) {
    return str.replace(/\\u([\dA-F]{4})/gi, (match, grp) => {
      return String.fromCharCode(parseInt(grp, 16));
    });
  }
  useEffect(() => {
    axios
      .get("/api/tours")
      .then((response) => {
        setTours(response.data);
      })
      .catch((err) => console.error(err));
    axios
      .get("/api/countries")
      .then((response) => {
        const decodedCountries = response.data.map((country) => ({
          ...country,
          name: decodeUnicode(country.name), 
        }));
        setCountries(decodedCountries);
      })
      .catch((err) => console.error(err));
  }, []);
  const formatDate = (date) => {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString('en-GB', options); // DD/MM/YYYY
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTour({
      ...newTour,
      [name]: value,
    });
  };
  const handleCreateTour = (e) => {
    e.preventDefault();
    axios
      .post("/api/tours", newTour)
      .then((response) => {
        setTours([...tours, response.data]);
        resetForm();
      })
      .catch((err) => console.error(err));
  };

  const handleEditTour = (tour) => {
    setEditingTour(tour);
    setNewTour(tour);
  };

  const handleUpdateTour = (e) => {
    e.preventDefault();
    axios
      .put(`/api/tours/${editingTour.id}`, newTour)
      .then((response) => {
        setTours(
          tours.map((tour) => (tour.id === editingTour.id ? response.data : tour))
        );
        resetForm();
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteTour = (id) => {
    axios
      .delete(`/api/tours/${id}`)
      .then(() => setTours(tours.filter((tour) => tour.id !== id)))
      .catch((err) => console.error(err));
  };

  const resetForm = () => {
    setEditingTour(null);
    setNewTour({
      country_id: "",
      name: "",
      description: "",
      price: "",
      departure_date: "",
      return_date: "",
      available: true,
    });
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="editing-heading">{editingTour ? "Редактировать тур" : "Добавить тур"}</h2>
        <form onSubmit={editingTour ? handleUpdateTour : handleCreateTour}>
          <div className="input-group">
            <label>Название тура</label>
            <input
              type="text"
              name="name"
              value={newTour.name}
              placeholder="Введите имя тура"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Описание</label>
            <input
              type="text"
              name="description"
              value={newTour.description}
              placeholder="Введите описание"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Цена</label>
            <input
              type="number"
              name="price"
              value={newTour.price}
              placeholder="Введите цену"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Дата отправления</label>
            <input
              type="date"
              name="departure_date"
              value={newTour.departure_date}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Дата возвращения</label>
            <input
              type="date"
              name="return_date"
              value={newTour.return_date}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Доступен?</label>
            <select
              name="available"
              value={newTour.available}
              onChange={handleInputChange}
            >
              <option value={true}>Доступен</option>
              <option value={false}>Не доступен</option>
            </select>
          </div>
          <div className="input-group">
            <label>Страна</label>
            <select
              name="country_id"
              value={newTour.country_id}
              onChange={handleInputChange}
            >
              <option value="">Выберите страну</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-btn">
            {editingTour ? "Обновить тур" : "Добавить тур"}
          </button>
        </form>
      </div>

      <div className="main-table">
        <div style={{ overflowX: "auto", overflowY: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Название тура</th>
                <th>Страна</th>
                <th>Цена</th>
                <th>Дата отправления</th>
                <th>Дата возвращения</th>
                <th>Доступен?</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour.id}>
                  <td>{tour.name}</td>
                  <td>{tour.country_id && countries.find(c => c.id === tour.country_id)?.name || "N/A"}</td>
                  <td>{tour.price}</td>
                  <td>{formatDate(tour.departure_date)}</td>
                  <td>{formatDate(tour.return_date)}</td>
                  <td>{tour.available ? "Да" : "Нет"}</td>
                  <td className="action-buttons">
                    <button
                      className="action-btn"
                      onClick={() => handleEditTour(tour)}
                    >
                      Редактировать
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => handleDeleteTour(tour.id)}
                    >
                      Удалить
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

export default Tours;
