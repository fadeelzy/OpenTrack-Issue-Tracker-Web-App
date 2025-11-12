// Shared utilities and data for OpenTrack

// Mock data for development
const mockIssues = [
  {
    id: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
    title: "Login form validation not working properly",
    description: "Users are able to submit the login form with empty fields, and error messages are not displaying correctly when invalid credentials are entered.",
    type: "bug",
    priority: "high",
    status: "open",
    assignee: "sarah.dev",
    reporter: "john.doe",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T14:22:00Z",
    labels: ["frontend", "authentication"],
  },
  {
    id: "2b3c4d5e-6f7g-8h9i-0j1k-l2m3n4o5p6q7",
    title: "Add dark mode toggle to user preferences",
    description: "Implement a dark mode toggle in the user settings page that allows users to switch between light and dark themes. Should remember preference across sessions.",
    type: "feature",
    priority: "medium",
    status: "in_progress",
    assignee: "mike.ui",
    reporter: "alice.pm",
    createdAt: "2024-01-12T09:15:00Z",
    updatedAt: "2024-01-16T11:45:00Z",
    labels: ["frontend", "ux"],
  },
  {
    id: "3c4d5e6f-7g8h-9i0j-1k2l-m3n4o5p6q7r8",
    title: "Database connection timeout issues",
    description: "Random database connection timeouts occurring during peak hours, causing 500 errors for users. Need to investigate connection pooling settings.",
    type: "bug",
    priority: "critical",
    status: "open",
    assignee: "dev.ops",
    reporter: "monitor.system",
    createdAt: "2024-01-16T16:20:00Z",
    updatedAt: "2024-01-16T16:20:00Z",
    labels: ["backend", "database", "performance"],
  },
  {
    id: "4d5e6f7g-8h9i-0j1k-2l3m-n4o5p6q7r8s9",
    title: "Improve search functionality performance",
    description: "Search queries are taking too long to execute, especially when dealing with large datasets. Consider implementing elasticsearch or optimizing database queries.",
    type: "enhancement",
    priority: "medium",
    status: "resolved",
    assignee: "backend.team",
    reporter: "performance.audit",
    createdAt: "2024-01-10T14:00:00Z",
    updatedAt: "2024-01-14T16:30:00Z",
    labels: ["backend", "performance", "search"],
  },
  {
    id: "5e6f7g8h-9i0j-1k2l-3m4n-o5p6q7r8s9t0",
    title: "Setup automated testing pipeline",
    description: "Create a CI/CD pipeline that automatically runs unit tests, integration tests, and deployment to staging environment when code is pushed to main branch.",
    type: "task",
    priority: "low",
    status: "closed",
    assignee: "devops.lead",
    reporter: "tech.lead",
    createdAt: "2024-01-05T08:00:00Z",
    updatedAt: "2024-01-12T17:00:00Z",
    labels: ["devops", "testing", "automation"],
  },
  {
    id: "6f7g8h9i-0j1k-2l3m-4n5o-p6q7r8s9t0u1",
    title: "Mobile responsive layout issues on tablet",
    description: "The application layout breaks on tablet devices in landscape mode. Navigation menu overlaps with main content and buttons are not properly sized.",
    type: "bug",
    priority: "medium",
    status: "in_progress",
    assignee: "mobile.dev",
    reporter: "qa.team",
    createdAt: "2024-01-14T11:30:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
    labels: ["frontend", "mobile", "responsive"],
  },
];

// Utility functions
function formatDistanceToNow(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

function formatDateTime(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
}

// Toast notification system
class Toast {
  constructor() {
    this.container = this.createContainer();
  }

  createContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  show(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    this.container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, duration);
  }

  success(message) {
    this.show(message, 'success');
  }

  error(message) {
    this.show(message, 'error');
  }
}

const toast = new Toast();

// Status and priority configurations
const statusConfig = {
  open: {
    label: "Open",
    className: "status-open",
    icon: "⚠️"
  },
  in_progress: {
    label: "In Progress",
    className: "status-in-progress",
    icon: "🔄"
  },
  resolved: {
    label: "Resolved",
    className: "status-resolved",
    icon: "✅"
  },
  closed: {
    label: "Closed",
    className: "status-closed",
    icon: "⚫"
  }
};

const priorityConfig = {
  low: {
    label: "Low",
    className: "priority-low",
    icon: "🔽"
  },
  medium: {
    label: "Medium",
    className: "priority-medium",
    icon: "➡️"
  },
  high: {
    label: "High",
    className: "priority-high",
    icon: "🔼"
  },
  critical: {
    label: "Critical",
    className: "priority-critical",
    icon: "🚨"
  }
};

const typeConfig = {
  bug: { label: "Bug", icon: "🐛" },
  feature: { label: "Feature", icon: "💡" },
  enhancement: { label: "Enhancement", icon: "⚡" },
  task: { label: "Task", icon: "✅" }
};

// Create status badge HTML
function createStatusBadge(status) {
  const config = statusConfig[status];
  return `
    <div class="badge ${config.className}">
      <span>${config.icon}</span>
      ${config.label}
    </div>
  `;
}

// Create priority badge HTML
function createPriorityBadge(priority) {
  const config = priorityConfig[priority];
  return `
    <div class="badge ${config.className}">
      <span>${config.icon}</span>
      ${config.label}
    </div>
  `;
}

// Create type badge HTML
function createTypeBadge(type) {
  const config = typeConfig[type];
  return `
    <div class="badge badge-outline">
      <span>${config.icon}</span>
      ${config.label}
    </div>
  `;
}

// Generate unique ID
function generateId() {
  return 'xxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }) + '-xxxxxxxxxxxx'.replace(/[x]/g, function(c) {
    const r = Math.random() * 16 | 0;
    return r.toString(16);
  });
}

// SVG Icons as strings
const icons = {
  search: '<svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>',
  plus: '<svg class="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
  settings: '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6m11-5h-6m-6 0H1"></path></svg>',
  arrowLeft: '<svg class="icon" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12,19 5,12 12,5"></polyline></svg>',
  edit: '<svg class="icon" viewBox="0 0 24 24"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>',
  filter: '<svg class="icon" viewBox="0 0 24 24"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon></svg>',
  barChart: '<svg class="icon" viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>',
  users: '<svg class="icon" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
  checkCircle: '<svg class="icon" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22,4 12,14.01 9,11.01"></polyline></svg>',
  clock: '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline></svg>',
  x: '<svg class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
  calendar: '<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
  user: '<svg class="icon" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
  tag: '<svg class="icon" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>',
  messageCircle: '<svg class="icon" viewBox="0 0 24 24"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path></svg>'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    mockIssues,
    formatDistanceToNow,
    formatDate,
    formatDateTime,
    toast,
    statusConfig,
    priorityConfig,
    typeConfig,
    createStatusBadge,
    createPriorityBadge,
    createTypeBadge,
    generateId,
    icons
  };
}