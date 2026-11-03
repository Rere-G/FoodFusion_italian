<?php
$pageTitle   = 'About us';
$currentPage = 'about';
$pageScripts = ['assets/js/about.js'];
include 'includes/header.php';
?>

<main id="main">
  <?php
  $heroTitle   = 'About FoodFusion';
  $heroItalian = 'Chi siamo';
  $heroLead    = 'A home for Italian home cooking: the everyday dishes of every region, cooked in ordinary kitchens and shared by the people who love them.';
  $heroTheme   = 'melon';
  $heroArt     = 'about';
  $heroCrumbs  = ['Home' => 'index.php', 'About us' => null];
  include 'includes/page-hero.php';
  ?>

  <!-- 1. PHILOSOPHY ========================================================= -->
  <section class="ff-section ff-section--cream" aria-labelledby="philosophyTitle">
    <div class="container-xl">
      <div class="row g-4 g-lg-5 align-items-center">
        <div class="col-lg-6">
          <h2 class="ff-heading" id="philosophyTitle">Our culinary philosophy</h2>
          <p class="ff-italian ff-italian--lg">La nostra filosofia</p>
          <p class="fs-5 mt-3">Italian food is not one cuisine but twenty: one for every region, and a different version in every family. We believe the best of it is not in restaurants but at home, in recipes passed from hand to hand.</p>
          <p>So FoodFusion collects those recipes, tests them in ordinary kitchens, and explains them step by step, with amounts you can scale and help when your hands are covered in flour. Then we hand the table to you: the Community Cookbook is where your family's version sits beside ours.</p>
        </div>
        <div class="col-lg-6">
          <figure class="philosophy m-0">
            <blockquote class="philosophy__quote">&ldquo;Pochi ingredienti, ma buoni.&rdquo;<br>Few ingredients, but good ones.</blockquote>
            <figcaption class="philosophy__by">A saying from every nonna's kitchen</figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>

  <div class="tile-band" aria-hidden="true"></div>

  <!-- 2. VALUES ============================================================= -->
  <section class="ff-section ff-section--sable" aria-labelledby="valuesTitle">
    <div class="container-xl">
      <h2 class="ff-heading" id="valuesTitle">What we value</h2>
      <p class="ff-italian ff-italian--lg">I nostri valori</p>
      <ul class="values-grid">
        <li class="value-card">
          <p class="value-card__num" aria-hidden="true">01</p>
          <p class="value-card__it">Semplicità</p>
          <h3 class="value-card__title">Simplicity</h3>
          <p>Short ingredient lists, clear steps and no special equipment. If it needs a gadget, we show you how to do without.</p>
        </li>
        <li class="value-card">
          <p class="value-card__num" aria-hidden="true">02</p>
          <p class="value-card__it">Stagionalità</p>
          <h3 class="value-card__title">Seasonality</h3>
          <p>Cook what is in season and local. It tastes better, costs less and uses less energy to grow and transport.</p>
        </li>
        <li class="value-card">
          <p class="value-card__num" aria-hidden="true">03</p>
          <p class="value-card__it">Condivisione</p>
          <h3 class="value-card__title">Sharing</h3>
          <p>A recipe is a story. Every member can post, comment and cook along, and the best family recipes are featured.</p>
        </li>
        <li class="value-card">
          <p class="value-card__num" aria-hidden="true">04</p>
          <p class="value-card__it">Rispetto</p>
          <h3 class="value-card__title">Respect</h3>
          <p>For tradition, for every diet, and for each other. Every recipe is labelled for vegetarian, vegan and gluten-free cooks.</p>
        </li>
      </ul>
    </div>
  </section>

  <!-- 3. TEAM: Bootstrap carousel =========================================== -->
  <section class="ff-section ff-section--cream" aria-labelledby="teamTitle">
    <div class="container-xl">
      <div class="section-head section-head--split">
        <div>
          <h2 class="ff-heading" id="teamTitle">The team</h2>
          <p class="ff-italian ff-italian--lg">La squadra</p>
        </div>
        <div class="carousel-nav">
          <p class="carousel-nav__status" id="teamStatus" aria-live="polite"></p>
          <button type="button" class="icon-btn icon-btn--lg" data-bs-target="#teamCarousel" data-bs-slide="prev" aria-label="Previous team members"><i class="bi bi-chevron-left" aria-hidden="true"></i></button>
          <button type="button" class="icon-btn icon-btn--lg" data-bs-target="#teamCarousel" data-bs-slide="next" aria-label="Next team members"><i class="bi bi-chevron-right" aria-hidden="true"></i></button>
        </div>
      </div>
      <div id="teamCarousel" class="carousel slide ff-carousel mt-4" aria-roledescription="carousel" aria-labelledby="teamTitle">
        <div class="carousel-inner"><p class="loading-note">Loading the team&hellip;</p></div>
        <div class="carousel-indicators ff-carousel__dots"></div>
      </div>
      <p class="small-note mt-3"><i class="bi bi-info-circle" aria-hidden="true"></i> The team members are fictional characters created for this student project.</p>
    </div>
  </section>

  <!-- 4. CALL TO ACTION ===================================================== -->
  <section class="ff-section ff-section--marine" aria-labelledby="joinCta">
    <div class="container-xl d-flex flex-wrap align-items-center justify-content-between gap-4">
      <div>
        <h2 class="ff-heading" id="joinCta">Pull up a chair.</h2>
        <p class="ff-italian ff-italian--lg ff-italian--sable">C'è posto per tutti a tavola.</p>
      </div>
      <div class="d-flex flex-wrap gap-3">
        <button class="ff-btn ff-btn--sable ff-btn--lg" type="button" data-bs-toggle="modal" data-bs-target="#joinModal">Sign up now</button>
        <a class="ff-btn ff-btn--outline-light ff-btn--lg" href="contact.php">Get in touch</a>
      </div>
    </div>
  </section>
</main>

<?php include 'includes/footer.php'; ?>
