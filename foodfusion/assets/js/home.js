/* =====================================================================
   home.js: homepage only. Fills each section with data from data.js.
   1. Region map          5. Mission counters
   2. Cook along          6. Featured recipe spotlight
   3. Postcard stories    7. Latest recipes
   4. Events carousel     8. Culinary trends carousel (Bootstrap)
   Plus: scroll reveal and the hero typewriter line.
   (The monthly challenge is filled by community.js, which the
   Community Cookbook page uses too.)
   ===================================================================== */

'use strict';


/* ---------- 1. Region map -------------------------------------------- */

async function setupRegionMap() {
  const [allRegions, allRecipes] = await Promise.all([getRegions(), getRecipes()]);
  const panel = document.getElementById('regionPanel');
  const mapImage = document.getElementById('italyMap');
  // The region chips AND the pins on the map: both choose a region
  const buttons = document.querySelectorAll('.region-btn, .map-pin');

  function showRegion(slug) {
    const region = allRegions.find(r => r.slug === slug);
    const dishes = region.featured_recipe_ids.map(id => allRecipes.find(r => r.id === id)).filter(Boolean);

    // Pressed state on chips and pins (CSS styles the pressed ones, so the
    // look and what a screen reader announces always match)
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.region === slug)));

    // Keep the map's text alternative up to date
    mapImage.alt = `Illustrated map of Italy's 20 regions. ${region.name} is selected.`;

    panel.innerHTML = `
      <h3 class="region-panel__title">${escapeHtml(region.name)}</h3>
      <p class="ff-italian ff-italian--lg">${escapeHtml(region.name_it)}</p>
      <p class="region-panel__desc">${escapeHtml(region.description)}</p>
      <ul class="dish-list">
        ${dishes.map(dish => `
          <li>
            <a class="dish" href="recipe.php?id=${dish.id}">
              <span class="dish__names">
                <span class="dish__name">${escapeHtml(dish.title)}</span>
                <span class="dish__en">${escapeHtml(dish.title_en)}</span>
              </span>
              <span class="dish__meta"><i class="bi bi-clock" aria-hidden="true"></i> ${escapeHtml(recipeTimeLabel(dish))}</span>
              <span class="dish__meta"><i class="bi bi-bar-chart" aria-hidden="true"></i> ${DIFFICULTY_LABELS[dish.difficulty]}</span>
              ${dish.dietary.length ? `<span class="tag">${escapeHtml(dietaryLabel(dish.dietary))}</span>` : ''}
            </a>
          </li>`).join('')}
      </ul>
      <a class="ff-btn ff-btn--primary ff-btn--lg mt-4" href="recipes.php?region=${region.slug}">See recipes from ${escapeHtml(region.name.replace('The ', 'the '))}</a>`;
  }

  buttons.forEach(button => button.addEventListener('click', () => showRegion(button.dataset.region)));
  showRegion('north');
}


/* ---------- 2. Cook along -------------------------------------------- */

async function setupHomeCookAlong() {
  const container = document.getElementById('cookAlong');
  const recipe = await getRecipe(Number(container.dataset.recipeId));
  if (!recipe || !recipe.steps) return;

  document.getElementById('cookRecipeName').textContent = `Si cucina! ${recipe.title}`;
  setupCookAlong(container, recipe); // from recipe.js
}


/* ---------- 3. Postcard stories -------------------------------------- */

async function renderStories() {
  const stories = await getPosts('story');
  const tilts = ['-2deg', '1.5deg', '-1deg'];
  document.getElementById('storyList').innerHTML = stories
    .slice(0, 3)
    .map((post, index) => postcardHtml(post, tilts[index % tilts.length])) // postcardHtml is in main.js
    .join('');
}


/* ---------- 4. Events carousel (Bootstrap) --------------------------- */

/*
 * One big photo slide for the current event, with the next two events
 * "peeking" in on the right. Each Bootstrap slide holds that whole row,
 * so the row slides as one; clicking a peek card jumps to that event.
 * The peek cards repeat events that have their own slide, so they are
 * hidden from screen readers and the Tab key (the arrows and dots do the job).
 */

/* A real photo when the event has one, the drawn placeholder otherwise */
function eventPhotoHtml(event) {
  return event.image
    ? `<img class="event-media" src="${escapeHtml(event.image)}" alt="" loading="lazy">`
    : '<div class="event-media photo-placeholder"></div>';
}

