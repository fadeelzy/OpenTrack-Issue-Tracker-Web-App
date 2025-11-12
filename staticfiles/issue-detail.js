// Issue Detail functionality for OpenTrack

class IssueDetail {
  constructor() {
    this.issue = null;
    this.isUpdating = false;
    this.issueId = this.getIssueIdFromUrl();
    
    this.init();
  }

  getIssueIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }

  async init() {
    if (!this.issueId) {
      this.showNotFound();
      return;
    }

    await this.loadIssue();
  }

  async loadIssue() {
    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find the issue in mock data
      this.issue = mockIssues.find(issue => issue.id === this.issueId);
      
      if (!this.issue) {
        this.showNotFound();
        return;
      }

      this.hideLoading();
      this.renderIssue();
      this.bindEventListeners();

    } catch (error) {
      console.error('Error loading issue:', error);
      this.showNotFound();
    }
  }

  hideLoading() {
    document.getElementById('loadingState').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
  }

  showNotFound() {
    document.getElementById('loadingState').classList.add('hidden');
    document.getElementById('notFoundState').classList.remove('hidden');
  }

  renderIssue() {
    if (!this.issue) return;

    // Update page title
    document.title = `${this.issue.title} - OpenTrack`;

    // Header information
    const typeIcon = typeConfig[this.issue.type].icon;
    document.getElementById('issueTypeIcon').textContent = typeIcon;
    document.getElementById('issueTitle').textContent = this.issue.title;
    
    const createdDate = new Date(this.issue.createdAt);
    const timeAgo = formatDistanceToNow(createdDate);
    document.getElementById('issueMetadata').textContent = 
      `#${this.issue.id.slice(0, 8)} • Created ${timeAgo}`;

    // Description
    document.getElementById('issueDescription').textContent = this.issue.description;

    // Issue details
    document.getElementById('issueType').innerHTML = createTypeBadge(this.issue.type);
    document.getElementById('issuePriority').innerHTML = createPriorityBadge(this.issue.priority);
    document.getElementById('issueReporter').textContent = `@${this.issue.reporter}`;
    
    if (this.issue.assignee) {
      document.getElementById('assigneeRow').classList.remove('hidden');
      document.getElementById('issueAssignee').textContent = `@${this.issue.assignee}`;
    }

    document.getElementById('issueCreated').textContent = formatDate(createdDate);
    document.getElementById('issueUpdated').textContent = formatDate(new Date(this.issue.updatedAt));

    // Status
    this.renderStatus();

    // Labels
    if (this.issue.labels && this.issue.labels.length > 0) {
      document.getElementById('labelsCard').classList.remove('hidden');
      const labelsContainer = document.getElementById('issueLabels');
      labelsContainer.innerHTML = this.issue.labels.map(label => 
        `<span class="badge badge-secondary">${label}</span>`
      ).join('');
    }

    // Activity timeline
    this.renderActivityTimeline();
  }

  renderStatus() {
    const currentStatusContainer = document.getElementById('currentStatus');
    currentStatusContainer.innerHTML = createStatusBadge(this.issue.status);
    
    const statusSelect = document.getElementById('statusSelect');
    statusSelect.value = this.issue.status;
  }

  renderActivityTimeline() {
    const container = document.getElementById('activityTimeline');
    const createdDate = new Date(this.issue.createdAt);
    const updatedDate = new Date(this.issue.updatedAt);

    let activities = [
      {
        type: 'created',
        user: this.issue.reporter,
        date: createdDate,
        description: 'created this issue'
      }
    ];

    // Add update activity if different from creation
    if (this.issue.updatedAt !== this.issue.createdAt) {
      activities.push({
        type: 'updated',
        user: this.issue.assignee || this.issue.reporter,
        date: updatedDate,
        description: 'updated this issue'
      });
    }

    container.innerHTML = activities.map(activity => `
      <div class="flex gap-3 items-start">
        <div class="w-2 h-2 ${activity.type === 'created' ? 'bg-primary' : 'bg-warning'} rounded-full mt-2"></div>
        <div>
          <p class="text-sm">
            <span class="font-medium">${activity.user}</span> ${activity.description}
          </p>
          <p class="text-xs text-muted">
            ${formatDateTime(activity.date)}
          </p>
        </div>
      </div>
    `).join('');
  }

  bindEventListeners() {
    const updateStatusBtn = document.getElementById('updateStatusBtn');
    const statusSelect = document.getElementById('statusSelect');

    updateStatusBtn.addEventListener('click', () => {
      const newStatus = statusSelect.value;
      if (newStatus !== this.issue.status) {
        this.handleStatusUpdate(newStatus);
      }
    });

    statusSelect.addEventListener('change', () => {
      const updateBtn = document.getElementById('updateStatusBtn');
      const hasChanged = statusSelect.value !== this.issue.status;
      updateBtn.disabled = !hasChanged;
      updateBtn.textContent = hasChanged ? 'Update Status' : 'No Changes';
    });
  }

  async handleStatusUpdate(newStatus) {
    if (this.isUpdating) return;

    this.isUpdating = true;
    const updateBtn = document.getElementById('updateStatusBtn');
    updateBtn.textContent = 'Updating...';
    updateBtn.disabled = true;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update the issue in mock data
      const issueIndex = mockIssues.findIndex(issue => issue.id === this.issue.id);
      if (issueIndex !== -1) {
        mockIssues[issueIndex] = {
          ...this.issue,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
        this.issue = mockIssues[issueIndex];
      }

      // Update UI
      this.renderStatus();
      this.renderActivityTimeline();

      // Show success message
      const statusLabel = statusConfig[newStatus].label;
      toast.success(`Issue status updated to ${statusLabel}`);

      console.log('Issue status updated:', { id: this.issue.id, status: newStatus });

    } catch (error) {
      toast.error('Failed to update issue status');
      console.error('Error updating issue status:', error);
    } finally {
      this.isUpdating = false;
      updateBtn.textContent = 'Update Status';
      updateBtn.disabled = false;
    }
  }
}

// Initialize issue detail page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.issueDetail = new IssueDetail();
});