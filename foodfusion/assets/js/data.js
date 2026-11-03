/* =====================================================================
   data.js: placeholder data for phase 1.

   The shape of every object matches what the PHP web service will
   return as JSON in phase 2, and field names are snake_case so they
   match the MySQL columns.

   The rest of the site NEVER reads these arrays directly. It calls the
   get...() functions at the bottom. They are `async` already, so in
   phase 2 only the body of each function changes, for example:

     async function getRecipes() {
       const response = await fetch('api/recipes.php');
       return response.json();
     }
   ===================================================================== */

/* ---------- Recipes --------------------------------------------------
   region:     north | centre | south | islands
   course:     antipasto | primo | secondo | contorno | dolce
   dietary:    any of vegetarian | vegan | gluten_free
   difficulty: easy | medium | hard
   time_note:  extra waiting time that is not active cooking (optional)

   Ingredient amounts are PER SERVING. The servings scaler multiplies
   them. qty: null means "to taste".
   In steps, {0}, {1} ... are replaced by the amount of ingredient 0, 1 ...
---------------------------------------------------------------------- */
const recipes = [
  { id: 1,  title: 'Bruschetta al pomodoro',   title_en: 'Toasted bread with tomato',   region: 'centre',  course: 'antipasto', dietary: ['vegan'],                       difficulty: 'easy',   time_minutes: 15 },
  { id: 2,  title: 'Insalata caprese',         title_en: 'Tomato and mozzarella salad', region: 'south',   course: 'antipasto', dietary: ['vegetarian', 'gluten_free'],   difficulty: 'easy',   time_minutes: 10 },
  { id: 3,  title: 'Arancini',                 title_en: 'Fried stuffed rice balls',    region: 'islands', course: 'antipasto', dietary: ['vegetarian'],                  difficulty: 'hard',   time_minutes: 90 },
  { id: 4,  title: 'Farinata',                 title_en: 'Chickpea flatbread',          region: 'north',   course: 'antipasto', dietary: ['vegan', 'gluten_free'],        difficulty: 'easy',   time_minutes: 40, time_note: 'rest batter 4 hr' },
  { id: 5,  title: 'Spaghetti alla carbonara', title_en: 'Egg, Pecorino and guanciale', region: 'centre',  course: 'primo',     dietary: [],                              difficulty: 'medium', time_minutes: 25 },
  {
    id: 6,
    title: 'Cacio e pepe',
    title_en: 'Pecorino and black pepper',
    region: 'centre',
    course: 'primo',
    dietary: ['vegetarian'],
    difficulty: 'medium',
    time_minutes: 20,
    base_servings: 2,
    image: null,
    image_alt: 'Tonnarelli coated in a creamy Pecorino and black pepper sauce',
    ingredients: [
      { name: 'Tonnarelli or spaghetti',            metric: { qty: 100, unit: 'g' },   us: { qty: 3.5, unit: 'oz' } },
      { name: 'Pecorino Romano, finely grated',     metric: { qty: 50,  unit: 'g' },   us: { qty: 0.5, unit: 'cup' } },
      { name: 'Black peppercorns, freshly cracked', metric: { qty: 0.5, unit: 'tsp' }, us: { qty: 0.5, unit: 'tsp' } },
      { name: 'Salt, for the pasta water',          metric: { qty: null, unit: '' },   us: { qty: null, unit: '' } }
    ],
    steps: [
      { text: 'Bring a large pot of water to the boil. Salt it lightly, because Pecorino is already salty.', uses: [], time_minutes: 10 },
      { text: 'Toast {2} of cracked pepper in a dry, wide pan for 1 minute, until it smells fragrant.', uses: [2], time_minutes: 1 },
      { text: 'Cook {0} of pasta for 2 minutes less than the packet says. Keep a mug of the cooking water.', uses: [0], time_minutes: 8 },
      { text: 'Mix {1} of Pecorino with a few spoons of cool water to make a thick, smooth paste.', uses: [1], time_minutes: null },
      { text: 'Move the pasta and a splash of its water into the pepper pan. Off the heat, add the cheese paste and toss fast until creamy. Serve at once.', uses: [], time_minutes: null }
    ]
  },
  { id: 7,  title: 'Risotto alla Milanese',    title_en: 'Saffron risotto',             region: 'north',   course: 'primo',     dietary: ['gluten_free'],                 difficulty: 'medium', time_minutes: 40 },
  { id: 8,  title: 'Trofie al pesto',          title_en: 'Twists with basil pesto',     region: 'north',   course: 'primo',     dietary: ['vegetarian'],                  difficulty: 'medium', time_minutes: 30 },
  { id: 9,  title: 'Pasta alla Norma',         title_en: 'Pasta with aubergine and ricotta salata', region: 'islands', course: 'primo', dietary: ['vegetarian'],             difficulty: 'easy',   time_minutes: 45 },
  { id: 10, title: 'Lasagne alla Bolognese',   title_en: 'Baked ragù lasagne',          region: 'north',   course: 'primo',     dietary: [],                              difficulty: 'hard',   time_minutes: 180 },
  { id: 11, title: 'Ribollita',                title_en: 'Tuscan bread and bean soup',  region: 'centre',  course: 'primo',     dietary: ['vegan'],                       difficulty: 'easy',   time_minutes: 120 },
  { id: 12, title: 'Pizza Margherita',         title_en: 'Tomato, mozzarella and basil', region: 'south',  course: 'primo',     dietary: ['vegetarian'],                  difficulty: 'hard',   time_minutes: 45, time_note: 'plus 24 hr dough' },
  { id: 13, title: 'Osso buco',                title_en: 'Braised veal shanks',         region: 'north',   course: 'secondo',   dietary: ['gluten_free'],                 difficulty: 'hard',   time_minutes: 150 },
  { id: 14, title: 'Saltimbocca alla Romana',  title_en: 'Veal with sage and prosciutto', region: 'centre', course: 'secondo',   dietary: [],                              difficulty: 'medium', time_minutes: 25 },
  { id: 15, title: 'Parmigiana di melanzane',  title_en: 'Baked aubergine layers',      region: 'south',   course: 'secondo',   dietary: ['vegetarian'],                  difficulty: 'medium', time_minutes: 90 },
  { id: 16, title: 'Caponata',                 title_en: 'Sweet and sour aubergine',    region: 'islands', course: 'contorno',  dietary: ['vegan', 'gluten_free'],        difficulty: 'easy',   time_minutes: 60 },
  { id: 17, title: 'Tiramisù',                 title_en: 'Coffee and mascarpone layers', region: 'north',  course: 'dolce',     dietary: ['vegetarian'],                  difficulty: 'medium', time_minutes: 30, time_note: 'chill 6 hr' },
  { id: 18, title: 'Panna cotta',              title_en: 'Set vanilla cream',           region: 'north',   course: 'dolce',     dietary: ['gluten_free'],                 difficulty: 'easy',   time_minutes: 20, time_note: 'set 4 hr' },
  { id: 19, title: 'Cannoli siciliani',        title_en: 'Crisp shells with ricotta',   region: 'islands', course: 'dolce',     dietary: ['vegetarian'],                  difficulty: 'hard',   time_minutes: 60 }
];

