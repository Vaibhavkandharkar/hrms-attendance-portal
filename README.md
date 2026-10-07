# 🏢 Enterprise HRMS & Attendance Portal

A full-stack Human Resource Management System (HRMS) built with a modern **Angular (Standalone Components)** frontend and a **.NET 8 Web API** backend. Designed with an eye-friendly dark theme, enterprise-grade architecture, and built-in Excel processing for attendance management.

---

## 🚀 Tech Stack

### Frontend (`hrms-client`)
* **Framework:** Angular (v18+) with Standalone Components
* **Styling:** Custom eye-friendly dark mode UI (`#0b0f19` / `#111827`)
* **Routing & HTTP:** Angular Router, `HttpClient` for RESTful API integration

### Backend (`HrmsApi`)
* **Framework:** .NET 8 Web API
* **Database & ORM:** SQL Server with Entity Framework Core
* **Excel Processing:** **ClosedXML** for dynamic `.xlsx` template generation and file stream parsing
* **Security & Configuration:** CORS configured for local development (`http://localhost:4200`)

---

## 📂 Project Structure

This project follows a clean **Monorepo** structure, housing both the client application and server API in a single repository:

```text
hrmsproject/
│
├── hrms-client/          # Angular Frontend Application
│   ├── src/app/
│   │   ├── components/   # Standalone components (Login, Attendance)
│   │   └── services/     # API communication services
│   └── angular.json
│
├── HrmsApi/              # .NET 8 Web API Backend
│   ├── Controllers/      # AuthController, AttendanceController
│   ├── Program.cs        # Middleware & Service configuration
│   └── HrmsApi.csproj
│
└── README.md             # Project Documentation
