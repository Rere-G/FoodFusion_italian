<?php
$pageTitle   = 'Recipe collection';
$currentPage = 'recipes';
$pageScripts = ['assets/js/recipes.js'];
include 'includes/header.php';
?>

<main id="main">
  <?php
  $heroTitle   = 'Recipe collection';
  $heroItalian = 'Il ricettario';
  $heroLead    = 'Nineteen tested recipes from every corner of Italy. Filter by region, course, diet and difficulty to find tonight\'s dinner.';
  $heroTheme   = 'sable';
  $heroArt     = 'recipes';
  $heroCrumbs  = ['Home' => 'index.php', 'Recipes' => null];
  include 'includes/page-hero.php';
  ?>

  <section class="ff-section ff-section--cream" aria-labelledby="resultsTitle">
    <div class="container-xl">
      <div class="row g-4 g-lg-5">

        <!-- Filters. A real <form>, so it still works as a GET form without JavaScript. -->
        <div class="col-lg-4 col-xl-3">
          <form class="filters" id="recipeFilters" action="recipes.php" method="get" role="search" aria-label="Filter recipes">
            <h2 class="filters__title"><i class="bi bi-sliders" aria-hidden="true"></i> Find a recipe</h2>

            <div class="ff-field">
              <label for="filterSearch">Search</label>
              <input id="filterSearch" name="q" type="search" placeholder="e.g. risotto, aubergine" autocomplete="off">
            </div>

            <div class="ff-field">
              <label for="filterRegion">Cuisine (region)</label>
              <select id="filterRegion" name="region">
                <option value="">All regions</option>
                <option value="north">The North (Il Nord)</option>
                <option value="centre">The Centre (Il Centro)</option>
                <option value="south">The South (Il Sud)</option>
                <option value="islands">The Islands (Le Isole)</option>
              </select>
            </div>

            <div class="ff-field">
              <label for="filterCourse">Course</label>
              <select id="filterCourse" name="course">
                <option value="">All courses</option>
                <option value="antipasto">Antipasto (starter)</option>
                <option value="primo">Primo (first course)</option>
                <option value="secondo">Secondo (main course)</option>
                <option value="contorno">Contorno (side dish)</option>
                <option value="dolce">Dolce (dessert)</option>
              </select>
            </div>

            <fieldset>
              <legend>Dietary preference</legend>
              <div class="check-pills">
                <label class="check-pill"><input type="checkbox" name="diet" value="vegetarian"><span>Vegetarian</span></label>
                <label class="check-pill"><input type="checkbox" name="diet" value="vegan"><span>Vegan</span></label>
                <label class="check-pill"><input type="checkbox" name="diet" value="gluten_free"><span>Gluten-free</span></label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Cooking difficulty</legend>
              <div class="check-pills">
                <label class="check-pill"><input type="checkbox" name="difficulty" value="easy"><span>Easy</span></label>
                <label class="check-pill"><input type="checkbox" name="difficulty" value="medium"><span>Medium</span></label>
                <label class="check-pill"><input type="checkbox" name="difficulty" value="hard"><span>Hard</span></label>
              </div>
            </fieldset>

            <div class="ff-field mt-3">
              <label for="filterTime">Ready in</label>
              <select id="filterTime" name="time">
                <option value="">Any time</option>
                <option value="30">30 minutes or less</option>
                <option value="60">1 hour or less</option>
              </select>
            </div>

            <div class="d-flex flex-wrap gap-2 mt-4">
              <!-- Without JavaScript this button submits the form; with it, results update as you choose -->
              <button type="submit" class="ff-btn ff-btn--primary" id="applyFilters">Show recipes</button>
              <button type="reset" class="ff-btn ff-btn--outline" id="clearFilters">Clear filters</button>
            </div>
          </form>
        </div>

        <!-- Results -->
        <div class="col-lg-8 col-xl-9">
          <h2 class="visually-hidden" id="resultsTitle">Recipes</h2>
          <div class="results-bar">
            <p class="results-bar__count" id="resultCount" aria-live="polite">Loading recipes&hellip;</p>
            <div class="ff-field">
              <label for="sortRecipes">Sort by</label>
              <select id="sortRecipes" name="sort" form="recipeFilters">
                <option value="az">Name, A to Z</option>
                <option value="quick">Quickest first</option>
                <option value="easy">Easiest first</option>
              </select>
            </div>
          </div>
          <ul class="recipe-grid" id="recipeGrid"></ul>
          <div class="empty-state" id="noResults" hidden>
            <p class="mb-3">No recipes match all of these filters.</p>
            <button type="button" class="ff-btn ff-btn--primary" id="emptyClear">Clear filters</button>
          </div>
        </div>

      </div>
    </div>
  </section>

  <div class="tile-band" aria-hidden="true"></div>

  <section class="ff-section ff-section--piscine" aria-labelledby="shareCta">
    <div class="container-xl d-flex flex-wrap align-items-center justify-content-between gap-4">
      <div>
        <h2 class="ff-subheading" id="shareCta">Missing your family's recipe?</h2>
        <p class="ff-italian ff-italian--lg ff-italian--navy">Condividi la tua ricetta</p>
      </div>
      <div class="d-flex flex-wrap gap-3">
        <a class="ff-btn ff-btn--primary ff-btn--lg" href="community.php#share">Share it in the Community Cookbook</a>
        <a class="ff-btn ff-btn--outline ff-btn--lg" href="contact.php?reason=recipe_request">Request a recipe</a>
      </div>
    </div>
  </section>
</main>

<?php include 'includes/footer.php'; ?>
