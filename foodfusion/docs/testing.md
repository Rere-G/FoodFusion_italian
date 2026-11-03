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
