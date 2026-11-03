<?php
$pageTitle   = 'Log in';
$currentPage = 'login';
$pageScripts = ['assets/js/login.js'];
include 'includes/header.php';
?>

<main id="main">
  <?php
  $heroTitle   = 'Welcome back';
  $heroItalian = 'Bentornato a tavola';
  $heroLead    = 'Log in to save recipes, comment and share your own dishes in the Community Cookbook.';
  $heroTheme   = 'piscine';
  $heroArt     = 'login';
  $heroCrumbs  = ['Home' => 'index.php', 'Log in' => null];
  include 'includes/page-hero.php';
  ?>

  <section class="ff-section ff-section--cream" aria-label="Log in and password reset">
    <div class="container-xl">
      <div class="auth-wrap">

        <!--
          Phase 2: login.php will check the email and password with PDO and
          password_verify(). The lockout (3 failed attempts, then 3 minutes)
          will be stored per account in the users table (failed_attempts,
          lockout_until), so it cannot be bypassed by the browser.
        -->
        <form class="form-card" id="loginForm" action="login.php" method="post" novalidate>
          <h2 class="ff-subheading">Log in</h2>

          <div class="auth-alert auth-alert--info" id="demoNote">
            <i class="bi bi-info-circle" aria-hidden="true"></i>
            <p class="m-0"><strong>Demo mode.</strong> Accounts arrive in phase 2. Until then every attempt counts as a wrong password, so you can see the 3-attempt lockout.</p>
          </div>

          <!-- Shown after a wrong password, and while locked. It is NOT a live
               region (the countdown changes every second); #loginLive below
               announces only the important moments. -->
          <p class="visually-hidden" id="loginLive" role="status" aria-live="polite"></p>
          <div class="auth-alert" id="loginAlert" hidden>
            <i class="bi bi-exclamation-triangle" aria-hidden="true"></i>
            <div>
              <p class="m-0 fw-bold" id="loginAlertTitle"></p>
              <p class="m-0" id="loginAlertText"></p>
              <ul class="attempt-dots" id="attemptDots" aria-hidden="true"><li></li><li></li><li></li></ul>
            </div>
          </div>

          <div class="row g-3 mt-2">
            <div class="col-12 ff-field">
              <label for="loginEmail">Email</label>
              <input id="loginEmail" name="email" type="email" required autocomplete="email" placeholder="name@example.com">
            </div>
            <div class="col-12 ff-field">
              <label for="loginPassword">Password</label>
              <input id="loginPassword" name="password" type="password" required autocomplete="current-password" data-error-message="Enter your password.">
            </div>
          </div>

          <button type="submit" class="ff-btn ff-btn--primary ff-btn--lg w-100 mt-4" id="loginButton">Log in</button>
          <div class="d-flex flex-wrap justify-content-between gap-2 mt-3">
            <button type="button" class="link-button" data-bs-toggle="collapse" data-bs-target="#resetPanel" aria-expanded="false" aria-controls="resetPanel">Forgot your password?</button>
            <span>New here? <button type="button" class="link-button" data-bs-toggle="modal" data-bs-target="#joinModal">Sign up now</button></span>
          </div>
        </form>

        <div>
          <!-- Password reset (Bootstrap collapse). Phase 2: emails a link with a one-time token that expires. -->
          <div class="collapse" id="resetPanel">
            <form class="form-card" id="resetForm" action="reset-password.php" method="post" novalidate>
              <h2 class="ff-subheading">Reset your password</h2>
              <p class="mt-2">Enter the email you signed up with and we will send you a link to choose a new password. The link works for 30 minutes.</p>
              <div class="ff-field mt-3">
                <label for="resetEmail">Email</label>
                <input id="resetEmail" name="email" type="email" required autocomplete="email" placeholder="name@example.com">
              </div>
              <button type="submit" class="ff-btn ff-btn--navy mt-3">Send reset link</button>
              <p class="form-status form-status--box" id="resetStatus" role="status" aria-live="polite"></p>
            </form>
          </div>

          <div class="contact-card mt-4">
            <h2><i class="bi bi-shield-lock" aria-hidden="true"></i> How we keep your account safe</h2>
            <ul class="contact-list">
              <li><i class="bi bi-key" aria-hidden="true"></i><span>Your password is stored as a one-way hash, never as plain text.</span></li>
              <li><i class="bi bi-hourglass-split" aria-hidden="true"></i><span>After 3 wrong passwords, logging in is paused for 3 minutes.</span></li>
              <li><i class="bi bi-envelope-check" aria-hidden="true"></i><span>Password reset links expire and can only be used once.</span></li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </section>
</main>

<?php include 'includes/footer.php'; ?>
