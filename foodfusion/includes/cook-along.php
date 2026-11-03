<?php
/*
 * Cook-along widget: servings scaler, Metric / US switch and cook mode.
 * Used on the homepage and on recipe.php. recipe.js fills it in.
 *
 * Set BEFORE including this file:
 *   $cookRecipeId int  the id of the recipe to show
 */
$cookRecipeId = (int) ($cookRecipeId ?? 0);
?>
<!-- recipe.js fills this using the recipe id in data-recipe-id -->
<div class="row g-4 mt-2" id="cookAlong" data-recipe-id="<?= $cookRecipeId ?>">

  <div class="col-lg-5">
    <div class="ingredients-card">
      <h3 class="h4 fw-bold">Ingredients</h3>

      <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mt-3">
        <div class="servings" role="group" aria-label="Servings">
          <button type="button" class="icon-btn" data-action="fewer" aria-label="Fewer servings"><i class="bi bi-dash-lg" aria-hidden="true"></i></button>
          <p class="servings__label" data-output="servings" aria-live="polite">2 servings</p>
          <button type="button" class="icon-btn" data-action="more" aria-label="More servings"><i class="bi bi-plus-lg" aria-hidden="true"></i></button>
        </div>
        <div class="unit-toggle" role="group" aria-label="Units">
          <button type="button" data-units="metric" aria-pressed="true">Metric</button>
          <button type="button" data-units="us" aria-pressed="false">US cups</button>
        </div>
      </div>

      <p class="small-note mt-2">
        <span data-output="original">Original recipe serves 2.</span>
        <button type="button" class="link-button" data-action="reset" hidden>Reset</button>
      </p>
      <ul class="ingredient-list" data-output="ingredients"></ul>
      <p class="small-note">Cooking times stay the same when you change servings.</p>
    </div>
  </div>

  <div class="col-lg-7">
    <div class="steps-card">
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-3">
        <p class="steps-card__counter" data-output="counter" aria-live="polite">Step 1 of 1</p>
        <!-- Hidden by recipe.js if the browser has no Wake Lock API -->
        <button type="button" class="switch" role="switch" aria-checked="false" data-action="awake">
          <span class="switch__track" aria-hidden="true"><span class="switch__knob"></span></span>
          Keep screen awake
        </button>
      </div>
      <div class="progress-steps" data-output="progress" aria-hidden="true"></div>
      <p class="steps-card__text" data-output="step"></p>
      <p class="time-chip" data-output="time" hidden></p>
      <p class="steps-card__note" data-output="awakeNote">Your screen may dim while you cook. Turn on Keep screen awake to stop it.</p>
      <div class="d-flex flex-wrap justify-content-between gap-3 mt-auto pt-3">
        <button type="button" class="ff-btn ff-btn--outline-light" data-action="prev"><i class="bi bi-chevron-left" aria-hidden="true"></i> Previous step</button>
        <button type="button" class="ff-btn ff-btn--sable" data-action="next"><span data-output="nextLabel">Next step</span> <i class="bi bi-chevron-right" aria-hidden="true"></i></button>
      </div>
    </div>
  </div>

</div>