function eventSlideHtml(event) {
  const date = parseDate(event.event_date);
  const dateText = date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  return `
    <article class="event-slide">
      ${eventPhotoHtml(event)}
      <div class="event-slide__content">
        <p class="event-poster__weekday">${date.toLocaleDateString('en-GB', { weekday: 'long' })}</p>
        <p class="event-poster__day">${String(date.getDate()).padStart(2, '0')}</p>
        <p class="event-poster__month">${date.toLocaleDateString('en-GB', { month: 'long' })}</p>
        <p class="event-poster__it">${escapeHtml(event.title_it)}</p>
        <h3 class="event-poster__title">${escapeHtml(event.title)}</h3>
        <p><time datetime="${event.event_date}T${event.start_time}">${escapeHtml(event.location)}, ${event.start_time}</time></p>
        <div class="event-slide__actions">
          <button type="button" class="ff-btn ff-btn--sable ff-btn--lg" data-bs-toggle="modal" data-bs-target="#joinModal">Save my seat <i class="bi bi-arrow-right" aria-hidden="true"></i></button>
          ${shareMenuHtml({ title: event.title, text: `${dateText}, ${event.location}`, path: 'index.php#eventsTitle' }, 'share-btn share-btn--poster')}
        </div>
      </div>
    </article>`;
}

function eventPeekHtml(event, index, sliver) {
  const date = parseDate(event.event_date);
  return `
    <button type="button" class="event-peek${sliver ? ' event-peek--sliver' : ''}" data-bs-target="#eventsCarousel" data-bs-slide-to="${index}" tabindex="-1" aria-hidden="true">
      ${eventPhotoHtml(event)}
      <span class="event-peek__content">
        <span class="event-peek__day">${String(date.getDate()).padStart(2, '0')}</span>
        <span class="event-peek__month">${date.toLocaleDateString('en-GB', { month: 'short' })}</span>
        <span class="event-peek__title">${escapeHtml(event.title)}</span>
      </span>
    </button>`;
}

async function setupEvents() {
  const allEvents = await getEvents();
  const root = document.getElementById('eventsCarousel');
  const status = document.getElementById('eventsStatus');
  const count = allEvents.length;
  if (!root || !count || typeof bootstrap === 'undefined') return;

  root.querySelector('.carousel-inner').innerHTML = allEvents.map((event, i) => `
    <div class="carousel-item${i === 0 ? ' active' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${count}">
      <div class="event-stage__row">
        ${eventSlideHtml(event)}
        ${count > 1 ? eventPeekHtml(allEvents[(i + 1) % count], (i + 1) % count, false) : ''}
        ${count > 2 ? eventPeekHtml(allEvents[(i + 2) % count], (i + 2) % count, true) : ''}
      </div>
    </div>`).join('');

  root.querySelector('.carousel-indicators').innerHTML = allEvents.map((event, i) => `
    <button type="button" data-bs-target="#eventsCarousel" data-bs-slide-to="${i}"${i === 0 ? ' class="active" aria-current="true"' : ''}
      aria-label="Event ${i + 1}: ${escapeHtml(event.title)}"></button>`).join('');

  const announce = i => { status.textContent = `Event ${i + 1} of ${count}`; };
  announce(0);
  root.addEventListener('slid.bs.carousel', event => announce(event.to));
  bootstrap.Carousel.getOrCreateInstance(root, { interval: false, ride: false, wrap: true, touch: true, keyboard: true });
}


/* ---------- 5. Mission counters -------------------------------------- */
/* Live totals from data.js, then a count-up from 0 when they come into view */
async function setupMissionStats() {
  const [allRecipes, allPosts] = await Promise.all([getRecipes(), getPosts()]);
  const totals = { recipes: allRecipes.length, posts: allPosts.length };
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(el => {
    if (el.dataset.stat) el.dataset.count = totals[el.dataset.stat];
    el.textContent = el.dataset.count + (el.dataset.suffix || '');
  });

  if (!('IntersectionObserver' in window) || prefersReducedMotion()) return;
  const countUp = el => {
    const target = Number(el.dataset.count);
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + (progress === 1 ? el.dataset.suffix || '' : '');
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    countUp(entry.target);
    observer.unobserve(entry.target);
  }), { threshold: 0.6 });
  counters.forEach(el => observer.observe(el));
}


