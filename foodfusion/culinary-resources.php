<?php
$pageTitle   = 'Culinary resources';
$currentPage = 'culinary';
$pageScripts = ['assets/js/resources.js'];
include 'includes/header.php';
?>

<main id="main" data-resources-category="culinary">
  <?php
  $heroTitle   = 'Culinary resources';
  $heroItalian = 'Gli strumenti del mestiere';
  $heroLead    = 'Printable recipe cards for your kitchen wall, step-by-step tutorials, technique videos and the small kitchen hacks Italian cooks swear by.';
  $heroTheme   = 'piscine';
  $heroArt     = 'culinary';
  $heroCrumbs  = ['Home' => 'index.php', 'Resources' => null, 'Culinary resources' => null];
  $heroActions = '<a class="ff-btn ff-btn--primary ff-btn--lg" href="#cards"><i class="bi bi-download" aria-hidden="true"></i> Recipe cards</a>'
               . '<a class="ff-btn ff-btn--outline ff-btn--lg" href="#hacks">Kitchen hacks</a>';
  include 'includes/page-hero.php';
  ?>

  <!-- 1. RECIPE CARDS ======================================================= -->
  <section class="ff-section ff-section--cream" aria-labelledby="cardsTitle" id="cards">
    <div class="container-xl">
      <div class="section-head section-head--split mb-4">
        <div>
          <h2 class="ff-heading" id="cardsTitle">Printable recipe cards</h2>
          <p class="ff-italian ff-italian--lg">Le schede da stampare</p>
        </div>
        <p class="section-head__intro">A5 cards with ingredients, method and a tip, designed to print on one side. Free to download and keep.</p>
      </div>
      <ul class="download-grid" data-resource-kinds="recipe_card"></ul>
    </div>
  </section>

  <div class="tile-band" aria-hidden="true"></div>

  <!-- 2. TUTORIALS ========================================================== -->
  <section class="ff-section ff-section--sable" aria-labelledby="tutorialTitle">
    <div class="container-xl">
      <div class="row g-4 g-lg-5">
        <div class="col-lg-7">
          <h2 class="ff-heading" id="tutorialTitle">Tutorial: fresh egg pasta</h2>
          <p class="ff-italian ff-italian--lg">La sfoglia fatta a mano</p>
          <p class="mt-3">All you need is flour, eggs, a fork and a rolling pin. Allow 1 egg and 100 g of "00" flour per person.</p>
          <ol class="hack-list hack-list--steps mt-4">
            <li><strong>Make a well.</strong> Pile the flour on a board and make a wide hollow in the middle. Crack the eggs into it.</li>
            <li><strong>Mix with a fork.</strong> Beat the eggs, slowly pulling in flour from the inside wall, until it is too thick to stir.</li>
            <li><strong>Knead for 10 minutes.</strong> Push with the heel of your hand, fold and turn, until the dough is smooth and springs back.</li>
            <li><strong>Rest for 30 minutes.</strong> Wrap it. Resting relaxes the gluten so the dough rolls out thin without shrinking.</li>
            <li><strong>Roll it thin.</strong> Roll from the centre outwards, turning a quarter each time, until you can almost see the board through it.</li>
            <li><strong>Cut and cook.</strong> Roll the sheet loosely, slice into ribbons, shake them out, and boil for 2 to 3 minutes.</li>
          </ol>
        </div>
        <div class="col-lg-5">
          <h3 class="h4 fw-bold">Take the tutorials with you</h3>
          <ul class="download-grid download-grid--single mt-3" data-resource-kinds="guide"></ul>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. VIDEOS ============================================================= -->
  <section class="ff-section ff-section--marine" aria-labelledby="videoTitle">
    <div class="container-xl">
      <h2 class="ff-heading" id="videoTitle">Technique videos</h2>
      <p class="ff-italian ff-italian--lg ff-italian--sable">Guarda e impara</p>
      <ul class="video-grid mt-4" data-resource-kinds="video"></ul>
    </div>
  </section>

  <!-- 4. KITCHEN HACKS ====================================================== -->
  <section class="ff-section ff-section--cream" aria-labelledby="hacksTitle" id="hacks">
    <div class="container-xl">
      <h2 class="ff-heading" id="hacksTitle">Kitchen hacks from nonna</h2>
      <p class="ff-italian ff-italian--lg">I trucchi della nonna</p>
      <ol class="hack-list mt-4">
        <li><strong>Keep the pasta water.</strong> Its starch turns cheese and oil into a creamy sauce. Save a mugful before draining.</li>
        <li><strong>Salt the water, not the sauce.</strong> Pasta water should taste lightly of the sea; then season the sauce at the end.</li>
        <li><strong>Freeze Parmigiano rinds.</strong> Drop one into soups and stews for a deep savoury flavour.</li>
        <li><strong>Revive stale bread.</strong> Turn it into panzanella, ribollita or breadcrumbs instead of throwing it away.</li>
        <li><strong>Peel garlic with a knife.</strong> Press the clove with the flat of the blade and the skin slips off.</li>
        <li><strong>Grate tomatoes.</strong> Rub a halved tomato on a box grater for an instant fresh sauce; the skin stays behind.</li>
        <li><strong>Rest meat and risotto.</strong> Two minutes off the heat lets juices settle and risotto turn creamy.</li>
        <li><strong>Toast nuts in a dry pan.</strong> Pine nuts for pesto taste twice as nutty after a minute in a hot pan.</li>
      </ol>
    </div>
  </section>
</main>

<?php include 'includes/footer.php'; ?>
