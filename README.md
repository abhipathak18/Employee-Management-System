# Employee Management System

A responsive Employee Management System built with plain HTML, CSS, and JavaScript. It lets you register new employees, view them in a searchable/filterable table, and delete records — all in the browser, no backend required.

**Repository:** [github.com/abhipathak18/Employee-Management-System](https://github.com/abhipathak18/Employee-Management-System)

## Project Overview

This project was built as a course assignment to practice DOM manipulation, form validation, CRUD operations, and responsive layout without relying on any framework. Employee data is kept in memory and persisted to `localStorage`, so records survive a page refresh.

The UI uses a soft glassmorphism style: a frosted glass panel and icon sidebar sit over blurred gradient blobs (pink, purple, teal, amber), with pill-shaped buttons and inputs throughout.

## Technologies Used

- HTML5 (semantic elements: `header`, `section`, `article`, `footer`, `table`)
- CSS3 (Flexbox, Grid, media queries, CSS custom properties)
- Vanilla JavaScript (ES6+, DOM APIs, array methods)
- Browser `localStorage` for persistence
- Google Fonts (JetBrains Mono)

No external JS libraries or build tools are used.

## Features

- **Register employees** through a validated form (name, email, department, position, salary)
- **View all employees** in a table with ID, name, email, department, position, and salary
- **Delete employees** with a confirmation prompt
- **Search** employees by name in real time
- **Filter** employees by department
- **Sort** by name (A–Z / Z–A) or salary (low–high / high–low)
- **Dashboard cards** showing total employees, number of departments, and average salary
- **Export** the current employee list as a `.json` file
- **Dark / light mode toggle**
- **Data persistence** via `localStorage` — added or deleted employees are remembered after a refresh
- Fully responsive layout for desktop, tablet, and mobile

## Folder Structure

```
Employee-Management-System/
│
├── index.html          # Page structure and layout
├── style.css            # Styling and responsive layout
├── script.js             # Form handling, rendering, search/filter/sort, localStorage
├── README.md
│
├── images/               # Screenshots of view
│
└── data/
    └── employees.json    # Sample starting dataset
```

## Installation & Setup

No build steps or dependencies are required.

1. Clone the repository:

   ```bash
   git clone https://github.com/abhipathak18/Employee-Management-System.git
   cd Employee-Management-System
   ```

2. Open `index.html` directly in a browser (double-click, or right-click → Open with browser).
3. That's it — the app runs entirely client-side.

Optional: serve it locally with any static server, e.g.

```bash
npx serve .
```

### Live Demo
Site is live at `https://employee-management-system-seven-sable.vercel.app/`.

## How to Use

1. Fill in the registration form under **register** and click **add employee**.
2. Scroll to **directory** to see the employee table update instantly.
3. Use the search box, department dropdown, or sort dropdown under **query** to narrow down the list.
4. Click **delete** on any row to remove that employee (a confirmation prompt appears first).
5. Click **export json** to download the current list as `employees.json`.
6. Use the toggle in the top-right corner to switch between dark and light mode.

## Screenshots

- ![Destop view 1](<images/Screenshot 2026-07-15 125231.png>) — full desktop view 1
- ![Desktop view 2](<images/Screenshot 2026-07-15 125528.png>) — full desktop view 2
- ![Mobile view 1](<images/Screenshot 2026-07-15 130019.png>) — full mobile view 1
- ![Mobile view 2](<images/Screenshot 2026-07-15 130057.png>) — full mobile view 2

## Future Improvements

- Edit existing employee records instead of only add/delete
- Employee profile photo upload
- Pagination for large employee lists
- Import employees from a `.csv` or `.json` file
- Deploy live via GitHub Pages / Vercel / Netlify

## Author

**Abhi Pathak**
B.Tech Computer Engineering, GLA University (Batch 2024–2028)
GitHub: [@abhipathak18](https://github.com/abhipathak18)
