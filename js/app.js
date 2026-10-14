let patients = typeof initialPatients !== 'undefined' ? [...initialPatients] : [];
let filteredPatients = [...patients];
let currentPage = 1;
const pageSize = 5;
let sortConfig = { field: "datetime", asc: false };

let offcanvasDrawer = null;
let addPatientModal = null;

const patientTbody = document.getElementById("patient-tbody");
const searchInput = document.getElementById("search-input");
const filterCountry = document.getElementById("filter-country");
const pageCounter = document.getElementById("page-counter");
const paginationButtons = document.getElementById("pagination-buttons");
const addPatientForm = document.getElementById("add-patient-form");
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const sidebar = document.getElementById("sidebar");

const rowTemplate = document.getElementById("patient-row-template");
const appointmentTemplate = document.getElementById("appointment-card-template");

const detailAvatar = document.getElementById("detail-avatar");
const detailName = document.getElementById("detail-name");
const detailVipBadge = document.getElementById("detail-vip-badge");
const detailRegularBadge = document.getElementById("detail-regular-badge");
const detailId = document.getElementById("detail-id");
const detailPhone = document.getElementById("detail-phone");
const detailEmail = document.getElementById("detail-email");
const detailFlag = document.getElementById("detail-flag");
const detailCountry = document.getElementById("detail-country");
const detailBirthdayAge = document.getElementById("detail-birthday-age");
const detailNric = document.getElementById("detail-nric");
const detailOccupation = document.getElementById("detail-occupation");
const detailLastVisit = document.getElementById("detail-last-visit");
const detailRemarks = document.getElementById("detail-remarks");
const detailAppointmentsList = document.getElementById("detail-appointments-list");

document.addEventListener("DOMContentLoaded", () => {
  const offcanvasEl = document.getElementById("patientDetailDrawer");
  if (offcanvasEl && typeof bootstrap !== "undefined") {
    offcanvasDrawer = new bootstrap.Offcanvas(offcanvasEl);
  }

  const modalEl = document.getElementById("addPatientModal");
  if (modalEl && typeof bootstrap !== "undefined") {
    addPatientModal = new bootstrap.Modal(modalEl);
  }

  setupEventListeners();
  renderPatientTable();
});

