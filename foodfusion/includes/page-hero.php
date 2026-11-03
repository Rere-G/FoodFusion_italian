<?php
/*
 * Page header used by every inner page: title, Italian line, intro,
 * optional buttons, and a hand-drawn illustration on the right.
 *
 * Set BEFORE including this file:
 *   $heroTitle    string  the page's <h1>
 *   $heroItalian  string  the Italian line under it
 *   $heroLead     string  one or two sentences of introduction
 *   $heroTheme    string  piscine (default) | sable | melon | cream | marine
 *   $heroArt      string  file name in includes/art/, e.g. "recipes"
 *   $heroActions  string  optional HTML for buttons (our own fixed markup)
 *   $heroCrumbs   array   optional breadcrumb: ['Label' => 'url', 'Section' => null, 'Current page' => null]
 *                         (a null url is plain text; the LAST item is the current page)
 */
$heroTheme   = $heroTheme   ?? 'piscine';
$heroActions = $heroActions ?? '';
$heroCrumbs  = $heroCrumbs  ?? [];
$artFile     = __DIR__ . '/art/' . basename($heroArt ?? '') . '.php';   // basename(): only files in art/
?>
<section class="page-hero page-hero--<?= htmlspecialchars($heroTheme) ?>" aria-labelledby="pageTitle">
  <div class="container-xl page-hero__inner">
    <div>
      <?php if ($heroCrumbs): ?>
        <nav aria-label="Breadcrumb">
          <ol class="crumbs">
            <?php $lastLabel = array_key_last($heroCrumbs); ?>
            <?php foreach ($heroCrumbs as $label => $url): ?>
              <li>
                <?php if ($label === $lastLabel): ?>
                  <span aria-current="page"><?= htmlspecialchars($label) ?></span>
                <?php elseif ($url): ?>
                  <a href="<?= htmlspecialchars($url) ?>"><?= htmlspecialchars($label) ?></a>
                <?php else: ?>
                  <span><?= htmlspecialchars($label) ?></span>
                <?php endif; ?>
              </li>
            <?php endforeach; ?>
          </ol>
        </nav>
      <?php endif; ?>
      <h1 class="page-hero__title" id="pageTitle"><?= htmlspecialchars($heroTitle) ?></h1>
      <p class="ff-italian ff-italian--lg"><?= htmlspecialchars($heroItalian) ?></p>
      <p class="page-hero__lead"><?= htmlspecialchars($heroLead) ?></p>
      <?php if ($heroActions): ?><div class="page-hero__actions"><?= $heroActions ?></div><?php endif; ?>
    </div>
    <div class="page-hero__art" aria-hidden="true">
      <?php if (is_file($artFile)) include $artFile; ?>
    </div>
  </div>
</section>
<div class="ff-stripes" aria-hidden="true"></div>
