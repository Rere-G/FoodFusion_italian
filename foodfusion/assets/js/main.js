/* =====================================================================
   main.js: shared code used on every page.
   1. Small helpers (escaping, formatting)
   2. Cookie consent banner
   3. Join us pop-up: opens once by itself on the homepage
   ===================================================================== */

'use strict';


/* ---------- 1. Helpers ------------------------------------------------ */

/*
 * Escape text before putting it inside HTML.
 * In phase 2 recipes, comments and stories come from users, so this
 * stops someone posting <script> tags (an XSS attack). The PHP side
 * will also use htmlspecialchars().
 */
function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* 90 -> "1 hr 30 min", 120 -> "2 hr", 25 -> "25 min" */
function formatMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} hr`;
  return `${hours} hr ${mins} min`;
}

/* A recipe's total time line, including any waiting note */
function recipeTimeLabel(recipe) {
  const time = formatMinutes(recipe.time_minutes);
  return recipe.time_note ? `${time}, ${recipe.time_note}` : time;
}

const DIETARY_LABELS = { vegetarian: 'Vegetarian', vegan: 'Vegan', gluten_free: 'Gluten-free' };
const DIFFICULTY_LABELS = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

/* ['vegan', 'gluten_free'] -> "Vegan, Gluten-free" */
function dietaryLabel(dietary) {
  return dietary.map(key => DIETARY_LABELS[key]).join(', ');
}

/*
 * Turn "2026-11-14" into a Date at local midnight.
 * (new Date('2026-11-14') would be UTC midnight, which can show the
 * wrong day in some time zones.)
 */
function parseDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/* "2026-10-12" -> "12 October 2026" */
function formatDate(isoDate) {
  return parseDate(isoDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* Browser storage can throw (private mode, blocked storage), so wrap it. */
function sessionGet(key) {
  try { return sessionStorage.getItem(key); } catch (error) { return null; }
}
function sessionSet(key, value) {
  try { sessionStorage.setItem(key, value); } catch (error) { /* ignore: nice-to-have only */ }
}


/* ---------- 2. Cookie consent ---------------------------------------- */

const CONSENT_COOKIE = 'ff_cookie_consent';
const CONSENT_DAYS = 180;

function getCookie(name) {
  const match = document.cookie.split('; ').find(row => row.startsWith(name + '='));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

function setCookie(name, value, days) {
  const maxAge = days * 24 * 60 * 60; // seconds
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function setupCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;

  // First visit: no choice saved yet, so show the banner.
  if (!getCookie(CONSENT_COOKIE)) {
    banner.hidden = false;
  }

  // "Accept all" and "Essential only" both use data-cookie-choice
  banner.querySelectorAll('[data-cookie-choice]').forEach(button => {
    button.addEventListener('click', () => {
      setCookie(CONSENT_COOKIE, button.dataset.cookieChoice, CONSENT_DAYS);
      banner.hidden = true;
    });
  });

  // "Cookie settings" in the footer opens it again
  const settingsButton = document.getElementById('cookieSettings');
  if (settingsButton) {
    settingsButton.addEventListener('click', () => {
      banner.hidden = false;
      banner.querySelector('button').focus(); // move keyboard users to the banner
    });
  }
}


/* ---------- 3. Join us pop-up ---------------------------------------- */

const JOIN_PROMPT_KEY = 'ff_join_prompt_seen';
const JOIN_PROMPT_DELAY = 20000; // 20 seconds

function setupJoinPrompt() {
  const modalElement = document.getElementById('joinModal');
  if (!modalElement || typeof bootstrap === 'undefined') return;

  // Once the visitor has seen it (opened by them or by us), don't pop it up again this session.
  modalElement.addEventListener('shown.bs.modal', () => sessionSet(JOIN_PROMPT_KEY, 'yes'));

  // Only the homepage opens it by itself.
  // (data-page is printed on <body> by includes/header.php)
  const isHomepage = document.body.dataset.page === 'home';
  if (!isHomepage || sessionGet(JOIN_PROMPT_KEY)) return;

  setTimeout(() => {
    // Don't interrupt if another modal is already open or it was seen meanwhile.
    if (document.querySelector('.modal.show') || sessionGet(JOIN_PROMPT_KEY)) return;
    bootstrap.Modal.getOrCreateInstance(modalElement).show();
  }, JOIN_PROMPT_DELAY);
}


/* ---------- Start ----------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  setupCookieBanner();
  setupJoinPrompt();
});