function setupEventListeners() {
  searchInput.addEventListener("input", () => {
    applyFilters();
  });

  filterCountry.addEventListener("change", () => {
    applyFilters();
  });

  addPatientForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("input-name").value.trim();
    const phone = document.getElementById("input-phone").value.trim();
    const country = document.getElementById("input-country").value;
    const nric = document.getElementById("input-nric").value.trim() || "S9000000A";
    const remarks = document.getElementById("input-remarks").value.trim() || "No known allergies.";
    const isVip = document.getElementById("input-vip").checked;

    const flags = {
      "Singapore": "🇸🇬",
      "Malaysia": "🇲🇾",
      "China": "🇨🇳",
      "Japan": "🇯🇵",
      "United Kingdom": "🇬🇧",
      "United States": "🇺🇸"
    };

    const now = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMinutes = now.getMinutes().toString().padStart(2, '0');
    const datetimeStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} ${formattedHours}:${formattedMinutes} ${ampm}`;

    const palette = [
      { bg: "#E8F0FE", color: "#0052CC" },
      { bg: "#CFE2FF", color: "#0D6EFD" },
      { bg: "#D1E7DD", color: "#198754" },
      { bg: "#E2D9F3", color: "#6F42C1" }
    ];
    const pickedColor = palette[patients.length % palette.length];

    const newPatient = {
      id: "PT-" + (1000 + patients.length + 1),
      name: name,
      avatarBg: pickedColor.bg,
      avatarColor: pickedColor.color,
      phone: phone,
      country: country,
      flag: flags[country] || "🌐",
      datetime: datetimeStr,
      isVip: isVip,
      email: name.toLowerCase().replace(/\s+/g, '') + "@example.com",
      birthday: "12 May 1993",
      age: 33,
      nric: nric,
      occupation: "Private Professional",
      lastVisit: "Registered Today (15 mins)",
      remarks: remarks,
      appointments: [
        {
          date: "Next Monday 10:30 AM",
          treatment: "Initial Health Consultation",
          doctor: "Dr. Sarah Lin",
          symptoms: "New patient orientation & health screening"
        }
      ]
    };

    patients.unshift(newPatient);
    addPatientForm.reset();

    const modalInstance = bootstrap.Modal.getInstance(document.getElementById("addPatientModal"));
    if (modalInstance) {
      modalInstance.hide();
    }

    applyFilters();
    alert(`Patient ${name} added successfully!`);
  });

  const sidebarCloseBtn = document.getElementById("sidebar-close-btn");
  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener("click", () => {
      sidebar.classList.remove("show-sidebar");
    });
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("show-sidebar");
    });
  }

  document.addEventListener("click", (e) => {
    if (
      sidebar.classList.contains("show-sidebar") &&
      !sidebar.contains(e.target)
    ) {
      sidebar.classList.remove("show-sidebar");
    }
  });
}

function getInitials(name) {
  if (!name) return "PT";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function applyFilters() {
  const query = searchInput.value.toLowerCase().trim();
  const selectedCountry = filterCountry.value;

  filteredPatients = patients.filter(p => {
    const matchQuery = 
      p.name.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query) ||
      p.phone.includes(query);

    const matchCountry = selectedCountry === "" || p.country === selectedCountry;

    return matchQuery && matchCountry;
  });

  currentPage = 1;
  renderPatientTable();
}

function sortTable(field) {
  if (sortConfig.field === field) {
    sortConfig.asc = !sortConfig.asc;
  } else {
    sortConfig.field = field;
    sortConfig.asc = true;
  }

  filteredPatients.sort((a, b) => {
    let valA = a[field] || "";
    let valB = b[field] || "";

    if (field === "datetime") {
      valA = Date.parse(valA) || 0;
      valB = Date.parse(valB) || 0;
    } else {
      valA = valA.toString().toLowerCase();
      valB = valB.toString().toLowerCase();
    }

    if (valA < valB) return sortConfig.asc ? -1 : 1;
    if (valA > valB) return sortConfig.asc ? 1 : -1;
    return 0;
  });

  renderPatientTable();
}

function renderPatientTable() {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = filteredPatients.slice(start, end);

  patientTbody.innerHTML = "";

  if (pageItems.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td colspan="5" class="text-center py-4 text-muted">
        <i class="bi bi-inbox fs-2 d-block mb-1"></i>
        No patients found matching your search.
      </td>
    `;
    patientTbody.appendChild(tr);
    pageCounter.textContent = "Showing 0 of 0 results";
    paginationButtons.innerHTML = "";
    return;
  }

  pageItems.forEach(p => {
    const rowFragment = rowTemplate.content.cloneNode(true);
    const tr = rowFragment.querySelector(".patient-row");

    tr.addEventListener("click", () => openPatientDetails(p.id));

    const avatar = rowFragment.querySelector(".row-avatar");
    avatar.textContent = getInitials(p.name);
    avatar.style.backgroundColor = p.avatarBg || "#E8F0FE";
    avatar.style.color = p.avatarColor || "#0052CC";

    rowFragment.querySelector(".row-name").textContent = p.name;
    rowFragment.querySelector(".row-id").textContent = p.id;
    rowFragment.querySelector(".row-phone").textContent = p.phone;
    rowFragment.querySelector(".row-flag").textContent = p.flag || "🌐";
    rowFragment.querySelector(".row-country").textContent = p.country;
    rowFragment.querySelector(".row-datetime").textContent = p.datetime;

    const vipBadge = rowFragment.querySelector(".row-vip");
    if (p.isVip) {
      vipBadge.classList.remove("d-none");
    }

    const actionCell = rowFragment.querySelector(".action-cell");
    actionCell.addEventListener("click", (e) => e.stopPropagation());

    const btnView = rowFragment.querySelector(".btn-view-profile");
    btnView.addEventListener("click", () => openPatientDetails(p.id));

    const btnVip = rowFragment.querySelector(".btn-toggle-vip");
    const vipLabel = rowFragment.querySelector(".toggle-vip-label");
    vipLabel.textContent = p.isVip ? "Remove VIP" : "Mark as VIP";
    btnVip.addEventListener("click", () => toggleVip(p.id));

    const btnDelete = rowFragment.querySelector(".btn-delete-patient");
    btnDelete.addEventListener("click", () => deletePatient(p.id));

    patientTbody.appendChild(rowFragment);
  });

  renderPagination();
}

