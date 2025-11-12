// Dashboard functionality for OpenTrack

class Dashboard {
  constructor() {
    this.issues = mockIssues;
    this.filteredIssues = [...this.issues];
    this.searchQuery = '';
    this.statusFilter = 'all';
    this.priorityFilter = 'all';
    this.typeFilter = 'all';
    
    this.init();
  }

  init() {
    this.renderStats();
    this.renderIssues();
    this.bindEventListeners();
  }

  bindEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const headerSearch = document.getElementById('headerSearch');
    
    searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this.filterIssues();
    });

    headerSearch.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      searchInput.value = e.target.value;
      this.filterIssues();
    });

    // Filter functionality
    document.getElementById('statusFilter').addEventListener('change', (e) => {
      this.statusFilter = e.target.value;
      this.filterIssues();
    });

    document.getElementById('priorityFilter').addEventListener('change', (e) => {
      this.priorityFilter = e.target.value;
      this.filterIssues();
    });

    document.getElementById('typeFilter').addEventListener('change', (e) => {
      this.typeFilter = e.target.value;
      this.filterIssues();
    });
  }

  filterIssues() {
    this.filteredIssues = this.issues.filter(issue => {
      const matchesSearch = issue.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           issue.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = this.statusFilter === 'all' || issue.status === this.statusFilter;
      const matchesPriority = this.priorityFilter === 'all' || issue.priority === this.priorityFilter;
      const matchesType = this.typeFilter === 'all' || issue.type === this.typeFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesType;
    });

    this.renderIssues();
    this.renderActiveFilters();
  }

  renderStats() {
    const total = this.issues.length;
    const open = this.issues.filter(i => i.status === 'open').length;
    const inProgress = this.issues.filter(i => i.status === 'in_progress').length;
    const resolved = this.issues.filter(i => i.status === 'resolved').length;

    document.getElementById('totalCount').textContent = total;
    document.getElementById('openCount').textContent = open;
    document.getElementById('progressCount').textContent = inProgress;
    document.getElementById('resolvedCount').textContent = resolved;
  }

  renderIssues() {
    const container = document.getElementById('issuesContainer');
    const noIssuesMessage = document.getElementById('noIssuesMessage');
    const issueCount = document.getElementById('issueCount');

    issueCount.textContent = this.filteredIssues.length;

    if (this.filteredIssues.length === 0) {
      container.innerHTML = '';
      noIssuesMessage.classList.remove('hidden');
      return;
    }

    noIssuesMessage.classList.add('hidden');
    
    container.innerHTML = this.filteredIssues.map(issue => this.createIssueCard(issue)).join('');
  }

  createIssueCard(issue) {
    const createdDate = new Date(issue.createdAt);
    const timeAgo = formatDistanceToNow(createdDate);
    const typeIcon = typeConfig[issue.type].icon;
    const labelsHtml = issue.labels ? issue.labels.map(label => 
      `<span class="badge badge-outline text-xs">${label}</span>`
    ).join('') : '';

    return `
      <a href="issue-detail.html?id=${issue.id}" class="card card-hover card-p-4 block transition-all">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-muted">${typeIcon}</span>
              <h3 class="font-semibold text-sm truncate transition-colors">${issue.title}</h3>
            </div>
            
            <p class="text-sm text-muted mb-3 line-clamp-2">${issue.description}</p>
            
            <div class="flex items-center gap-2 flex-wrap">
              ${createStatusBadge(issue.status)}
              ${createPriorityBadge(issue.priority)}
              ${labelsHtml}
            </div>
          </div>
          
          <div class="text-xs text-muted text-right" style="flex-shrink: 0;">
            <p class="mb-1">#${issue.id.slice(0, 8)}</p>
            <p>${timeAgo}</p>
            ${issue.assignee ? `<p class="mt-1 font-medium">@${issue.assignee}</p>` : ''}
          </div>
        </div>
      </a>
    `;
  }

  renderActiveFilters() {
    const container = document.getElementById('activeFilters');
    const filters = [];

    if (this.searchQuery) {
      filters.push(`Search: "${this.searchQuery}"`);
    }
    if (this.statusFilter !== 'all') {
      filters.push(`Status: ${this.statusFilter.replace('_', ' ')}`);
    }
    if (this.priorityFilter !== 'all') {
      filters.push(`Priority: ${this.priorityFilter}`);
    }
    if (this.typeFilter !== 'all') {
      filters.push(`Type: ${this.typeFilter}`);
    }

    if (filters.length === 0) {
      container.classList.add('hidden');
      return;
    }

    container.classList.remove('hidden');
    container.innerHTML = filters.map(filter => 
      `<span class="badge badge-secondary badge-removable" onclick="this.remove(); dashboard.clearFilters();">${filter} ×</span>`
    ).join('');
  }

  clearFilters() {
    this.searchQuery = '';
    this.statusFilter = 'all';
    this.priorityFilter = 'all';
    this.typeFilter = 'all';

    document.getElementById('searchInput').value = '';
    document.getElementById('headerSearch').value = '';
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('priorityFilter').value = 'all';
    document.getElementById('typeFilter').value = 'all';

    this.filterIssues();
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.dashboard = new Dashboard();
});