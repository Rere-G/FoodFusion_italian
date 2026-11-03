<?php
$pageTitle   = 'Contact us';
$currentPage = 'contact';
$pageScripts = ['assets/js/contact.js'];

/*
 * Links such as contact.php?reason=recipe_request choose the reason for
 * the visitor. Only values from this list are accepted (a "whitelist"),
 * so nothing else from the address can end up in the page.
 */
$reasons = [
    'enquiry'        => ['label' => 'General enquiry', 'hint' => 'A question about FoodFusion', 'icon' => 'bi-question-circle'],
    'recipe_request' => ['label' => 'Recipe request',  'hint' => 'A dish you want us to add',   'icon' => 'bi-journal-plus'],
    'feedback'       => ['label' => 'Feedback',        'hint' => 'What we do well, or not',     'icon' => 'bi-chat-heart'],
];
$chosenReason = $_GET['reason'] ?? 'enquiry';
if (!array_key_exists($chosenReason, $reasons)) {
    $chosenReason = 'enquiry';
}

include 'includes/header.php';
?>

<main id="main">
  <?php
  $heroTitle   = 'Contact us';
  $heroItalian = 'Scrivici';
  $heroLead    = 'Questions, a recipe you would love us to add, or feedback on the site: we read every message and reply within two working days.';
  $heroTheme   = 'sable';
  $heroArt     = 'contact';
  $heroCrumbs  = ['Home' => 'index.php', 'Contact us' => null];
  include 'includes/page-hero.php';
  ?>

  <section class="ff-section ff-section--cream" aria-labelledby="formTitle">
    <div class="container-xl">
      <div class="row g-4 g-lg-5">

        <div class="col-lg-8">
          <!--
            Field names match the future contact_messages table.
            Phase 2: contact.php itself (or api/contact.php) saves the message with PDO.
          -->
          <form class="form-card" id="contactForm" action="contact.php" method="post" novalidate>
            <h2 class="ff-subheading" id="formTitle">Send us a message</h2>
            <p class="ff-italian ff-italian--lg">Ti rispondiamo presto</p>

            <fieldset class="mt-4">
              <legend>What is your message about?</legend>
              <div class="choice-cards">
                <?php foreach ($reasons as $value => $reason): ?>
                  <label class="choice-card">
                    <input type="radio" name="reason" value="<?= $value ?>" required <?= $value === $chosenReason ? 'checked' : '' ?>>
                    <span><strong><i class="bi <?= $reason['icon'] ?>" aria-hidden="true"></i> <?= $reason['label'] ?></strong><small><?= $reason['hint'] ?></small></span>
                  </label>
                <?php endforeach; ?>
              </div>
            </fieldset>

            <div class="row g-3 mt-2">
              <div class="col-md-6 ff-field">
                <label for="contactName">Your name</label>
                <input id="contactName" name="name" type="text" required maxlength="80" autocomplete="name">
              </div>
              <div class="col-md-6 ff-field">
                <label for="contactEmail">Email</label>
                <input id="contactEmail" name="email" type="email" required maxlength="255" autocomplete="email" placeholder="name@example.com">
              </div>
            </div>

            <!-- Only for recipe requests -->
            <div class="row g-3 mt-1" data-reason-fields="recipe_request" hidden>
              <div class="col-md-7 ff-field">
                <label for="contactDish">Which dish would you like?</label>
                <input id="contactDish" name="dish_name" type="text" required maxlength="100" placeholder="e.g. Pasta e fagioli" data-error-message="Tell us which dish you would like.">
              </div>
              <div class="col-md-5 ff-field">
                <label for="contactRegion">Region (optional)</label>
                <select id="contactRegion" name="dish_region">
                  <option value="">Not sure</option>
                  <option value="north">The North</option>
                  <option value="centre">The Centre</option>
                  <option value="south">The South</option>
                  <option value="islands">The Islands</option>
                </select>
              </div>
            </div>

            <!-- Only for feedback: a 1 to 5 rating as real radio buttons -->
            <fieldset class="mt-3" data-reason-fields="feedback" hidden>
              <legend>How would you rate FoodFusion?</legend>
              <div class="check-pills">
                <?php for ($star = 1; $star <= 5; $star++): ?>
                  <label class="check-pill"><input type="radio" name="rating" value="<?= $star ?>" required>
                    <span><?= str_repeat('&#9733;', $star) ?><span class="visually-hidden"> <?= $star ?> out of 5</span></span></label>
                <?php endfor; ?>
              </div>
            </fieldset>

            <div class="row g-3 mt-1">
              <div class="col-12 ff-field">
                <label for="contactSubject">Subject</label>
                <input id="contactSubject" name="subject" type="text" required maxlength="120" data-error-message="Add a short subject.">
              </div>
              <div class="col-12 ff-field">
                <label for="contactMessage">Message</label>
                <textarea id="contactMessage" name="message" rows="6" required minlength="20" maxlength="1000" aria-describedby="contactMessageCount" data-error-message="Write your message (at least 20 characters)."></textarea>
                <p class="char-count" id="contactMessageCount">0 of 1000 characters</p>
                <p class="visually-hidden" id="contactMessageLive" aria-live="polite"></p>
              </div>
              <div class="col-12 ff-check">
                <input id="contactAgree" name="agree" type="checkbox" required>
                <label for="contactAgree">I agree that FoodFusion can store my message to reply to me, as explained in the <a href="privacy.php">privacy policy</a>.</label>
              </div>
            </div>

            <button type="submit" class="ff-btn ff-btn--primary ff-btn--lg mt-4"><i class="bi bi-send" aria-hidden="true"></i> Send message</button>
            <div class="form-status form-status--box" id="contactStatus" role="status" aria-live="polite" tabindex="-1"></div>
          </form>
        </div>

        <aside class="col-lg-4 contact-aside" aria-label="Other ways to reach us">
          <div class="contact-card">
            <h2>Other ways to reach us</h2>
            <ul class="contact-list">
              <li><i class="bi bi-envelope" aria-hidden="true"></i><span><strong>Email</strong><br><a href="mailto:hello@foodfusion.example">hello@foodfusion.example</a></span></li>
              <li><i class="bi bi-clock" aria-hidden="true"></i><span><strong>Replies</strong><br>Within 2 working days, Monday to Friday</span></li>
              <li><i class="bi bi-people" aria-hidden="true"></i><span><strong>Community</strong><br>Ask other cooks in the <a href="community.php">Community Cookbook</a></span></li>
            </ul>
          </div>
          <div class="contact-card">
            <h2>Follow us</h2>
            <ul class="social-links social-links--light mt-0">
              <li><a href="https://www.instagram.com/" target="_blank" rel="noopener"><i class="bi bi-instagram" aria-hidden="true"></i> Instagram</a></li>
              <li><a href="https://www.facebook.com/" target="_blank" rel="noopener"><i class="bi bi-facebook" aria-hidden="true"></i> Facebook</a></li>
              <li><a href="https://www.youtube.com/" target="_blank" rel="noopener"><i class="bi bi-youtube" aria-hidden="true"></i> YouTube</a></li>
              <li><a href="https://www.pinterest.com/" target="_blank" rel="noopener"><i class="bi bi-pinterest" aria-hidden="true"></i> Pinterest</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <div class="tile-band" aria-hidden="true"></div>

  <!-- FAQ: Bootstrap accordion -->
  <section class="ff-section ff-section--piscine" aria-labelledby="faqTitle">
    <div class="container-xl">
      <div class="row g-4 g-lg-5">
        <div class="col-lg-4">
          <h2 class="ff-heading" id="faqTitle">Questions we hear a lot</h2>
          <p class="ff-italian ff-italian--lg ff-italian--navy">Domande frequenti</p>
        </div>
        <div class="col-lg-8">
          <div class="accordion ff-accordion" id="faq">
            <?php
            // Question => answer. Fixed copy, so it can live in the page.
            $faqs = [
                'Is FoodFusion free?' => 'Yes. Browsing recipes is free, and a free account lets you save recipes, comment and share your own.',
                'Can I request a recipe?' => 'Please do. Choose "Recipe request" above and tell us the dish. Popular requests are tested and added to the collection.',
                'How do the dietary labels work?' => 'Every recipe is checked for vegetarian, vegan and gluten-free. Always check packaged ingredients such as stock and pasta for allergens.',
                'I was locked out of my account. What now?' => 'After three wrong passwords, logging in is paused for three minutes to protect your account. Wait, then try again or reset your password.',
                'How do I delete my account or data?' => 'Write to us with "Delete my data" as the subject and we will remove your account and posts, as described in the privacy policy.',
            ];
            $i = 0;
            foreach ($faqs as $question => $answer):
                $i++;
            ?>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button<?= $i === 1 ? '' : ' collapsed' ?>" type="button" data-bs-toggle="collapse"
                          data-bs-target="#faq<?= $i ?>" aria-expanded="<?= $i === 1 ? 'true' : 'false' ?>" aria-controls="faq<?= $i ?>"><?= $question ?></button>
                </h3>
                <div id="faq<?= $i ?>" class="accordion-collapse collapse<?= $i === 1 ? ' show' : '' ?>" data-bs-parent="#faq">
                  <div class="accordion-body"><?= $answer ?></div>
                </div>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

<?php include 'includes/footer.php'; ?>
