/* =====================================================================
   main.js: shared code used on every page.
   1. Small helpers (escaping, formatting, labels)
   2. Cookie consent and preference cookies
   3. "Sign up now" pop-up: opens once by itself on the homepage
   4. Bootstrap carousel helper (events, featured posts, team)
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
const COURSE_LABELS = { antipasto: 'Antipasto', primo: 'Primo', secondo: 'Secondo', contorno: 'Contorno', dolce: 'Dolce' };
const COURSE_LABELS_EN = { antipasto: 'Starter', primo: 'First course', secondo: 'Main course', contorno: 'Side dish', dolce: 'Dessert' };
const REGION_LABELS = { north: 'The North', centre: 'The Centre', south: 'The South', islands: 'The Islands' };
const POST_TYPE_LABELS = { recipe: 'Recipe', tip: 'Tip', story: 'Story' };

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


/* ---------- 2. Cookie consent and preference cookies ----------------- */
/*
 * Two kinds of cookie:
 *   Essential   ff_cookie_consent remembers your choice itself (and in
 *               phase 2 the PHP session cookie keeps you logged in).
 *   Preference  ff_pref_... remember small choices, e.g. Metric or US
 *               cups. They are ONLY saved after "Accept all", and
 *               choosing "Essential only" deletes any that exist.
 */

const CONSENT_COOKIE = 'ff_cookie_consent';
const CONSENT_DAYS = 180;
const PREF_PREFIX = 'ff_pref_';

