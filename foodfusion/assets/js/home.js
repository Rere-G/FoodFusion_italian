/* =====================================================================
   home.js: homepage only. Fills each section with data from data.js.
   1. Region map          4. Events carousel (Bootstrap)
   2. Cook along          5. News feed: featured recipes and trends
   3. Postcard stories
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

const EVENT_THEMES = ['red', 'sable', 'navy', 'melon', 'cream'];

function eventPosterHtml(event, index) {
  const date = parseDate(event.event_date);
  const dateText = date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  return `
    <li class="event-poster event-poster--${EVENT_THEMES[index % EVENT_THEMES.length]}">
      <p class="event-poster__weekday">${date.toLocaleDateString('en-GB', { weekday: 'long' })}</p>
      <p class="event-poster__day">${String(date.getDate()).padStart(2, '0')}</p>
      <p class="event-poster__month">${date.toLocaleDateString('en-GB', { month: 'long' })}</p>
      <p class="event-poster__it">${escapeHtml(event.title_it)}</p>
      <h3 class="event-poster__title">${escapeHtml(event.title)}</h3>
      <p><time datetime="${event.event_date}T${event.start_time}">${escapeHtml(event.location)}, ${event.start_time}</time></p>
      <div class="event-poster__actions">
        <button type="button" class="link-button event-poster__cta" data-bs-toggle="modal" data-bs-target="#joinModal">Save my seat</button>
        ${shareMenuHtml({ title: event.title, text: `${dateText}, ${event.location}`, path: 'index.php#eventsTitle' }, 'share-btn share-btn--poster')}
      </div>
    </li>`;
}

async function setupEvents() {
  const allEvents = await getEvents();
  setupGroupedCarousel({                             // from main.js
    root: document.getElementById('eventsCarousel'),
    items: allEvents,
    renderItem: eventPosterHtml,
    itemName: 'events',
    statusEl: document.getElementById('eventsStatus')
  });
}


/* ---------- 5. News feed --------------------------------------------- */

async function renderNewsFeed() {
  const [featured, items] = await Promise.all([getFeaturedRecipes(), getNews()]);

  document.getElementById('featuredRecipes').innerHTML = featured.map(recipe => `
    <li>
      <a class="feature-item" href="recipe.php?id=${recipe.id}">
        <span class="photo-placeholder feature-item__photo" aria-hidden="true"></span>
        <span>
          <span class="feature-item__title">${escapeHtml(recipe.title)}</span>
          <span class="feature-item__en">${escapeHtml(recipe.title_en)}</span>
          <span class="feature-item__meta">${REGION_LABELS[recipe.region]} &middot; ${escapeHtml(recipeTimeLabel(recipe))}</span>
        </span>
      </a>
    </li>`).join('');

  document.getElementById('newsList').innerHTML = items.map(item => `
    <article class="news-card">
      <div class="photo-placeholder">Photo: ${escapeHtml(item.image_alt)}</div>
      <p class="news-card__date"><time datetime="${item.published_on}">${formatDate(item.published_on)}</time></p>
      <h4 class="news-card__title"><a href="community.php">${escapeHtml(item.title)}</a></h4>
      <p class="news-card__text">${escapeHtml(item.summary)}</p>
    </article>`).join('');
}


/* ---------- Start ----------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  setupRegionMap();
  setupHomeCookAlong();
  renderStories();
  setupEvents();
  renderNewsFeed();
});
