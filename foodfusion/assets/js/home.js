/* =====================================================================
   home.js: homepage only. Fills each section with data from data.js.
   1. Region map          4. Monthly challenge (likes + Leading badge)
   2. Cook along          5. Events poster wall
   3. Postcard stories    6. News feed
   ===================================================================== */

'use strict';

/* Small region icons, used on the postcard stamps (decorative) */
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


/* ---------- 1. Region map -------------------------------------------- */

async function setupRegionMap() {
  const [allRegions, allRecipes] = await Promise.all([getRegions(), getRecipes()]);
  const panel = document.getElementById('regionPanel');
  const map = document.getElementById('italyMap');
  const buttons = document.querySelectorAll('.region-btn');

  function showRegion(slug) {
    const region = allRegions.find(r => r.slug === slug);
    const dishes = region.featured_recipe_ids.map(id => allRecipes.find(r => r.id === id)).filter(Boolean);

    // Button state (CSS styles the pressed one)
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.region === slug)));

    // Map highlight and its text alternative
    map.querySelectorAll('.map-area').forEach(area => area.classList.toggle('is-active', area.dataset.region === slug));
    map.setAttribute('aria-label', `Map of Italy with ${region.name} highlighted`);

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

  document.getElementById('storyList').innerHTML = stories.map((post, index) => `
    <article class="postcard" style="--tilt: ${tilts[index % tilts.length]}">
      <div class="d-flex justify-content-between align-items-start gap-3">
        <p class="postcard__from">Saluti da ${escapeHtml(post.place)}</p>
        <span class="postcard__stamp" aria-hidden="true">${regionIcon(post.region, 26)}</span>
      </div>
      <div class="photo-placeholder">Photo: ${escapeHtml(post.image_alt)}</div>
      <blockquote class="postcard__quote m-0">&ldquo;${escapeHtml(post.story)}&rdquo;</blockquote>
      <p class="postcard__by">
        <strong>${escapeHtml(post.user_name)}</strong>, ${escapeHtml(post.area)}.
        <a class="fw-bold" href="community.php#post-${post.id}">${escapeHtml(post.title)}</a>
      </p>
    </article>`).join('');
}


/* ---------- 4. Monthly challenge ------------------------------------- */

async function setupChallenge() {
  const challenge = await getChallenge();
  const entries = await getChallengeEntries(challenge.id);
  const closes = parseDate(challenge.closes_on);

  document.getElementById('challenge').innerHTML = `
    <div class="ticket">
      <div class="ticket__main">
        <p class="ticket__label"><i class="bi bi-trophy" aria-hidden="true"></i> La sfida del mese</p>
        <h2 class="ff-heading mt-2" id="challengeTitle">${escapeHtml(challenge.title)}</h2>
        <p class="fs-5 mt-3 mb-0">${escapeHtml(challenge.description)}</p>
        <ol>${challenge.rules.map(rule => `<li>${escapeHtml(rule)}</li>`).join('')}</ol>
      </div>
      <div class="ticket__stub">
        <p class="fw-bold m-0">Entries close</p>
        <p class="ticket__day">${closes.getDate()}</p>
        <p class="ticket__month">${closes.toLocaleDateString('en-GB', { month: 'long' })}</p>
        <a class="ff-btn ff-btn--navy align-self-start mt-2" href="community.php#challenge">Enter the challenge</a>
      </div>
    </div>`;

  // likedIds remembers which entries this visitor liked (phase 2: api/like.php)
  const likedIds = new Set();
  const list = document.getElementById('entryList');

  function render() {
    const counts = entries.map(entry => entry.likes + (likedIds.has(entry.id) ? 1 : 0));
    const top = Math.max(...counts);

    list.innerHTML = entries.map((entry, index) => {
      const liked = likedIds.has(entry.id);
      const count = counts[index];
      return `
        <li class="entry">
          <div class="photo-placeholder">
            Photo: ${escapeHtml(entry.image_alt)}
            ${count === top ? '<span class="badge-leading"><i class="bi bi-star-fill" aria-hidden="true"></i> Leading</span>' : ''}
          </div>
          <div class="entry__body">
            <h4 class="entry__title"><a href="community.php#entry-${entry.id}">${escapeHtml(entry.title)}</a></h4>
            <p class="m-0">${escapeHtml(entry.user_name)}, ${escapeHtml(entry.user_location)}</p>
            <div class="mt-auto pt-2">
              <button type="button" class="like-btn" data-entry-id="${entry.id}" aria-pressed="${liked}"
                      aria-label="${liked ? 'Unlike' : 'Like'} ${escapeHtml(entry.title)}, ${count} likes">
                <i class="bi ${liked ? 'bi-heart-fill' : 'bi-heart'}" aria-hidden="true"></i> ${count}
              </button>
            </div>
          </div>
        </li>`;
    }).join('');
  }

  // One listener on the list handles every like button ("event delegation"),
  // so it keeps working after the list is redrawn.
  list.addEventListener('click', event => {
    const button = event.target.closest('.like-btn');
    if (!button) return;
    const id = Number(button.dataset.entryId);
    likedIds.has(id) ? likedIds.delete(id) : likedIds.add(id);
    render();
    list.querySelector(`[data-entry-id="${id}"]`).focus(); // keep keyboard focus on the same button
  });

  render();
}