function getCookie(name) {
  const match = document.cookie.split('; ').find(row => row.startsWith(name + '='));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

function setCookie(name, value, days) {
  const maxAge = days * 24 * 60 * 60; // seconds
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function deleteCookie(name) {
  document.cookie = `${name}=; max-age=0; path=/; SameSite=Lax`;
}

/* "all" | "essential" | null (not chosen yet) */
function getConsent() {
  return getCookie(CONSENT_COOKIE);
}

/* Save a preference only if the visitor accepted all cookies */
function savePreference(name, value) {
  if (getConsent() !== 'all') return false;
  setCookie(PREF_PREFIX + name, value, CONSENT_DAYS);
  return true;
}

function getPreference(name) {
  return getConsent() === 'all' ? getCookie(PREF_PREFIX + name) : null;
}

function clearPreferences() {
  document.cookie.split('; ')
    .map(row => row.split('=')[0])
    .filter(name => name.startsWith(PREF_PREFIX))
    .forEach(deleteCookie);
}

const CONSENT_TEXT = {
  all: 'All cookies, including preferences',
  essential: 'Essential cookies only',
  none: 'Not chosen yet'
};

/* Show the current choice wherever the page has data-consent-status */
function showConsentStatus() {
  document.querySelectorAll('[data-consent-status]').forEach(element => {
    element.textContent = CONSENT_TEXT[getConsent() || 'none'];
  });
}

function setConsent(choice) {
  setCookie(CONSENT_COOKIE, choice, CONSENT_DAYS);
  if (choice !== 'all') clearPreferences();
  showConsentStatus();
  // Let other scripts react (e.g. the cookie policy page)
  document.dispatchEvent(new CustomEvent('ff:consentchange', { detail: { choice } }));
}

function setupCookieBanner() {
  const banner = document.getElementById('cookieBanner');

  // First visit: no choice saved yet, so show the banner.
  if (banner && !getConsent()) banner.hidden = false;

  // Any button with data-cookie-choice (banner AND the cookie policy page)
  document.querySelectorAll('[data-cookie-choice]').forEach(button => {
    button.addEventListener('click', () => {
      setConsent(button.dataset.cookieChoice);
      if (banner) banner.hidden = true;
    });
  });

  // "Cookie settings" in the footer opens the banner again
  document.querySelectorAll('[data-open-cookie-settings]').forEach(button => {
    button.addEventListener('click', () => {
      if (!banner) return;
      banner.hidden = false;
      banner.querySelector('button').focus(); // move keyboard users to the banner
    });
  });

  showConsentStatus();
}


/* ---------- 3. "Sign up now" pop-up ---------------------------------- */

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


/* ---------- 4. Bootstrap carousel helper ----------------------------- */
/*
 * Fills a Bootstrap carousel with cards, several per slide:
 * 3 per slide on large screens, 2 on tablets, 1 on phones.
 * When the screen size changes, the cards are regrouped.
 *
 * The carousel never moves by itself (no data-bs-ride), so people
 * have time to read; they use the arrows, the dots, swipe, or the
 * left/right arrow keys.
 *
 * root       the .carousel element (it needs an id)
 * items      the data to show
 * renderItem function(item, index) returning the HTML for one card
 * itemName   e.g. "events", used in "Showing events 1 to 3 of 6"
 * statusEl   element that announces what is showing (aria-live)
 */
function setupGroupedCarousel({ root, items, renderItem, itemName, statusEl, perSlide = { lg: 3, md: 2, xs: 1 } }) {
  if (!root || typeof bootstrap === 'undefined') return;

  const slidesEl = root.querySelector('.carousel-inner');
  const dotsEl = root.querySelector('.carousel-indicators');
  const large = window.matchMedia('(min-width: 992px)');
  const medium = window.matchMedia('(min-width: 768px)');
  let size = 1;

  function announce(slideIndex) {
    if (!statusEl) return;
    const first = slideIndex * size + 1;
    const last = Math.min(first + size - 1, items.length);
    statusEl.textContent = first === last
      ? `Showing ${itemName} ${first} of ${items.length}`
      : `Showing ${itemName} ${first} to ${last} of ${items.length}`;
  }

  function render() {
    size = large.matches ? perSlide.lg : medium.matches ? perSlide.md : perSlide.xs;

    // Split the items into groups, one group per slide
    const groups = [];
    for (let i = 0; i < items.length; i += size) groups.push(items.slice(i, i + size));

    slidesEl.innerHTML = groups.map((group, slide) => `
      <div class="carousel-item${slide === 0 ? ' active' : ''}" role="group" aria-roledescription="slide" aria-label="${slide + 1} of ${groups.length}">
        <ul class="ff-carousel__row" style="--per-slide: ${size}">
          ${group.map((item, k) => renderItem(item, slide * size + k)).join('')}
        </ul>
      </div>`).join('');

    if (dotsEl) {
      dotsEl.innerHTML = groups.map((_, slide) => `
        <button type="button" data-bs-target="#${root.id}" data-bs-slide-to="${slide}"
                ${slide === 0 ? 'class="active" aria-current="true"' : ''}
                aria-label="Show slide ${slide + 1} of ${groups.length}"></button>`).join('');
    }

    // Hide the arrows and dots if everything fits on one slide
    root.classList.toggle('is-single', groups.length < 2);
    announce(0);
  }

  render();
  bootstrap.Carousel.getOrCreateInstance(root, { interval: false, ride: false, wrap: true, touch: true, keyboard: true });

  // Bootstrap fires "slid.bs.carousel" after each move; event.to is the new slide number
  root.addEventListener('slid.bs.carousel', event => announce(event.to));

  large.addEventListener('change', render);
  medium.addEventListener('change', render);
}


/* ---------- 5. Shared card templates --------------------------------- */
/* Used on several pages, so they live here instead of in a page script. */

/* Small region icons (decorative) */
const REGION_ICONS = {
  north:   '<path d="M3 19 L9 9 L13 15 L16 11 L21 19 Z"/>',
  centre:  '<path d="M12 3 C9 8 9 14 10 19 H14 C15 14 15 8 12 3 Z"/><path d="M12 19 V22"/>',
  south:   '<circle cx="12" cy="12" r="4"/><path d="M12 2 V4.5 M12 19.5 V22 M2 12 H4.5 M19.5 12 H22 M4.9 4.9 L6.7 6.7 M17.3 17.3 L19.1 19.1 M4.9 19.1 L6.7 17.3 M17.3 6.7 L19.1 4.9"/>',
  islands: '<path d="M3 10 C6 7 9 13 12 10 C15 7 18 13 21 10"/><path d="M3 16 C6 13 9 19 12 16 C15 13 18 19 21 16"/>'
};

function regionIcon(slug, size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${REGION_ICONS[slug] || ''}</svg>`;
}

/* A "Saluti da ..." postcard for a community story */
function postcardHtml(post, tilt = '0deg') {
  return `
    <article class="postcard" style="--tilt: ${tilt}">
      <div class="d-flex justify-content-between align-items-start gap-3">
        <p class="postcard__from">Saluti da ${escapeHtml(post.place)}</p>
        <span class="postcard__stamp" aria-hidden="true">${regionIcon(post.region, 26)}</span>
      </div>
      ${post.image
        ? `<img class="postcard__photo" src="${escapeHtml(post.image)}" alt="${escapeHtml(post.image_alt)}" loading="lazy">`
        : `<div class="photo-placeholder">Photo: ${escapeHtml(post.image_alt)}</div>`}
      <blockquote class="postcard__quote m-0">&ldquo;${escapeHtml(post.body)}&rdquo;</blockquote>
      <p class="postcard__by">
        <strong>${escapeHtml(post.user_name)}</strong>, ${escapeHtml(post.area)}.
        <a class="fw-bold" href="community.php#post-${post.id}">${escapeHtml(post.title)}</a>
      </p>
    </article>`;
}

/*
 * A recipe card. The title link is "stretched" (Bootstrap .stretched-link)
 * so the whole card is clickable, but there is still only ONE link for
 * keyboard and screen-reader users.
 */
function recipeCardHtml(recipe) {
  return `
    <article class="recipe-card">
      ${recipe.image
        ? `<div class="recipe-card__photo"><img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.image_alt)}" loading="lazy"></div>`
        : `<div class="photo-placeholder recipe-card__photo">Photo: ${escapeHtml(recipe.image_alt)}</div>`}
      <div class="recipe-card__body">
        <p class="recipe-card__region">${regionIcon(recipe.region, 18)} ${REGION_LABELS[recipe.region]} &middot; ${COURSE_LABELS[recipe.course]}</p>
        <h3 class="recipe-card__title"><a class="stretched-link" href="recipe.php?id=${recipe.id}">${escapeHtml(recipe.title)}</a></h3>
        <p class="recipe-card__en">${escapeHtml(recipe.title_en)}</p>
        <p class="recipe-card__meta">
          <span><i class="bi bi-clock" aria-hidden="true"></i> ${escapeHtml(recipeTimeLabel(recipe))}</span>
          <span><i class="bi bi-bar-chart" aria-hidden="true"></i> ${DIFFICULTY_LABELS[recipe.difficulty]}</span>
        </p>
        ${recipe.dietary.length ? `<p class="recipe-card__tags">${recipe.dietary.map(d => `<span class="tag">${DIETARY_LABELS[d]}</span>`).join('')}</p>` : ''}
      </div>
    </article>`;
}


/* ---------- Start ----------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  setupCookieBanner();
  setupJoinPrompt();
});
