<?php
$pageTitle   = 'Italian home cooking';
$currentPage = 'home';
$pageScripts = ['assets/js/hero-motion.js', 'assets/js/recipe.js', 'assets/js/home.js'];
include 'includes/header.php';
?>

<main id="main">

  <!-- 1. HERO ============================================================ -->
  <section class="hero" aria-labelledby="heroTitle">
    <!--
      Decorative Amalfi scene. Parts that move have a data-motion attribute;
      assets/js/hero-motion.js animates them. Without JavaScript (or with
      "reduce motion" switched on) the scene simply stays still.
    -->
    <!-- Layer 1: the still, painted background. It is a separate SVG so the heavy
         paint filter is drawn once, not again on every animation frame. -->
    <svg class="hero__scene hero__backdrop" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <defs>
        <!-- "Oil paint" texture: wobbles the edges and adds brush-stroke grain -->
        <filter id="oilPaint" x="-2%" y="-2%" width="104%" height="104%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.035" numOctaves="3" seed="4" result="warp"/>
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="6" xChannelSelector="R" yChannelSelector="G" result="painted"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.08 0.5" numOctaves="2" seed="9" result="strokes"/>
          <feColorMatrix in="strokes" type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0 1" result="gray"/>
          <feComponentTransfer in="gray" result="soft">
            <feFuncR type="linear" slope="0.22" intercept="0.86"/>
            <feFuncG type="linear" slope="0.22" intercept="0.86"/>
            <feFuncB type="linear" slope="0.22" intercept="0.86"/>
          </feComponentTransfer>
          <feBlend in="painted" in2="soft" mode="multiply"/>
        </filter>
      </defs>
      <!-- Still background, painted with the oil texture -->
      <g filter="url(#oilPaint)">
        <rect x="0" y="0" width="1440" height="800" fill="#93B6CE"/>
        <ellipse cx="300" cy="120" rx="420" ry="70" fill="#A8C5D9" opacity="0.8"/>
        <ellipse cx="1150" cy="60" rx="380" ry="50" fill="#A8C5D9" opacity="0.7"/>
        <ellipse cx="900" cy="230" rx="500" ry="60" fill="#86AAC3" opacity="0.6"/>
        <ellipse cx="500" cy="340" rx="520" ry="50" fill="#B4CEDF" opacity="0.7"/>
        <rect x="0" y="440" width="1440" height="360" fill="#3A5A72"/>
        <rect x="0" y="440" width="1440" height="8" fill="#5E7F99"/>
        <ellipse cx="300" cy="520" rx="380" ry="30" fill="#4A6C85" opacity="0.7"/>
        <ellipse cx="560" cy="610" rx="420" ry="34" fill="#33526A" opacity="0.7"/>
        <ellipse cx="200" cy="670" rx="300" ry="26" fill="#5E7F99" opacity="0.6"/>
        <path d="M700,800 C760,610 860,440 1000,350 C1100,290 1260,262 1440,272 L1440,800 Z" fill="#5E7F45"/>
        <path d="M600,800 C640,724 720,680 820,668 C960,652 1140,680 1440,664 L1440,800 Z" fill="#F0D08C"/>
        <path d="M600,800 C640,724 720,680 820,668 C960,652 1140,680 1440,664 L1440,676 C1140,692 960,664 820,680 C724,692 650,734 616,800 Z" fill="#D9B46C" opacity="0.7"/>
      </g>
    </svg>

    <!-- Layer 2: everything in front, including the moving parts -->
    <svg class="hero__scene" id="heroScene" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="cloth" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(-6)">
          <rect width="60" height="60" fill="#FFF8EE"/>
          <rect width="30" height="30" fill="#D24E1A"/>
          <rect x="30" y="30" width="30" height="30" fill="#D24E1A"/>
        </pattern>
        <!-- One baluster (railing post), repeated along the terrace -->
        <pattern id="balusters" width="56" height="98" patternUnits="userSpaceOnUse" x="0" y="702">
          <path d="M22,0 H34 V8 C34,14 30,16 30,22 C30,30 38,36 38,50 C38,64 32,70 32,80 H36 V98 H20 V80 H24 C24,70 18,64 18,50 C18,36 26,30 26,22 C26,16 22,14 22,8 Z" fill="#FFF8EE"/>
          <path d="M33,10 C32,16 29,18 29,24 C29,32 36,38 36,50" stroke="#D9CDB8" stroke-width="2" fill="none"/>
        </pattern>
        <!-- Beach umbrella, drawn once and reused -->
        <symbol id="umbrella" overflow="visible">
          <path d="M0,-18 V26" stroke="#1F3546" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M-30,0 Q-26,-17 0,-21 Q26,-17 30,0 Z" fill="#D24E1A"/>
          <path d="M-10,0 Q-9,-19 0,-21 Q9,-19 10,0 Z" fill="#FFF8EE"/>
          <ellipse cx="14" cy="27" rx="16" ry="4" fill="#93B6CE"/>
        </symbol>
      </defs>

      <!-- Sun -->
      <circle cx="1210" cy="150" r="112" fill="#F6E2B0" opacity="0.5"/>
      <circle cx="1210" cy="150" r="74" fill="#F0D08C"/>
      <path d="M90,442 C140,412 210,406 270,442 Z" fill="#5E7F99"/>

      <!-- Waves drift side to side; glints sparkle; boats bob -->
      <g data-motion="waves" data-amp="22" data-period="14">
        <path d="M60,520 q20,-9 40,0 q20,9 40,0 M260,560 q20,-9 40,0 q20,9 40,0 M120,620 q20,-9 40,0 q20,9 40,0 M420,500 q20,-9 40,0 q20,9 40,0 M520,600 q20,-9 40,0 q20,9 40,0 M330,660 q20,-9 40,0 q20,9 40,0 M620,520 q20,-9 40,0" stroke="#93B6CE" stroke-width="3" stroke-linecap="round" fill="none"/>
      </g>
      <g data-motion="waves" data-amp="-22" data-period="18" data-offset="3">
        <path d="M180,470 q18,-8 36,0 q18,8 36,0 M360,520 q18,-8 36,0 M60,590 q18,-8 36,0 q18,8 36,0 M500,550 q18,-8 36,0 q18,8 36,0 M260,700 q18,-8 36,0 M600,640 q18,-8 36,0 q18,8 36,0" stroke="#B4CEDF" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
      </g>
      <g stroke="#FFF8EE" stroke-width="3" stroke-linecap="round">
        <path data-motion="glint" data-offset="0"   opacity="0" d="M150,500 h14"/>
        <path data-motion="glint" data-offset="0.8" opacity="0" d="M330,540 h14"/>
        <path data-motion="glint" data-offset="1.6" opacity="0" d="M470,585 h14"/>
        <path data-motion="glint" data-offset="2.3" opacity="0" d="M250,632 h14"/>
        <path data-motion="glint" data-offset="1.1" opacity="0" d="M620,566 h14"/>
        <path data-motion="glint" data-offset="2.8" opacity="0" d="M90,676 h14"/>
        <path data-motion="glint" data-offset="0.4" opacity="0" d="M420,470 h14"/>
      </g>
      <g data-motion="boat" data-offset="0" fill="#FFF8EE">
        <path d="M380,470 L380,440 L402,468 Z"/><path d="M370,472 L410,472 L404,480 L376,480 Z"/>
      </g>
      <g data-motion="boat" data-offset="1.7" fill="#FFF8EE">
        <path d="M560,540 L560,505 L586,537 Z"/><path d="M548,542 L594,542 L587,551 L555,551 Z"/>
      </g>

      <!-- Wind: these lines blow across. When one reaches the tree, the branch and lemons swing harder. -->
      <g stroke="#FFF8EE" stroke-linecap="round" fill="none">
        <path data-motion="gust" data-offset="0"   opacity="0" stroke-width="3"   d="M640,120 C700,108 760,132 820,120 C860,112 890,118 905,128 C912,136 900,144 892,136"/>
        <path data-motion="gust" data-offset="3"   opacity="0" stroke-width="2.5" d="M720,236 C790,222 850,248 930,232 C960,226 980,232 990,240"/>
        <path data-motion="gust" data-offset="5.5" opacity="0" stroke-width="2.5" d="M820,330 C880,320 930,340 1000,326"/>
      </g>

      <!-- Village: 11 houses spread over the hill -->
      <g>
        <rect x="1120" y="312" width="58" height="52" fill="#FFF8EE"/><rect x="1117" y="304" width="64" height="10" fill="#B23E10"/><rect x="1144" y="330" width="10" height="16" fill="#3A5A72"/>
        <rect x="1250" y="298" width="62" height="62" fill="#F68D40"/><rect x="1247" y="290" width="68" height="10" fill="#B23E10"/><rect x="1276" y="316" width="10" height="16" fill="#1F3546"/>
        <rect x="1370" y="316" width="56" height="56" fill="#F2C84B"/><rect x="1367" y="308" width="62" height="10" fill="#B23E10"/><rect x="1393" y="334" width="10" height="16" fill="#1F3546"/>
        <rect x="1030" y="394" width="60" height="58" fill="#E79A8C"/><rect x="1027" y="386" width="66" height="10" fill="#B23E10"/><rect x="1055" y="412" width="10" height="16" fill="#1F3546"/>
        <rect x="1182" y="408" width="64" height="60" fill="#F0D08C"/><rect x="1179" y="400" width="70" height="10" fill="#B23E10"/><rect x="1209" y="426" width="10" height="16" fill="#1F3546"/>
        <rect x="1322" y="396" width="58" height="64" fill="#FFF8EE"/><rect x="1319" y="388" width="64" height="10" fill="#B23E10"/><rect x="1346" y="414" width="10" height="16" fill="#3A5A72"/>
        <rect x="958"  y="490" width="62" height="58" fill="#F2C84B"/><rect x="955"  y="482" width="68" height="10" fill="#B23E10"/><rect x="984"  y="508" width="10" height="16" fill="#1F3546"/>
        <rect x="1258" y="478" width="66" height="64" fill="#E79A8C"/><rect x="1255" y="470" width="72" height="10" fill="#B23E10"/><rect x="1286" y="496" width="10" height="16" fill="#1F3546"/>
        <rect x="880"  y="582" width="64" height="60" fill="#FFF8EE"/><rect x="877"  y="574" width="70" height="10" fill="#B23E10"/><rect x="907"  y="600" width="10" height="16" fill="#3A5A72"/>
        <rect x="1200" y="584" width="62" height="62" fill="#F68D40"/><rect x="1197" y="576" width="68" height="10" fill="#B23E10"/><rect x="1226" y="602" width="10" height="16" fill="#1F3546"/>
        <rect x="1342" y="602" width="64" height="58" fill="#F0D08C"/><rect x="1339" y="594" width="70" height="10" fill="#B23E10"/><rect x="1369" y="620" width="10" height="16" fill="#1F3546"/>
      </g>

      <!-- Beach umbrellas -->
      <use href="#umbrella" transform="translate(1160,672)"/>
      <use href="#umbrella" transform="translate(1290,680) scale(1.1)"/>
      <use href="#umbrella" transform="translate(1395,670) scale(0.95)"/>

      <!-- Lemon branch: sways from its right end; each lemon swings from its stem -->
      <g data-motion="branch" data-pivot="1440 40">
        <path d="M1440,40 C1340,60 1240,70 1120,96 C1060,110 1010,118 960,116" stroke="#6B4A2E" stroke-width="8" stroke-linecap="round" fill="none"/>
        <path d="M1380,52 C1392,26 1424,20 1436,34 C1422,56 1394,62 1380,52 Z" fill="#3F7A3A"/>
        <path d="M1300,64 C1322,80 1326,106 1314,118 C1294,104 1290,80 1300,64 Z" fill="#4E8F46"/>
        <path d="M1180,84 C1194,58 1226,54 1238,68 C1222,90 1194,94 1180,84 Z" fill="#3F7A3A"/>
        <path d="M1110,100 C1128,118 1130,144 1118,156 C1098,140 1096,116 1110,100 Z" fill="#4E8F46"/>
        <path d="M990,114 C1000,92 1028,88 1040,100 C1026,120 1002,124 990,114 Z" fill="#3F7A3A"/>
        <g data-motion="lemon" data-pivot="1260 72" data-period="3.8" data-offset="0">
          <path d="M1260,70 C1262,100 1256,128 1246,146" stroke="#6B4A2E" stroke-width="4" stroke-linecap="round" fill="none"/>
          <g transform="translate(1246,184) rotate(8)"><ellipse rx="28" ry="38" fill="#F2C84B"/><ellipse cy="40" rx="6" ry="6" fill="#E9BB35"/><path d="M-10,-18 C-14,-4 -14,10 -10,22" stroke="#FFF1B8" stroke-width="5" stroke-linecap="round" fill="none"/></g>
        </g>
        <g data-motion="lemon" data-pivot="1060 110" data-period="4.6" data-offset="1.2">
          <path d="M1060,108 C1064,134 1060,156 1052,170" stroke="#6B4A2E" stroke-width="4" stroke-linecap="round" fill="none"/>
          <g transform="translate(1052,206) rotate(-12)"><ellipse rx="25" ry="34" fill="#F2C84B"/><ellipse cy="36" rx="5" ry="6" fill="#E9BB35"/><path d="M-9,-16 C-12,-4 -12,8 -9,19" stroke="#FFF1B8" stroke-width="4" stroke-linecap="round" fill="none"/></g>
        </g>
      </g>

      <!-- Terrace: balustrade, rail, tablecloth and lunch -->
      <rect x="0" y="702" width="1440" height="98" fill="url(#balusters)"/>
      <rect x="0" y="684" width="1440" height="18" rx="3" fill="#FFF8EE"/>
      <rect x="0" y="699" width="1440" height="4" fill="#D9CDB8"/>
      <ellipse cx="760" cy="820" rx="380" ry="120" fill="url(#cloth)"/>
      <ellipse cx="720" cy="752" rx="122" ry="48" fill="#FFFDF8" stroke="#1F3546" stroke-width="4"/>
      <ellipse cx="720" cy="746" rx="80" ry="30" fill="#F2CF7A"/>
      <path d="M660,748 C680,728 720,730 740,746 C760,762 790,752 778,736 M672,756 C700,742 730,764 760,752 M690,736 C710,724 744,726 760,740" stroke="#D9AE52" stroke-width="4" stroke-linecap="round" fill="none"/>
      <ellipse cx="722" cy="738" rx="40" ry="15" fill="#D24E1A"/>
      <path d="M712,728 C716,718 732,718 734,728 C726,734 716,734 712,728 Z" fill="#3F7A3A"/>
      <path d="M736,738 C744,730 758,734 756,744 C748,748 738,746 736,738 Z" fill="#4E8F46"/>
      <ellipse cx="930" cy="772" rx="48" ry="15" fill="#FFFDF8" stroke="#1F3546" stroke-width="3"/>
      <path d="M904,742 L956,742 L950,770 C946,776 914,776 910,770 Z" fill="#FFFDF8" stroke="#1F3546" stroke-width="3"/>
      <path d="M956,748 C970,748 970,762 954,762" stroke="#1F3546" stroke-width="3" fill="none"/>
      <ellipse cx="930" cy="744" rx="24" ry="5" fill="#3B2A1E"/>
      <ellipse cx="540" cy="780" rx="70" ry="22" fill="#3A5A72"/>
      <ellipse cx="520" cy="762" rx="22" ry="17" fill="#F2C84B"/>
      <ellipse cx="556" cy="764" rx="22" ry="17" fill="#F68D40"/>
      <ellipse cx="538" cy="748" rx="20" ry="16" fill="#F2C84B"/>
    </svg>

    <div class="container-xl hero__inner">
      <div class="hero__card-wrap">
        <!-- Postage-stamp card: scalloped edge (CSS mask) and a solid red offset shadow -->
        <div class="stamp-shadow">
          <div class="stamp">
            <div class="stamp__inner">
              <h1 class="hero__title" id="heroTitle">Cook Italy, one region at a time.</h1>
              <div class="lemon-rule" aria-hidden="true">
                <span></span>
                <svg width="34" height="26" viewBox="0 0 40 32"><path d="M22,7 C26,0 34,0 38,3 C34,9 27,10 22,7 Z" fill="#3F7A3A"/><ellipse cx="18" cy="19" rx="14" ry="10" fill="#F2C84B" transform="rotate(-20 18 19)"/><ellipse cx="5" cy="23" rx="3" ry="2.4" fill="#F2C84B"/></svg>
                <span></span>
              </div>
              <p class="ff-italian hero__italian">Cucina italiana, fatta in casa.</p>
              <p class="hero__lead">Recipes from the Alps to Sicily, step-by-step cooking help, and the stories of the families who cook them.</p>
              <div class="d-flex flex-wrap gap-3 mt-4">
                <a class="ff-btn ff-btn--primary ff-btn--lg" href="#map"><i class="bi bi-map" aria-hidden="true"></i> Explore the map</a>
                <button class="ff-btn ff-btn--outline ff-btn--lg" type="button" data-bs-toggle="modal" data-bs-target="#joinModal">Join the table</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Lemon sprig hanging over the card's corner (it sways in the wind too) -->
        <svg class="hero__sprig" viewBox="0 0 140 130" aria-hidden="true" focusable="false">
          <g data-motion="sprig" data-pivot="132 6" data-period="3.2" data-amp="3">
            <path d="M10,20 C40,14 80,16 132,6" stroke="#6B4A2E" stroke-width="6" stroke-linecap="round" fill="none"/>
            <path d="M64,18 C66,24 64,30 60,34" stroke="#6B4A2E" stroke-width="3" stroke-linecap="round" fill="none"/>
            <path d="M88,14 C100,-4 126,-6 134,6 C120,22 100,24 88,14 Z" fill="#3F7A3A"/>
            <path d="M28,18 C30,40 22,56 10,62 C4,46 12,28 28,18 Z" fill="#4E8F46"/>
            <path d="M96,16 C116,26 122,46 114,58 C98,50 90,32 96,16 Z" fill="#4E8F46"/>
            <g transform="translate(60,62) rotate(-18)"><ellipse rx="26" ry="34" fill="#F2C84B"/><ellipse cy="36" rx="5" ry="6" fill="#E9BB35"/><path d="M-9,-16 C-12,-4 -12,8 -9,19" stroke="#FFF1B8" stroke-width="4" stroke-linecap="round" fill="none"/></g>
          </g>
        </svg>
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
          <figure class="region-map">
            <!-- The pins sit on top of the image, placed with percentages so they stay in place at any size -->
            <div class="region-map__frame">
              <img src="assets/img/italy-regions-map.webp" id="italyMap" width="900" height="1210"
                   alt="Illustrated map of Italy's 20 regions. The North is selected.">
              <button type="button" class="map-pin" data-region="north"   style="--x: 38%; --y: 19%" aria-pressed="true"  aria-label="Show recipes from the North"></button>
              <button type="button" class="map-pin" data-region="centre"  style="--x: 49%; --y: 37%" aria-pressed="false" aria-label="Show recipes from the Centre"></button>
              <button type="button" class="map-pin" data-region="south"   style="--x: 71%; --y: 53%" aria-pressed="false" aria-label="Show recipes from the South"></button>
              <button type="button" class="map-pin" data-region="islands" style="--x: 60%; --y: 76%" aria-pressed="false" aria-label="Show recipes from Sicily and the islands"></button>
              <button type="button" class="map-pin" data-region="islands" style="--x: 23%; --y: 57%" aria-pressed="false" aria-label="Show recipes from Sardinia and the islands"></button>
            </div>
            <figcaption>Italy's 20 regions. Tap a pin to explore.</figcaption>
          </figure>
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
