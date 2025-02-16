# Tourism Company Web Application

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)

A full-stack web application for managing tours, bookings, and user interactions. Built with **ReactJS**, **Node.js**, **ExpressJS**, and **PostgreSQL**, this project focuses on functionality rather than security, as it was developed for a practical academy project.

---

## **Features**

### **Frontend (ReactJS + Bootstrap)**
- **User Authentication**: Simple login and registration system.
- **Admin Dashboard**: Admins can manage clients, bookings, countries, and tours.
- **Client Page**: Users can book available tours.
- **Home Page**: Redirects to the login page if the user is not logged in.

### **Backend (Node.js + ExpressJS + PostgreSQL)**
- **REST API**: Interact with the backend using tools like Postman.
- **Admin Check**: Users are verified as admins before accessing the dashboard.
- **Database**: Managed with **Sequelize ORM** for tours, bookings, and users.

---

## **Getting Started**
1. Clone the repository.
   ```bash
   git clone https://github.com/PhillMckinnon/tourism-project
   cd tourism-project
   ```
2. Install dependencies:
   ```bash
   cd backend && npm install
   cd -
   cd frontend && npm install
   ```
3. Set up the PostgreSQL database `full_database.sql` and update `db.js`, `.env`.
4. Run migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```
5. Start the frontend and backend servers:
   ```bash
   cd backend && npm start
   cd frontend && npm start
   ```

---

## **Note**
This project does not implement token-based security. Admins are verified by checking their role, and users are redirected to the login page if not authenticated. The backend can be interacted with directly via tools like Postman.
