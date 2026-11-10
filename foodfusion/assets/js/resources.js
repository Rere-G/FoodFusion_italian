/* =====================================================================
   resources.js: download cards and video cards for the Culinary and
   Educational Resources pages. The page says which category it shows:
     <main data-resources-category="culinary">
   and has empty lists with data-resource-kinds="recipe_card" etc.
   ===================================================================== */

'use strict';

(async function () {
  const main = document.querySelector('[data-resources-category]');
  if (!main) return;

  const resources = await getResources(main.dataset.resourcesCategory);

  const KIND = {
    recipe_card: { label: 'Recipe card', icon: 'bi-card-heading',   bg: '#F0D08C' },
    guide:       { label: 'Guide',       icon: 'bi-book',           bg: '#CFE0EB' },
    infographic: { label: 'Infographic', icon: 'bi-bar-chart-line', bg: '#F6C9A6' }
  };

  function downloadCardHtml(item) {
    const kind = KIND[item.kind];
    const size = item.file_size_kb ? `, ${item.file_size_kb} KB` : '';
    return `
      <li>
        <article class="download-card">
          <span class="download-card__icon" style="--icon-bg: ${kind.bg}" aria-hidden="true"><i class="bi ${kind.icon}"></i></span>
          <p class="download-card__kind">${kind.label}</p>
          <h3 class="download-card__title">${escapeHtml(item.title)}</h3>
          <p class="download-card__desc">${escapeHtml(item.description)}</p>
          <p class="download-card__file"><i class="bi bi-file-earmark-pdf" aria-hidden="true"></i> ${item.file_type}${size}</p>
          <a class="ff-btn ff-btn--primary" href="${item.file_path}" download
             aria-label="Download ${escapeHtml(item.title)} (${item.file_type}${size})">
            <i class="bi bi-download" aria-hidden="true"></i> Download
          </a>
        </article>
      </li>`;
  }

  // Videos are added later; until then each card says "Coming soon"
  function videoCardHtml(item) {
    return `
      <li>
        <article class="video-card">
          <div class="video-card__screen">
            <span class="video-card__play" aria-hidden="true"><i class="bi bi-play-fill"></i></span>
            <span class="video-card__soon">Video coming soon</span>
          </div>
          <div class="video-card__body">
            <h3 class="video-card__title">${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
          </div>
        </article>
      </li>`;
  }

  // Fill every list on the page with the kinds it asks for. If the page has
  // the TV set and every video has a link, the TV replaces the plain cards.
  const tv = document.getElementById('videoTv');
  for (const list of document.querySelectorAll('[data-resource-kinds]')) {
    const kinds = list.dataset.resourceKinds.split(' ');
    const items = resources.filter(r => kinds.includes(r.kind));
    if (tv && kinds.includes('video') && items.length && items.every(i => i.video_url)) {
      list.remove();
      await setupVideoTv(tv, items);
      continue;
    }
    list.innerHTML = items.map(item => item.kind === 'video' ? videoCardHtml(item) : downloadCardHtml(item)).join('');
  }
})();


/* ---------- FoodFusion TV ---------------------------------------------- */
/* The screen shows the episode's thumbnail with a Play button. Only when it
   is pressed is the YouTube player loaded (privacy-enhanced youtube-nocookie
   domain), so no YouTube cookies are set just by opening the page. */
async function setupVideoTv(tv, videos) {
  const screen  = document.getElementById('tvScreen');
  const caption = document.getElementById('tvCaption');
  const guide   = document.getElementById('tvGuide');
  const onAir   = document.getElementById('tvOnAir');
  const channel = document.getElementById('tvChannel');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = n => String(n + 1).padStart(2, '0');
  const skillLabel = tv.dataset.skillLabel || 'Skill';   // e.g. "Topic" on Educational resources
  const youtubeId = url => new URL(url).searchParams.get('v');

  // The recipe each video leads to ("Cook it next")
  const recipes = await Promise.all(videos.map(v => v.recipe_id ? getRecipe(v.recipe_id) : null));

  guide.innerHTML = videos.map((v, i) => `
    <li>
      <button type="button" class="tv-guide__item" data-episode="${i}" aria-pressed="false">
        <span class="tv-guide__thumb"><img src="${escapeHtml(v.thumbnail_path)}" alt="" loading="lazy"><span class="tv-guide__time">${escapeHtml(v.duration)}</span></span>
        <span class="tv-guide__text">
          <span class="tv-guide__ch">CH ${pad(i)} &middot; ${escapeHtml(v.skill)}</span>
          <span class="tv-guide__name">${escapeHtml(v.title)}</span>
          <span class="tv-guide__by">${escapeHtml(v.video_channel)}</span>
        </span>
        <span class="tv-guide__now" aria-hidden="true"><i class="bi bi-play-fill"></i></span>
      </button>
    </li>`).join('');

  function showEpisode(i) {
    const v = videos[i], recipe = recipes[i];
    guide.querySelectorAll('.tv-guide__item').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.episode) === i)));
    channel.textContent = pad(i);
    onAir.classList.remove('is-live');

    screen.innerHTML = `
      <button type="button" class="tv-screen__poster" aria-label="Play episode ${pad(i)}: ${escapeHtml(v.title)} (${escapeHtml(v.duration)})">
        <img src="${escapeHtml(v.thumbnail_path)}" alt="">
        <span class="tv-screen__play" aria-hidden="true"><i class="bi bi-play-fill"></i></span>
        <span class="tv-screen__ep" aria-hidden="true">Episodio ${pad(i)} &middot; ${escapeHtml(v.duration)}</span>
      </button>`;
    screen.querySelector('.tv-screen__poster').addEventListener('click', () => playEpisode(i));

    caption.innerHTML = `
      <p class="tv-caption__skill"><i class="bi bi-mortarboard" aria-hidden="true"></i> ${skillLabel}: ${escapeHtml(v.skill)}</p>
      <h3 class="tv-caption__title">${escapeHtml(v.title)} <span class="ff-italian">${escapeHtml(v.title_it)}</span></h3>
      <p class="tv-caption__desc">${escapeHtml(v.description)}</p>
      <p class="tv-caption__links">
        ${recipe ? `<a class="ff-btn ff-btn--primary" href="recipe.php?id=${recipe.id}"><i class="bi bi-fire" aria-hidden="true"></i> Cook it next: ${escapeHtml(recipe.title)}</a>` : ''}
        <a class="tv-caption__yt" href="${escapeHtml(v.video_url)}" target="_blank" rel="noopener">Watch on YouTube (${escapeHtml(v.video_channel)}) <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i><span class="visually-hidden"> (opens in a new tab)</span></a>
      </p>`;

    // A quick burst of TV static when the channel changes
    if (!reduceMotion) {
      screen.classList.remove('is-switching');
      void screen.offsetWidth;            // restart the animation
      screen.classList.add('is-switching');
    }
  }

  function playEpisode(i) {
    const v = videos[i];
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId(v.video_url))}?autoplay=1&rel=0&modestbranding=1`;
    iframe.title = `${v.title} (video by ${v.video_channel})`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    screen.replaceChildren(iframe);
    onAir.classList.add('is-live');
    iframe.focus();
  }

  guide.addEventListener('click', e => {
    const item = e.target.closest('.tv-guide__item');
    if (item) showEpisode(Number(item.dataset.episode));
  });

  showEpisode(0);
  screen.classList.remove('is-switching');  // no static on first load
  tv.hidden = false;
}
