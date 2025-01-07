class MultiSelect {
  constructor(element) {
    this.container = element;
    this.button = element.querySelector(".btn-multi");
    this.dropdown = element.querySelector(".dropdown-menu");
    this.placeholder = element.querySelector(".placeholder");
    this.selectedDisplay = element.querySelector(".selected-display");
    this.checkboxes = element.querySelectorAll('input[type="checkbox"]');
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Toggle dropdown
    this.button.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });

    // Handle checkbox changes
    this.checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        this.updateSelectedDisplay();
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.container.contains(e.target)) {
        this.closeDropdown();
      }
    });
  }

  toggleDropdown() {
    const isOpen = this.dropdown.style.display === "block";
    if (isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown() {
    this.dropdown.style.display = "block";
    this.button.setAttribute("aria-expanded", "true");
  }

  closeDropdown() {
    this.dropdown.style.display = "none";
    this.button.setAttribute("aria-expanded", "false");
  }

  updateSelectedDisplay() {
    const selected = Array.from(this.checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.nextElementSibling.textContent.trim());

    if (selected.length === 0) {
      this.selectedDisplay.textContent = "";
      this.placeholder.style.display = "block";
    } else {
      this.placeholder.style.display = "none";
      this.selectedDisplay.textContent = selected.join(", ");
    }
  }
}

// Initialize all multiselect dropdowns when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const multiSelects = document.querySelectorAll(".multiselect-container");
  multiSelects.forEach((select) => new MultiSelect(select));
});
