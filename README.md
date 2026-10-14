# 患者管理 - Patient Management System (Bootstrap 5)

A clean, responsive Patient Management System UI built with **Bootstrap 5**, **Bootstrap Icons**, and **Vanilla JavaScript** based on the assessment requirements.

---

## 📁 Project Structure

```
Assessment/
├── index.html        # Main HTML layout with Bootstrap 5 components
├── css/
│   └── styles.css    # Custom theme overrides (#0052CC sidebar, #FFD700 VIP, avatars)
├── js/
│   ├── data.js       # Initial patient records
│   └── app.js        # Table rendering, search, sort, Offcanvas & Modal
└── README.md         # Documentation and setup instructions
```

---

## 🎯 Features Implemented

1. **Bootstrap 5 UI & Bootstrap Icons**:
   - Built using Bootstrap 5.3 CDN with official **Bootstrap Icons** (`bi bi-*`).
   - Clean, lightweight, and responsive across all device sizes.

2. **Navigation Sidebar**:
   - Fixed on the left at `~240px` with background `#0052CC`.
   - Menu items with Bootstrap Icons:
     - Dashboard (`bi-speedometer2`)
     - Patient (`bi-people-fill`, active highlighted)
     - Queue (`bi-hourglass-split`, badge "2")
     - Consultation (`bi-chat-dots-fill`)
     - Warehouse (`bi-box-seam-fill`)
     - Reports (`bi-bar-chart-fill`)
     - Appointment (`bi-calendar-check-fill`, badge "5")
     - Settings (`bi-gear-fill`)
   - Bottom card: **"Update to Pro"** with white background and blue button.

3. **Top Header**:
   - White background with title `患者管理` and subtitle.
   - Search bar (min width 240px, light grey background, prefixed search icon).
   - `+ Add Patient` button.
   - Doctor profile with initials avatar (`SL`).

4. **Patient Table (No External Images - Avatars Only)**:
   - Name column with dynamic initials avatar circle, patient name, **VIP badge** (`#FFD700`), and ID number below.
   - Contact column with formatted country-coded phone number.
   - Nationality column with country flag emoji.
   - Datetime column formatted as `DD MMM YYYY HH:MM AM/PM`.
   - Action column with Bootstrap three-dots dropdown (`bi-three-dots-vertical`) offering View Profile, Toggle VIP, and Delete actions.
   - Alternating row background colors (`#FFFFFF` and `#F8F9FA`).
   - Pagination at the bottom with `"Showing X of Y results"`, page numbers, and Prev/Next buttons.

5. **Slide-In Right Panel (Bootstrap Offcanvas)**:
   - Uses Bootstrap 5 Offcanvas sliding in from the right when clicking any patient row.
   - Displays Contact, Email, Nationality, Birthday + Age, NRIC/Passport, Occupation, Last visit, and Medical remarks alert.
   - **Upcoming Appointments Section**: Appointment cards showing treatment type, date/time, assigned doctor, and symptoms summary.

6. **Add Patient Modal (Bootstrap 5 Modal)**:
   - Click `+ Add Patient` to open a Bootstrap modal dialog.
   - Form inputs for Name, Phone, Nationality, NRIC, Remarks, and VIP checkbox.
   - Validates and immediately adds the patient to the table.

7. **Interactive Sorting & Filtering**:
   - Live search input matching name, ID, or phone number.
   - Nationality dropdown filter.
   - Clickable table headers (Name, Nationality, Datetime) for ascending/descending sorting.

---

## 🎨 Color Palette

| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary Blue** | `#0052CC` | Sidebar, primary buttons, active link text |
| **Secondary Blue**| `#E8F0FE` | Badges, hover highlights |
| **Text Primary** | `#333333` | Body text, headings, names |
| **Text Secondary**| `#666666` | Subtitles, muted labels, timestamps |
| **Borders** | `#E5E5E5` | Dividers, card strokes |
| **Background Main**| `#FFFFFF` | Table surface, header, cards |
| **Background Alt** | `#F8F9FA` | Alternating table rows |
| **Success** | `#36B37E` | Status indicators |
| **VIP Badge** | `#FFD700` | High-priority patient gold badge |

---

## 🚀 How to Run

1. **Direct File Open**: Simply double-click `index.html` to open it directly in any browser.
2. **GitHub Pages**: Works directly when pushed to GitHub and enabled in repository settings.
3. **Local Live Server**:
   ```bash
   python -m http.server 8080
   ```
   and visit `http://localhost:8080`.