/* ---------- 6. Featured recipes carousel ----------------------------- */
/* Bootstrap's carousel (bootstrap.bundle.js) handles sliding, swiping,
   keyboard arrows and the active tab; we only write the slides. */

const SPOTLIGHT_BADGE = `
  <svg class="spotlight__badge" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
    <defs><path id="badgeRing" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"/></defs>
    <circle cx="100" cy="100" r="96" fill="#F2C84B"/>
    <text><textPath href="#badgeRing">RICETTA DELLA SETTIMANA &#8226; RECIPE OF THE WEEK &#8226;</textPath></text>
    <path d="M100,72 l8,17 19,2 -14,13 4,19 -17,-10 -17,10 4,-19 -14,-13 19,-2 Z" fill="#B23E10"/>
  </svg>`;

/* The dish: a cut-out photo that turns slowly, with shadows that stay still.
   A recipe without a cut-out yet shows an empty plate with its region icon. */
function spotlightDishHtml(recipe, isFirst) {
  const shadows = `
    <span class="spotlight__shadow spotlight__shadow--ambient" aria-hidden="true"></span>
    <span class="spotlight__shadow spotlight__shadow--contact" aria-hidden="true"></span>`;
  if (recipe.cutout_image) {
    return `
      <div class="spotlight__dish">${shadows}
        <img class="spotlight__food" src="${escapeHtml(recipe.cutout_image)}" alt="${escapeHtml(recipe.image_alt)}"
             width="640" height="640" ${isFirst ? 'fetchpriority="high"' : 'loading="lazy"'}>
      </div>`;
  }
  return `
    <div class="spotlight__dish">${shadows}
      <div class="spotlight__plate" role="img" aria-label="${escapeHtml(recipe.image_alt)}">${regionIcon(recipe.region, 72)}</div>
    </div>`;
}

function spotlightSlideHtml(recipe, index, total) {
  const isFirst = index === 0;
  return `
    <div class="carousel-item${isFirst ? ' active' : ''}" role="group" aria-roledescription="slide" aria-label="${index + 1} of ${total}">
      <div class="row g-4 g-lg-5 align-items-center">
        <div class="col-lg-5 d-flex justify-content-center">
          <div class="spotlight__art">
            ${isFirst ? SPOTLIGHT_BADGE : ''}
            ${spotlightDishHtml(recipe, isFirst)}
          </div>
        </div>
        <div class="col-lg-7">
          <p class="eyebrow eyebrow--sable"><i class="bi bi-star-fill" aria-hidden="true"></i> ${isFirst ? 'Recipe of the week' : 'Featured recipe'}</p>
          <p class="spotlight__region">${regionIcon(recipe.region, 18)} ${REGION_LABELS[recipe.region]} &middot; ${COURSE_LABELS[recipe.course]}</p>
          <h3 class="spotlight__title">${escapeHtml(recipe.title)}</h3>
          <p class="ff-italian ff-italian--lg ff-italian--sable">${escapeHtml(recipe.title_en)}</p>
          <p class="spotlight__desc">${escapeHtml(recipe.description)}</p>
          <ul class="spotlight__chips">
            <li><i class="bi bi-clock" aria-hidden="true"></i> ${escapeHtml(recipeTimeLabel(recipe))}</li>
            <li><i class="bi bi-bar-chart" aria-hidden="true"></i> ${DIFFICULTY_LABELS[recipe.difficulty]}</li>
            <li><i class="bi bi-people" aria-hidden="true"></i> Serves ${recipe.base_servings}</li>
            <li><i class="bi bi-list-check" aria-hidden="true"></i> ${recipe.ingredients.length} ingredients</li>
          </ul>
          <div class="d-flex flex-wrap gap-3 mt-4">
            <a class="ff-btn ff-btn--sable ff-btn--lg" href="recipe.php?id=${recipe.id}"><i class="bi bi-fire" aria-hidden="true"></i> Cook this recipe</a>
            <a class="ff-btn ff-btn--outline-light ff-btn--lg" href="recipes.php"><i class="bi bi-grid" aria-hidden="true"></i> More recipes</a>
          </div>
        </div>
      </div>
    </div>`;
}

