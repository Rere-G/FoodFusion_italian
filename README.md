# FoodFusion

An Italian home-cooking community website.

Recipes from the Alps to Sicily, step-by-step cooking help, a community cookbook, and the
stories of the families who cook them.

## Tech stack

- HTML5, CSS3, [Bootstrap 5.3.3](https://getbootstrap.com/) and Bootstrap Icons 1.11.3 (CDN)
- Vanilla JavaScript (ES6), no frameworks
- PHP 8 (shared page parts now; database, login and web service in phase 2)
- MySQL (phase 2)

## Run it locally (XAMPP)

1. Copy the `foodfusion` folder into `C:\xampp\htdocs\`.
2. Start **Apache** in the XAMPP Control Panel.
3. Open <http://localhost/foodfusion/>. If Apache uses port 8080, open
   <http://localhost:8080/foodfusion/> instead.

The pages are `.php` files, so they must be opened through Apache, not by double-clicking.

## Folder structure

```
foodfusion/
├── index.php              Homepage
├── recipes.php, recipe.php, community.php, about.php, contact.php
├── culinary-resources.php, educational-resources.php
├── privacy.php, cookies.php, login.php
├── includes/              Shared header, footer, cookie banner, Join us pop-up
├── assets/
│   ├── css/style.css      Design tokens and all custom styles
│   ├── js/                data.js (placeholder data) and page scripts
│   └── img/               Images
├── downloads/             Downloadable PDFs
├── api/                   Phase 2: PHP web service returning JSON
├── sql/                   Phase 2: database schema and seed data
└── docs/                  references.md (Harvard) and testing.md
```

## Progress

| Phase | Scope | Status |
|---|---|---|
| 1. Frontend | All 7 brief pages plus recipe, privacy, cookie and log-in pages; responsive and accessible; placeholder data and PDFs | Done (real photos and videos still to add) |
| 2. Backend | MySQL database, registration, login with lockout, JSON web service | Not started |
| 3. Report | Screenshots, ERD, testing table, reflection | Not started |

## Credits

All third-party sources are listed in [`foodfusion/docs/references.md`](foodfusion/docs/references.md).
