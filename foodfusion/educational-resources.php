<?php
$pageTitle   = 'Educational resources';
$currentPage = 'educational';
$pageScripts = ['assets/js/resources.js'];
include 'includes/header.php';
?>

<main id="main" data-resources-category="educational">
  <?php
  $heroTitle   = 'Energy in the kitchen';
  $heroItalian = 'Cucinare con l\'energia pulita';
  $heroLead    = 'How renewable energy reaches your hob, which ways of cooking waste the least, and the Italian habits that save energy every day. Free guides and infographics to download.';
  $heroTheme   = 'marine';
  $heroArt     = 'educational';
  $heroCrumbs  = ['Home' => 'index.php', 'Resources' => null, 'Educational resources' => null];
  $heroActions = '<a class="ff-btn ff-btn--sable ff-btn--lg" href="#downloads"><i class="bi bi-download" aria-hidden="true"></i> Guides and infographics</a>';
  include 'includes/page-hero.php';
  ?>

  <!-- 1. WHY IT MATTERS + INFOGRAPHIC ======================================= -->
  <section class="ff-section ff-section--cream" aria-labelledby="whyTitle">
    <div class="container-xl">
      <div class="row g-4 g-lg-5 align-items-center">
        <div class="col-lg-5">
          <h2 class="ff-heading" id="whyTitle">Why energy matters when you cook</h2>
          <p class="ff-italian ff-italian--lg">Ogni fornello conta</p>
          <p class="mt-3">Cooking is one of the biggest everyday uses of energy at home. How much of that energy actually reaches the food depends on the hob: a lot of the heat from a gas flame escapes around the pan, while induction heats the pan itself.</p>
          <p>Electric hobs can also run on renewable electricity from solar, wind or hydro power, which gas cannot. Choosing how you cook is a small, real way to use cleaner energy.</p>
        </div>
        <div class="col-lg-7">
          <figure class="bar-chart">
            <figcaption>How much of the hob's energy reaches the pan</figcaption>
            <p class="bar-chart__sub">Approximate efficiency in laboratory tests, in per cent (higher is better)</p>
            <ul class="bar-chart__rows">
              <li class="bar-chart__row">
                <span class="bar-chart__label">Induction</span>
                <span class="bar-chart__track"><span class="bar-chart__bar" style="--value: 85%"></span><span class="bar-chart__value">about 85%</span></span>
              </li>
              <li class="bar-chart__row">
                <span class="bar-chart__label">Electric coil</span>
                <span class="bar-chart__track"><span class="bar-chart__bar" style="--value: 75%"></span><span class="bar-chart__value">about 75%</span></span>
              </li>
              <li class="bar-chart__row">
                <span class="bar-chart__label">Gas</span>
                <span class="bar-chart__track"><span class="bar-chart__bar" style="--value: 32%"></span><span class="bar-chart__value">about 32%</span></span>
              </li>
            </ul>
            <p class="bar-chart__note">Source: Sweeney et al. (2014), see references. Real results depend on the pan, its size and how it is used.</p>
          </figure>
        </div>
      </div>
    </div>
  </section>

  <div class="tile-band" aria-hidden="true"></div>

  <!-- 2. RENEWABLE ENERGY TOPICS ============================================ -->
  <section class="ff-section ff-section--sable" aria-labelledby="topicsTitle">
    <div class="container-xl">
      <h2 class="ff-heading" id="topicsTitle">Renewable energy and your kitchen</h2>
      <p class="ff-italian ff-italian--lg">Le energie rinnovabili</p>
      <ul class="topic-grid mt-4">
        <li class="topic-card">
          <span class="topic-card__icon" style="--icon-bg: #F2C84B" aria-hidden="true"><i class="bi bi-sun"></i></span>
          <h3>Solar cooking</h3>
          <p>A solar cooker uses reflectors to focus sunlight onto a dark pot. On a sunny day it can slow-cook beans, stews and rice with no fuel at all.</p>
        </li>
        <li class="topic-card">
          <span class="topic-card__icon" style="--icon-bg: #CFE0EB" aria-hidden="true"><i class="bi bi-lightning-charge"></i></span>
          <h3>Green electricity</h3>
          <p>Electric and induction hobs can run on electricity from wind, solar and hydro power, through a green tariff or your own solar panels.</p>
        </li>
        <li class="topic-card">
          <span class="topic-card__icon" style="--icon-bg: #D4E8C9" aria-hidden="true"><i class="bi bi-recycle"></i></span>
          <h3>Biogas from food waste</h3>
          <p>Food scraps collected by many councils are broken down to make biogas, a renewable fuel, and fertiliser for farms.</p>
        </li>
        <li class="topic-card">
          <span class="topic-card__icon" style="--icon-bg: #F6C9A6" aria-hidden="true"><i class="bi bi-box-seam"></i></span>
          <h3>Heat-retention cooking</h3>
          <p>Bring a pot to the boil, then wrap it in an insulated box or blankets. It keeps cooking with its own heat, like the old Italian "cassetta di fieno".</p>
        </li>
        <li class="topic-card">
          <span class="topic-card__icon" style="--icon-bg: #E8D9F0" aria-hidden="true"><i class="bi bi-basket"></i></span>
          <h3>Seasonal and local food</h3>
          <p>Food grown in season nearby needs less energy for heated greenhouses, cold storage and long-distance transport.</p>
        </li>
      </ul>
    </div>
  </section>

  <!-- 3. DOWNLOADS ========================================================== -->
  <section class="ff-section ff-section--cream" aria-labelledby="downloadsTitle" id="downloads">
    <div class="container-xl">
      <div class="section-head section-head--split mb-4">
        <div>
          <h2 class="ff-heading" id="downloadsTitle">Guides and infographics</h2>
          <p class="ff-italian ff-italian--lg">Da scaricare</p>
        </div>
        <p class="section-head__intro">One-page infographics for the fridge door and a longer guide for anyone switching how they cook.</p>
      </div>
      <ul class="download-grid" data-resource-kinds="infographic guide"></ul>
    </div>
  </section>

  <!-- 4. ENERGY-SAVING HABITS =============================================== -->
  <section class="ff-section ff-section--piscine" aria-labelledby="habitsTitle">
    <div class="container-xl">
      <h2 class="ff-heading" id="habitsTitle">Energy-saving habits</h2>
      <p class="ff-italian ff-italian--lg ff-italian--navy">Piccoli gesti, grande differenza</p>
      <ol class="hack-list mt-4">
        <li><strong>Put a lid on it.</strong> A covered pot comes to the boil faster and needs a lower flame to keep simmering.</li>
        <li><strong>Match the pan to the ring.</strong> A small pan on a big flame or ring wastes the heat that goes round the sides.</li>
        <li><strong>Use only the water you need.</strong> Boil the kettle or pot with just enough water for the job.</li>
        <li><strong>Use the heat that is left.</strong> Turn the hob or oven off a few minutes early; pasta, rice and bakes keep cooking.</li>
        <li><strong>Batch cook.</strong> One big pot of ragù or beans, frozen in portions, uses far less energy than several small cookings.</li>
        <li><strong>Fill the oven.</strong> If the oven is on, roast vegetables or bake bread at the same time.</li>
        <li><strong>Cook pasta the low-energy way.</strong> Boil for two minutes, cover, switch off and let it finish in the hot water.</li>
        <li><strong>Waste nothing.</strong> Cucina povera turns leftovers into new meals, so the energy used to grow and cook food is not wasted.</li>
      </ol>
    </div>
  </section>

  <!-- 5. VIDEOS ============================================================= -->
  <!-- The same retro TV as Culinary resources (resources.js, setupVideoTv).
       Nothing loads from YouTube until Play is pressed. -->
  <section class="ff-section ff-section--marine tv-section" aria-labelledby="eduVideoTitle">
    <div class="container-xl">
      <div class="section-head section-head--split mb-4">
        <div>
          <p class="tv-section__kicker"><i class="bi bi-broadcast" aria-hidden="true"></i> FoodFusion TV</p>
          <h2 class="ff-heading" id="eduVideoTitle">Explainer videos</h2>
          <p class="ff-italian ff-italian--lg ff-italian--sable">Capire in pochi minuti</p>
        </div>
        <p class="section-head__intro">Three short films on cooking with less energy: sunshine, smarter hobs and an old trick that needs no fuel at all.</p>
      </div>

      <div class="tv-studio" id="videoTv" data-skill-label="Topic" hidden>
        <div class="tv-set">
          <div class="tv-set__antenna" aria-hidden="true"></div>
          <div class="tv-set__body">
            <div class="tv-set__screen" id="tvScreen" aria-live="polite"></div>
            <div class="tv-set__panel" aria-hidden="true">
              <span class="tv-set__onair" id="tvOnAir">In onda</span>
              <span class="tv-set__knob"></span>
              <span class="tv-set__knob tv-set__knob--small"></span>
              <span class="tv-set__grille"></span>
              <span class="tv-set__channel" id="tvChannel">01</span>
            </div>
          </div>
          <div class="tv-set__feet" aria-hidden="true"></div>
          <div class="tv-caption" id="tvCaption"></div>
        </div>

        <div class="tv-guide">
          <h3 class="tv-guide__title">Il palinsesto <span>Today's episodes</span></h3>
          <ol class="tv-guide__list" id="tvGuide"></ol>
        </div>
      </div>

      <!-- Without JavaScript or video links, the plain cards show instead -->
      <ul class="video-grid mt-4" data-resource-kinds="video"></ul>
    </div>
  </section>
</main>

<?php include 'includes/footer.php'; ?>