async function renderSpotlight() {
  const featured = await getFeaturedRecipes();
  const slides = document.getElementById('spotlightSlides');
  const tabs = document.getElementById('spotlightTabs');
  if (!slides || !tabs || !featured.length) return;

  slides.innerHTML = featured.map((recipe, i) => spotlightSlideHtml(recipe, i, featured.length)).join('');

  // Bootstrap moves the "active" class and aria-current between these tabs
  tabs.innerHTML = featured.map((recipe, i) => `
    <button type="button" data-bs-target="#spotlightCarousel" data-bs-slide-to="${i}"${i === 0 ? ' class="active" aria-current="true"' : ''}>
      <span class="spotlight__tab-icon">${regionIcon(recipe.region, 18)}</span>
      <span><strong>${escapeHtml(recipe.title)}</strong> <span class="spotlight__tab-en">${escapeHtml(recipe.title_en)}</span></span>
    </button>`).join('');
}


/* ---------- 7. Latest recipes ---------------------------------------- */
/* Newest first: the highest ids were added last (phase 2: ORDER BY created_at DESC) */
async function renderLatestRecipes() {
  const latest = (await getRecipes()).slice().sort((a, b) => b.id - a.id).slice(0, 4);
  document.getElementById('latestRecipes').innerHTML = latest.map((recipe, index) => `
    <li class="latest-item" data-reveal style="--delay: ${index * 0.1}s">
      <span class="latest-item__badge"><i class="bi bi-stars" aria-hidden="true"></i> New</span>
      ${recipeCardHtml(recipe)}
    </li>`).join('');
  observeReveals(document.getElementById('latestRecipes'));
}


/* ---------- 8. Culinary trends carousel ------------------------------ */
/* Photo cards, 3 per slide on large screens, 2 on tablets, 1 on phones */

function trendCardHtml(item, index) {
  const photo = item.image
    ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.image_alt)}" loading="lazy">`
    : `<div class="photo-placeholder" role="img" aria-label="${escapeHtml(item.image_alt)}"></div>`;
  return `
    <li>
      <article class="trend-card">
        <div class="trend-card__media">
          ${photo}
          <span class="trend-card__tag"><i class="bi ${escapeHtml(item.icon || 'bi-fire')}" aria-hidden="true"></i> ${escapeHtml(item.tag)}</span>
          <time class="trend-card__stamp" datetime="${item.published_on}">${formatDate(item.published_on)}</time>
        </div>
        <div class="trend-card__body">
          <p class="trend-card__kicker">Trend ${String(index + 1).padStart(2, '0')}</p>
          <h3 class="trend-card__title"><a class="stretched-link" href="community.php">${escapeHtml(item.title)}</a></h3>
          <p class="trend-card__text">${escapeHtml(item.summary)}</p>
          <span class="trend-card__more" aria-hidden="true">Talk about it <i class="bi bi-arrow-right"></i></span>
        </div>
      </article>
    </li>`;
}

async function renderTrends() {
  setupGroupedCarousel({                             // from main.js
    root: document.getElementById('trendsCarousel'),
    items: await getNews(),
    renderItem: trendCardHtml,
    itemName: 'trends',
    statusEl: document.getElementById('trendsStatus')
  });
}


/* ---------- Scroll reveal -------------------------------------------- */
/* Elements with data-reveal fade and rise in when they scroll into view.
   They are only hidden once this runs (html.js-reveal), so without
   JavaScript or with "reduce motion" on, everything is simply shown. */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

let revealObserver = null;
function observeReveals(scope = document) {
  if (!revealObserver) return;
  scope.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach(el => revealObserver.observe(el));
}

function setupReveal() {
  if (!('IntersectionObserver' in window) || prefersReducedMotion()) return;
  document.documentElement.classList.add('js-reveal');
  revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-revealed');
    revealObserver.unobserve(entry.target);
  }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  observeReveals();
}


/* ---------- Hero typewriter line ------------------------------------- */
/* Types the Italian line one letter at a time. Without JavaScript, or with
   "reduce motion" on, the full line simply stays as written in the HTML. */
function typeHeroLine() {
  const el = document.getElementById('heroTyped');
  if (!el || prefersReducedMotion()) return;
  const text = el.textContent;
  el.textContent = '';
  let i = 0;
  const typeNext = () => {
    el.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(typeNext, text[i - 1] === ',' ? 260 : 70 + Math.random() * 50);
  };
  setTimeout(typeNext, 500);
}


/* ---------- Start ----------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  setupReveal();
  typeHeroLine();
  setupMissionStats();
  renderSpotlight();
  renderLatestRecipes();
  renderTrends();
  setupRegionMap();
  setupHomeCookAlong();
  renderStories();
  setupEvents();
});
