"""
Database layer for JobPulse Job Board & Applicant Tracking System.
Uses SQLite for robust local data persistence with zero external dependencies.
"""

import os
import sys
import json

# Configure SQLite DLL lookup on Windows if necessary
if sys.platform == "win32" and hasattr(os, "add_dll_directory"):
    candidates = [
        r"C:\Program Files\QGIS 3.44.3\bin",
        r"C:\Program Files\QGIS 3.44.3\apps\Python312\DLLs",
        r"C:\Program Files\QGIS 3.44.3\apps\Python312"
    ]
    for p in candidates:
        if os.path.exists(p):
            try:
                os.add_dll_directory(p)
            except Exception:
                pass

import sqlite3
from datetime import datetime


def get_db_connection(db_path="jobs.db"):
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    # Enable foreign keys
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db(db_path="jobs.db"):
    conn = get_db_connection(db_path)
    c = conn.cursor()

    c.execute("""
    CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        company TEXT NOT NULL DEFAULT 'TechCorp Global',
        department TEXT NOT NULL,
        location_type TEXT NOT NULL,
        location TEXT NOT NULL,
        employment_type TEXT NOT NULL,
        experience_level TEXT NOT NULL,
        salary_min INTEGER,
        salary_max INTEGER,
        salary_currency TEXT DEFAULT 'USD',
        description TEXT NOT NULL,
        requirements TEXT NOT NULL,
        benefits TEXT NOT NULL,
        tags TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
    )
    """)

    c.execute("""
    CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        job_id INTEGER NOT NULL,
        candidate_name TEXT NOT NULL,
        candidate_email TEXT NOT NULL,
        candidate_phone TEXT,
        linkedin_url TEXT,
        portfolio_url TEXT,
        experience_years REAL DEFAULT 0,
        cover_letter TEXT,
        resume_filename TEXT,
        resume_content TEXT,
        status TEXT NOT NULL DEFAULT 'submitted',
        recruiter_notes TEXT,
        rating INTEGER DEFAULT 0,
        applied_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
    )
    """)

    conn.commit()

    # Check if empty, seed initial data
    c.execute("SELECT COUNT(*) FROM jobs")
    if c.fetchone()[0] == 0:
        seed_data(conn)
    else:
        conn.close()


