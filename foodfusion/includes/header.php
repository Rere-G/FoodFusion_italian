<?php
/*
 * Shared page header: <head>, site header and main navigation.
 *
 * Set these variables BEFORE including this file:
 *   $pageTitle   string  e.g. "Recipe collection"
 *   $currentPage string  matches a key in $navLinks below, e.g. "recipes"
 *                        (or a dropdown child key, e.g. "culinary")
 */

$pageTitle   = $pageTitle   ?? 'FoodFusion';
$currentPage = $currentPage ?? '';

// One list of links, so the menu is the same on every page.
// "children" makes a dropdown (Resources has two pages).
$navLinks = [
    'home'      => ['href' => 'index.php',     'label' => 'Home'],
    'recipes'   => ['href' => 'recipes.php',   'label' => 'Recipes'],
    'community' => ['href' => 'community.php', 'label' => 'Community cookbook'],
    'resources' => ['label' => 'Resources', 'children' => [
        'culinary'    => ['href' => 'culinary-resources.php',    'label' => 'Culinary resources'],
        'educational' => ['href' => 'educational-resources.php', 'label' => 'Educational resources'],
    ]],
    'about'     => ['href' => 'about.php',     'label' => 'About us'],
    'contact'   => ['href' => 'contact.php',   'label' => 'Contact'],
];
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= htmlspecialchars($pageTitle) ?> | FoodFusion</title>
  <meta name="description" content="FoodFusion: Italian home cooking, region by region. Recipes, step-by-step cooking help and a community cookbook.">

  <!-- Fonts: Abril Fatface (display), Instrument Serif (Italian lines), Figtree (body) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Figtree:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap">

  <!-- Bootstrap 5.3.3 and Bootstrap Icons 1.11.3 -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

  <!-- Our styles load last so they win over Bootstrap's defaults -->
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body data-page="<?= htmlspecialchars($currentPage) ?>">

<a class="skip-link" href="#main">Skip to main content</a>

<header class="site-header">
  <nav class="navbar navbar-expand-lg" aria-label="Main">
    <div class="container-xl">
      <a class="navbar-brand brand" href="index.php" aria-label="FoodFusion home">
        <span class="brand__row">
          <svg class="brand__lemon" width="34" height="28" viewBox="0 0 40 32" aria-hidden="true">
            <path d="M22,7 C26,0 34,0 38,3 C34,9 27,10 22,7 Z" fill="#3F7A3A"/>
            <ellipse cx="18" cy="19" rx="14" ry="10" fill="#F2C84B" transform="rotate(-20 18 19)"/>
            <ellipse cx="5" cy="23" rx="3" ry="2.4" fill="#F2C84B"/>
          </svg>
          <span class="brand__name">FoodFusion</span>
        </span>
        <span class="brand__tagline">cucina di casa</span>
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
              aria-controls="mainNav" aria-expanded="false" aria-label="Open menu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav me-auto ms-lg-4">
          <?php foreach ($navLinks as $key => $link): ?>
            <?php if (isset($link['children'])): ?>
              <?php $isCurrentSection = array_key_exists($currentPage, $link['children']); ?>
              <li class="nav-item dropdown">
                <button class="nav-link dropdown-toggle<?= $isCurrentSection ? ' is-current' : '' ?>" type="button"
                        data-bs-toggle="dropdown" aria-expanded="false"><?= $link['label'] ?></button>
                <ul class="dropdown-menu">
                  <?php foreach ($link['children'] as $childKey => $child): ?>
                    <li><a class="dropdown-item" href="<?= $child['href'] ?>"
                           <?= $childKey === $currentPage ? 'aria-current="page"' : '' ?>><?= $child['label'] ?></a></li>
                  <?php endforeach; ?>
                </ul>
              </li>
            <?php else: ?>
              <li class="nav-item">
                <a class="nav-link" href="<?= $link['href'] ?>"
                   <?= $key === $currentPage ? 'aria-current="page"' : '' ?>><?= $link['label'] ?></a>
              </li>
            <?php endif; ?>
          <?php endforeach; ?>
        </ul>
        <div class="header-actions">
          <a class="ff-btn ff-btn--outline" href="login.php">Log in</a>
          <button class="ff-btn ff-btn--primary" type="button" data-bs-toggle="modal" data-bs-target="#joinModal">Join us</button>
        </div>
      </div>
    </div>
  </nav>
</header>
