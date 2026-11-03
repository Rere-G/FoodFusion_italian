<?php
$pageTitle   = 'Cookie policy';
$currentPage = 'cookies';
include 'includes/header.php';
?>

<main id="main">
  <?php
  $heroTitle   = 'Cookie policy';
  $heroItalian = 'Biscotti, ma digitali';
  $heroLead    = 'Cookies are small text files a website saves in your browser. Here is every one FoodFusion uses, what it does, and how to change your choice.';
  $heroTheme   = 'cream';
  $heroArt     = 'legal';
  $heroCrumbs  = ['Home' => 'index.php', 'Cookie policy' => null];
  include 'includes/page-hero.php';
  ?>

  <section class="ff-section ff-section--cream pt-5" aria-label="Cookie policy">
    <div class="container-xl">
      <div class="row g-4 g-lg-5">
        <div class="col-lg-8 prose">

          <!-- Your choice: main.js fills [data-consent-status] and handles [data-cookie-choice] buttons -->
          <div class="consent-box" id="settings">
            <h2 class="mt-0">Your cookie choice</h2>
            <p class="mb-2">Current choice: <strong data-consent-status>Not chosen yet</strong></p>
            <p>You can change it at any time. Choosing "Essential only" also deletes any preference cookies already saved.</p>
            <div class="d-flex flex-wrap gap-2">
              <button type="button" class="ff-btn ff-btn--primary" data-cookie-choice="all">Accept all cookies</button>
              <button type="button" class="ff-btn ff-btn--outline" data-cookie-choice="essential">Essential cookies only</button>
            </div>
            <p class="form-status mt-3" id="consentSaved" role="status" aria-live="polite"></p>
          </div>

          <h2>Essential cookies</h2>
          <p>These are needed for the site to work, so they do not need your consent.</p>
          <div class="table-scroll">
            <table class="cookie-table">
              <caption class="visually-hidden">Essential cookies</caption>
              <thead><tr><th scope="col">Name</th><th scope="col">What it does</th><th scope="col">How long</th></tr></thead>
              <tbody>
                <tr><td><code>ff_cookie_consent</code></td><td>Remembers whether you chose "Accept all" or "Essential only", so we don't ask again.</td><td>180 days</td></tr>
                <tr><td><code>PHPSESSID</code></td><td>Keeps you logged in while you move between pages (added when log-in goes live).</td><td>Until you close the browser</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Preference cookies</h2>
          <p>These are only saved if you choose "Accept all".</p>
          <div class="table-scroll">
            <table class="cookie-table">
              <caption class="visually-hidden">Preference cookies</caption>
              <thead><tr><th scope="col">Name</th><th scope="col">What it does</th><th scope="col">How long</th></tr></thead>
              <tbody>
                <tr><td><code>ff_pref_units</code></td><td>Remembers whether you prefer Metric or US cups in recipes.</td><td>180 days</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Not cookies, but similar</h2>
          <p>We use your browser's <strong>session storage</strong> to remember that you have already seen the "Sign up now" pop-up, so it opens only once per visit. It is deleted when you close the tab.</p>

          <h2>Third-party cookies</h2>
          <p>We do not use advertising or tracking cookies. Share buttons are plain links, so no social media cookies are set until you choose to visit that site.</p>

          <h2>Managing cookies in your browser</h2>
          <p>You can also delete or block cookies in your browser settings. Blocking essential cookies may stop log-in from working. Read our <a href="privacy.php">privacy policy</a> for more about your data.</p>
        </div>
      </div>
    </div>
  </section>
</main>

<script>
  // Small page-only script: confirm when the choice is saved.
  // ("ff:consentchange" is sent by setConsent() in main.js.)
  document.addEventListener('ff:consentchange', function (event) {
    document.getElementById('consentSaved').textContent =
      event.detail.choice === 'all' ? 'Saved: all cookies allowed.' : 'Saved: essential cookies only. Preference cookies deleted.';
  });
</script>

<?php include 'includes/footer.php'; ?>
