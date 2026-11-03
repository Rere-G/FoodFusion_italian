<?php
/*
 * Single recipe page: recipe.php?id=6
 * (int) turns whatever is in the address into a whole number, so text
 * such as ?id=<script> becomes 0 and cannot be printed into the page.
 */
$recipeId    = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$pageTitle   = 'Recipe';
$currentPage = 'recipes';
$pageScripts = ['assets/js/recipe.js', 'assets/js/recipe-page.js'];
include 'includes/header.php';
?>

<main id="main" data-recipe-id="<?= $recipeId ?>">

  <!-- recipe-page.js fills this header from data.js -->
  <section class="recipe-hero" aria-labelledby="recipeTitle">
    <div class="container-xl recipe-hero__grid">
      <div>
        <nav aria-label="Breadcrumb">
          <ol class="crumbs">
            <li><a href="index.php">Home</a></li>
            <li><a href="recipes.php">Recipes</a></li>
            <li><span aria-current="page" id="crumbTitle">Recipe</span></li>
          </ol>
        </nav>
        <p class="recipe-card__region" id="recipeRegion"></p>
        <h1 class="recipe-hero__title" id="recipeTitle">Loading recipe&hellip;</h1>
        <p class="ff-italian ff-italian--lg" id="recipeTitleEn"></p>
        <p class="recipe-hero__desc" id="recipeDesc"></p>
        <ul class="meta-chips" id="recipeMeta"></ul>
        <div class="mt-4" id="recipeShare"></div>
      </div>
      <div>
        <div class="arch-photo photo-placeholder" id="recipePhoto">
          <!-- Hand-drawn basil sprig -->
          <svg class="basil" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
            <path d="M20,110 C40,80 60,60 100,20" stroke="#3F7A3A" stroke-width="5" stroke-linecap="round" fill="none"/>
            <path d="M48,74 C30,60 30,40 44,34 C56,46 58,62 48,74 Z" fill="#4E8F46" stroke="#1F3546" stroke-width="2"/>
            <path d="M58,62 C76,64 92,52 92,38 C76,36 62,46 58,62 Z" fill="#3F7A3A" stroke="#1F3546" stroke-width="2"/>
            <path d="M74,40 C66,24 72,10 84,8 C90,20 86,34 74,40 Z" fill="#4E8F46" stroke="#1F3546" stroke-width="2"/>
          </svg>
        </div>
      </div>
    </div>
  </section>
  <div class="ff-stripes" aria-hidden="true"></div>

  <section class="ff-section ff-section--marine" aria-labelledby="cookTitle" id="cookSection">
    <div class="container-xl">
      <div class="section-head section-head--split">
        <div>
          <h2 class="ff-heading" id="cookTitle">Let's cook.</h2>
          <p class="ff-italian ff-italian--lg ff-italian--sable" id="cookRecipeName">Si cucina!</p>
        </div>
        <p class="section-head__intro">Change the servings or units and every amount updates, including the amounts inside the steps. Turn on Keep screen awake while your hands are busy.</p>
      </div>
      <?php $cookRecipeId = $recipeId; include 'includes/cook-along.php'; ?>
    </div>
  </section>

  <section class="ff-section ff-section--cream" aria-labelledby="moreTitle" id="moreSection">
    <div class="container-xl">
      <h2 class="ff-subheading" id="moreTitle">More from this region</h2>
      <p class="ff-italian ff-italian--lg" id="moreItalian">Dalla stessa regione</p>
      <ul class="recipe-grid mt-4" id="moreRecipes"></ul>
    </div>
  </section>

  <!-- Shown instead of everything above when the id does not match a recipe -->
  <section class="ff-section ff-section--cream" id="recipeNotFound" hidden>
    <div class="container-xl">
      <div class="empty-state">
        <h2 class="ff-subheading">We could not find that recipe.</h2>
        <p class="mt-3">It may have moved, or the link may be incomplete.</p>
        <a class="ff-btn ff-btn--primary" href="recipes.php">Browse all recipes</a>
      </div>
    </div>
  </section>
</main>

<?php include 'includes/footer.php'; ?>
