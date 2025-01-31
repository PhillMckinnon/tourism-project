import React, { useState, useEffect } from "react";
import axios from "axios";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    is_admin: false,
  });
  const [editingClient, setEditingClient] = useState(null);

  useEffect(() => {
    axios
      .get("/api/clients")
      .then((response) => setClients(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewClient({
      ...newClient,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCreateClient = (e) => {
    e.preventDefault();
    axios
      .post("/api/clients_create", newClient)
      .then((response) => {
        setClients([...clients, response.data]);
        resetForm();
      })
      .catch((err) => console.error(err));
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setNewClient({
      ...client,
      password: "", 
    });
  };

  const handleUpdateClient = (e) => {
    e.preventDefault();
    axios
      .put(`/api/clients_put${editingClient.id}`, newClient)
      .then((response) => {
        setClients(
          clients.map((client) =>
            client.id === editingClient.id ? response.data : client
          )
        );
        resetForm();
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteClient = (id) => {
    axios
      .delete(`/api/clients_del${id}`)
      .then(() => setClients(clients.filter((client) => client.id !== id)))
      .catch((err) => console.error(err));
  };

  const resetForm = () => {
    setEditingClient(null);
    setNewClient({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      is_admin: false,
    });
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="editing-heading">{editingClient ? "Редактировать клиента" : "Добавить клиента"}</h2>
        <form onSubmit={editingClient ? handleUpdateClient : handleCreateClient}>
          <div className="input-group">
            <label>Имя</label>
            <input
              type="text"
              name="first_name"
              value={newClient.first_name}
              placeholder="Введите имя"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Фамилия</label>
            <input
              type="text"
              name="last_name"
              value={newClient.last_name}
              placeholder="Введите фамилию"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Почта</label>
            <input
              type="email"
              name="email"
              value={newClient.email}
              placeholder="Введите почту"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Телефон</label>
            <input
              type="text"
              name="phone"
              value={newClient.phone}
              placeholder="Введите номер телефона"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={newClient.password}
              placeholder="Введите пароль"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-check form-switch">
            <label className="form-check-label">
              <input className="form-check-input"
                id="adminSwitch"
                type="checkbox"
                name="is_admin"
                checked={newClient.is_admin}
                onChange={handleInputChange}
              />
              Админ
            </label>
          </div>
         

          <button type="submit" className="submit-btn">
            {editingClient ? "Обновить клиента" : "Добавить клиента"}
          </button>
        </form>
      </div>

      <div className="main-table">
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Почта</th>
                <th>Номер телефона</th>
                <th>Пароль</th>
                <th>Является админом</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.first_name}</td>
                  <td>{client.last_name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>Скрыт</td>
                  <td>{client.is_admin ? "Да" : "Нет"}</td>
                  <td className="action-buttons">
                    <button
                      className="action-btn"
                      onClick={() => handleEditClient(client)}
                    >
                      Редактировать
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => handleDeleteClient(client.id)}
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

export default Clients;
