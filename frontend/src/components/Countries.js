import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState({
    name: "",
    currency_code: "",
    language_code: "",
    region_code: "",
  });
  const [editingCountry, setEditingCountry] = useState(null);

  
  function decodeUnicode(str) {
    return str.replace(/\\u([\dA-F]{4})/gi, (match, grp) => {
      return String.fromCharCode(parseInt(grp, 16));
    });
  }

  useEffect(() => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCountry({
      ...newCountry,
      [name]: value,
    });
  };

  const handleCreateCountry = (e) => {
    e.preventDefault();
    axios
      .post("/api/countries_create", newCountry)
      .then((response) => {
        setCountries([...countries, response.data]);
        resetForm();
      })
      .catch((err) => console.error(err));
  };

  const handleEditCountry = (country) => {
    setEditingCountry(country);
    setNewCountry(country);
  };

  const handleUpdateCountry = (e) => {
    e.preventDefault();
    axios
      .put(`/api/countries_put${editingCountry.id}`, newCountry)
      .then((response) => {
        setCountries(
          countries.map((country) =>
            country.id === editingCountry.id ? response.data : country
          )
        );
        resetForm();
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteCountry = (id) => {
    axios
      .delete(`/api/countries_del${id}`)
      .then(() => setCountries(countries.filter((country) => country.id !== id)))
      .catch((err) => console.error(err));
  };

  const resetForm = () => {
    setEditingCountry(null);
    setNewCountry({
      name: "",
      currency_code: "",
      language_code: "",
      region_code: "",
    });
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="editing-heading">{editingCountry ? "Update country" : "Add country"}</h2>
        <form onSubmit={editingCountry ? handleUpdateCountry : handleCreateCountry}>
          <div className="input-group">
            <label>Country name</label>
            <input
              type="text"
              name="name"
              value={newCountry.name}
              placeholder="Country name"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Currency code</label>
            <input
              type="text"
              name="currency_code"
              value={newCountry.currency_code}
              placeholder="Currency code"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Language code</label>
            <input
              type="text"
              name="language_code"
              value={newCountry.language_code}
              placeholder="Language code"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Region code</label>
            <input
              type="text"
              name="region_code"
              value={newCountry.region_code}
              placeholder="Region code"
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            {editingCountry ? "Update country" : "Add country"}
          </button>
        </form>
      </div>

      <div className="main-table">
        <div style={{ overflowX: "auto", overflowY: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Country name</th>
                <th>Currency code</th>
                <th>Language code</th>
                <th>Region code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => (
                <tr key={country.id}>
                  <td>{country.name}</td>
                  <td>{country.currency_code}</td>
                  <td>{country.language_code}</td>
                  <td>{country.region_code}</td>
                  <td className="action-buttons">
                    <button
                      className="action-btn"
                      onClick={() => handleEditCountry(country)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => handleDeleteCountry(country.id)}
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

export default Countries;