function openPatientDetails(id) {
  const p = patients.find(item => item.id === id);
  if (!p) return;

  detailAvatar.textContent = getInitials(p.name);
  detailAvatar.style.backgroundColor = p.avatarBg || "#E8F0FE";
  detailAvatar.style.color = p.avatarColor || "#0052CC";

  detailName.textContent = p.name;
  detailId.textContent = p.id;

  if (p.isVip) {
    detailVipBadge.classList.remove("d-none");
    detailRegularBadge.classList.add("d-none");
  } else {
    detailVipBadge.classList.add("d-none");
    detailRegularBadge.classList.remove("d-none");
  }

  detailPhone.textContent = p.phone;
  detailPhone.href = `tel:${p.phone}`;
  detailEmail.textContent = p.email || "N/A";
  detailFlag.textContent = p.flag || "";
  detailCountry.textContent = ` ${p.country}`;
  detailBirthdayAge.textContent = `${p.birthday} (${p.age} yrs)`;
  detailNric.textContent = p.nric || "N/A";
  detailOccupation.textContent = p.occupation || "N/A";
  detailLastVisit.textContent = p.lastVisit || "First Visit";
  detailRemarks.textContent = p.remarks || "No known allergies reported.";

  detailAppointmentsList.innerHTML = "";
  if (p.appointments && p.appointments.length > 0) {
    p.appointments.forEach(apt => {
      const aptFragment = appointmentTemplate.content.cloneNode(true);
      aptFragment.querySelector(".apt-date").textContent = apt.date;
      aptFragment.querySelector(".apt-title").textContent = apt.treatment;
      aptFragment.querySelector(".apt-doctor-name").textContent = apt.doctor;
      aptFragment.querySelector(".apt-symptoms").textContent = apt.symptoms;
      detailAppointmentsList.appendChild(aptFragment);
    });
  } else {
    const emptyMsg = document.createElement("p");
    emptyMsg.className = "text-muted small";
    emptyMsg.textContent = "No upcoming appointments recorded.";
    detailAppointmentsList.appendChild(emptyMsg);
  }

  if (offcanvasDrawer) {
    offcanvasDrawer.show();
  }
}

function toggleVip(id) {
  const patient = patients.find(p => p.id === id);
  if (patient) {
    patient.isVip = !patient.isVip;
    renderPatientTable();
  }
}

function deletePatient(id) {
  const patient = patients.find(p => p.id === id);
  if (patient && confirm(`Are you sure you want to delete ${patient.name}?`)) {
    patients = patients.filter(p => p.id !== id);
    applyFilters();
  }
}

function renderPagination() {
  const total = filteredPatients.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);

  pageCounter.textContent = `Showing ${start} to ${end} of ${total} results`;

  paginationButtons.innerHTML = "";

  const prevBtn = document.createElement("button");
  prevBtn.className = "btn btn-outline-secondary";
  prevBtn.disabled = currentPage === 1;
  prevBtn.innerHTML = '<i class="bi bi-chevron-left"></i>';
  prevBtn.onclick = () => goToPage(currentPage - 1);
  paginationButtons.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.className = `btn ${i === currentPage ? "btn-primary" : "btn-outline-secondary"}`;
    pageBtn.textContent = i;
    pageBtn.onclick = () => goToPage(i);
    paginationButtons.appendChild(pageBtn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.className = "btn btn-outline-secondary";
  nextBtn.disabled = currentPage === totalPages || total === 0;
  nextBtn.innerHTML = '<i class="bi bi-chevron-right"></i>';
  nextBtn.onclick = () => goToPage(currentPage + 1);
  paginationButtons.appendChild(nextBtn);
}

function goToPage(page) {
  const totalPages = Math.ceil(filteredPatients.length / pageSize) || 1;
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderPatientTable();
  }
}
