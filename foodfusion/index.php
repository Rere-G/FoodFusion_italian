<?php
$pageTitle   = 'Italian home cooking';
$currentPage = 'home';
$pageScripts = ['assets/js/recipe.js', 'assets/js/home.js'];
include 'includes/header.php';
?>

<main id="main">

  <!-- 1. HERO ============================================================ -->
  <section class="hero" aria-labelledby="heroTitle">
    <!-- Decorative Amalfi scene: sea, hillside village, lemons, table -->
    <svg class="hero__scene" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <!-- One house drawn once, reused with <use>. Its wall colour comes from `color`. -->
        <symbol id="house" viewBox="0 0 66 68">
          <rect x="3" y="8" width="60" height="60" fill="currentColor"/>
          <rect x="0" y="0" width="66" height="10" fill="#B23E10"/>
          <rect x="28" y="26" width="10" height="16" fill="#1F3546"/>
        </symbol>
        <pattern id="cloth" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(-6)">
          <rect width="60" height="60" fill="#FFF8EE"/>
          <rect width="30" height="30" fill="#D24E1A"/>
          <rect x="30" y="30" width="30" height="30" fill="#D24E1A"/>
        </pattern>
      </defs>

      <circle cx="1210" cy="150" r="74" fill="#F0D08C"/>
      <rect x="0" y="440" width="1440" height="360" fill="#3A5A72"/>
      <path d="M60,520 q20,-9 40,0 q20,9 40,0 M260,560 q20,-9 40,0 q20,9 40,0 M120,620 q20,-9 40,0 q20,9 40,0 M420,500 q20,-9 40,0 q20,9 40,0 M520,600 q20,-9 40,0 q20,9 40,0"
            stroke="#93B6CE" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M380,470 L380,440 L402,468 Z M370,472 L410,472 L404,480 L376,480 Z" fill="#FFF8EE"/>
      <path d="M700,800 C760,610 860,440 1000,350 C1100,290 1260,262 1440,272 L1440,800 Z" fill="#5E7F45"/>

      <g>
        <use href="#house" x="1100" y="290" width="62" height="66" style="color:#F0D08C"/>
        <use href="#house" x="1170" y="288" width="62" height="66" style="color:#FFF8EE"/>
        <use href="#house" x="1240" y="284" width="62" height="70" style="color:#F68D40"/>
        <use href="#house" x="1310" y="282" width="62" height="72" style="color:#E79A8C"/>
        <use href="#house" x="1380" y="284" width="62" height="70" style="color:#F2C84B"/>
        <use href="#house" x="1000" y="358" width="62" height="66" style="color:#FFF8EE"/>
        <use href="#house" x="1068" y="356" width="62" height="68" style="color:#F68D40"/>
        <use href="#house" x="1206" y="358" width="62" height="66" style="color:#E79A8C"/>
        <use href="#house" x="1276" y="354" width="62" height="70" style="color:#FFF8EE"/>
        <use href="#house" x="1344" y="356" width="62" height="68" style="color:#F0D08C"/>
        <use href="#house" x="930"  y="424" width="62" height="66" style="color:#F0D08C"/>
        <use href="#house" x="1104" y="420" width="62" height="70" style="color:#FFF8EE"/>
        <use href="#house" x="1242" y="420" width="62" height="70" style="color:#F2C84B"/>
        <use href="#house" x="1380" y="424" width="62" height="66" style="color:#E79A8C"/>
        <use href="#house" x="870"  y="492" width="62" height="66" style="color:#FFF8EE"/>
        <use href="#house" x="1008" y="492" width="62" height="66" style="color:#F68D40"/>
        <use href="#house" x="1146" y="488" width="62" height="70" style="color:#E79A8C"/>
        <use href="#house" x="1320" y="492" width="62" height="66" style="color:#F68D40"/>
        <use href="#house" x="894"  y="558" width="62" height="68" style="color:#FFF8EE"/>
        <use href="#house" x="1032" y="556" width="62" height="70" style="color:#F0D08C"/>
        <use href="#house" x="1170" y="558" width="62" height="68" style="color:#FFF8EE"/>
        <use href="#house" x="1308" y="556" width="62" height="70" style="color:#E79A8C"/>
      </g>
      <circle cx="1050" cy="352" r="18" fill="#3F7A3A"/>
      <circle cx="1226" cy="540" r="20" fill="#3F7A3A"/>

      <!-- Lemon branch -->
      <path d="M1440,40 C1340,60 1240,70 1120,96 C1060,110 1010,118 960,116" stroke="#6B4A2E" stroke-width="8" stroke-linecap="round" fill="none"/>
      <path d="M1260,70 C1262,100 1256,128 1246,146 M1060,108 C1064,134 1060,156 1052,170" stroke="#6B4A2E" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M1380,52 C1392,26 1424,20 1436,34 C1422,56 1394,62 1380,52 Z M1180,84 C1194,58 1226,54 1238,68 C1222,90 1194,94 1180,84 Z M990,114 C1000,92 1028,88 1040,100 C1026,120 1002,124 990,114 Z" fill="#3F7A3A"/>
      <path d="M1300,64 C1322,80 1326,106 1314,118 C1294,104 1290,80 1300,64 Z M1110,100 C1128,118 1130,144 1118,156 C1098,140 1096,116 1110,100 Z" fill="#4E8F46"/>
      <ellipse cx="1246" cy="184" rx="28" ry="38" fill="#F2C84B" transform="rotate(8 1246 184)"/>
      <ellipse cx="1052" cy="206" rx="25" ry="34" fill="#F2C84B" transform="rotate(-12 1052 206)"/>

      <!-- Terrace railing and table -->
      <rect x="0" y="690" width="1440" height="12" fill="#FFF8EE"/>
      <path d="M30,702 V800 M100,702 V800 M170,702 V800 M240,702 V800 M310,702 V800 M380,702 V800 M1100,702 V800 M1170,702 V800 M1240,702 V800 M1310,702 V800 M1380,702 V800"
            stroke="#FFF8EE" stroke-width="10" opacity="0.85"/>
      <ellipse cx="760" cy="820" rx="380" ry="120" fill="url(#cloth)"/>
      <ellipse cx="720" cy="752" rx="122" ry="48" fill="#FFFDF8" stroke="#1F3546" stroke-width="4"/>
      <ellipse cx="720" cy="746" rx="80" ry="30" fill="#F2CF7A"/>
      <ellipse cx="722" cy="738" rx="40" ry="15" fill="#D24E1A"/>
      <path d="M712,728 C716,718 732,718 734,728 C726,734 716,734 712,728 Z" fill="#3F7A3A"/>
      <ellipse cx="540" cy="780" rx="70" ry="22" fill="#3A5A72"/>
      <ellipse cx="520" cy="762" rx="22" ry="17" fill="#F2C84B"/>
      <ellipse cx="556" cy="764" rx="22" ry="17" fill="#F68D40"/>
    </svg>

    <div class="container-xl hero__inner">
      <div class="poster-card hero__card">
        <h1 class="hero__title" id="heroTitle">Cook Italy, one region at a time.</h1>
        <p class="ff-italian ff-italian--lg">Cucina italiana, fatta in casa.</p>
        <p class="hero__lead">Recipes from the Alps to Sicily, step-by-step cooking help, and the stories of the families who cook them.</p>
        <div class="d-flex flex-wrap gap-3 mt-4">
          <a class="ff-btn ff-btn--primary ff-btn--lg" href="#map"><i class="bi bi-map" aria-hidden="true"></i> Explore the map</a>
          <button class="ff-btn ff-btn--outline ff-btn--lg" type="button" data-bs-toggle="modal" data-bs-target="#joinModal">Join the table</button>
        </div>
      </div>
    </div>
  </section>
  <div class="ff-stripes" aria-hidden="true"></div>


  <!-- 2. INTERACTIVE MAP ================================================== -->
  <section class="ff-section ff-section--cream" id="map" aria-labelledby="mapTitle">
    <div class="container-xl">
      <div class="section-head section-head--center">
        <h2 class="ff-heading" id="mapTitle">Where shall we cook today?</h2>
        <p class="ff-italian ff-italian--lg">Dove cuciniamo oggi?</p>
      </div>

      <div class="region-picker" role="group" aria-label="Choose a region">
        <button type="button" class="region-btn" data-region="north" aria-pressed="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M3 19 L9 9 L13 15 L16 11 L21 19 Z"/></svg>
          North
        </button>
        <button type="button" class="region-btn" data-region="centre" aria-pressed="false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M12 3 C9 8 9 14 10 19 H14 C15 14 15 8 12 3 Z"/><path d="M12 19 V22"/></svg>
          Centre
        </button>
        <button type="button" class="region-btn" data-region="south" aria-pressed="false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2 V4.5 M12 19.5 V22 M2 12 H4.5 M19.5 12 H22 M4.9 4.9 L6.7 6.7 M17.3 17.3 L19.1 19.1 M4.9 19.1 L6.7 17.3 M17.3 6.7 L19.1 4.9"/></svg>
          South
        </button>
        <button type="button" class="region-btn" data-region="islands" aria-pressed="false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 10 C6 7 9 13 12 10 C15 7 18 13 21 10"/><path d="M3 16 C6 13 9 19 12 16 C15 13 18 19 21 16"/></svg>
          Islands
        </button>
      </div>

      <div class="row g-4 g-lg-5 align-items-center mt-2">
        <div class="col-lg-5 d-flex justify-content-center">
          <!-- Map of Italy. The boot is split into 3 bands with a clipPath; the islands are separate shapes. -->
          <svg class="italy-map" id="italyMap" viewBox="40 20 350 470" role="img" aria-label="Map of Italy with the North highlighted">
            <defs>
              <!-- The boot outline is drawn once and reused twice: as a clip and as the border -->
              <path id="bootShape" d="M60,70 C90,55 130,48 170,45 C200,40 230,38 255,45 L262,70 C248,80 232,88 222,96 C228,120 232,140 240,160 C252,182 270,205 290,222 L305,228 C300,236 296,242 292,246 C315,262 340,285 362,312 C368,320 360,326 352,324 C335,312 315,300 300,295 C292,310 292,325 290,345 C285,365 278,385 268,402 C262,410 254,410 252,402 C258,385 262,368 262,355 C255,338 245,320 232,306 C214,288 198,268 186,250 C176,230 166,210 156,192 C146,175 132,155 118,142 C105,136 90,134 76,132 C70,118 66,100 62,88 Z"/>
              <clipPath id="boot"><use href="#bootShape"/></clipPath>
            </defs>
            <circle cx="200" cy="250" r="190" fill="#93B6CE" opacity="0.35"/>
            <g clip-path="url(#boot)">
              <rect class="map-area" data-region="north"  x="0" y="0"   width="400" height="162"/>
              <rect class="map-area" data-region="centre" x="0" y="162" width="400" height="108"/>
              <rect class="map-area" data-region="south"  x="0" y="270" width="400" height="220"/>
              <path d="M0,162 H400 M0,270 H400" stroke="#FFF8EE" stroke-width="3" stroke-dasharray="6 6"/>
            </g>
            <use href="#bootShape" fill="none" stroke="#1F3546" stroke-width="4" stroke-linejoin="round"/>
            <!-- Sicily and Sardinia -->
            <path class="map-area map-area--island" data-region="islands" d="M200,418 C225,410 255,408 280,412 C276,428 268,445 258,462 C240,452 218,438 200,430 Z"/>
            <path class="map-area map-area--island" data-region="islands" d="M88,236 C104,230 116,240 118,260 C120,285 116,310 106,325 C94,320 84,300 82,275 C80,258 82,244 88,236 Z"/>
            <!-- Compass -->
            <g transform="translate(330,70)">
              <circle r="26" fill="#FFF8EE" stroke="#1F3546" stroke-width="2"/>
              <path d="M0,-20 L5,0 L0,20 L-5,0 Z" fill="#B23E10"/>
              <path d="M-20,0 L0,-4 L20,0 L0,4 Z" fill="#1F3546"/>
            </g>
          </svg>
        </div>

        <!-- Filled in by home.js from data.js -->
        <div class="col-lg-7" id="regionPanel" aria-live="polite">
          <p class="loading-note">Loading recipes&hellip;</p>
        </div>
      </div>
    </div>
  </section>


  <!-- 3. COOK ALONG (servings scaler + cook mode) ========================= -->
  <section class="ff-section ff-section--marine" aria-labelledby="cookTitle">
    <div class="container-xl">
      <div class="section-head section-head--split">
        <div>
          <h2 class="ff-heading" id="cookTitle">Cook along, step by step.</h2>
          <p class="ff-italian ff-italian--lg ff-italian--sable" id="cookRecipeName">Si cucina!</p>
        </div>
        <p class="section-head__intro">Change the servings and every amount updates, in the ingredient list and in the steps. Cook mode keeps your screen awake while your hands are busy.</p>
      </div>

      <!-- recipe.js fills this using the recipe id in data-recipe-id -->
      <div class="row g-4 mt-2" id="cookAlong" data-recipe-id="6">

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
    </div>
  </section>


  <!-- 4. POSTCARD STORIES ================================================= -->
  <section class="ff-section ff-section--sable" aria-labelledby="storiesTitle">
    <div class="container-xl">
      <div class="section-head section-head--split">
        <div>
          <h2 class="ff-heading" id="storiesTitle">Postcards from nonna's kitchen</h2>
          <p class="ff-italian ff-italian--lg">Le storie dietro i piatti</p>
        </div>
        <a class="fw-bold" href="community.php">Send your own postcard</a>
      </div>
      <div class="postcard-grid" id="storyList"></div>
    </div>
  </section>


  <!-- 5. MONTHLY CHALLENGE ================================================ -->
  <section class="ff-section ff-section--cream" aria-labelledby="challengeTitle">
    <div class="container-xl">
      <!-- home.js fills the ticket and the entries -->
      <div id="challenge"></div>
      <h3 class="h4 fw-bold mt-5">Entries so far</h3>
      <ul class="entry-grid" id="entryList"></ul>
    </div>
  </section>


  <!-- 6. EVENTS POSTER WALL (the brief's events carousel) ================= -->
  <section class="ff-section ff-section--piscine" aria-labelledby="eventsTitle">
    <div class="container-xl">
      <div class="section-head section-head--split">
        <div>
          <h2 class="ff-heading" id="eventsTitle">Cook with us</h2>
          <p class="ff-italian ff-italian--lg ff-italian--navy">Prossimi eventi</p>
        </div>
        <div class="d-flex align-items-center gap-3">
          <p class="m-0 fw-semibold" id="eventsRange" aria-live="polite"></p>
          <button type="button" class="icon-btn icon-btn--lg" id="eventsPrev" aria-label="Earlier events"><i class="bi bi-chevron-left" aria-hidden="true"></i></button>
          <button type="button" class="icon-btn icon-btn--lg" id="eventsNext" aria-label="Later events"><i class="bi bi-chevron-right" aria-hidden="true"></i></button>
        </div>
      </div>
      <ul class="poster-grid" id="eventList"></ul>
    </div>
  </section>


  <!-- 7. NEWS FEED: culinary trends ======================================= -->
  <section class="ff-section ff-section--cream" aria-labelledby="newsTitle">
    <div class="container-xl">
      <h2 class="ff-heading ff-heading--sm" id="newsTitle">Kitchen notes</h2>
      <p class="ff-italian ff-italian--lg">Tendenze in cucina</p>
      <div class="news-grid" id="newsList"></div>
    </div>
  </section>

</main>

<?php include 'includes/footer.php'; ?>
