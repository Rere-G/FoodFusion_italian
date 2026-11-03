<!--
  "Join us" / "Sign up now" pop-up (Bootstrap modal).
  The input names match the future `users` table columns.
  Phase 2: register.php will validate again on the server, hash the
  password with password_hash() and insert the row with PDO.
-->
<div class="modal fade join-modal" id="joinModal" tabindex="-1" aria-labelledby="joinTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="join-modal__stripes" aria-hidden="true"></div>
      <button type="button" class="join-modal__close" data-bs-dismiss="modal" aria-label="Close">
        <i class="bi bi-x-lg" aria-hidden="true"></i>
      </button>

      <div class="modal-body">
        <h2 class="join-modal__title" id="joinTitle">Pull up a chair.</h2>
        <p class="ff-italian">Benvenuto a tavola.</p>
        <p>Create a free account to save recipes and share your own in the Community Cookbook.</p>

        <form id="joinForm" action="register.php" method="post" novalidate>
          <div class="row g-3">
            <div class="col-sm-6 ff-field">
              <label for="joinFirst">First name</label>
              <input id="joinFirst" name="first_name" type="text" autocomplete="given-name" required maxlength="50">
            </div>
            <div class="col-sm-6 ff-field">
              <label for="joinLast">Last name</label>
              <input id="joinLast" name="last_name" type="text" autocomplete="family-name" required maxlength="50">
            </div>
            <div class="col-12 ff-field">
              <label for="joinEmail">Email</label>
              <input id="joinEmail" name="email" type="email" autocomplete="email" placeholder="name@example.com" required maxlength="255">
            </div>
            <div class="col-12 ff-field">
              <label for="joinPassword">Password</label>
              <input id="joinPassword" name="password" type="password" autocomplete="new-password"
                     required minlength="8" aria-describedby="joinPasswordHint">
              <p class="ff-hint" id="joinPasswordHint">At least 8 characters, including a number.</p>
            </div>
            <div class="col-12 ff-check">
              <input id="joinAgree" name="agree" type="checkbox" required>
              <label for="joinAgree">I agree to the <a href="privacy.php">privacy policy</a> and <a href="cookies.php">cookie policy</a>.</label>
            </div>
          </div>

          <button type="submit" class="ff-btn ff-btn--primary w-100 mt-4">Create account</button>
          <p class="form-status" id="joinStatus" role="status" aria-live="polite"></p>
        </form>

        <p class="text-center mt-3 mb-0">Already a member? <a href="login.php" class="fw-bold">Log in</a></p>
      </div>
    </div>
  </div>
</div>
