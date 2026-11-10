# Testing table

Fill in "Actual result" and "Pass/Fail" yourself when you run each test in XAMPP.

| ID | Area | Test case | Steps | Expected result | Actual result | Pass/Fail | Issue and fix |
|---|---|---|---|---|---|---|---|
| T01 | Navbar | Menu collapses on small screens | Open index.php at 375px, 768px, 1280px | Menu button at 375/768px opens the links; full menu at 1280px | | | |
| T02 | Navbar | Current page marked | Open index.php | "Home" is underlined and has aria-current="page" | | | |
| T03 | Cookies | Banner on first visit | Clear cookies, open index.php | Cookie banner shows bottom-left | | | |
| T04 | Cookies | Choice remembered | Click "Accept all", reload | Banner stays hidden; cookie ff_cookie_consent=all exists | | | |
| T05 | Cookies | Reopen from footer | Click "Cookie settings" in footer | Banner shows again and focus moves into it | | | |
| T06 | Join us | Opens from button | Click "Join us" in header | Pop-up opens, focus is inside it | | | |
| T07 | Join us | Opens by itself once | New tab, wait 20 seconds on homepage | Pop-up opens once; does not reopen after reload in same tab | | | |
| T08 | Join us | Empty form | Click "Create account" with empty fields | A message under each field; focus moves to First name | | | |
| T09 | Join us | Weak password | Enter "password" | "Your password needs at least 8 characters, including a number." | | | |
| T10 | Join us | Valid form | Fill all fields correctly, tick box, submit | Thank-you message, form clears | | | |
| T11 | Map | Choose a region | Click "Islands" | Button pressed, Sicily and Sardinia highlighted, 3 island dishes shown | | | |
| T12 | Cook along | Servings scale | Click + twice (2 to 4 servings) | Pasta 400 g, Pecorino 200 g, pepper 2 tsp; step text amounts update too | | | |
| T13 | Cook along | Units | Click "US cups" at 4 servings | Pasta 14 oz, Pecorino 2 cups; servings stay 4 | | | |
| T14 | Cook along | Limits and reset | Click − to 1; click + to 12; click Reset | − disabled at 1, + disabled at 12; Reset returns to 2 | | | |
| T15 | Cook along | Step navigation | Click Next step to the end | "Step 5 of 5", progress full, button says "Start again" | | | |
| T16 | Cook along | Keep screen awake | Turn on switch on a phone/laptop | Switch on; screen does not dim | | | |
| T17 | Challenge | Like toggles | Click like on the 3rd entry | Count +1, button pressed; click again to undo | | | |
| T18 | Challenge | Leading badge | Like entry 2 so it ties/overtakes | "Leading" badge moves to the entry with the most likes | | | |
| T19 | Events | Carousel | Click next arrow | Posters move on by one event; "From …" date updates | | | |
| T20 | Accessibility | Keyboard only | Tab through whole homepage | Every control reachable, visible focus outline, skip link works | | | |
| T21 | Responsive | No sideways scroll | View at 320px wide | No horizontal scrollbar | | | |
| T22 | Hero | Scene animates | Open index.php and watch the hero for 10 seconds | Waves drift, boats bob, glints sparkle, wind lines blow across; branch and lemons swing more when a wind line reaches them | | | |
| T23 | Hero | Mouse breeze | Move the mouse quickly left and right over the hero | Lemons swing harder, then settle down | | | |
| T24 | Hero | Reduced motion | Windows: Settings > Accessibility > Visual effects > Animation effects OFF, reload | Hero scene is completely still | | | |
| T25 | Hero | Pauses off screen | Scroll down to the footer, check CPU in Task Manager | Animation stops while the hero is not visible | | | |
| T26 | Map | Pins choose a region | Click the pin on Sicily | Pin grows and turns red, "Islands" chip is pressed, island dishes shown | | | |
| T27 | Join us | Close button | Open Join us, click the ✕ | Pop-up closes | Pop-up stayed open | Fail → Pass | .modal-body covered the button; added z-index: 2 to .join-modal__close |
| T28 | Events carousel | Bootstrap carousel | On the homepage, click the next arrow and a dot | Moves to the next slide of events; "Showing events 4 to 6 of 6" is announced | | | |
| T29 | Share | Share menu | Click "Share" on an event poster | Menu with Facebook, X, Pinterest, WhatsApp, Email and Copy link opens; Escape closes it | | | |
| T30 | Cookies | Preference cookie only with consent | Choose "Accept all", switch a recipe to US cups, reload | US cups stays selected; cookie ff_pref_units=us exists | | | |
| T31 | Cookies | Essential only | On cookies.php choose "Essential cookies only", reload a recipe | Recipe shows Metric; ff_pref_units is deleted | | | |
| T32 | Recipes | URL filters | Open recipes.php?region=north&diet=gluten_free | 4 recipes; the filters are pre-selected | | | |
| T33 | Recipes | Combined filters | Tick "Hard" as well | 1 recipe (Osso buco); the address bar includes difficulty=hard | | | |
| T34 | Recipes | Empty state | Search "zzzz" | "No recipes match" message with a Clear filters button | | | |
| T35 | Recipes | Quick filter | Choose "30 minutes or less" | Only quick recipes; Pizza (24 hr dough) is not shown | | | |
| T36 | Recipe page | Unknown recipe | Open recipe.php?id=999 | "We could not find that recipe" with a link back | | | |
| T37 | Community | Filter feed | Click "Tips" | Only the 3 tip posts are shown | | | |
| T38 | Community | Like a post | Click the heart on Marco's post | Count goes up by 1; the button is pressed | | | |
| T39 | Community | Comment | Open comments, enter a name and comment, post | Comment appears in the list | | | |
| T40 | Community | Submit validation | Click "Share with the community" with an empty form | A message under each required field | | | |
| T41 | Community | Submit a tip | Choose "A tip", fill the form, submit | Confirmation; the tip appears at the top of the feed | | | |
| T42 | Community | Featured carousel | Use the arrows on "Featured this month" | Moves between slides of featured posts | | | |
| T43 | Contact | Reason from link | Open contact.php?reason=recipe_request | "Recipe request" is selected and the dish field shows | | | |
| T44 | Contact | Validation and send | Submit empty, then fill correctly | Errors first; then "Grazie, …" confirmation and the form clears | | | |
| T45 | Contact | Feedback rating | Choose "Feedback" | 1 to 5 star rating appears | | | |
| T46 | About | Team carousel | Use the arrows on "The team" | Shows the next team members | | | |
| T47 | Resources | Downloads | Click Download on each card | Each PDF downloads and opens | | | |
| T48 | Login (demo) | Lockout | Enter a wrong password 3 times | Log in is paused with a 3:00 countdown; still locked after reload | | | |
| T49 | Login (demo) | Password reset | Click "Forgot your password?", enter email, send | Same message whether or not the account exists | | | |
| T50 | Navigation | Resources dropdown | Open "Resources" in the menu with keyboard (Tab, Enter, arrows) | Culinary and Educational resources are listed and reachable | | | |
| T51 | Featured recipes | Dish photos and swipe | On index.php, look at each of the 3 featured recipes at 1440px, 768px and 390px; on a phone, swipe left on the slide | Pizza, risotto and caponata each show as a round cut-out photo with no white or checked square behind it; swipe moves on one recipe; no auto-advance | | | |
| T52 | Featured recipes | Recipe tabs | Click the "Caponata" tab, then the "Pizza Margherita" tab; then Tab through with the keyboard and press Enter on a tab | The clicked recipe's slide shows and its tab is cream with a red icon; keyboard reaches the 3 tabs in order, each with a visible outline; there are no arrow buttons | | | |
| T53 | Featured recipes | Reduced motion stops the spin | Watch the pizza for 5 seconds; then Windows: Settings > Accessibility > Visual effects > Animation effects OFF, reload | Normally the pizza turns slowly while its shadow stays still (down and to the right); with animation effects off, the pizza and the badge are still | | | |
| T54 | Culinary trends | Every trend card has a photo | On the homepage, go through both pages of Culinary trends with the arrow buttons, then at phone width with swipe | All 6 cards show a food photo filling the top of the card (no checkered placeholder), with the tag and date stamp readable on top | | | |
| T55 | Technique and explainer videos | Episode plays in the TV | On Culinary resources (Technique videos) and Educational resources (Explainer videos), press the big Play button | The YouTube video replaces the thumbnail inside the TV screen and starts; the "In onda" light turns red and pulses | | | |
| T56 | Technique and explainer videos | Changing episode | Click CH 02, then CH 03 in "Il palinsesto"; also Tab to an episode and press Enter | A short burst of static, then the new thumbnail, title, channel number and "Cook it next" recipe; the chosen episode is highlighted in yellow. With animation effects off, no static | | | |
| T57 | Technique and explainer videos | Nothing loads from YouTube before Play | On both resources pages, open DevTools > Network, filter "youtube", reload the page | No requests to YouTube until Play is pressed; then the player loads from youtube-nocookie.com | | | |
| T58 | Recipe collection | Menu board picks a course | Click "Primi" in the menu board, then "Tutto" | Primi turns yellow, only first courses show and the Course filter says "Primo (first course)"; Tutto shows all 19 again | | | |
| T59 | Recipe collection | Remove one filter with its chip | Tick Vegetarian and Easy, then press the "Easy ×" chip above the results | Only the Easy filter is removed (its pill unticks), the count updates, and "Clear all" removes the rest | | | |
| T60 | Recipe collection | Nothing matches | Search "zzzz" | The "Il piatto è vuoto" empty plate shows with a Clear filters button that brings all recipes back | | | |