/* ---------- Regions (the "cuisine type" category) ------------------- */
const regions = [
  { slug: 'north',   name: 'The North',   name_it: 'Il Nord',   description: 'Butter, rice and fresh egg pasta. The Alps and the Po valley give risotto, polenta and rich ragù.', featured_recipe_ids: [7, 8, 17] },
  { slug: 'centre',  name: 'The Centre',  name_it: 'Il Centro', description: 'Rome and Tuscany cook with very few, very good ingredients: Pecorino, pepper, bread and beans.', featured_recipe_ids: [5, 6, 11] },
  { slug: 'south',   name: 'The South',   name_it: 'Il Sud',    description: 'Sun, tomatoes and olive oil. From Naples to Calabria the cooking is bright, simple and generous.', featured_recipe_ids: [12, 15, 2] },
  { slug: 'islands', name: 'The Islands', name_it: 'Le Isole',  description: 'Sicily and Sardinia mix sweet and sour, saffron, almonds and ricotta, with Arab and Spanish echoes.', featured_recipe_ids: [3, 16, 19] }
];

/* ---------- Community posts (type: recipe | tip | story) ------------ */
const posts = [
  { id: 1, user_name: 'Giulia',    type: 'story', region: 'south',   place: 'Bari',    area: 'Puglia',         title: 'Orecchiette con cime di rapa', story: 'My grandmother shaped orecchiette every Sunday. She pressed each one with her thumb and never measured the flour.', image: null, image_alt: 'Orecchiette drying on a wooden board', likes: 18 },
  { id: 2, user_name: 'Paolo',     type: 'story', region: 'north',   place: 'Bologna', area: 'Emilia-Romagna', title: 'Tagliatelle al ragù',          story: 'My nonno rolled the sfoglia so thin you could see the tablecloth pattern through it.',                         image: null, image_alt: 'A thin sheet of egg pasta on a floured table', likes: 24 },
  { id: 3, user_name: 'Francesca', type: 'story', region: 'islands', place: 'Palermo', area: 'Sicily',         title: 'Cannoli siciliani',            story: 'Every Easter my aunt wrapped the dough around short lengths of cane to fry the cannoli shells.',              image: null, image_alt: 'Cannoli shells cooling on a tray', likes: 15 }
];

