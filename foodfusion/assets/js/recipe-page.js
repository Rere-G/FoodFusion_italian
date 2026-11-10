/* =====================================================================
   recipe-page.js: fills recipe.php for one recipe.
   The id comes from the page (printed by PHP from ?id=...). The servings
   scaler and cook mode come from recipe.js (setupCookAlong).
   ===================================================================== */

'use strict';

(async function () {
  const main = document.getElementById('main');
  const recipeId = Number(main.dataset.recipeId);
  const recipe = await getRecipe(recipeId);

  // Unknown id: hide the recipe sections and show the "not found" message
  if (!recipe) {
    document.querySelectorAll('.recipe-hero, #cookSection, #moreSection, .recipe-hero + .ff-stripes')
      .forEach(section => { section.hidden = true; });
    document.getElementById('recipeNotFound').hidden = false;
    document.title = 'Recipe not found | FoodFusion';
    return;
  }

  document.title = `${recipe.title} | FoodFusion`;

  /* ---------- Header ---------------------------------------------------- */
  document.getElementById('crumbTitle').textContent = recipe.title;
  document.getElementById('recipeTitle').textContent = recipe.title;
  document.getElementById('recipeTitleEn').textContent = recipe.title_en;
  document.getElementById('recipeDesc').textContent = recipe.description;
  document.getElementById('recipeRegion').innerHTML =
    `${regionIcon(recipe.region, 18)} ${REGION_LABELS[recipe.region]} &middot; ${COURSE_LABELS[recipe.course]} (${COURSE_LABELS_EN[recipe.course].toLowerCase()})`;

  const chips = [
    `<li><i class="bi bi-clock" aria-hidden="true"></i> ${escapeHtml(recipeTimeLabel(recipe))}</li>`,
    `<li><i class="bi bi-bar-chart" aria-hidden="true"></i> ${DIFFICULTY_LABELS[recipe.difficulty]}</li>`,
    `<li><i class="bi bi-people" aria-hidden="true"></i> Serves ${recipe.base_servings}</li>`,
    ...recipe.dietary.map(d => `<li><i class="bi bi-check2-circle" aria-hidden="true"></i> ${DIETARY_LABELS[d]}</li>`)
  ];
  document.getElementById('recipeMeta').innerHTML = chips.join('');

  // The dish photo inside the arch; without one, the placeholder gets a caption.
  // The basil drawing stays either way, hanging over the frame.
  const photo = document.getElementById('recipePhoto');
  if (recipe.image) {
    const img = document.createElement('img');
    img.className = 'arch-photo__img';
    img.src = recipe.image;
    img.alt = recipe.image_alt;
    photo.classList.remove('photo-placeholder');
    photo.prepend(img);   // before the basil, so the sprig sits on top
  } else {
    photo.insertAdjacentText('beforeend', `Photo: ${recipe.image_alt}`);
  }

  // Social sharing (share.js)
  document.getElementById('recipeShare').innerHTML =
    shareRowHtml({ title: recipe.title, text: recipe.description, path: `recipe.php?id=${recipe.id}` });

  /* ---------- Ingredients, steps and cook mode (recipe.js) -------------- */
  document.getElementById('cookRecipeName').textContent = `Si cucina! ${recipe.title}`;
  setupCookAlong(document.getElementById('cookAlong'), recipe);

  /* ---------- More from the same region -------------------------------- */
  const more = (await getRecipes()).filter(r => r.region === recipe.region && r.id !== recipe.id).slice(0, 3);
  document.getElementById('moreTitle').textContent = `More from ${REGION_LABELS[recipe.region].replace('The ', 'the ')}`;
  document.getElementById('moreRecipes').innerHTML = more.map(r => `<li>${recipeCardHtml(r)}</li>`).join('');
})();
