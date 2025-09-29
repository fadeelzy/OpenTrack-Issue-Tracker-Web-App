// Add Issue functionality for OpenTrack
class AddIssue {
  constructor() {
    this.formData = {
      title: '',
      description: '',
      type: 'bug',
      priority: 'medium',
      assignee: '',
      labels: []
    };

    this.init();
  }

  init() {
    this.bindEventListeners();
  }

  bindEventListeners() {
    const form = document.getElementById('addIssueForm');
    const addLabelBtn = document.getElementById('addLabelBtn');
    const newLabelInput = document.getElementById('newLabel');

    // Form submission
    form.addEventListener('submit', (e) => {
      if (!this.validateForm()) {
        e.preventDefault(); // block submission if invalid
      } else {
        // before submit, inject labels into a hidden input for Django
        this.syncLabelsToForm(form);
      }
    });

    // Input changes update local state
    form.addEventListener('input', (e) => {
      if (e.target.name) {
        this.formData[e.target.name] = e.target.value;
        this.clearError(e.target.name);
      }
    });

    form.addEventListener('change', (e) => {
      if (e.target.name) {
        this.formData[e.target.name] = e.target.value;
      }
    });

    // Label management
    addLabelBtn.addEventListener('click', () => {
      this.addLabel();
    });

    newLabelInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.addLabel();
      }
    });
  }

  addLabel() {
    const newLabelInput = document.getElementById('newLabel');
    const label = newLabelInput.value.trim();

    if (label && !this.formData.labels.includes(label)) {
      this.formData.labels.push(label);
      newLabelInput.value = '';
      this.renderLabels();
    }
  }

  removeLabel(labelToRemove) {
    this.formData.labels = this.formData.labels.filter(label => label !== labelToRemove);
    this.renderLabels();
  }

  renderLabels() {
    const container = document.getElementById('labelsContainer');
    
    if (this.formData.labels.length === 0) {
      container.classList.add('hidden');
      return;
    }

    container.classList.remove('hidden');
    container.innerHTML = this.formData.labels.map(label => `
      <span class="badge badge-secondary gap-1">
        ${label}
        <button 
          type="button" 
          onclick="addIssue.removeLabel('${label}')"
          class="ml-1 hover:text-destructive"
          style="background: none; border: none; cursor: pointer; color: inherit;"
        >
          <svg class="icon" style="width: 0.75rem; height: 0.75rem;" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </span>
    `).join('');
  }

  syncLabelsToForm(form) {
    // ensure hidden field exists
    let hiddenInput = document.getElementById('labelsHidden');
    if (!hiddenInput) {
      hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.name = 'labels';
      hiddenInput.id = 'labelsHidden';
      form.appendChild(hiddenInput);
    }
    hiddenInput.value = this.formData.labels.join(',');
  }

  showError(field, message) {
    const errorElement = document.getElementById(`${field}Error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.remove('hidden');
    }
  }

  clearError(field) {
    const errorElement = document.getElementById(`${field}Error`);
    if (errorElement) {
      errorElement.classList.add('hidden');
    }
  }

  validateForm() {
    let isValid = true;

    // Clear previous errors
    this.clearError('title');
    this.clearError('description');

    // Validate title
    if (!this.formData.title.trim()) {
      this.showError('title', 'Please enter a title');
      isValid = false;
    }

    // Validate description
    if (!this.formData.description.trim()) {
      this.showError('description', 'Please enter a description');
      isValid = false;
    }

    return isValid;
  }
}

// Initialize add issue form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.addIssue = new AddIssue();
});