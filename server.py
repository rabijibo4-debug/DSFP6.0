"""
JobPulse HTTP Server & REST API.
Built with Python's standard library (http.server).
Zero external dependencies required.
"""

import os
import sys
import json
import mimetypes
from urllib.parse import urlparse, parse_qs
from http.server import HTTPServer, BaseHTTPRequestHandler

# Import database module
import database

PORT = 8000
PUBLIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public")
UPLOADS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")

os.makedirs(PUBLIC_DIR, exist_ok=True)
os.makedirs(UPLOADS_DIR, exist_ok=True)


class JobPulseHandler(BaseHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and disable aggressive caching for API
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_HEAD(self):
        self.do_GET()

    def send_json(self, data, status=200):
        body = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_error_json(self, message, status=400):
        self.send_json({"error": message, "status": "error"}, status=status)

    def read_json_body(self):
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length == 0:
            return {}
        raw = self.rfile.read(content_length).decode("utf-8")
        try:
            return json.loads(raw)
        except json.JSONDecodeError:
            return {}

    # Router
    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")
        query = parse_qs(parsed.query)

        # Flatten query dict
        query_params = {k: v[0] for k, v in query.items() if v}

        # API Routes
        if path == "/api/jobs":
            is_admin = query_params.get("admin", "").lower() in ("true", "1", "yes")
            filters = {
                "admin": is_admin,
                "status": query_params.get("status"),
                "department": query_params.get("department"),
                "location_type": query_params.get("location_type"),
                "employment_type": query_params.get("employment_type"),
                "search": query_params.get("search")
            }
            jobs = database.list_jobs(filters)
            self.send_json({"jobs": jobs, "total": len(jobs)})
            return

        if path.startswith("/api/jobs/"):
            parts = path.split("/")
            if len(parts) == 4 and parts[3].isdigit():
                job_id = int(parts[3])
                is_admin = query_params.get("admin", "").lower() in ("true", "1", "yes")
                job = database.get_job(job_id, include_applicants=is_admin)
                if not job:
                    self.send_error_json("Job not found", 404)
                else:
                    self.send_json({"job": job})
                return

        if path == "/api/applications":
            filters = {
                "candidate_email": query_params.get("candidate_email"),
                "job_id": query_params.get("job_id"),
                "status": query_params.get("status"),
                "search": query_params.get("search")
            }
            apps = database.list_applications(filters)
            self.send_json({"applications": apps, "total": len(apps)})
            return

        if path == "/api/stats":
            stats = database.get_stats()
            self.send_json(stats)
            return

        # Static File Serving
        self.serve_static(parsed.path)

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")

        if path == "/api/jobs":
            data = self.read_json_body()
            if not data.get("title") or not data.get("description"):
                self.send_error_json("Title and description are required", 400)
                return
            new_job = database.create_job(data)
            self.send_json({"job": new_job, "message": "Job created successfully"}, 201)
            return

        if path.endswith("/apply") and path.startswith("/api/jobs/"):
            parts = path.split("/")
            if len(parts) == 5 and parts[3].isdigit():
                job_id = int(parts[3])
                data = self.read_json_body()
                if not data.get("candidate_name") or not data.get("candidate_email"):
                    self.send_error_json("Candidate name and email are required", 400)
                    return
                app, error = database.create_application(job_id, data)
                if error:
                    self.send_error_json(error, 400)
                else:
                    self.send_json({
                        "application": app,
                        "message": "Application submitted successfully! Our recruiting team has received your details."
                    }, 201)
                return

        if path == "/api/reset-demo":
            database.reset_database()
            self.send_json({"message": "Database reset to sample state successfully."})
            return

        self.send_error_json("Endpoint not found", 404)

    def do_PUT(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")

        if path.startswith("/api/jobs/"):
            parts = path.split("/")
            if len(parts) == 4 and parts[3].isdigit():
                job_id = int(parts[3])
                data = self.read_json_body()
                updated = database.update_job(job_id, data)
                if not updated:
                    self.send_error_json("Job not found", 404)
                else:
                    self.send_json({"job": updated, "message": "Job updated successfully"})
                return

        if path.startswith("/api/applications/") and path.endswith("/status"):
            parts = path.split("/")
            if len(parts) == 5 and parts[3].isdigit():
                app_id = int(parts[3])
                data = self.read_json_body()
                status = data.get("status")
                notes = data.get("recruiter_notes")
                rating = data.get("rating")
                updated = database.update_application_status(app_id, status=status, recruiter_notes=notes, rating=rating)
                if not updated:
                    self.send_error_json("Application not found", 404)
                else:
                    self.send_json({"application": updated, "message": "Application updated successfully"})
                return

        self.send_error_json("Endpoint not found", 404)

    def do_DELETE(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")

        if path.startswith("/api/jobs/"):
            parts = path.split("/")
            if len(parts) == 4 and parts[3].isdigit():
                job_id = int(parts[3])
                deleted = database.delete_job(job_id)
                if not deleted:
                    self.send_error_json("Job not found", 404)
                else:
                    self.send_json({"message": "Job deleted successfully"})
                return

        self.send_error_json("Endpoint not found", 404)

    def serve_static(self, raw_path):
        clean_path = raw_path.lstrip("/")
        if not clean_path or clean_path == "/":
            clean_path = "index.html"

        file_path = os.path.normpath(os.path.join(PUBLIC_DIR, clean_path))

        # Security check: prevent directory traversal
        if not file_path.startswith(PUBLIC_DIR):
            self.send_error_json("Forbidden", 403)
            return

        if not os.path.isfile(file_path):
            # Fallback to index.html for SPA client-side routing if requested path doesn't have extension
            if "." not in clean_path:
                file_path = os.path.join(PUBLIC_DIR, "index.html")
            else:
                self.send_error_json("File not found", 404)
                return

        mime_type, _ = mimetypes.guess_type(file_path)
        if not mime_type:
            mime_type = "text/plain"

        try:
            with open(file_path, "rb") as f:
                content = f.read()
            self.send_response(200)
            self.send_header("Content-Type", f"{mime_type}; charset=utf-8" if "text" in mime_type or "javascript" in mime_type or "json" in mime_type else mime_type)
            self.send_header("Content-Length", str(len(content)))
            self.send_header("Cache-Control", "no-cache")
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_error_json(f"Error reading file: {str(e)}", 500)


def run_server(port=PORT):
    database.init_db()
    server_address = ("0.0.0.0", port)
    httpd = HTTPServer(server_address, JobPulseHandler)
    print(f"==================================================")
    print(f"  JobPulse Portal & ATS Server is running!")
    print(f"  Local URL:  http://localhost:{port}")
    print(f"  Role Mode:  Switch between Candidate & Admin in UI")
    print(f"  Press Ctrl+C to stop.")
    print(f"==================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.server_close()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 and sys.argv[1].isdigit() else PORT
    run_server(port)

