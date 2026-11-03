<?php
$pageTitle   = 'Privacy policy';
$currentPage = 'privacy';
include 'includes/header.php';
?>

<main id="main">
  <?php
  $heroTitle   = 'Privacy policy';
  $heroItalian = 'La tua privacy';
  $heroLead    = 'What we collect when you use FoodFusion, why we need it, how long we keep it and the choices you have. Written in plain English.';
  $heroTheme   = 'cream';
  $heroArt     = 'legal';
  $heroCrumbs  = ['Home' => 'index.php', 'Privacy policy' => null];
  include 'includes/page-hero.php';
  ?>

  <section class="ff-section ff-section--cream pt-5" aria-label="Privacy policy">
    <div class="container-xl">
      <div class="row g-4 g-lg-5">
        <aside class="col-lg-4">
          <nav class="toc" aria-labelledby="tocTitle">
            <h2 class="h5 fw-bold" id="tocTitle">On this page</h2>
            <ol>
              <li><a href="#who">Who we are</a></li>
              <li><a href="#collect">What we collect</a></li>
              <li><a href="#why">Why we use it</a></li>
              <li><a href="#keep">How long we keep it</a></li>
              <li><a href="#protect">How we protect it</a></li>
              <li><a href="#rights">Your rights</a></li>
              <li><a href="#cookies">Cookies</a></li>
              <li><a href="#contact">Contact</a></li>
            </ol>
          </nav>
        </aside>

        <div class="col-lg-8 prose">
          <p class="small-note"><i class="bi bi-info-circle" aria-hidden="true"></i> FoodFusion is a student project for NCC Education. This policy describes how the site is designed to handle personal data. Last updated: 3 November 2026.</p>

          <h2 id="who">1. Who we are</h2>
          <p>FoodFusion is an online community for Italian home cooking. In this policy "we" means the FoodFusion team. You can reach us through the <a href="contact.php">contact form</a>.</p>

          <h2 id="collect">2. What we collect</h2>
          <h3>When you sign up</h3>
          <ul>
            <li>Your first name, last name and email address.</li>
            <li>Your password, which we never store as you type it. It is turned into a one-way "hash", so nobody, including us, can read it.</li>
          </ul>
          <h3>When you take part</h3>
          <ul>
            <li>Recipes, tips, stories, photos and comments you post, and the posts you like.</li>
            <li>Messages you send through the contact form, including your name and email.</li>
          </ul>
          <h3>Automatically</h3>
          <ul>
            <li>A small number of cookies, explained in our <a href="cookies.php">cookie policy</a>.</li>
            <li>The number of failed log-in attempts on your account and when they happened, so we can pause log-ins after three wrong passwords.</li>
          </ul>

          <h2 id="why">3. Why we use it</h2>
          <ul>
            <li><strong>To run your account:</strong> to log you in and show your name on your posts.</li>
            <li><strong>To keep accounts safe:</strong> to stop people guessing passwords.</li>
            <li><strong>To reply to you:</strong> when you contact us.</li>
            <li><strong>To remember your choices:</strong> only if you accept preference cookies.</li>
          </ul>
          <p>We do not sell your data, and we do not use it for advertising.</p>

          <h2 id="keep">4. How long we keep it</h2>
          <ul>
            <li>Account details: until you delete your account.</li>
            <li>Posts and comments: until you delete them or your account.</li>
            <li>Contact messages: 12 months.</li>
            <li>Failed log-in records: cleared after a successful log-in or once the 3-minute pause ends.</li>
          </ul>

          <h2 id="protect">5. How we protect it</h2>
          <p>Passwords are hashed, the database is only reached through prepared statements, and everything you post is checked before it is shown, so it cannot run code in other people's browsers. After three wrong passwords, logging in to that account is paused for three minutes.</p>

          <h2 id="rights">6. Your rights</h2>
          <p>Under UK data protection law (the UK GDPR) you can ask to see the data we hold about you, correct it, delete it, or take a copy. You can also complain to the Information Commissioner's Office (ICO) at <a href="https://ico.org.uk/" target="_blank" rel="noopener">ico.org.uk</a>.</p>

          <h2 id="cookies">7. Cookies</h2>
          <p>We use essential cookies to remember your cookie choice and keep you logged in, and optional preference cookies only if you choose "Accept all". Read the <a href="cookies.php">cookie policy</a> or change your choice there.</p>

          <h2 id="contact">8. Contact</h2>
          <p>For any privacy question or request, use the <a href="contact.php">contact form</a> and choose "General enquiry".</p>
        </div>
      </div>
    </div>
  </section>
</main>

<?php include 'includes/footer.php'; ?>
