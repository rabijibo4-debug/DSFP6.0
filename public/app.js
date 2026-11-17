/**
 * JobPulse - Client-Side Application Logic
 * Full-featured Job Board & Applicant Tracking System (ATS)
 */

/**
 * LocalBackend - Full-featured Client-side Storage Adapter
 * Enables 100% functionality on GitHub Pages, offline demos, and standalone hosting.
 */
const LocalBackend = {
  isGitHubPages: window.location.hostname.includes('github.io') || window.location.protocol === 'file:',

  init() {
    if (!localStorage.getItem('jp_local_jobs')) {
      const defaultJobs = [
        {
          id: 6,
          title: "CHO COMMUNITY HEALTH OFFICER",
          company: "TechCorp Global",
          department: "Operations",
          location_type: "Remote",
          location: "NIGERIA",
          employment_type: "Full-time",
          experience_level: "Senior Level",
          salary_min: 200000,
          salary_max: 245000,
          salary_currency: "USD",
          description: "INCHARGE OF PRIMARY HEALTH CENTER",
          requirements: ["Medical health officer credentials", "Community health leadership", "Public health center management"],
          benefits: ["Comprehensive coverage", "Housing allowance", "Health insurance"],
          tags: ["Health", "Community", "Leadership"],
          status: "active",
          created_at: "2026-11-12 15:58:29",
          updated_at: "2026-11-12 15:58:29",
          applicant_count: 0
        },
        {
          id: 1,
          title: "Senior Full-Stack Engineer",
          company: "TechCorp Global",
          department: "Engineering",
          location_type: "Remote",
          location: "Remote (US / Europe)",
          employment_type: "Full-time",
          experience_level: "Senior Level",
          salary_min: 140000,
          salary_max: 185000,
          salary_currency: "USD",
          description: "We are seeking an experienced Senior Full-Stack Engineer to lead development on our core cloud platform. You will architect scalable microservices, optimize high-throughput distributed systems, and build beautiful, intuitive user interfaces that empower thousands of customers every day.",
          requirements: [
            "5+ years building production full-stack web applications",
            "Proficiency in modern JavaScript/TypeScript (React, Next.js or Vue) and backend languages (Python, Go, or Node.js)",
            "Solid understanding of relational and NoSQL databases (PostgreSQL, Redis)",
            "Experience with Docker, Kubernetes, and AWS or GCP cloud infrastructure",
            "Proven track record of mentoring junior engineers and leading code reviews"
          ],
          benefits: [
            "Competitive salary & equity package",
            "100% company-paid health, dental, and vision insurance",
            "Flexible 401(k) retirement plan with 5% employer match",
            "$2,500 annual home office setup budget",
            "Unlimited paid time off (PTO) with mandatory minimums"
          ],
          tags: ["React", "Python", "Cloud Architecture", "PostgreSQL", "Docker"],
          status: "active",
          created_at: "2026-11-12 15:46:55",
          updated_at: "2026-11-12 15:46:55",
          applicant_count: 2
        },
        {
          id: 2,
          title: "Staff Product Designer (UI/UX)",
          company: "TechCorp Global",
          department: "Design",
          location_type: "Hybrid",
          location: "San Francisco, CA (Hybrid)",
          employment_type: "Full-time",
          experience_level: "Senior Level",
          salary_min: 130000,
          salary_max: 165000,
          salary_currency: "USD",
          description: "As our Staff Product Designer, you will shape the overall end-to-end product design vision for our flagship products. You will partner closely with engineering, product leadership, and researchers to craft world-class enterprise workflows that users love.",
          requirements: [
            "6+ years of UX/UI product design experience for complex SaaS software",
            "Mastery of Figma, design systems, interactive prototyping, and user journey mapping",
            "Strong portfolio showcasing user research, problem framing, and elegant interfaces",
            "Experience working within agile software squads and design system governance",
            "Excellent storytelling, presentation, and cross-functional leadership skills"
          ],
          benefits: [
            "Top-tier compensation and equity grant",
            "Comprehensive medical, dental, and vision coverage",
            "Annual $3,000 professional learning & conference stipend",
            "Catered lunches and wellness perks in our SF office",
            "Flexible hybrid schedule (2 days in office)"
          ],
          tags: ["Figma", "Design Systems", "User Research", "Prototyping", "SaaS UX"],
          status: "active",
          created_at: "2026-11-12 15:46:55",
          updated_at: "2026-11-12 15:46:55",
          applicant_count: 1
        },
        {
          id: 3,
          title: "Technical Product Manager",
          company: "TechCorp Global",
          department: "Product",
          location_type: "Remote",
          location: "Remote - Anywhere",
          employment_type: "Full-time",
          experience_level: "Mid-Senior Level",
          salary_min: 120000,
          salary_max: 155000,
          salary_currency: "USD",
          description: "Join our rapidly scaling platform team as a Technical Product Manager. You will define the roadmap for our public APIs, developer integrations, and webhooks platform, translating complex technical capabilities into clear, high-impact features.",
          requirements: [
            "3-5 years product management experience for technical or developer-facing products",
            "Strong engineering background or computer science degree preferred",
            "Demonstrated ability to drive roadmap from discovery through delivery",
            "Comfortable with API specs (REST/GraphQL), technical documentation, and SQL queries",
            "Customer-centric mindset with data-informed decision making"
          ],
          benefits: [
            "Competitive base salary + performance bonuses",
            "Remote-first work culture with flexible working hours",
            "Comprehensive healthcare coverage for you and dependents",
            "Annual international company retreat",
            "Generous parental leave policy (16 weeks paid)"
          ],
          tags: ["Product Roadmap", "REST APIs", "Agile/Scrum", "SQL", "Developer Experience"],
          status: "active",
          created_at: "2026-11-12 15:46:55",
          updated_at: "2026-11-12 15:46:55",
          applicant_count: 1
        },
        {
          id: 4,
          title: "DevOps & Cloud Infrastructure Engineer",
          company: "TechCorp Global",
          department: "Engineering",
          location_type: "On-site",
          location: "New York, NY",
          employment_type: "Full-time",
          experience_level: "Mid-Level",
          salary_min: 125000,
          salary_max: 160000,
          salary_currency: "USD",
          description: "We are looking for a DevOps & Cloud Infrastructure Engineer to scale our automated CI/CD pipelines, ensure 99.99% system availability, and enforce robust security and monitoring across our multi-cloud deployment.",
          requirements: [
            "3+ years managing AWS/GCP infrastructure with Infrastructure as Code (Terraform)",
            "Strong container orchestration experience with Kubernetes (EKS / GKE)",
            "Hands-on experience with CI/CD tools (GitHub Actions, GitLab CI, ArgoCD)",
            "Monitoring and telemetry with Prometheus, Grafana, and Datadog",
            "Scripting experience with Python, Bash, or Go"
          ],
          benefits: [
            "Competitive salary + annual bonus plan",
            "Commuter subsidy and transit pass reimbursement",
            "Full health insurance, life, and disability plans",
            "401(k) matching",
            "State-of-the-art hardware (M-series MacBook Pro + dual monitors)"
          ],
          tags: ["AWS", "Kubernetes", "Terraform", "CI/CD", "Prometheus"],
          status: "active",
          created_at: "2026-11-12 15:46:55",
          updated_at: "2026-11-12 15:46:55",
          applicant_count: 0
        },
        {
          id: 5,
          title: "Growth Marketing & Content Strategist",
          company: "TechCorp Global",
          department: "Marketing",
          location_type: "Hybrid",
          location: "Austin, TX",
          employment_type: "Full-time",
          experience_level: "Mid-Level",
          salary_min: 90000,
          salary_max: 120000,
          salary_currency: "USD",
          description: "Lead our outbound acquisition, technical content marketing, and inbound demand generation. You will craft compelling case studies, orchestrate multi-channel campaign launches, and collaborate with sales to drive pipeline growth.",
          requirements: [
            "3+ years of B2B SaaS growth marketing or content strategy experience",
            "Proven ability to create high-performing blog content, whitepapers, and landing pages",
            "Familiarity with SEO tools (Ahrefs, Semrush) and Google Analytics 4",
            "Experience with email marketing automation (HubSpot, Marketo, Customer.io)",
            "Excellent written and verbal communication skills"
          ],
          benefits: [
            "Competitive base compensation + quarterly performance incentives",
            "Comprehensive health, dental, and vision benefits",
            "Wellness stipend and monthly gym membership allowance",
            "Downtown Austin modern workspace with rooftop patio",
            "Flexible PTO policy"
          ],
          tags: ["B2B SaaS", "Content Strategy", "SEO", "HubSpot", "Demand Gen"],
          status: "active",
          created_at: "2026-11-12 15:46:55",
          updated_at: "2026-11-12 15:46:55",
          applicant_count: 0
        }
      ];
      localStorage.setItem('jp_local_jobs', JSON.stringify(defaultJobs));
    }

    if (!localStorage.getItem('jp_local_apps')) {
      const defaultApps = [
        {
          id: 4,
          job_id: 1,
          job_title: "Senior Full-Stack Engineer",
          job_department: "Engineering",
          candidate_name: "Samira Khan",
          candidate_email: "samira.khan.tech@example.com",
          candidate_phone: "+1 (555) 567-8901",
          linkedin_url: "https://linkedin.com/in/samirakhan-mock",
          portfolio_url: "https://samirakhan.dev",
          experience_years: 4,
          cover_letter: "Passionate full-stack developer with deep experience in TypeScript, React, and Python.",
          resume_filename: "Samira_Khan_CV.pdf",
          resume_content: "Samira Khan - Full Stack Engineer. 4 years experience in modern web technologies, automated testing, and CI/CD pipelines.",
          status: "submitted",
          recruiter_notes: "New applicant from referral link. Resume looks aligned with requirement checklist.",
          rating: 3,
          applied_at: "2026-11-12 08:20:00"
        },
        {
          id: 2,
          job_id: 2,
          job_title: "Staff Product Designer (UI/UX)",
          job_department: "Design",
          candidate_name: "Jordan Chen",
          candidate_email: "jordan.chen.design@example.com",
          candidate_phone: "+1 (555) 345-6789",
          linkedin_url: "https://linkedin.com/in/jordanchen-ux",
          portfolio_url: "https://jordanchen.portfolio.mock",
          experience_years: 7,
          cover_letter: "I specialize in enterprise SaaS design systems and complex data-dense interfaces.",
          resume_filename: "Jordan_Chen_Design_Resume.pdf",
          resume_content: "Jordan Chen - Staff Product Designer. 7 years experience designing multi-tenant enterprise software and design systems.",
          status: "under_review",
          recruiter_notes: "Portfolio reviewed by Design Director. High visual fidelity. Scheduling 30-min discovery call.",
          rating: 4,
          applied_at: "2026-11-10 14:30:00"
        },
        {
          id: 1,
          job_id: 1,
          job_title: "Senior Full-Stack Engineer",
          job_department: "Engineering",
          candidate_name: "Alex Rivera",
          candidate_email: "alex.rivera.dev@example.com",
          candidate_phone: "+1 (555) 234-5678",
          linkedin_url: "https://linkedin.com/in/alexrivera-mock",
          portfolio_url: "https://github.com/alexrivera-mock",
          experience_years: 6.5,
          cover_letter: "I have spent the last 6 years building distributed React and Python platforms.",
          resume_filename: "Alex_Rivera_Senior_FullStack_Resume.pdf",
          resume_content: "Alex Rivera - Senior Full Stack Engineer. 6+ years experience in React, Python, PostgreSQL, AWS, Docker.",
          status: "interview",
          recruiter_notes: "Passed coding challenge and recruiter screen. Next step: System Architecture interview Thursday 2 PM.",
          rating: 5,
          applied_at: "2026-11-09 10:15:00"
        },
        {
          id: 3,
          job_id: 3,
          job_title: "Technical Product Manager",
          job_department: "Product",
          candidate_name: "Morgan Taylor",
          candidate_email: "morgan.taylor.pm@example.com",
          candidate_phone: "+1 (555) 456-7890",
          linkedin_url: "https://linkedin.com/in/morgantaylor-pm",
          portfolio_url: "https://morgantaylor.dev",
          experience_years: 5,
          cover_letter: "With an engineering background and 5 years leading developer tooling products.",
          resume_filename: "Morgan_Taylor_TPM_Resume.pdf",
          resume_content: "Morgan Taylor - Technical Product Manager. Led API Platform team of 12 engineers. Grew third-party integrations by 180%.",
          status: "offer",
          recruiter_notes: "All rounds cleared unanimously. Sent official offer letter ($150k base + equity).",
          rating: 5,
          applied_at: "2026-11-07 09:00:00"
        }
      ];
      localStorage.setItem('jp_local_apps', JSON.stringify(defaultApps));
    }
  },

  getJobs() {
    this.init();
    return JSON.parse(localStorage.getItem('jp_local_jobs') || '[]');
  },

  saveJobs(jobs) {
    localStorage.setItem('jp_local_jobs', JSON.stringify(jobs));
  },

  getApps() {
    this.init();
    return JSON.parse(localStorage.getItem('jp_local_apps') || '[]');
  },

  saveApps(apps) {
    localStorage.setItem('jp_local_apps', JSON.stringify(apps));
  },

  handle(endpoint, options = {}) {
    this.init();
    const url = new URL(endpoint, 'http://localhost');
    const path = url.pathname;
    const method = (options.method || 'GET').toUpperCase();
    const body = options.body ? JSON.parse(options.body) : {};

    // 1. GET /api/jobs
    if (path === '/api/jobs' && method === 'GET') {
      let jobs = this.getJobs();
      const apps = this.getApps();
      const search = url.searchParams.get('search');
      const dept = url.searchParams.get('department');
      const locType = url.searchParams.get('location_type');
      const empType = url.searchParams.get('employment_type');
      const status = url.searchParams.get('status');
      const admin = url.searchParams.get('admin') === 'true';

      jobs = jobs.map(j => {
        const count = apps.filter(a => a.job_id === j.id).length;
        return { ...j, applicant_count: count };
      });

      if (!admin) {
        jobs = jobs.filter(j => j.status === 'active');
      } else if (status) {
        jobs = jobs.filter(j => j.status === status);
      }

      if (dept) jobs = jobs.filter(j => j.department.toLowerCase() === dept.toLowerCase());
      if (locType) jobs = jobs.filter(j => j.location_type.toLowerCase() === locType.toLowerCase());
      if (empType) jobs = jobs.filter(j => j.employment_type.toLowerCase() === empType.toLowerCase());
      if (search) {
        const s = search.toLowerCase();
        jobs = jobs.filter(j => 
          j.title.toLowerCase().includes(s) ||
          j.description.toLowerCase().includes(s) ||
          (j.tags && j.tags.some(t => t.toLowerCase().includes(s)))
        );
      }

      return Promise.resolve({ jobs, total: jobs.length });
    }

    // 2. GET /api/jobs/:id
    if (path.startsWith('/api/jobs/') && method === 'GET' && !path.endsWith('/apply')) {
      const parts = path.split('/');
      const id = parseInt(parts[3]);
      const jobs = this.getJobs();
      const apps = this.getApps();
      const job = jobs.find(j => j.id === id);
      if (!job) return Promise.reject(new Error('Job not found'));
      job.applicant_count = apps.filter(a => a.job_id === id).length;
      return Promise.resolve({ job });
    }

    // 3. POST /api/jobs (Create Job)
    if (path === '/api/jobs' && method === 'POST') {
      const jobs = this.getJobs();
      const newJob = {
        id: Date.now(),
        title: body.title,
        company: body.company || 'TechCorp Global',
        department: body.department,
        location_type: body.location_type,
        location: body.location,
        employment_type: body.employment_type,
        experience_level: body.experience_level || 'Mid-Level',
        salary_min: parseInt(body.salary_min || 0),
        salary_max: parseInt(body.salary_max || 0),
        salary_currency: 'USD',
        description: body.description,
        requirements: body.requirements || [],
        benefits: body.benefits || [],
        tags: body.tags || [],
        status: body.status || 'active',
        created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
        updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
        applicant_count: 0
      };
      jobs.unshift(newJob);
      this.saveJobs(jobs);
      return Promise.resolve({ job: newJob, message: 'Job created successfully' });
    }

    // 4. PUT /api/jobs/:id
    if (path.startsWith('/api/jobs/') && method === 'PUT') {
      const parts = path.split('/');
      const id = parseInt(parts[3]);
      const jobs = this.getJobs();
      const index = jobs.findIndex(j => j.id === id);
      if (index === -1) return Promise.reject(new Error('Job not found'));
      jobs[index] = { ...jobs[index], ...body, updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19) };
      this.saveJobs(jobs);
      return Promise.resolve({ job: jobs[index], message: 'Job updated' });
    }

    // 5. DELETE /api/jobs/:id
    if (path.startsWith('/api/jobs/') && method === 'DELETE') {
      const parts = path.split('/');
      const id = parseInt(parts[3]);
      let jobs = this.getJobs();
      jobs = jobs.filter(j => j.id !== id);
      this.saveJobs(jobs);
      let apps = this.getApps();
      apps = apps.filter(a => a.job_id !== id);
      this.saveApps(apps);
      return Promise.resolve({ message: 'Job deleted' });
    }

    // 6. POST /api/jobs/:id/apply
    if (path.startsWith('/api/jobs/') && path.endsWith('/apply') && method === 'POST') {
      const parts = path.split('/');
      const jobId = parseInt(parts[3]);
      const jobs = this.getJobs();
      const job = jobs.find(j => j.id === jobId);
      if (!job) return Promise.reject(new Error('Job opening not found'));

      const apps = this.getApps();
      const email = (body.candidate_email || '').toLowerCase().trim();
      if (apps.some(a => a.job_id === jobId && a.candidate_email.toLowerCase() === email)) {
        return Promise.reject(new Error(`You have already applied for ${job.title}`));
      }

      const newApp = {
        id: Date.now(),
        job_id: jobId,
        job_title: job.title,
        job_department: job.department,
        candidate_name: body.candidate_name,
        candidate_email: email,
        candidate_phone: body.candidate_phone || '',
        linkedin_url: body.linkedin_url || '',
        portfolio_url: body.portfolio_url || '',
        experience_years: parseFloat(body.experience_years || 0),
        cover_letter: body.cover_letter || '',
        resume_filename: body.resume_filename || 'Resume.pdf',
        resume_content: body.resume_content || '',
        status: 'submitted',
        recruiter_notes: '',
        rating: 0,
        applied_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };

      apps.unshift(newApp);
      this.saveApps(apps);
      return Promise.resolve({ application: newApp, message: 'Application submitted!' });
    }

    // 7. GET /api/applications
    if (path === '/api/applications' && method === 'GET') {
      let apps = this.getApps();
      const candEmail = url.searchParams.get('candidate_email');
      const jobId = url.searchParams.get('job_id');
      const status = url.searchParams.get('status');

      if (candEmail) {
        apps = apps.filter(a => a.candidate_email.toLowerCase() === candEmail.toLowerCase().trim());
      }
      if (jobId) {
        apps = apps.filter(a => a.job_id === parseInt(jobId));
      }
      if (status) {
        apps = apps.filter(a => a.status === status);
      }

      return Promise.resolve({ applications: apps, total: apps.length });
    }

    // 8. PUT /api/applications/:id/status
    if (path.startsWith('/api/applications/') && path.endsWith('/status') && method === 'PUT') {
      const parts = path.split('/');
      const id = parseInt(parts[3]);
      const apps = this.getApps();
      const index = apps.findIndex(a => a.id === id);
      if (index === -1) return Promise.reject(new Error('Application not found'));

      if (body.status) apps[index].status = body.status;
      if (body.recruiter_notes !== undefined) apps[index].recruiter_notes = body.recruiter_notes;
      if (body.rating !== undefined) apps[index].rating = body.rating;

      this.saveApps(apps);
      return Promise.resolve({ application: apps[index], message: 'Status updated' });
    }

    // 9. GET /api/stats
    if (path === '/api/stats' && method === 'GET') {
      const jobs = this.getJobs();
      const apps = this.getApps();

      const activeJobs = jobs.filter(j => j.status === 'active').length;
      const inReview = apps.filter(a => ['submitted', 'under_review'].includes(a.status)).length;
      const interviews = apps.filter(a => a.status === 'interview').length;
      const offers = apps.filter(a => a.status === 'offer').length;
      const hired = apps.filter(a => a.status === 'hired').length;
      const rejected = apps.filter(a => a.status === 'rejected').length;

      const deptCounts = {};
      jobs.forEach(j => {
        deptCounts[j.department] = (deptCounts[j.department] || 0) + 1;
      });
      const departments = Object.keys(deptCounts).map(d => ({ department: d, count: deptCounts[d] }));

      return Promise.resolve({
        total_jobs: jobs.length,
        active_jobs: activeJobs,
        total_applications: apps.length,
        in_review: inReview,
        interviews: interviews,
        offers: offers,
        hired: hired,
        rejected: rejected,
        departments,
        recent_applications: apps.slice(0, 5)
      });
    }

    // 10. POST /api/reset-demo
    if (path === '/api/reset-demo' && method === 'POST') {
      localStorage.removeItem('jp_local_jobs');
      localStorage.removeItem('jp_local_apps');
      this.init();
      return Promise.resolve({ message: 'Demo data reset' });
    }

    return Promise.reject(new Error(`Endpoint not found: ${path}`));
  }
};