def seed_data(conn):
    c = conn.cursor()
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    sample_jobs = [
        (
            "Senior Full-Stack Engineer",
            "TechCorp Global",
            "Engineering",
            "Remote",
            "Remote (US / Europe)",
            "Full-time",
            "Senior Level",
            140000,
            185000,
            "USD",
            "We are seeking an experienced Senior Full-Stack Engineer to lead development on our core cloud platform. You will architect scalable microservices, optimize high-throughput distributed systems, and build beautiful, intuitive user interfaces that empower thousands of customers every day.",
            json.dumps([
                "5+ years building production full-stack web applications",
                "Proficiency in modern JavaScript/TypeScript (React, Next.js or Vue) and backend languages (Python, Go, or Node.js)",
                "Solid understanding of relational and NoSQL databases (PostgreSQL, Redis)",
                "Experience with Docker, Kubernetes, and AWS or GCP cloud infrastructure",
                "Proven track record of mentoring junior engineers and leading code reviews"
            ]),
            json.dumps([
                "Competitive salary & equity package",
                "100% company-paid health, dental, and vision insurance",
                "Flexible 401(k) retirement plan with 5% employer match",
                "$2,500 annual home office setup budget",
                "Unlimited paid time off (PTO) with mandatory minimums"
            ]),
            json.dumps(["React", "Python", "Cloud Architecture", "PostgreSQL", "Docker"]),
            "active",
            now,
            now
        ),
        (
            "Staff Product Designer (UI/UX)",
            "TechCorp Global",
            "Design",
            "Hybrid",
            "San Francisco, CA (Hybrid)",
            "Full-time",
            "Senior Level",
            130000,
            165000,
            "USD",
            "As our Staff Product Designer, you will shape the overall end-to-end product design vision for our flagship products. You will partner closely with engineering, product leadership, and researchers to craft world-class enterprise workflows that users love.",
            json.dumps([
                "6+ years of UX/UI product design experience for complex SaaS software",
                "Mastery of Figma, design systems, interactive prototyping, and user journey mapping",
                "Strong portfolio showcasing user research, problem framing, and elegant interfaces",
                "Experience working within agile software squads and design system governance",
                "Excellent storytelling, presentation, and cross-functional leadership skills"
            ]),
            json.dumps([
                "Top-tier compensation and equity grant",
                "Comprehensive medical, dental, and vision coverage",
                "Annual $3,000 professional learning & conference stipend",
                "Catered lunches and wellness perks in our SF office",
                "Flexible hybrid schedule (2 days in office)"
            ]),
            json.dumps(["Figma", "Design Systems", "User Research", "Prototyping", "SaaS UX"]),
            "active",
            now,
            now
        ),
        (
            "Technical Product Manager",
            "TechCorp Global",
            "Product",
            "Remote",
            "Remote - Anywhere",
            "Full-time",
            "Mid-Senior Level",
            120000,
            155000,
            "USD",
            "Join our rapidly scaling platform team as a Technical Product Manager. You will define the roadmap for our public APIs, developer integrations, and webhooks platform, translating complex technical capabilities into clear, high-impact features.",
            json.dumps([
                "3-5 years product management experience for technical or developer-facing products",
                "Strong engineering background or computer science degree preferred",
                "Demonstrated ability to drive roadmap from discovery through delivery",
                "Comfortable with API specs (REST/GraphQL), technical documentation, and SQL queries",
                "Customer-centric mindset with data-informed decision making"
            ]),
            json.dumps([
                "Competitive base salary + performance bonuses",
                "Remote-first work culture with flexible working hours",
                "Comprehensive healthcare coverage for you and dependents",
                "Annual international company retreat",
                "Generous parental leave policy (16 weeks paid)"
            ]),
            json.dumps(["Product Roadmap", "REST APIs", "Agile/Scrum", "SQL", "Developer Experience"]),
            "active",
            now,
            now
        ),
        (
            "DevOps & Cloud Infrastructure Engineer",
            "TechCorp Global",
            "Engineering",
            "On-site",
            "New York, NY",
            "Full-time",
            "Mid-Level",
            125000,
            160000,
            "USD",
            "We are looking for a DevOps & Cloud Infrastructure Engineer to scale our automated CI/CD pipelines, ensure 99.99% system availability, and enforce robust security and monitoring across our multi-cloud deployment.",
            json.dumps([
                "3+ years managing AWS/GCP infrastructure with Infrastructure as Code (Terraform)",
                "Strong container orchestration experience with Kubernetes (EKS / GKE)",
                "Hands-on experience with CI/CD tools (GitHub Actions, GitLab CI, ArgoCD)",
                "Monitoring and telemetry with Prometheus, Grafana, and Datadog",
                "Scripting experience with Python, Bash, or Go"
            ]),
            json.dumps([
                "Competitive salary + annual bonus plan",
                "Commuter subsidy and transit pass reimbursement",
                "Full health insurance, life, and disability plans",
                "401(k) matching",
                "State-of-the-art hardware (M-series MacBook Pro + dual monitors)"
            ]),
            json.dumps(["AWS", "Kubernetes", "Terraform", "CI/CD", "Prometheus"]),
            "active",
            now,
            now
        ),
        (
            "Growth Marketing & Content Strategist",
            "TechCorp Global",
            "Marketing",
            "Hybrid",
            "Austin, TX",
            "Full-time",
            "Mid-Level",
            90000,
            120000,
            "USD",
            "Lead our outbound acquisition, technical content marketing, and inbound demand generation. You will craft compelling case studies, orchestrate multi-channel campaign launches, and collaborate with sales to drive pipeline growth.",
            json.dumps([
                "3+ years of B2B SaaS growth marketing or content strategy experience",
                "Proven ability to create high-performing blog content, whitepapers, and landing pages",
                "Familiarity with SEO tools (Ahrefs, Semrush) and Google Analytics 4",
                "Experience with email marketing automation (HubSpot, Marketo, Customer.io)",
                "Excellent written and verbal communication skills"
            ]),
            json.dumps([
                "Competitive base compensation + quarterly performance incentives",
                "Comprehensive health, dental, and vision benefits",
                "Wellness stipend and monthly gym membership allowance",
                "Downtown Austin modern workspace with rooftop patio",
                "Flexible PTO policy"
            ]),
            json.dumps(["B2B SaaS", "Content Strategy", "SEO", "HubSpot", "Demand Gen"]),
            "active",
            now,
            now
        )
    ]

    c.executemany("""
    INSERT INTO jobs (
        title, company, department, location_type, location,
        employment_type, experience_level, salary_min, salary_max,
        salary_currency, description, requirements, benefits, tags,
        status, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, sample_jobs)

    conn.commit()

    # Seed sample candidates
    sample_candidates = [
        (
            1, # Senior Full-Stack Engineer
            "Alex Rivera",
            "alex.rivera.dev@example.com",
            "+1 (555) 234-5678",
            "https://linkedin.com/in/alexrivera-mock",
            "https://github.com/alexrivera-mock",
            6.5,
            "I have spent the last 6 years building distributed React and Python platforms for high-growth tech companies. I'm excited by TechCorp's mission and would love to contribute to your core microservices architecture.",
            "Alex_Rivera_Senior_FullStack_Resume.pdf",
            "Alex Rivera - Senior Full Stack Engineer. 6+ years experience in React, Python, PostgreSQL, AWS, Docker. Built event-driven architectures serving 2M daily active users. Led squad of 5 engineers.",
            "interview",
            "Passed initial recruiter phone screen and technical coding round with high marks. Next step: System Architecture interview scheduled for Thursday 2 PM.",
            5,
            "2026-11-09 10:15:00",
            now
        ),
        (
            2, # Staff Product Designer
            "Jordan Chen",
            "jordan.chen.design@example.com",
            "+1 (555) 345-6789",
            "https://linkedin.com/in/jordanchen-ux",
            "https://jordanchen.portfolio.mock",
            7.0,
            "I specialize in enterprise SaaS design systems and complex data-dense interfaces. Your recent product launch caught my attention, and I'd love to help craft the next generation of TechCorp workflows.",
            "Jordan_Chen_Design_Resume.pdf",
            "Jordan Chen - Staff Product Designer. 7 years experience designing multi-tenant enterprise software, component design systems, and conducting qualitative user research sessions with Fortune 500 stakeholders.",
            "under_review",
            "Portfolio reviewed by Design Director. High visual fidelity and structured design system thinking. Scheduling 30-min discovery call.",
            4,
            "2026-11-10 14:30:00",
            now
        ),
        (
            3, # Technical Product Manager
            "Morgan Taylor",
            "morgan.taylor.pm@example.com",
            "+1 (555) 456-7890",
            "https://linkedin.com/in/morgantaylor-pm",
            "https://morgantaylor.dev",
            5.0,
            "With an engineering background and 5 years leading developer tooling products, I bridge technical depth and business impact seamlessly. Let's build the future of API platforms together.",
            "Morgan_Taylor_TPM_Resume.pdf",
            "Morgan Taylor - Technical Product Manager. Led API Platform team of 12 engineers. Grew third-party integrations by 180% year-over-year. CS degree from UC Berkeley.",
            "offer",
            "All rounds cleared unanimously. Sent official offer letter ($150,000 base + equity). Awaiting candidate signing by end of the week.",
            5,
            "2026-11-07 09:00:00",
            now
        ),
        (
            1, # Senior Full-Stack Engineer
            "Samira Khan",
            "samira.khan.tech@example.com",
            "+1 (555) 567-8901",
            "https://linkedin.com/in/samirakhan-mock",
            "https://samirakhan.dev",
            4.0,
            "Passionate full-stack developer with deep experience in TypeScript, React, and Python FastAPI. Ready to hit the ground running on full-stack feature delivery.",
            "Samira_Khan_CV.pdf",
            "Samira Khan - Full Stack Engineer. 4 years experience in modern web technologies, automated testing, and CI/CD pipelines.",
            "submitted",
            "New applicant from referral link. Resume looks aligned with requirement checklist.",
            3,
            "2026-11-12 08:20:00",
            now
        )
    ]

    c.executemany("""
    INSERT INTO applications (
        job_id, candidate_name, candidate_email, candidate_phone,
        linkedin_url, portfolio_url, experience_years, cover_letter,
        resume_filename, resume_content, status, recruiter_notes,
        rating, applied_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, sample_candidates)

    conn.commit()
    conn.close()
    print("Database initialized and sample data seeded successfully.")


# Database helper functions
def list_jobs(filters=None, include_counts=True):
    filters = filters or {}
    conn = get_db_connection()
    c = conn.cursor()

    query = """
    SELECT j.*,
           COUNT(a.id) as applicant_count
    FROM jobs j
    LEFT JOIN applications a ON j.id = a.job_id
    WHERE 1=1
    """
    params = []

    if filters.get("status"):
        query += " AND j.status = ?"
        params.append(filters["status"])
    elif not filters.get("admin"):
        # For public candidates, only show active jobs
        query += " AND j.status = 'active'"

    if filters.get("department"):
        query += " AND LOWER(j.department) = LOWER(?)"
        params.append(filters["department"])

    if filters.get("location_type"):
        query += " AND LOWER(j.location_type) = LOWER(?)"
        params.append(filters["location_type"])

    if filters.get("employment_type"):
        query += " AND LOWER(j.employment_type) = LOWER(?)"
        params.append(filters["employment_type"])

    if filters.get("search"):
        search_term = f"%{filters['search'].strip()}%"
        query += " AND (j.title LIKE ? OR j.description LIKE ? OR j.tags LIKE ? OR j.location LIKE ?)"
        params.extend([search_term, search_term, search_term, search_term])

    query += " GROUP BY j.id ORDER BY j.created_at DESC"

    rows = c.execute(query, params).fetchall()
    jobs = []
    for row in rows:
        job = dict(row)
        job["requirements"] = json.loads(job["requirements"]) if job["requirements"] else []
        job["benefits"] = json.loads(job["benefits"]) if job["benefits"] else []
        job["tags"] = json.loads(job["tags"]) if job["tags"] and job["tags"].startswith("[") else [t.strip() for t in job["tags"].split(",") if t.strip()]
        jobs.append(job)

    conn.close()
    return jobs


def get_job(job_id, include_applicants=False):
    conn = get_db_connection()
    c = conn.cursor()

    row = c.execute("""
    SELECT j.*, COUNT(a.id) as applicant_count
    FROM jobs j
    LEFT JOIN applications a ON j.id = a.job_id
    WHERE j.id = ?
    GROUP BY j.id
    """, (job_id,)).fetchone()

    if not row:
        conn.close()
        return None

    job = dict(row)
    job["requirements"] = json.loads(job["requirements"]) if job["requirements"] else []
    job["benefits"] = json.loads(job["benefits"]) if job["benefits"] else []
    job["tags"] = json.loads(job["tags"]) if job["tags"] and job["tags"].startswith("[") else [t.strip() for t in job["tags"].split(",") if t.strip()]

    if include_applicants:
        apps = c.execute("""
        SELECT * FROM applications WHERE job_id = ? ORDER BY applied_at DESC
        """, (job_id,)).fetchall()
        job["applicants"] = [dict(a) for a in apps]

    conn.close()
    return job


def create_job(data):
    conn = get_db_connection()
    c = conn.cursor()
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    requirements = data.get("requirements", [])
    if isinstance(requirements, list):
        req_json = json.dumps(requirements)
    else:
        req_json = json.dumps([r.strip() for r in str(requirements).split("\n") if r.strip()])

    benefits = data.get("benefits", [])
    if isinstance(benefits, list):
        ben_json = json.dumps(benefits)
    else:
        ben_json = json.dumps([b.strip() for b in str(benefits).split("\n") if b.strip()])

    tags = data.get("tags", [])
    if isinstance(tags, list):
        tag_json = json.dumps(tags)
    else:
        tag_json = json.dumps([t.strip() for t in str(tags).split(",") if t.strip()])

    c.execute("""
    INSERT INTO jobs (
        title, company, department, location_type, location,
        employment_type, experience_level, salary_min, salary_max,
        salary_currency, description, requirements, benefits, tags,
        status, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data.get("title", "").strip(),
        data.get("company", "TechCorp Global").strip(),
        data.get("department", "Engineering").strip(),
        data.get("location_type", "Remote").strip(),
        data.get("location", "Remote").strip(),
        data.get("employment_type", "Full-time").strip(),
        data.get("experience_level", "Mid-Level").strip(),
        int(data.get("salary_min", 0) or 0),
        int(data.get("salary_max", 0) or 0),
        data.get("salary_currency", "USD").strip(),
        data.get("description", "").strip(),
        req_json,
        ben_json,
        tag_json,
        data.get("status", "active"),
        now,
        now
    ))
    new_id = c.lastrowid
    conn.commit()
    conn.close()
    return get_job(new_id)


def update_job(job_id, data):
    conn = get_db_connection()
    c = conn.cursor()
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    existing = c.execute("SELECT id FROM jobs WHERE id = ?", (job_id,)).fetchone()
    if not existing:
        conn.close()
        return None

    fields = []
    params = []

    for key in ["title", "company", "department", "location_type", "location",
                "employment_type", "experience_level", "status", "description"]:
        if key in data:
            fields.append(f"{key} = ?")
            params.append(str(data[key]).strip())

    for key in ["salary_min", "salary_max"]:
        if key in data:
            fields.append(f"{key} = ?")
            params.append(int(data[key] or 0))

    if "requirements" in data:
        req = data["requirements"]
        val = json.dumps(req) if isinstance(req, list) else json.dumps([r.strip() for r in str(req).split("\n") if r.strip()])
        fields.append("requirements = ?")
        params.append(val)

    if "benefits" in data:
        ben = data["benefits"]
        val = json.dumps(ben) if isinstance(ben, list) else json.dumps([b.strip() for b in str(ben).split("\n") if b.strip()])
        fields.append("benefits = ?")
        params.append(val)

    if "tags" in data:
        tags = data["tags"]
        val = json.dumps(tags) if isinstance(tags, list) else json.dumps([t.strip() for t in str(tags).split(",") if t.strip()])
        fields.append("tags = ?")
        params.append(val)

    fields.append("updated_at = ?")
    params.append(now)
    params.append(job_id)

    query = f"UPDATE jobs SET {', '.join(fields)} WHERE id = ?"
    c.execute(query, params)
    conn.commit()
    conn.close()
    return get_job(job_id)


def delete_job(job_id):
    conn = get_db_connection()
    c = conn.cursor()
    c.execute("DELETE FROM jobs WHERE id = ?", (job_id,))
    deleted = c.rowcount > 0
    conn.commit()
    conn.close()
    return deleted


def create_application(job_id, data):
    conn = get_db_connection()
    c = conn.cursor()
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Check job exists and is active
    job = c.execute("SELECT id, title, status FROM jobs WHERE id = ?", (job_id,)).fetchone()
    if not job:
        conn.close()
        return None, "Job posting not found"
    if job["status"] != "active":
        conn.close()
        return None, "This job posting is no longer accepting applications"

    email = data.get("candidate_email", "").strip().lower()
    if not email:
        conn.close()
        return None, "Candidate email is required"

    # Check for existing application with same email for this job
    existing = c.execute(
        "SELECT id FROM applications WHERE job_id = ? AND LOWER(candidate_email) = ?",
        (job_id, email)
    ).fetchone()
    if existing:
        conn.close()
        return None, f"You have already submitted an application for this position ({job['title']})"

    c.execute("""
    INSERT INTO applications (
        job_id, candidate_name, candidate_email, candidate_phone,
        linkedin_url, portfolio_url, experience_years, cover_letter,
        resume_filename, resume_content, status, recruiter_notes,
        rating, applied_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'submitted', '', 0, ?, ?)
    """, (
        job_id,
        data.get("candidate_name", "").strip(),
        email,
        data.get("candidate_phone", "").strip(),
        data.get("linkedin_url", "").strip(),
        data.get("portfolio_url", "").strip(),
        float(data.get("experience_years", 0) or 0),
        data.get("cover_letter", "").strip(),
        data.get("resume_filename", "").strip(),
        data.get("resume_content", "").strip(),
        now,
        now
    ))
    new_app_id = c.lastrowid
    conn.commit()

    app_row = c.execute("SELECT * FROM applications WHERE id = ?", (new_app_id,)).fetchone()
    res = dict(app_row)
    conn.close()
    return res, None


def list_applications(filters=None):
    filters = filters or {}
    conn = get_db_connection()
    c = conn.cursor()

    query = """
    SELECT a.*, j.title as job_title, j.department as job_department,
           j.location as job_location, j.employment_type as job_employment_type
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE 1=1
    """
    params = []

    if filters.get("candidate_email"):
        query += " AND LOWER(a.candidate_email) = LOWER(?)"
        params.append(filters["candidate_email"].strip())

    if filters.get("job_id"):
        query += " AND a.job_id = ?"
        params.append(int(filters["job_id"]))

    if filters.get("status"):
        query += " AND a.status = ?"
        params.append(filters["status"])

    if filters.get("search"):
        term = f"%{filters['search'].strip()}%"
        query += " AND (a.candidate_name LIKE ? OR a.candidate_email LIKE ? OR j.title LIKE ?)"
        params.extend([term, term, term])

    query += " ORDER BY a.applied_at DESC"

    rows = c.execute(query, params).fetchall()
    apps = [dict(r) for r in rows]
    conn.close()
    return apps


def update_application_status(app_id, status=None, recruiter_notes=None, rating=None):
    conn = get_db_connection()
    c = conn.cursor()
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    existing = c.execute("SELECT id FROM applications WHERE id = ?", (app_id,)).fetchone()
    if not existing:
        conn.close()
        return None

    fields = []
    params = []

    if status:
        fields.append("status = ?")
        params.append(status)

    if recruiter_notes is not None:
        fields.append("recruiter_notes = ?")
        params.append(recruiter_notes)

    if rating is not None:
        fields.append("rating = ?")
        params.append(int(rating))

    fields.append("updated_at = ?")
    params.append(now)
    params.append(app_id)

    c.execute(f"UPDATE applications SET {', '.join(fields)} WHERE id = ?", params)
    conn.commit()

    updated = c.execute("""
    SELECT a.*, j.title as job_title, j.department as job_department
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE a.id = ?
    """, (app_id,)).fetchone()

    res = dict(updated) if updated else None
    conn.close()
    return res


def get_stats():
    conn = get_db_connection()
    c = conn.cursor()

    total_jobs = c.execute("SELECT COUNT(*) FROM jobs").fetchone()[0]
    active_jobs = c.execute("SELECT COUNT(*) FROM jobs WHERE status = 'active'").fetchone()[0]
    total_apps = c.execute("SELECT COUNT(*) FROM applications").fetchone()[0]
    in_review = c.execute("SELECT COUNT(*) FROM applications WHERE status IN ('submitted', 'under_review')").fetchone()[0]
    interviews = c.execute("SELECT COUNT(*) FROM applications WHERE status = 'interview'").fetchone()[0]
    offers = c.execute("SELECT COUNT(*) FROM applications WHERE status = 'offer'").fetchone()[0]
    hired = c.execute("SELECT COUNT(*) FROM applications WHERE status = 'hired'").fetchone()[0]
    rejected = c.execute("SELECT COUNT(*) FROM applications WHERE status = 'rejected'").fetchone()[0]

    # Department breakdown
    dept_rows = c.execute("""
    SELECT department, COUNT(id) as count FROM jobs GROUP BY department ORDER BY count DESC
    """).fetchall()
    depts = [dict(r) for r in dept_rows]

    # Recent applications
    recent_apps = c.execute("""
    SELECT a.id, a.candidate_name, a.candidate_email, a.status, a.applied_at, j.title as job_title
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    ORDER BY a.applied_at DESC LIMIT 5
    """).fetchall()

    conn.close()
    return {
        "total_jobs": total_jobs,
        "active_jobs": active_jobs,
        "total_applications": total_apps,
        "in_review": in_review,
        "interviews": interviews,
        "offers": offers,
        "hired": hired,
        "rejected": rejected,
        "departments": depts,
        "recent_applications": [dict(r) for r in recent_apps]
    }


def reset_database(db_path="jobs.db"):
    if os.path.exists(db_path):
        os.remove(db_path)
    init_db(db_path)
