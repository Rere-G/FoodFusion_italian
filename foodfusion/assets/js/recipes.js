/* =====================================================================
   recipes.js: Recipe Collection filters, sorting and results.

   The brief asks for recipes "categorised by cuisine type, dietary
   preferences and cooking difficulty". Here:
     cuisine type  = Italian region (select)
     dietary       = vegetarian / vegan / gluten-free (a recipe must match ALL ticked)
     difficulty    = easy / medium / hard (a recipe may match ANY ticked)
   plus course, time and a text search.

   The filters are kept in the address bar (?region=north&diet=vegan),
   so a filtered list can be shared or bookmarked, and coming back to
   the page with the Back button shows the same results.
   ===================================================================== */

'use strict';

(function () {
  const form = document.getElementById('recipeFilters');
  if (!form) return;

  const grid = document.getElementById('recipeGrid');
  const countEl = document.getElementById('resultCount');
  const emptyEl = document.getElementById('noResults');
  const sortEl = document.getElementById('sortRecipes');
  const menuEl = document.getElementById('courseMenu');
  const chipsEl = document.getElementById('activeFilters');
  const DIFFICULTY_ORDER = { easy: 1, medium: 2, hard: 3 };
  let allRecipes = [];

  // The menu board tabs: value of the Course filter, Italian plural, English
  const COURSE_MENU = [
    ['',          'Tutto',     'Everything'],
    ['antipasto', 'Antipasti', 'Starters'],
    ['primo',     'Primi',     'First courses'],
    ['secondo',   'Secondi',   'Main courses'],
    ['contorno',  'Contorni',  'Sides'],
    ['dolce',     'Dolci',     'Desserts']
  ];
  const REGION_IT = { north: 'Il Nord', centre: 'Il Centro', south: 'Il Sud', islands: 'Le Isole' };
  const TIME_LABELS = { 30: '30 min or less', 60: '1 hour or less' };

  /* ---------- One recipe, as a page from the ricettario ------------------
     Arched photo with a course stamp and diet badges, an index number, and
     menu-style dotted lines for time, difficulty and servings. */
  function menuCardHtml(recipe, index) {
    const level = DIFFICULTY_ORDER[recipe.difficulty];
    const dots = [1, 2, 3].map(n => `<span class="menu-card__dot${n <= level ? ' is-on' : ''}"></span>`).join('');
    const photo = recipe.image
      ? `<img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.image_alt)}" loading="lazy">`
      : `<span class="photo-placeholder" role="img" aria-label="${escapeHtml(recipe.image_alt)}"></span>`;
    return `
      <article class="menu-card" style="--i: ${Math.min(index, 12)}">
        <div class="menu-card__photo">
          ${photo}
          <span class="menu-card__stamp" aria-hidden="true">${COURSE_LABELS[recipe.course]}</span>
          ${recipe.dietary.length ? `<span class="menu-card__diets">${recipe.dietary.map(d => `<span><i class="bi bi-check2-circle" aria-hidden="true"></i> ${DIETARY_LABELS[d]}</span>`).join('')}</span>` : ''}
        </div>
        <div class="menu-card__body">
          <p class="menu-card__region">${regionIcon(recipe.region, 16)} ${REGION_IT[recipe.region]} <span class="visually-hidden">(${REGION_LABELS[recipe.region]}), ${COURSE_LABELS_EN[recipe.course]}</span>
            <span class="menu-card__num" aria-hidden="true">N° ${String(recipe.id).padStart(2, '0')}</span></p>
          <h3 class="menu-card__title"><a class="stretched-link" href="recipe.php?id=${recipe.id}">${escapeHtml(recipe.title)}</a></h3>
          <p class="menu-card__en">${escapeHtml(recipe.title_en)}</p>
          <dl class="menu-card__facts">
            <div><dt>Tempo <span class="visually-hidden">(time)</span></dt><dd>${escapeHtml(formatMinutes(recipe.time_minutes))}${recipe.time_note ? ' <abbr title="' + escapeHtml(recipe.time_note) + '">+</abbr>' : ''}</dd></div>
            <div><dt>Difficoltà <span class="visually-hidden">(difficulty)</span></dt><dd><span class="menu-card__dots" aria-hidden="true">${dots}</span> ${DIFFICULTY_LABELS[recipe.difficulty]}</dd></div>
            <div><dt>Porzioni <span class="visually-hidden">(serves)</span></dt><dd>${recipe.base_servings}</dd></div>
          </dl>
          <span class="menu-card__cta" aria-hidden="true">Cuciniamo <i class="bi bi-arrow-right"></i></span>
        </div>
      </article>`;
  }

  /* ---------- Menu board tabs ------------------------------------------ */
  function renderCourseMenu() {
    const counts = {};
    allRecipes.forEach(r => { counts[r.course] = (counts[r.course] || 0) + 1; });
    menuEl.innerHTML = COURSE_MENU.map(([value, it, en]) => `
      <li><button type="button" class="course-menu__tab" data-course="${value}" aria-pressed="false">
        <span class="course-menu__it">${it}</span>
        <span class="course-menu__en">${en} <span class="course-menu__count">${value ? counts[value] || 0 : allRecipes.length}</span></span>
      </button></li>`).join('');
  }
  function syncCourseMenu(course) {
    menuEl.querySelectorAll('.course-menu__tab').forEach(tab => tab.setAttribute('aria-pressed', String(tab.dataset.course === course)));
  }

  /* ---------- Active filter chips ---------------------------------------- */
  // Each chip knows how to undo its own filter
  function renderChips(f) {
    const chips = [];
    if (f.q) chips.push([`“${f.q}”`, () => { form.elements.q.value = ''; }]);
    if (f.region) chips.push([REGION_LABELS[f.region], () => { form.elements.region.value = ''; }]);
    if (f.course) chips.push([COURSE_LABELS[f.course], () => { form.elements.course.value = ''; }]);
    ['diet', 'difficulty'].forEach(name => f[name].forEach(value => chips.push([
      name === 'diet' ? DIETARY_LABELS[value] : DIFFICULTY_LABELS[value],
      () => { form.querySelector(`input[name="${name}"][value="${value}"]`).checked = false; }
    ])));
    if (f.time) chips.push([TIME_LABELS[f.time], () => { form.elements.time.value = ''; }]);

    chipsEl.hidden = chips.length === 0;
    chipsEl.innerHTML = chips.map(([label], i) =>
      `<li><button type="button" class="active-filters__chip" data-chip="${i}">${escapeHtml(label)} <i class="bi bi-x-lg" aria-hidden="true"></i><span class="visually-hidden"> (remove filter)</span></button></li>`).join('')
      + (chips.length > 1 ? '<li><button type="button" class="active-filters__clear" data-chip="all">Clear all</button></li>' : '');
    chipsEl.onclick = event => {
      const button = event.target.closest('button');
      if (!button) return;
      if (button.dataset.chip === 'all') { clearFilters(); return; }
      chips[Number(button.dataset.chip)][1]();
      render();
      (chipsEl.querySelector('button') || form.elements.q).focus();
    };
  }

  /* ---------- Read and write the filters ------------------------------ */

  // The current choices, read from the form
  function readFilters() {
    const data = new FormData(form);
    return {
      q: (data.get('q') || '').trim().toLowerCase(),
      region: data.get('region') || '',
      course: data.get('course') || '',
      diet: data.getAll('diet'),
      difficulty: data.getAll('difficulty'),
      time: data.get('time') || '',
      sort: sortEl.value
    };
  }

  // Put choices from the address bar back into the form
  function fillFormFromUrl() {
    const params = new URLSearchParams(window.location.search);
    form.elements.q.value = params.get('q') || '';
    form.elements.region.value = params.get('region') || '';
    form.elements.course.value = params.get('course') || '';
    form.elements.time.value = params.get('time') || '';
    sortEl.value = params.get('sort') || 'az';
    form.querySelectorAll('input[name="diet"]').forEach(box => { box.checked = params.getAll('diet').includes(box.value); });
    form.querySelectorAll('input[name="difficulty"]').forEach(box => { box.checked = params.getAll('difficulty').includes(box.value); });
  }

  // Save the choices in the address bar without reloading the page
  function updateUrl(filters) {
    const params = new URLSearchParams();
    if (filters.q) params.set('q', filters.q);
    if (filters.region) params.set('region', filters.region);
    if (filters.course) params.set('course', filters.course);
    filters.diet.forEach(d => params.append('diet', d));
    filters.difficulty.forEach(d => params.append('difficulty', d));
    if (filters.time) params.set('time', filters.time);
    if (filters.sort !== 'az') params.set('sort', filters.sort);
    const query = params.toString();
    history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
  }

  /* ---------- Filtering and sorting ------------------------------------ */

  function matches(recipe, f) {
    if (f.region && recipe.region !== f.region) return false;
    if (f.course && recipe.course !== f.course) return false;
    // Every ticked diet must be in the recipe's list
    if (!f.diet.every(d => recipe.dietary.includes(d))) return false;
    // Any ticked difficulty is fine
    if (f.difficulty.length && !f.difficulty.includes(recipe.difficulty)) return false;
    // Recipes with extra waiting time (e.g. 24 hr dough) are never "quick"
    if (f.time && (recipe.time_note || recipe.time_minutes > Number(f.time))) return false;
    if (f.q) {
      const text = [recipe.title, recipe.title_en, recipe.description, ...recipe.ingredients.map(i => i.name)]
        .join(' ').toLowerCase();
      if (!text.includes(f.q)) return false;
    }
    return true;
  }

  function sortRecipes(list, sort) {
    const sorted = [...list];
    if (sort === 'quick') sorted.sort((a, b) => a.time_minutes - b.time_minutes);
    else if (sort === 'easy') sorted.sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty] || a.title.localeCompare(b.title));
    else sorted.sort((a, b) => a.title.localeCompare(b.title, 'it'));
    return sorted;
  }

  /* ---------- Show the results ----------------------------------------- */

  function render() {
    const filters = readFilters();
    const results = sortRecipes(allRecipes.filter(r => matches(r, filters)), filters.sort);

    grid.innerHTML = results.map((recipe, i) => `<li>${menuCardHtml(recipe, i)}</li>`).join('');
    emptyEl.hidden = results.length > 0;
    countEl.innerHTML = `<span class="results-bar__num">${results.length}</span> ` +
      `<span class="results-bar__it" aria-hidden="true">${results.length === 1 ? 'ricetta' : 'ricette'}</span> ` +
      `<span class="results-bar__en">${results.length === 1 ? 'recipe' : 'recipes'}` +
      (results.length === allRecipes.length ? '' : ` of ${allRecipes.length}`) + '</span>';

    syncCourseMenu(filters.course);
    renderChips(filters);
    updateUrl(filters);
  }

  // Clear each field by hand. (Calling form.reset() here would fire the
  // reset event again and loop for ever.)
  function clearFilters() {
    form.elements.q.value = '';
    ['region', 'course', 'time'].forEach(name => { form.elements[name].value = ''; });
    form.querySelectorAll('input[type="checkbox"]').forEach(box => { box.checked = false; });
    sortEl.value = 'az';
    render();
    form.elements.q.focus();
  }

  /* ---------- Events ----------------------------------------------------- */

  // Update as soon as anything changes. Typing waits 250 ms, so the list
  // does not redraw on every single key press.
  let typingTimer;
  form.addEventListener('input', event => {
    if (event.target.name === 'q') {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(render, 250);
    } else {
      render();
    }
  });
  form.addEventListener('change', render);
  sortEl.addEventListener('change', render);

  // With JavaScript on, "Show recipes" just moves to the results instead of reloading
  form.addEventListener('submit', event => {
    event.preventDefault();
    render();
    countEl.scrollIntoView({ block: 'start' });
  });

  // The reset event fires BEFORE the form is cleared, so do our own reset instead
  form.addEventListener('reset', event => {
    event.preventDefault();
    clearFilters();
  });
  document.getElementById('emptyClear').addEventListener('click', clearFilters);

  // A menu tab chooses that course in the Course filter
  menuEl.addEventListener('click', event => {
    const tab = event.target.closest('.course-menu__tab');
    if (!tab) return;
    form.elements.course.value = tab.dataset.course;
    render();
  });

  /* ---------- Start ------------------------------------------------------ */
  getRecipes().then(list => {
    allRecipes = list;
    renderCourseMenu();
    fillFormFromUrl();
    render();
  });
})();
