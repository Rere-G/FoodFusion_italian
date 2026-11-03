<?php
/*
 * Shared footer, cookie banner, Join us modal and scripts.
 *
 * Optional variable, set BEFORE including this file:
 *   $pageScripts array  extra JS files for this page, e.g. ['assets/js/home.js']
 */
$pageScripts = $pageScripts ?? [];
?>
<footer class="site-footer">
  <div class="ff-stripes" aria-hidden="true"></div>
  <div class="container-xl site-footer__inner">
    <p class="site-footer__big">Buon appetito.</p>

    <div class="row g-4 g-lg-5 mt-1">
      <div class="col-lg-5">
        <p class="site-footer__name">FoodFusion</p>
        <p>Italian home cooking: recipes, techniques and a community of home cooks.</p>
        <ul class="social-links" aria-label="FoodFusion on social media">
          <li><a href="https://www.instagram.com/" target="_blank" rel="noopener"><i class="bi bi-instagram" aria-hidden="true"></i> Instagram</a></li>
          <li><a href="https://www.facebook.com/" target="_blank" rel="noopener"><i class="bi bi-facebook" aria-hidden="true"></i> Facebook</a></li>
          <li><a href="https://www.youtube.com/" target="_blank" rel="noopener"><i class="bi bi-youtube" aria-hidden="true"></i> YouTube</a></li>
          <li><a href="https://www.pinterest.com/" target="_blank" rel="noopener"><i class="bi bi-pinterest" aria-hidden="true"></i> Pinterest</a></li>
        </ul>
      </div>

      <nav class="col-6 col-md-4 col-lg-2" aria-label="Explore">
        <p class="site-footer__heading">Explore</p>
        <ul class="site-footer__links">
          <li><a href="recipes.php">Recipe collection</a></li>
          <li><a href="community.php">Community cookbook</a></li>
          <li><a href="culinary-resources.php">Culinary resources</a></li>
          <li><a href="educational-resources.php">Educational resources</a></li>
        </ul>
      </nav>

      <nav class="col-6 col-md-4 col-lg-2" aria-label="FoodFusion">
        <p class="site-footer__heading">FoodFusion</p>
        <ul class="site-footer__links">
          <li><a href="about.php">About us</a></li>
          <li><a href="contact.php">Contact us</a></li>
        </ul>
      </nav>

      <nav class="col-12 col-md-4 col-lg-3" aria-label="Your privacy">
        <p class="site-footer__heading">Your privacy</p>
        <ul class="site-footer__links">
          <li><a href="privacy.php">Privacy policy</a></li>
          <li><a href="cookies.php">Cookie policy</a></li>
          <li><button type="button" class="link-button" data-open-cookie-settings>Cookie settings</button></li>
        </ul>
      </nav>
    </div>

    <p class="site-footer__legal">&copy; <?= date('Y') ?> FoodFusion. A student project for NCC Education.</p>
  </div>
</footer>

<?php include __DIR__ . '/cookie-banner.php'; ?>
<?php include __DIR__ . '/join-modal.php'; ?>

<!-- Bootstrap JS (navbar collapse, modal) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<!-- Shared scripts, in order: data first, then helpers -->
<script src="assets/js/data.js"></script>
<script src="assets/js/main.js"></script>
<script src="assets/js/forms.js"></script>
<script src="assets/js/share.js"></script>

<!-- Page-specific scripts -->
<?php foreach ($pageScripts as $script): ?>
<script src="<?= htmlspecialchars($script) ?>"></script>
<?php endforeach; ?>
</body>
</html>