/* ---------- Monthly challenge (la sfida del mese) ------------------- */
const challenges = [
  {
    id: 1,
    title: 'Pasta e fagioli',
    month_label: 'November',
    description: "November's challenge: pasta and beans, the way your family makes it.",
    rules: [
      'Cook your version at home.',
      'Photograph it and write the story behind it.',
      'Post it in the Community Cookbook. The most-liked entry is featured in December.'
    ],
    closes_on: '2026-11-30'
  }
];

const challenge_entries = [
  { id: 1, challenge_id: 1, title: "Nonna Lucia's pasta e fagioli",        user_name: 'Marco', user_location: 'Naples',    image: null, image_alt: 'Thick bean and pasta soup in a bowl',  likes: 42 },
  { id: 2, challenge_id: 1, title: 'Pasta e ceci with rosemary',           user_name: 'Aisha', user_location: 'Leeds',     image: null, image_alt: 'Chickpea pasta with rosemary',         likes: 37 },
  { id: 3, challenge_id: 1, title: 'Borlotti and ditalini, Venetian style', user_name: 'Tom',   user_location: 'Melbourne', image: null, image_alt: 'Borlotti beans with short pasta',      likes: 29 }
];

/* ---------- Upcoming events ------------------------------------------ */
const events = [
  { id: 1, title: 'Fresh pasta by hand',           title_it: 'La pasta fresca',   event_date: '2026-11-14', start_time: '10:00', location: 'Online live class' },
  { id: 2, title: 'Risotto for autumn',            title_it: "Risotto d'autunno", event_date: '2026-11-21', start_time: '18:00', location: 'Online cook-along' },
  { id: 3, title: 'Pizza night, Neapolitan style', title_it: 'Pizza napoletana',  event_date: '2026-11-28', start_time: '18:30', location: 'Community kitchen' },
  { id: 4, title: 'Tiramisù masterclass',          title_it: 'Il tiramisù',       event_date: '2026-12-05', start_time: '15:00', location: 'Online live class' },
  { id: 5, title: 'Sicilian cannoli workshop',     title_it: 'Cannoli siciliani', event_date: '2026-12-12', start_time: '14:00', location: 'Online live class' },
  { id: 6, title: 'Christmas biscotti bake',       title_it: 'Biscotti di Natale', event_date: '2026-12-19', start_time: '11:00', location: 'Community kitchen' }
];

/* ---------- News feed: culinary trends ------------------------------- */
const news = [
  { id: 1, title: 'Cucina povera is back',       summary: 'Stale bread, beans and greens become dinners like ribollita and panzanella.',            published_on: '2026-10-12', image: null, image_alt: 'Bread, beans and greens on a table' },
  { id: 2, title: 'Pumpkin season in Mantua',    summary: 'Tortelli di zucca are a northern autumn classic. Make the filling a day ahead.',          published_on: '2026-10-06', image: null, image_alt: 'Pumpkin tortelli on a plate' },
  { id: 3, title: 'Why the pasta shape matters', summary: 'Ridged rigatoni hold a chunky ragù; smooth linguine suit olive oil and seafood.',         published_on: '2026-09-29', image: null, image_alt: 'Dried pasta shapes in jars' }
];


/* =====================================================================
   Data functions: one per data type. Phase 2 swaps each body for a
   fetch() call to the matching file in api/.
   ===================================================================== */
async function getRecipes()   { return recipes; }                              // api/recipes.php
async function getRecipe(id)  { return recipes.find(r => r.id === id) || null; } // api/recipes.php?id=
async function getRegions()   { return regions; }                              // api/regions.php
async function getPosts(type) { return type ? posts.filter(p => p.type === type) : posts; } // api/posts.php?type=
async function getChallenge() { return challenges[0]; }                        // api/challenge.php
async function getChallengeEntries(challengeId) {                              // api/challenge_entries.php?challenge_id=
  return challenge_entries.filter(e => e.challenge_id === challengeId);
}
async function getEvents()    { return events; }                               // api/events.php
async function getNews()      { return news; }                                 // api/news.php
