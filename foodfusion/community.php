<?php
$pageTitle   = 'Community cookbook';
$currentPage = 'community';
$pageScripts = ['assets/js/community.js'];
include 'includes/header.php';
?>

<main id="main">
  <?php
  $heroTitle   = 'Community cookbook';
  $heroItalian = 'Il ricettario della comunità';
  $heroLead    = 'Family recipes, kitchen tips and the stories behind them, shared by home cooks like you. Like, comment and add your own.';
  $heroTheme   = 'piscine';
  $heroArt     = 'community';
  $heroCrumbs  = ['Home' => 'index.php', 'Community cookbook' => null];
  $heroActions = '<a class="ff-btn ff-btn--primary ff-btn--lg" href="#share"><i class="bi bi-pencil-square" aria-hidden="true"></i> Share your recipe</a>'
               . '<button class="ff-btn ff-btn--outline ff-btn--lg" type="button" data-bs-toggle="modal" data-bs-target="#joinModal">Sign up now</button>';
  include 'includes/page-hero.php';
  ?>

  <!-- 1. FEATURED: Bootstrap carousel ====================================== -->
  <section class="ff-section ff-section--sable" aria-labelledby="featuredTitle">
    <div class="container-xl">
      <div class="section-head section-head--split">
        <div>
          <h2 class="ff-heading" id="featuredTitle">Featured this month</h2>
          <p class="ff-italian ff-italian--lg">In evidenza</p>
        </div>
        <div class="carousel-nav">
          <p class="carousel-nav__status" id="featuredStatus" aria-live="polite"></p>
          <button type="button" class="icon-btn icon-btn--lg" data-bs-target="#featuredCarousel" data-bs-slide="prev" aria-label="Previous featured posts"><i class="bi bi-chevron-left" aria-hidden="true"></i></button>
          <button type="button" class="icon-btn icon-btn--lg" data-bs-target="#featuredCarousel" data-bs-slide="next" aria-label="Next featured posts"><i class="bi bi-chevron-right" aria-hidden="true"></i></button>
        </div>
      </div>
      <div id="featuredCarousel" class="carousel slide ff-carousel mt-4" aria-roledescription="carousel" aria-labelledby="featuredTitle">
        <div class="carousel-inner"><p class="loading-note">Loading&hellip;</p></div>
        <div class="carousel-indicators ff-carousel__dots"></div>
      </div>
    </div>
  </section>


  <!-- 2. MONTHLY CHALLENGE ================================================= -->
  <section class="ff-section ff-section--cream" aria-labelledby="challengeTitle" id="challenge-section">
    <div class="container-xl">
      <div id="challenge"></div>
      <h3 class="h4 fw-bold mt-5">Entries so far</h3>
      <ul class="entry-grid" id="entryList"></ul>
    </div>
  </section>

  <div class="tile-band" aria-hidden="true"></div>


  <!-- 3. FEED ================================================================ -->
  <section class="ff-section ff-section--cream" aria-labelledby="feedTitle">
    <div class="container-xl">
      <div class="row justify-content-center">
        <div class="col-lg-10 col-xl-9">
          <h2 class="ff-heading" id="feedTitle">From our kitchens</h2>
          <p class="ff-italian ff-italian--lg">Dalle nostre cucine</p>

          <div class="feed-toolbar">
            <div class="feed-toolbar__chips" role="group" aria-label="Show">
              <button type="button" class="chip" data-feed-type="all" aria-pressed="true">All</button>
              <button type="button" class="chip" data-feed-type="recipe" aria-pressed="false"><i class="bi bi-journal-text" aria-hidden="true"></i> Recipes</button>
              <button type="button" class="chip" data-feed-type="tip" aria-pressed="false"><i class="bi bi-lightbulb" aria-hidden="true"></i> Tips</button>
              <button type="button" class="chip" data-feed-type="story" aria-pressed="false"><i class="bi bi-envelope-heart" aria-hidden="true"></i> Stories</button>
            </div>
            <div class="ff-field flex-row align-items-center gap-2">
              <label for="feedSort">Sort by</label>
              <select id="feedSort">
                <option value="newest">Newest</option>
                <option value="popular">Most liked</option>
              </select>
            </div>
          </div>
          <p class="visually-hidden" id="feedStatus" aria-live="polite"></p>

          <div class="feed" id="postFeed"><p class="loading-note">Loading posts&hellip;</p></div>
        </div>
      </div>
    </div>
  </section>


  <!-- 4. SHARE FORM (recipe submission) ===================================== -->
  <section class="ff-section ff-section--piscine" aria-labelledby="shareTitle" id="share">
    <div class="container-xl">
      <div class="row g-4 g-lg-5">
        <div class="col-lg-4">
          <h2 class="ff-heading" id="shareTitle">Share with the community</h2>
          <p class="ff-italian ff-italian--lg ff-italian--navy">Condividi</p>
          <p class="mt-3">Post a family recipe, a tip that saves you time, or the story behind a dish. To enter the monthly challenge, share a recipe and mention the challenge in the title.</p>
          <h3 class="h5 fw-bold mt-4">Community guidelines</h3>
          <ul>
            <li>Share your own recipes and photos, or say where they came from.</li>
            <li>Be kind in comments. Everyone cooks differently.</li>
            <li>Mark allergens such as nuts, gluten and dairy.</li>
            <li>No adverts or links to sell things.</li>
          </ul>
        </div>

        <div class="col-lg-8">
          <!--
            Field names match the future community_posts table.
            Phase 2: this form posts to api/submit_recipe.php (the web service).
            enctype="multipart/form-data" is needed to upload the photo.
          -->
          <form class="form-card" id="postForm" action="api/submit_recipe.php" method="post" enctype="multipart/form-data" novalidate>
            <fieldset>
              <legend>What are you sharing?</legend>
              <div class="choice-cards">
                <label class="choice-card"><input type="radio" name="type" value="recipe" required checked>
                  <span><strong><i class="bi bi-journal-text" aria-hidden="true"></i> A recipe</strong><small>Ingredients and method</small></span></label>
                <label class="choice-card"><input type="radio" name="type" value="tip">
                  <span><strong><i class="bi bi-lightbulb" aria-hidden="true"></i> A tip</strong><small>A trick that works</small></span></label>
                <label class="choice-card"><input type="radio" name="type" value="story">
                  <span><strong><i class="bi bi-envelope-heart" aria-hidden="true"></i> A story</strong><small>The memory behind a dish</small></span></label>
              </div>
            </fieldset>

            <div class="row g-3 mt-2">
              <div class="col-md-6 ff-field">
                <label for="postName">Your first name</label>
                <input id="postName" name="user_name" type="text" required maxlength="50" autocomplete="given-name">
              </div>
              <div class="col-md-6 ff-field">
                <label for="postLocation">Where you cook (optional)</label>
                <input id="postLocation" name="user_location" type="text" maxlength="60" placeholder="e.g. Leeds">
              </div>
              <div class="col-md-8 ff-field">
                <label for="postTitle">Title</label>
                <input id="postTitle" name="title" type="text" required minlength="4" maxlength="100" data-error-message="Give your post a title.">
              </div>
              <div class="col-md-4 ff-field">
                <label for="postRegion">Region</label>
                <select id="postRegion" name="region" required>
                  <option value="">Choose a region</option>
                  <option value="north">The North</option>
                  <option value="centre">The Centre</option>
                  <option value="south">The South</option>
                  <option value="islands">The Islands</option>
                </select>
              </div>
              <div class="col-12 ff-field">
                <label for="postBody">Tell us about it</label>
                <textarea id="postBody" name="body" rows="4" required minlength="20" maxlength="1500" aria-describedby="postBodyHint" data-error-message="Write a few sentences about your post."></textarea>
                <p class="ff-hint" id="postBodyHint">At least 20 characters.</p>
              </div>
            </div>

            <!-- Only for recipes -->
            <div class="row g-3 mt-1" id="recipeFields">
              <div class="col-md-5 ff-field">
                <label for="postIngredients">Ingredients</label>
                <textarea id="postIngredients" name="ingredients" rows="6" required aria-describedby="postIngredientsHint" data-error-message="List the ingredients, one per line."></textarea>
                <p class="ff-hint" id="postIngredientsHint">One per line, e.g. "200 g spaghetti".</p>
              </div>
              <div class="col-md-7 ff-field">
                <label for="postSteps">Method</label>
                <textarea id="postSteps" name="steps" rows="6" required aria-describedby="postStepsHint" data-error-message="Write the method, one step per line."></textarea>
                <p class="ff-hint" id="postStepsHint">One step per line.</p>
              </div>
            </div>

            <!-- Only for stories -->
            <div class="row g-3 mt-1" id="storyFields" hidden>
              <div class="col-md-6 ff-field">
                <label for="postPlace">Town or city the story comes from</label>
                <input id="postPlace" name="place" type="text" required maxlength="60" placeholder="e.g. Bari" data-error-message="Tell us where the story comes from.">
              </div>
            </div>

            <div class="row g-3 mt-1">
              <div class="col-md-8 ff-field">
                <label for="postPhoto">Photo (optional)</label>
                <input id="postPhoto" name="photo" type="file" accept="image/jpeg,image/png,image/webp" aria-describedby="postPhotoHint">
                <p class="ff-hint" id="postPhotoHint">JPG, PNG or WebP, up to 2 MB.</p>
              </div>
              <div class="col-12 ff-check">
                <input id="postAgree" name="agree" type="checkbox" required>
                <label for="postAgree">This is my own recipe, tip or story, and I agree to the community guidelines.</label>
              </div>
            </div>

            <button type="submit" class="ff-btn ff-btn--primary ff-btn--lg mt-4"><i class="bi bi-send" aria-hidden="true"></i> Share with the community</button>
            <p class="form-status form-status--box" id="postStatus" role="status" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </div>
  </section>
</main>

<?php include 'includes/footer.php'; ?>