/* ---------- 5. Events poster wall ------------------------------------ */

async function setupEvents() {
  const allEvents = await getEvents();
  const themes = ['red', 'sable', 'navy', 'melon', 'cream'];
  const VISIBLE = 3;
  let start = 0;

  const list = document.getElementById('eventList');
  const range = document.getElementById('eventsRange');

  function render() {
    // Show 3 events, wrapping round to the start after the last one
    const visible = [];
    for (let k = 0; k < Math.min(VISIBLE, allEvents.length); k++) {
      visible.push((start + k) % allEvents.length);
    }

    list.innerHTML = visible.map(index => {
      const event = allEvents[index];
      const date = parseDate(event.event_date);
      return `
        <li class="event-poster event-poster--${themes[index % themes.length]}">
          <p class="event-poster__weekday">${date.toLocaleDateString('en-GB', { weekday: 'long' })}</p>
          <p class="event-poster__day">${String(date.getDate()).padStart(2, '0')}</p>
          <p class="event-poster__month">${date.toLocaleDateString('en-GB', { month: 'long' })}</p>
          <p class="event-poster__it">${escapeHtml(event.title_it)}</p>
          <h3 class="event-poster__title">${escapeHtml(event.title)}</h3>
          <p><time datetime="${event.event_date}T${event.start_time}">${escapeHtml(event.location)}, ${event.start_time}</time></p>
          <button type="button" class="link-button event-poster__cta" data-bs-toggle="modal" data-bs-target="#joinModal">Save my seat</button>
        </li>`;
    }).join('');

    const first = parseDate(allEvents[start].event_date);
    range.textContent = `From ${first.getDate()} ${first.toLocaleDateString('en-GB', { month: 'long' })}`;
  }

  document.getElementById('eventsPrev').addEventListener('click', () => {
    start = (start - 1 + allEvents.length) % allEvents.length;
    render();
  });
  document.getElementById('eventsNext').addEventListener('click', () => {
    start = (start + 1) % allEvents.length;
    render();
  });

  render();
}


/* ---------- 6. News feed --------------------------------------------- */

async function renderNews() {
  const items = await getNews();
  document.getElementById('newsList').innerHTML = items.map(item => `
    <article class="news-card">
      <div class="photo-placeholder">Photo: ${escapeHtml(item.image_alt)}</div>
      <p class="news-card__date"><time datetime="${item.published_on}">${formatDate(item.published_on)}</time></p>
      <h3 class="news-card__title"><a href="community.php#news-${item.id}">${escapeHtml(item.title)}</a></h3>
      <p class="news-card__text">${escapeHtml(item.summary)}</p>
    </article>`).join('');
}


/* ---------- Start ----------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  setupRegionMap();
  setupHomeCookAlong();
  renderStories();
  setupChallenge();
  setupEvents();
  renderNews();
});
