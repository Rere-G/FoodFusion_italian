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
  const DIFFICULTY_ORDER = { easy: 1, medium: 2, hard: 3 };
  let allRecipes = [];

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

    grid.innerHTML = results.map(recipe => `<li>${recipeCardHtml(recipe)}</li>`).join(''); // recipeCardHtml: main.js
    emptyEl.hidden = results.length > 0;
    countEl.textContent = `${results.length} ${results.length === 1 ? 'recipe' : 'recipes'}` +
      (results.length === allRecipes.length ? '' : ` of ${allRecipes.length}`);

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

  /* ---------- Start ------------------------------------------------------ */
  getRecipes().then(list => {
    allRecipes = list;
    fillFormFromUrl();
    render();
  });
})();
