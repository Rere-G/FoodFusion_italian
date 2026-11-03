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

  // Fill every list on the page with the kinds it asks for
  document.querySelectorAll('[data-resource-kinds]').forEach(list => {
    const kinds = list.dataset.resourceKinds.split(' ');
    const items = resources.filter(r => kinds.includes(r.kind));
    list.innerHTML = items.map(item => item.kind === 'video' ? videoCardHtml(item) : downloadCardHtml(item)).join('');
  });
})();
