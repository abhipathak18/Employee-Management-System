// =========================================================
// Employee Management System — script.js
// Handles: state, rendering, form validation, CRUD (create,
// read, delete), search, filter, sort, localStorage, theme
// =========================================================

// ---------- Initial sample data (used only if localStorage is empty) ----------
const SAMPLE_EMPLOYEES = [
  { id: "EMP-001", name: "Ravi Sharma", email: "ravi.sharma@company.com", department: "Engineering", position: "Backend Developer", salary: 65000 },
  { id: "EMP-002", name: "Neha Verma", email: "neha.verma@company.com", department: "Design", position: "UI/UX Designer", salary: 52000 },
  { id: "EMP-003", name: "Aman Gupta", email: "aman.gupta@company.com", department: "Marketing", position: "Marketing Executive", salary: 41000 },
  { id: "EMP-004", name: "Priya Singh", email: "priya.singh@company.com", department: "HR", position: "HR Manager", salary: 58000 },
  { id: "EMP-005", name: "Karan Mehta", email: "karan.mehta@company.com", department: "Engineering", position: "Frontend Developer", salary: 60000 },
];

const STORAGE_KEY = "ems_employees";
const THEME_KEY = "ems_theme";

// ---------- State ----------
let employees = loadEmployees();

// ---------- DOM references ----------
const employeeForm = document.getElementById("employeeForm");
const formError = document.getElementById("formError");
const tableBody = document.getElementById("employeeTableBody");
const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");
const filterDepartment = document.getElementById("filterDepartment");
const sortBy = document.getElementById("sortBy");
const exportBtn = document.getElementById("exportBtn");

const statTotal = document.getElementById("statTotal");
const statDepartments = document.getElementById("statDepartments");
const statAvgSalary = document.getElementById("statAvgSalary");

const themeToggle = document.getElementById("themeToggle");

// ---------- Storage helpers ----------
function loadEmployees() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not parse saved employees, using sample data instead.");
    }
  }
  return [...SAMPLE_EMPLOYEES];
}

function saveEmployees() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}

// ---------- ID generation ----------
function generateNextId() {
  if (employees.length === 0) return "EMP-001";
  const maxNum = employees.reduce((max, emp) => {
    const num = parseInt(emp.id.split("-")[1], 10);
    return num > max ? num : max;
  }, 0);
  const next = String(maxNum + 1).padStart(3, "0");
  return `EMP-${next}`;
}

// ---------- Rendering ----------
function renderTable() {
  const query = searchInput.value.trim().toLowerCase();
  const deptFilter = filterDepartment.value;
  const sortOption = sortBy.value;

  let visible = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(query);
    const matchesDept = deptFilter === "" || emp.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  if (sortOption === "name-asc") {
    visible.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "name-desc") {
    visible.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === "salary-asc") {
    visible.sort((a, b) => a.salary - b.salary);
  } else if (sortOption === "salary-desc") {
    visible.sort((a, b) => b.salary - a.salary);
  }

  tableBody.innerHTML = "";

  if (visible.length === 0) {
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
    visible.forEach((emp) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="employee-id" data-label="ID">${emp.id}</td>
        <td data-label="Name">${escapeHtml(emp.name)}</td>
        <td data-label="Email">${escapeHtml(emp.email)}</td>
        <td data-label="Department"><span class="dept-badge">${escapeHtml(emp.department)}</span></td>
        <td data-label="Position">${escapeHtml(emp.position)}</td>
        <td class="salary-cell" data-label="Salary">₹${emp.salary.toLocaleString("en-IN")}</td>
        <td data-label="Actions"><button class="delete-btn" data-id="${emp.id}">delete</button></td>
      `;
      tableBody.appendChild(row);
    });
  }

  updateStats();
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function updateStats() {
  const total = employees.length;
  const departments = new Set(employees.map((emp) => emp.department));
  const avgSalary = total === 0
    ? 0
    : Math.round(employees.reduce((sum, emp) => sum + emp.salary, 0) / total);

  statTotal.textContent = total;
  statDepartments.textContent = departments.size;
  statAvgSalary.textContent = `₹${avgSalary.toLocaleString("en-IN")}`;
}

// ---------- Form handling (Create) ----------
employeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formError.textContent = "";

  const name = document.getElementById("empName").value.trim();
  const email = document.getElementById("empEmail").value.trim();
  const department = document.getElementById("empDepartment").value;
  const position = document.getElementById("empPosition").value.trim();
  const salary = Number(document.getElementById("empSalary").value);

  if (!name || !email || !department || !position || !salary) {
    formError.textContent = "Please fill in every field before submitting.";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formError.textContent = "Please enter a valid email address.";
    return;
  }

  if (salary <= 0) {
    formError.textContent = "Salary must be greater than zero.";
    return;
  }

  const duplicateEmail = employees.some(
    (emp) => emp.email.toLowerCase() === email.toLowerCase()
  );
  if (duplicateEmail) {
    formError.textContent = "An employee with this email already exists.";
    return;
  }

  const newEmployee = {
    id: generateNextId(),
    name,
    email,
    department,
    position,
    salary,
  };

  employees.push(newEmployee);
  saveEmployees();
  renderTable();
  employeeForm.reset();
});

// ---------- Delete (event delegation) ----------
tableBody.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete-btn")) return;

  const id = e.target.getAttribute("data-id");
  const employee = employees.find((emp) => emp.id === id);
  const confirmed = confirm(`Remove ${employee ? employee.name : "this employee"} from the directory?`);
  if (!confirmed) return;

  const index = employees.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
    saveEmployees();
    renderTable();
  }
});

// ---------- Search / Filter / Sort (Read) ----------
searchInput.addEventListener("input", renderTable);
filterDepartment.addEventListener("change", renderTable);
sortBy.addEventListener("change", renderTable);

// ---------- Export ----------
exportBtn.addEventListener("click", () => {
  const dataStr = JSON.stringify(employees, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "employees.json";
  link.click();
  URL.revokeObjectURL(url);
});

// ---------- Theme toggle ----------
function applyTheme(theme) {
  // "light-mode" class name is kept for continuity with earlier versions,
  // but it now toggles the darker "dusk" glass variant defined in style.css.
  document.body.classList.toggle("light-mode", theme === "dusk");
}

themeToggle.addEventListener("click", () => {
  const isDusk = document.body.classList.contains("light-mode");
  const newTheme = isDusk ? "day" : "dusk";
  applyTheme(newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
});

// ---------- Init ----------
(function init() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "day";
  applyTheme(savedTheme);
  renderTable();
})();