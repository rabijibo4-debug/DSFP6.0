/**
 * JobPulse - Client-Side Application Logic
 * Full-featured Job Board & Applicant Tracking System (ATS)
 */

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

