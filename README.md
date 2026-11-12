# JobPulse 💼
> **Modern Job Board & Applicant Tracking System (ATS)**
> Enables administrators/recruiters to post and manage job openings and candidate hiring pipelines, while allowing job seekers to discover openings, apply with resumes, and track their applications in real-time.

---

## 🌟 Key Features

### 👤 1. Candidate / Job Seeker Experience
* **Job Discovery & Search**: Instant keyword search (job titles, technical skills like `React`, `Python`, `AWS`), with multi-select filters for Department, Workplace (Remote, Hybrid, On-site), and Employment Type (Full-time, Contract, etc.).
* **Job Detail View**: Comprehensive position specs, requirements, perks & benefits, salary ranges, and company overview.
* **Streamlined Application**: Submit full name, email, phone, LinkedIn/GitHub links, years of experience, cover note, and upload or paste resume.
* **Live "My Applications" Stepper**: Track application progress through visual hiring stages:
  $$\text{Submitted} \longrightarrow \text{Under Review} \longrightarrow \text{Interview Scheduled} \longrightarrow \text{Offer Extended / Hired}$$
* **Hiring Team Feedback**: View feedback notes left by recruiters for submitted applications.

---

### 🛡️ 2. Admin / Recruiter Experience
* **Recruitment Dashboard**: Real-time metrics tracking:
  * Total Active Openings
  * Total Received Applications
  * Candidates in Screening & Review
  * Candidates in Interview Stages
  * Offers Extended & Hires
  * Openings distribution by department
* **Job Openings Management**:
  * Post new positions with custom requirements, benefits, salary brackets, and skill tags.
  * Edit active job listings.
  * Toggle job status (`Active`, `Draft`, `Closed`).
  * Remove or archive openings.
* **Candidate Pipeline (Kanban ATS)**:
  * 6-column pipeline: `New / Applied`, `Under Review`, `Interviewing`, `Offer Extended`, `Hired`, `Not Selected`.
  * Filter candidate pipeline by specific job openings.
  * **Candidate Review Drawer**:
    * Review contact details, LinkedIn, and portfolio links.
    * Inspect full resume and cover note.
    * Rate candidate from 1 to 5 stars ($★$).
    * Update candidate stage with automatic candidate tracker sync.
    * Record internal recruiter notes and interview feedback.

---

## 🚀 Quick Start

### 1. Launch with One Click
Double-click `start.bat` (or run `./start.ps1` in PowerShell).

### 2. Manual Command Line
Using the installed Python runtime:
```powershell
& "C:\Program Files\QGIS 3.44.3\apps\Python312\python.exe" server.py
```
Or if Python is in your PATH:
```bash
python server.py
```

Open your browser to:
```
http://localhost:8000
```

---

## 🛠️ Architecture & Tech Stack

* **Zero External Dependencies**: Built with Python 3's native standard library (`http.server`, `sqlite3`, `json`, `urllib`).
* **Persistent SQLite Database (`jobs.db`)**:
  * Automatic schema creation and pre-seeded sample data (5 realistic job openings and 4 candidates across diverse hiring stages).
  * Foreign key cascading delete ensures data integrity.
* **Modern Frontend**: Single-page application built with clean HTML5, custom responsive CSS (Tailwind/glassmorphic aesthetics), and asynchronous Vanilla JS.
* **Instant Role Switcher**: Switch effortlessly between the **Candidate Portal** and **Recruiter ATS** via the top header toggle.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/jobs` | List active job openings (supports `search`, `department`, `location_type`, `employment_type`) |
| `GET` | `/api/jobs/<id>` | Fetch detailed job specifications (+ applicants if `admin=true`) |
| `POST` | `/api/jobs` | Post new job opening (Admin) |
| `PUT` | `/api/jobs/<id>` | Update job details or toggle status (Admin) |
| `DELETE` | `/api/jobs/<id>` | Delete job listing (Admin) |
| `POST` | `/api/jobs/<id>/apply` | Candidate submits job application |
| `GET` | `/api/applications` | Query applications by candidate email or view all (Admin) |
| `PUT` | `/api/applications/<id>/status` | Update candidate stage, rating, and recruiter notes (Admin) |
| `GET` | `/api/stats` | Aggregated ATS dashboard metrics |
| `POST` | `/api/reset-demo` | Reset database to clean sample dataset |