const app = {
  // Application State
  currentRole: 'candidate', // 'candidate' | 'admin'
  candidateEmail: localStorage.getItem('jobpulse_candidate_email') || 'alex.rivera.dev@example.com',
  candidateSection: 'explore', // 'explore' | 'my-apps'
  adminSection: 'overview', // 'overview' | 'pipeline' | 'jobs'

  jobs: [],
  applications: [],
  candidateApps: [],
  stats: {},

  currentJob: null,
  currentReviewApp: null,
  currentRating: 0,
  uploadedResume: { name: '', content: '' },
  filterDebounceTimer: null,

  // Initialize on load
  init() {
    this.updateCandidateEmailDisplay();
    this.setupEventListeners();
    this.loadJobs();
    this.loadCandidateApplications();
  },

  setupEventListeners() {
    // Keyboard Escape to close open modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });

    // Drag and drop for resume upload
    const dropZone = document.getElementById('resumeDropZone');
    if (dropZone) {
      ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropZone.classList.add('dragover');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropZone.classList.remove('dragover');
        });
      });

      dropZone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          this.processResumeFile(files[0]);
        }
      });
    }
  },

  // ==================== ROLE & NAVIGATION ====================
  switchRole(role) {
    this.currentRole = role;

    const btnCandidate = document.getElementById('roleBtnCandidate');
    const btnAdmin = document.getElementById('roleBtnAdmin');
    const candidateNav = document.getElementById('candidateNavLinks');
    const adminNav = document.getElementById('adminNavLinks');
    const candidateView = document.getElementById('candidateView');
    const adminView = document.getElementById('adminView');
    const roleBadge = document.getElementById('roleBadge');

    if (role === 'candidate') {
      btnCandidate.classList.add('active');
      btnAdmin.classList.remove('active');
      candidateNav.style.display = 'flex';
      adminNav.style.display = 'none';
      candidateView.classList.add('active');
      adminView.classList.remove('active');
      roleBadge.textContent = 'Candidate Portal';
      this.loadJobs();
      this.loadCandidateApplications();
    } else {
      btnAdmin.classList.add('active');
      btnCandidate.classList.remove('active');
      candidateNav.style.display = 'none';
      adminNav.style.display = 'flex';
      candidateView.classList.remove('active');
      adminView.classList.add('active');
      roleBadge.textContent = 'Recruiter ATS';
      this.loadAdminData();
    }
  },

  showCandidateSection(section) {
    this.candidateSection = section;
    const btnExplore = document.getElementById('btnExploreJobs');
    const btnMyApps = document.getElementById('btnMyApplications');
    const exploreSec = document.getElementById('candidateExploreSection');
    const myAppsSec = document.getElementById('candidateMyAppsSection');

    if (section === 'explore') {
      btnExplore.classList.add('active');
      btnMyApps.classList.remove('active');
      exploreSec.style.display = 'block';
      myAppsSec.style.display = 'none';
      this.loadJobs();
    } else {
      btnMyApps.classList.add('active');
      btnExplore.classList.remove('active');
      exploreSec.style.display = 'none';
      myAppsSec.style.display = 'block';
      this.loadCandidateApplications(true);
    }
  },

  showAdminSection(section) {
    this.adminSection = section;
    ['btnAdminOverview', 'btnAdminPipeline', 'btnAdminJobs'].forEach(id => {
      document.getElementById(id).classList.remove('active');
    });
    ['adminOverviewSection', 'adminPipelineSection', 'adminJobsSection'].forEach(id => {
      document.getElementById(id).style.display = 'none';
    });

    if (section === 'overview') {
      document.getElementById('btnAdminOverview').classList.add('active');
      document.getElementById('adminOverviewSection').style.display = 'block';
      this.loadAdminStats();
    } else if (section === 'pipeline') {
      document.getElementById('btnAdminPipeline').classList.add('active');
      document.getElementById('adminPipelineSection').style.display = 'block';
      this.loadPipelineData();
    } else if (section === 'jobs') {
      document.getElementById('btnAdminJobs').classList.add('active');
      document.getElementById('adminJobsSection').style.display = 'block';
      this.loadAdminJobsTable();
    }
  },

  // ==================== CANDIDATE EMAIL PROMPT ====================
  updateCandidateEmailDisplay() {
    const el = document.getElementById('candidateEmailText');
    if (el) el.textContent = this.candidateEmail;
  },

  promptCandidateEmail() {
    const email = prompt("Enter your candidate email to view your applications & submit:", this.candidateEmail);
    if (email && email.trim() && email.includes('@')) {
      this.candidateEmail = email.trim().toLowerCase();
      localStorage.setItem('jobpulse_candidate_email', this.candidateEmail);
      this.updateCandidateEmailDisplay();
      this.showToast(`Switched active candidate to: ${this.candidateEmail}`, 'info');
      this.loadJobs();
      this.loadCandidateApplications();
    }
  },

  // ==================== API HELPERS ====================
  async api(endpoint, options = {}) {
    if (typeof LocalBackend !== 'undefined' && LocalBackend.isGitHubPages) {
      return LocalBackend.handle(endpoint, options);
    }
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        },
        ...options
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }
      return data;
    } catch (err) {
      if (typeof LocalBackend !== 'undefined') {
        console.warn('API error or server offline. Using local browser store:', err.message);
        return LocalBackend.handle(endpoint, options);
      }
      console.error(`API Error on ${endpoint}:`, err);
      this.showToast(err.message, 'error');
      throw err;
    }
  },

  // ==================== CANDIDATE JOBS & SEARCH ====================
  async loadJobs() {
    const countEl = document.getElementById('jobsResultCount');
    if (countEl) countEl.textContent = 'Loading positions...';

    const params = new URLSearchParams();
    const searchVal = document.getElementById('candidateSearchInput')?.value.trim();
    const deptVal = document.getElementById('filterDepartment')?.value;
    const locVal = document.getElementById('filterLocationType')?.value;
    const empVal = document.getElementById('filterEmploymentType')?.value;

    if (searchVal) params.append('search', searchVal);
    if (deptVal) params.append('department', deptVal);
    if (locVal) params.append('location_type', locVal);
    if (empVal) params.append('employment_type', empVal);

    try {
      const data = await this.api(`/api/jobs?${params.toString()}`);
      this.jobs = data.jobs || [];
      this.renderJobsGrid();
    } catch (e) {
      // Handled in api()
    }
  },

  debounceFilter() {
    clearTimeout(this.filterDebounceTimer);
    const searchVal = document.getElementById('candidateSearchInput').value;
    const clearBtn = document.getElementById('btnClearSearch');
    if (clearBtn) clearBtn.style.display = searchVal ? 'block' : 'none';

    this.filterDebounceTimer = setTimeout(() => {
      this.loadJobs();
    }, 280);
  },

  clearSearch() {
    document.getElementById('candidateSearchInput').value = '';
    document.getElementById('btnClearSearch').style.display = 'none';
    this.loadJobs();
  },

  applyFilters() {
    this.loadJobs();
  },

  resetFilters() {
    document.getElementById('candidateSearchInput').value = '';
    document.getElementById('filterDepartment').value = '';
    document.getElementById('filterLocationType').value = '';
    document.getElementById('filterEmploymentType').value = '';
    document.getElementById('btnClearSearch').style.display = 'none';
    this.loadJobs();
  },

  renderJobsGrid() {
    const grid = document.getElementById('jobsGrid');
    const countEl = document.getElementById('jobsResultCount');
    if (!grid) return;

    if (this.jobs.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #fff; border-radius: 12px; border: 1px dashed var(--slate-300);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--slate-400); margin-bottom: 12px;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <h3 style="font-size: 1.2rem; color: var(--slate-800); margin-bottom: 6px;">No Openings Found</h3>
          <p style="color: var(--slate-500); max-width: 400px; margin: 0 auto 16px;">We couldn't find any positions matching your search or filters. Try adjusting your search query.</p>
          <button class="btn btn-secondary btn-sm" onclick="app.resetFilters()">Clear Filters</button>
        </div>
      `;
      if (countEl) countEl.textContent = '0 open positions';
      return;
    }

    if (countEl) countEl.textContent = `${this.jobs.length} open position${this.jobs.length === 1 ? '' : 's'}`;

    // Set of job IDs candidate has already applied to
    const appliedJobIds = new Set(this.candidateApps.map(a => a.job_id));

    grid.innerHTML = this.jobs.map(job => {
      const hasApplied = appliedJobIds.has(job.id);
      const salaryText = job.salary_min && job.salary_max
        ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()} / yr`
        : 'Competitive compensation';

      const tagsHtml = (job.tags || []).slice(0, 4).map(t => `<span class="tag-pill">${this.escape(t)}</span>`).join('');

      return `
        <div class="job-card" onclick="app.openJobDetail(${job.id})">
          <div class="job-card-header">
            <span class="dept-badge dept-${this.escape(job.department)}">${this.escape(job.department)}</span>
            ${hasApplied ? `<span class="badge-applied">✓ Applied</span>` : ''}
          </div>

          <h3 class="job-card-title">${this.escape(job.title)}</h3>

          <div class="job-meta-row">
            <span class="job-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              ${this.escape(job.location)}
            </span>
            <span class="job-meta-item">•</span>
            <span class="job-meta-item">${this.escape(job.employment_type)}</span>
          </div>

          <div class="job-salary-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            ${salaryText}
          </div>

          <p class="job-desc-snippet">${this.escape(job.description)}</p>

          <div class="job-tags-row">
            ${tagsHtml}
          </div>

          <div class="job-card-footer">
            <span class="job-posted-time">Posted ${this.formatDate(job.created_at)}</span>
            <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); app.openJobDetail(${job.id})">
              View & Apply &rarr;
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  // ==================== CANDIDATE JOB DETAILS & APPLY ====================
  openJobDetail(jobId) {
    const job = this.jobs.find(j => j.id === jobId);
    if (!job) return;
    this.currentJob = job;

    document.getElementById('modalJobDept').textContent = job.department;
    document.getElementById('modalJobDept').className = `dept-badge dept-${job.department}`;
    document.getElementById('modalJobTitle').textContent = job.title;

    const salaryText = job.salary_min && job.salary_max
      ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()} ${job.salary_currency}`
      : 'Competitive salary & equity';

    document.getElementById('modalJobMeta').innerHTML = `
      <span>🏢 ${this.escape(job.company)}</span>
      <span>📍 ${this.escape(job.location)} (${this.escape(job.location_type)})</span>
      <span>💼 ${this.escape(job.employment_type)}</span>
      <span>📈 ${this.escape(job.experience_level)}</span>
      <span>💰 ${salaryText}</span>
    `;

    document.getElementById('modalJobDesc').textContent = job.description;

    const reqsList = document.getElementById('modalJobReqs');
    reqsList.innerHTML = (job.requirements || []).map(r => `<li>${this.escape(r)}</li>`).join('');

    const benefitsList = document.getElementById('modalJobBenefits');
    benefitsList.innerHTML = (job.benefits || []).map(b => `<li>${this.escape(b)}</li>`).join('');

    const tagsBox = document.getElementById('modalJobTags');
    tagsBox.innerHTML = (job.tags || []).map(t => `<span class="tag-item">${this.escape(t)}</span>`).join('');

    // Check application status
    const hasApplied = this.candidateApps.some(a => a.job_id === job.id);
    const applyBtn = document.getElementById('btnModalApply');
    if (hasApplied) {
      applyBtn.textContent = 'Already Applied ✓';
      applyBtn.disabled = true;
      applyBtn.className = 'btn btn-secondary btn-lg';
    } else {
      applyBtn.textContent = 'Apply for this Position →';
      applyBtn.disabled = false;
      applyBtn.className = 'btn btn-primary btn-lg';
    }

    this.openModal('jobDetailModal');
  },

  openApplyModalFromDetail() {
    this.closeModal('jobDetailModal');
    if (!this.currentJob) return;

    document.getElementById('applyJobId').value = this.currentJob.id;
    document.getElementById('applyModalJobTitle').textContent = `Apply for: ${this.currentJob.title}`;
    document.getElementById('applyEmail').value = this.candidateEmail;
    document.getElementById('applyName').value = this.candidateEmail.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());

    // Reset uploaded resume state
    this.uploadedResume = { name: '', content: '' };
    const titleEl = document.getElementById('resumeUploadTitle');
    if (titleEl) titleEl.textContent = 'Click to upload or drag & drop resume';

    this.openModal('applyModal');
  },

  handleResumeFile(event) {
    const file = event.target.files[0];
    if (file) {
      this.processResumeFile(file);
    }
  },

  processResumeFile(file) {
    const titleEl = document.getElementById('resumeUploadTitle');
    if (file.size > 5 * 1024 * 1024) {
      this.showToast('File exceeds 5MB limit', 'error');
      return;
    }

    this.uploadedResume.name = file.name;
    titleEl.textContent = `Attached: ${file.name} (${Math.round(file.size / 1024)} KB)`;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.uploadedResume.content = e.target.result;
    };
    reader.readAsText(file);
    this.showToast(`Resume "${file.name}" attached!`, 'success');
  },

  toggleResumeTextInput() {
    const container = document.getElementById('resumeTextContainer');
    container.style.display = container.style.display === 'none' ? 'block' : 'none';
  },

  async submitApplication(event) {
    event.preventDefault();
    const jobId = document.getElementById('applyJobId').value;
    const name = document.getElementById('applyName').value.trim();
    const email = document.getElementById('applyEmail').value.trim().toLowerCase();
    const phone = document.getElementById('applyPhone').value.trim();
    const experience = document.getElementById('applyExperience').value;
    const linkedin = document.getElementById('applyLinkedIn').value.trim();
    const portfolio = document.getElementById('applyPortfolio').value.trim();
    const coverLetter = document.getElementById('applyCoverLetter').value.trim();
    const resumeText = document.getElementById('applyResumeText').value.trim();

    if (!this.uploadedResume.name && !resumeText) {
      this.showToast('Please attach a resume file or paste your resume text', 'error');
      return;
    }

    const payload = {
      candidate_name: name,
      candidate_email: email,
      candidate_phone: phone,
      experience_years: experience ? parseFloat(experience) : 0,
      linkedin_url: linkedin,
      portfolio_url: portfolio,
      cover_letter: coverLetter,
      resume_filename: this.uploadedResume.name || 'Resume_Pasted.txt',
      resume_content: this.uploadedResume.content || resumeText
    };

    const submitBtn = document.getElementById('btnSubmitApp');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting Application...';

    try {
      const res = await this.api(`/api/jobs/${jobId}/apply`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      this.candidateEmail = email;
      localStorage.setItem('jobpulse_candidate_email', email);
      this.updateCandidateEmailDisplay();

      this.showToast('Application submitted successfully! Good luck!', 'success');
      this.closeModal('applyModal');
      await this.loadCandidateApplications();
      this.loadJobs();
      this.showCandidateSection('my-apps');
    } catch (e) {
      // Handled
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Application';
    }
  },

  // ==================== CANDIDATE "MY APPLICATIONS" ====================
  async loadCandidateApplications(showFeedback = false) {
    try {
      const data = await this.api(`/api/applications?candidate_email=${encodeURIComponent(this.candidateEmail)}`);
      this.candidateApps = data.applications || [];

      // Update badge count
      const counter = document.getElementById('myAppsCounter');
      if (counter) {
        if (this.candidateApps.length > 0) {
          counter.textContent = this.candidateApps.length;
          counter.style.display = 'inline-block';
        } else {
          counter.style.display = 'none';
        }
      }

      this.renderCandidateApplications();
      if (showFeedback) {
        this.showToast(`Found ${this.candidateApps.length} application(s) for ${this.candidateEmail}`, 'info');
      }
    } catch (e) {
      // Handled
    }
  },

  renderCandidateApplications() {
    const list = document.getElementById('myAppsList');
    if (!list) return;

    if (this.candidateApps.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; background: #fff; border-radius: 12px; border: 1px dashed var(--slate-300);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--slate-400); margin-bottom: 12px;"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
          <h3 style="font-size: 1.25rem; color: var(--slate-800); margin-bottom: 6px;">No Applications Submitted Yet</h3>
          <p style="color: var(--slate-500); max-width: 440px; margin: 0 auto 20px;">You haven't submitted any job applications under <strong>${this.escape(this.candidateEmail)}</strong>. Browse our open positions and apply today!</p>
          <button class="btn btn-primary" onclick="app.showCandidateSection('explore')">Browse Openings</button>
        </div>
      `;
      return;
    }

    list.innerHTML = this.candidateApps.map(appItem => {
      // Stepper calculation
      const stages = ['submitted', 'under_review', 'interview', 'offer'];
      const isRejected = appItem.status === 'rejected';
      const isHired = appItem.status === 'hired';

      const currentStageIndex = stages.indexOf(appItem.status);

      const stepperHtml = `
        <div class="stepper-progress">
          <div class="step-item ${currentStageIndex >= 0 ? 'completed' : ''} ${appItem.status === 'submitted' ? 'current' : ''}">
            <div class="step-dot">1</div>
            <span class="step-label">Submitted</span>
          </div>

          <div class="step-item ${currentStageIndex >= 1 ? 'completed' : ''} ${appItem.status === 'under_review' ? 'current' : ''}">
            <div class="step-dot">2</div>
            <span class="step-label">Under Review</span>
          </div>

          <div class="step-item ${currentStageIndex >= 2 ? 'completed' : ''} ${appItem.status === 'interview' ? 'current' : ''}">
            <div class="step-dot">3</div>
            <span class="step-label">Interview</span>
          </div>

          <div class="step-item ${isHired || appItem.status === 'offer' ? 'completed current' : (isRejected ? 'rejected' : '')}">
            <div class="step-dot">${isRejected ? '✕' : (isHired ? '✓' : '4')}</div>
            <span class="step-label">${isRejected ? 'Not Selected' : (isHired ? 'Hired 🎉' : 'Offer')}</span>
          </div>
        </div>
      `;

      return `
        <div class="application-card">
          <div class="app-card-header">
            <div>
              <span class="dept-badge dept-${this.escape(appItem.job_department)}">${this.escape(appItem.job_department)}</span>
              <h3 class="app-job-title" style="margin-top:6px;">${this.escape(appItem.job_title)}</h3>
              <p class="app-job-dept">TechCorp Global • ${this.escape(appItem.job_location || 'Remote')}</p>
            </div>
            <span class="status-pill status-${appItem.status}">
              ● ${this.formatStatus(appItem.status)}
            </span>
          </div>

          ${stepperHtml}

          ${appItem.recruiter_notes ? `
            <div class="app-notes-box">
              <strong>Message from Hiring Team:</strong>
              <p style="margin-top:4px;">"${this.escape(appItem.recruiter_notes)}"</p>
            </div>
          ` : ''}

          <div class="app-meta-footer">
            <span>Applied on: ${this.formatDate(appItem.applied_at)}</span>
            <span>Resume: <strong>${this.escape(appItem.resume_filename || 'Uploaded CV')}</strong></span>
            <span>Applicant ID: #${appItem.id}</span>
          </div>
        </div>
      `;
    }).join('');
  },

  // ==================== ADMIN: DASHBOARD & STATS ====================
  async loadAdminData() {
    await this.loadAdminStats();
    if (this.adminSection === 'pipeline') {
      this.loadPipelineData();
    } else if (this.adminSection === 'jobs') {
      this.loadAdminJobsTable();
    }
  },

  async loadAdminStats() {
    try {
      const stats = await this.api('/api/stats');
      this.stats = stats;

      document.getElementById('statActiveJobs').textContent = stats.active_jobs;
      document.getElementById('statTotalApps').textContent = stats.total_applications;
      document.getElementById('statInReview').textContent = stats.in_review;
      document.getElementById('statInterviews').textContent = stats.interviews;
      document.getElementById('statOffers').textContent = (stats.offers || 0) + (stats.hired || 0);

      // Render recent applicants table
      const tbody = document.getElementById('recentApplicantsTable');
      if (tbody) {
        if (!stats.recent_applications || stats.recent_applications.length === 0) {
          tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 24px; color: var(--slate-400);">No applications received yet.</td></tr>`;
        } else {
          tbody.innerHTML = stats.recent_applications.map(app => `
            <tr>
              <td>
                <div style="font-weight: 700; color: var(--slate-900);">${this.escape(app.candidate_name)}</div>
                <div style="font-size: 0.78rem; color: var(--slate-500);">${this.escape(app.candidate_email)}</div>
              </td>
              <td>${this.escape(app.job_title)}</td>
              <td><span class="status-pill status-${app.status}">● ${this.formatStatus(app.status)}</span></td>
              <td>${this.formatDate(app.applied_at)}</td>
              <td>
                <button class="btn btn-secondary btn-sm" onclick="app.openApplicantReview(${app.id})">
                  Review &rarr;
                </button>
              </td>
            </tr>
          `).join('');
        }
      }

      // Department distribution
      const deptList = document.getElementById('departmentStatsList');
      if (deptList) {
        deptList.innerHTML = (stats.departments || []).map(d => `
          <div class="dept-stat-row">
            <span class="dept-stat-name">${this.escape(d.department)}</span>
            <span class="dept-stat-count">${d.count} opening${d.count === 1 ? '' : 's'}</span>
          </div>
        `).join('');
      }
    } catch (e) {
      // Handled
    }
  },

  // ==================== ADMIN: KANBAN PIPELINE (ATS) ====================
  async loadPipelineData() {
    try {
      const [jobsData, appsData] = await Promise.all([
        this.api('/api/jobs?admin=true'),
        this.api('/api/applications')
      ]);

      this.jobs = jobsData.jobs || [];
      this.applications = appsData.applications || [];

      // Populate filter dropdown
      const filterSelect = document.getElementById('pipelineJobFilter');
      if (filterSelect) {
        const currentVal = filterSelect.value;
        filterSelect.innerHTML = `<option value="">All Job Positions (${this.jobs.length})</option>` +
          this.jobs.map(j => `<option value="${j.id}">${this.escape(j.title)}</option>`).join('');
        filterSelect.value = currentVal;
      }

      this.renderPipeline();
    } catch (e) {
      // Handled
    }
  },

  renderPipeline() {
    const board = document.getElementById('kanbanBoard');
    if (!board) return;

    const jobFilter = document.getElementById('pipelineJobFilter')?.value;
    const statusFilter = document.getElementById('pipelineStatusFilter')?.value;

    let filtered = this.applications;
    if (jobFilter) {
      filtered = filtered.filter(a => a.job_id === parseInt(jobFilter));
    }
    if (statusFilter) {
      filtered = filtered.filter(a => a.status === statusFilter);
    }

    const columns = [
      { key: 'submitted', title: 'New / Applied', icon: '📥' },
      { key: 'under_review', title: 'Under Review', icon: '🔍' },
      { key: 'interview', title: 'Interviewing', icon: '🗓️' },
      { key: 'offer', title: 'Offer Extended', icon: '🎉' },
      { key: 'hired', title: 'Hired', icon: '✅' },
      { key: 'rejected', title: 'Not Selected', icon: '❌' }
    ];

    board.innerHTML = columns.map(col => {
      const colApps = filtered.filter(a => a.status === col.key);
      const cardsHtml = colApps.map(a => `
        <div class="kanban-card" onclick="app.openApplicantReview(${a.id})">
          <div class="kc-name">${this.escape(a.candidate_name)}</div>
          <div class="kc-job">${this.escape(a.job_title)}</div>
          <div class="kc-footer">
            <span>${this.formatDate(a.applied_at)}</span>
            <span class="kc-rating">${'★'.repeat(a.rating || 0)}</span>
          </div>
        </div>
      `).join('');

      return `
        <div class="kanban-column">
          <div class="kanban-col-header">
            <span class="kanban-col-title">${col.icon} ${col.title}</span>
            <span class="kanban-col-count">${colApps.length}</span>
          </div>
          <div class="kanban-cards-list">
            ${cardsHtml || '<div style="font-size:0.75rem; color: var(--slate-400); text-align:center; padding: 24px 0;">No candidates in this stage</div>'}
          </div>
        </div>
      `;
    }).join('');
  },

  // ==================== ADMIN: APPLICANT REVIEW & ATS DRAWER ====================
  async openApplicantReview(appId) {
    let candidate = this.applications.find(a => a.id === appId);
    if (!candidate) {
      // Fallback fetch
      const res = await this.api(`/api/applications?admin=true`);
      this.applications = res.applications || [];
      candidate = this.applications.find(a => a.id === appId);
    }
    if (!candidate) return;

    this.currentReviewApp = candidate;
    this.currentRating = candidate.rating || 0;

    document.getElementById('atsJobApplied').textContent = `Applied for: ${candidate.job_title} (#${candidate.job_id})`;
    document.getElementById('atsCandidateName').textContent = candidate.candidate_name;

    document.getElementById('atsCandidateMeta').innerHTML = `
      <span>✉️ ${this.escape(candidate.candidate_email)}</span>
      ${candidate.candidate_phone ? `<span>📞 ${this.escape(candidate.candidate_phone)}</span>` : ''}
      <span>💼 ${candidate.experience_years} years experience</span>
      <span>📅 Applied on ${this.formatDate(candidate.applied_at)}</span>
    `;

    // Links
    const linksContainer = document.getElementById('atsLinksContainer');
    let linksHtml = '';
    if (candidate.linkedin_url) {
      linksHtml += `<a href="${this.escape(candidate.linkedin_url)}" target="_blank" class="link-btn">🔗 LinkedIn Profile</a>`;
    }
    if (candidate.portfolio_url) {
      linksHtml += `<a href="${this.escape(candidate.portfolio_url)}" target="_blank" class="link-btn">🌐 Portfolio / GitHub</a>`;
    }
    if (!linksHtml) {
      linksHtml = `<span style="font-size:0.85rem; color: var(--slate-400);">No external links submitted</span>`;
    }
    linksContainer.innerHTML = linksHtml;

    // Cover letter
    document.getElementById('atsCoverLetter').textContent = candidate.cover_letter || 'No cover note provided by candidate.';

    // Resume
    const resumeBox = document.getElementById('atsResumeContent');
    if (candidate.resume_content) {
      resumeBox.textContent = candidate.resume_content;
    } else if (candidate.resume_filename) {
      resumeBox.textContent = `Attached Resume Document: ${candidate.resume_filename}`;
    } else {
      resumeBox.textContent = 'No resume uploaded.';
    }

    // Set stage select and recruiter notes
    document.getElementById('atsStatusSelect').value = candidate.status;
    document.getElementById('atsRecruiterNotes').value = candidate.recruiter_notes || '';
    this.renderRatingStars();

    this.openModal('applicantReviewModal');
  },

  setRating(rating) {
    this.currentRating = rating;
    this.renderRatingStars();
  },

  renderRatingStars() {
    const stars = document.querySelectorAll('#atsRatingStars .star');
    stars.forEach(s => {
      const r = parseInt(s.getAttribute('data-rating'));
      if (r <= this.currentRating) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  },

  async saveApplicantEvaluation() {
    if (!this.currentReviewApp) return;

    const newStatus = document.getElementById('atsStatusSelect').value;
    const notes = document.getElementById('atsRecruiterNotes').value.trim();

    try {
      const updated = await this.api(`/api/applications/${this.currentReviewApp.id}/status`, {
        method: 'PUT',
        body: JSON.stringify({
          status: newStatus,
          recruiter_notes: notes,
          rating: this.currentRating
        })
      });

      this.showToast(`Candidate stage updated to "${this.formatStatus(newStatus)}"`, 'success');
      this.closeModal('applicantReviewModal');

      // Refresh admin data & current list
      this.loadAdminData();
    } catch (e) {
      // Handled
    }
  },

  // ==================== ADMIN: MANAGE JOB OPENINGS ====================
  async loadAdminJobsTable() {
    try {
      const data = await this.api('/api/jobs?admin=true');
      this.jobs = data.jobs || [];

      const tbody = document.getElementById('adminJobsTable');
      if (!tbody) return;

      if (this.jobs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 24px; color: var(--slate-400);">No job openings created yet.</td></tr>`;
        return;
      }

      tbody.innerHTML = this.jobs.map(j => {
        const salaryText = j.salary_min && j.salary_max
          ? `$${j.salary_min.toLocaleString()} - $${j.salary_max.toLocaleString()}`
          : 'Competitive';

        return `
          <tr>
            <td>
              <div style="font-weight: 700; color: var(--slate-900);">${this.escape(j.title)}</div>
              <div style="font-size: 0.76rem; color: var(--slate-400);">ID: #${j.id}</div>
            </td>
            <td><span class="dept-badge dept-${this.escape(j.department)}">${this.escape(j.department)}</span></td>
            <td>${this.escape(j.location_type)} (${this.escape(j.location)})</td>
            <td>${salaryText}</td>
            <td>
              <span style="font-weight: 700; color: var(--primary); cursor: pointer;" onclick="app.filterPipelineByJob(${j.id})">
                ${j.applicant_count || 0} candidate(s) &rarr;
              </span>
            </td>
            <td><span class="status-pill status-${j.status}">● ${this.escape(j.status)}</span></td>
            <td>${this.formatDate(j.created_at)}</td>
            <td>
              <div style="display: flex; gap: 6px;">
                <button class="btn btn-secondary btn-sm" onclick="app.editJob(${j.id})">Edit</button>
                <button class="btn btn-secondary btn-sm" onclick="app.toggleJobStatus(${j.id}, '${j.status}')">
                  ${j.status === 'active' ? 'Close' : 'Activate'}
                </button>
                <button class="btn btn-danger btn-sm" onclick="app.deleteJob(${j.id})">Delete</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    } catch (e) {
      // Handled
    }
  },

  filterPipelineByJob(jobId) {
    this.showAdminSection('pipeline');
    setTimeout(() => {
      const select = document.getElementById('pipelineJobFilter');
      if (select) {
        select.value = jobId;
        this.renderPipeline();
      }
    }, 100);
  },

  openJobModal(job = null) {
    const titleEl = document.getElementById('jobEditModalTitle');
    const form = document.getElementById('jobEditForm');
    form.reset();

    if (job) {
      titleEl.textContent = `Edit Job Opening (#${job.id})`;
      document.getElementById('editJobId').value = job.id;
      document.getElementById('jobTitleInput').value = job.title;
      document.getElementById('jobDeptInput').value = job.department;
      document.getElementById('jobLocTypeInput').value = job.location_type;
      document.getElementById('jobLocationInput').value = job.location;
      document.getElementById('jobEmpTypeInput').value = job.employment_type;
      document.getElementById('jobExpLevelInput').value = job.experience_level;
      document.getElementById('jobSalaryMinInput').value = job.salary_min || '';
      document.getElementById('jobSalaryMaxInput').value = job.salary_max || '';
      document.getElementById('jobStatusInput').value = job.status;
      document.getElementById('jobDescInput').value = job.description;
      document.getElementById('jobReqsInput').value = (job.requirements || []).join('\n');
      document.getElementById('jobBenefitsInput').value = (job.benefits || []).join('\n');
      document.getElementById('jobTagsInput').value = (job.tags || []).join(', ');
      document.getElementById('btnSaveJob').textContent = 'Save Changes';
    } else {
      titleEl.textContent = 'Post New Job Opening';
      document.getElementById('editJobId').value = '';
      document.getElementById('jobStatusInput').value = 'active';
      document.getElementById('btnSaveJob').textContent = 'Publish Job Opening';
    }

    this.openModal('jobEditModal');
  },

  editJob(jobId) {
    const job = this.jobs.find(j => j.id === jobId);
    if (job) {
      this.openJobModal(job);
    }
  },

  async saveJob(event) {
    event.preventDefault();
    const jobId = document.getElementById('editJobId').value;
    const title = document.getElementById('jobTitleInput').value.trim();
    const dept = document.getElementById('jobDeptInput').value;
    const locType = document.getElementById('jobLocTypeInput').value;
    const location = document.getElementById('jobLocationInput').value.trim();
    const empType = document.getElementById('jobEmpTypeInput').value;
    const expLevel = document.getElementById('jobExpLevelInput').value;
    const salaryMin = document.getElementById('jobSalaryMinInput').value;
    const salaryMax = document.getElementById('jobSalaryMaxInput').value;
    const status = document.getElementById('jobStatusInput').value;
    const desc = document.getElementById('jobDescInput').value.trim();
    const reqs = document.getElementById('jobReqsInput').value.trim();
    const benefits = document.getElementById('jobBenefitsInput').value.trim();
    const tags = document.getElementById('jobTagsInput').value.trim();

    const payload = {
      title,
      department: dept,
      location_type: locType,
      location,
      employment_type: empType,
      experience_level: expLevel,
      salary_min: salaryMin ? parseInt(salaryMin) : 0,
      salary_max: salaryMax ? parseInt(salaryMax) : 0,
      status,
      description: desc,
      requirements: reqs.split('\n').map(r => r.trim()).filter(Boolean),
      benefits: benefits.split('\n').map(b => b.trim()).filter(Boolean),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (jobId) {
        await this.api(`/api/jobs/${jobId}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
        this.showToast('Job listing updated successfully!', 'success');
      } else {
        await this.api('/api/jobs', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        this.showToast('New job opening posted live!', 'success');
      }

      this.closeModal('jobEditModal');
      this.loadAdminData();
      this.loadJobs();
    } catch (e) {
      // Handled
    }
  },

  async toggleJobStatus(jobId, currentStatus) {
    const nextStatus = currentStatus === 'active' ? 'closed' : 'active';
    try {
      await this.api(`/api/jobs/${jobId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: nextStatus })
      });
      this.showToast(`Job #${jobId} status updated to ${nextStatus}`, 'info');
      this.loadAdminJobsTable();
      this.loadJobs();
    } catch (e) {
      // Handled
    }
  },

  async deleteJob(jobId) {
    if (!confirm('Are you sure you want to permanently delete this job opening and its applications?')) {
      return;
    }
    try {
      await this.api(`/api/jobs/${jobId}`, { method: 'DELETE' });
      this.showToast('Job listing removed', 'success');
      this.loadAdminJobsTable();
      this.loadJobs();
    } catch (e) {
      // Handled
    }
  },

  // ==================== RESET DEMO DATA ====================
  async resetDemoData() {
    if (!confirm('Reset database to default sample jobs and candidates?')) return;
    try {
      await this.api('/api/reset-demo', { method: 'POST' });
      this.showToast('Database reset to fresh sample state!', 'success');
      this.loadJobs();
      this.loadCandidateApplications();
      if (this.currentRole === 'admin') {
        this.loadAdminData();
      }
    } catch (e) {
      // Handled
    }
  },

  // ==================== MODAL HELPERS ====================
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  closeModalOnBackdrop(event, modalId) {
    if (event.target.id === modalId) {
      this.closeModal(modalId);
    }
  },

  closeAllModals() {
    document.querySelectorAll('.modal-overlay.active').forEach(m => {
      m.classList.remove('active');
    });
    document.body.style.overflow = '';
  },

  // ==================== TOAST SYSTEM ====================
  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `
      <span style="font-weight: 700;">${icon}</span>
      <span style="flex:1;">${this.escape(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  },

  // ==================== UTILITIES ====================
  escape(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr.replace(' ', 'T'));
    if (isNaN(date)) return dateStr;
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  },

  formatStatus(status) {
    const map = {
      submitted: 'New / Applied',
      under_review: 'Under Review',
      interview: 'Interviewing',
      offer: 'Offer Extended',
      hired: 'Hired',
      rejected: 'Not Selected',
      active: 'Active',
      draft: 'Draft',
      closed: 'Closed'
    };
    return map[status] || status;
  }
};

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

