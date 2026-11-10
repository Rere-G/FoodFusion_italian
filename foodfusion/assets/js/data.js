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

/* ---------- Two small helpers to keep the recipe list readable ------
   ing()  builds one ingredient. Amounts are PER SERVING; the servings
          scaler multiplies them. Pass null as the quantity for things
          like "salt, to taste"; `note` is then shown instead.
   step() builds one method step. {0}, {1} ... in the text are replaced
          by the amount of ingredient 0, 1 ... for the chosen servings.
   Both return plain objects, exactly like rows from the database.
---------------------------------------------------------------------- */
function ing(name, metricQty, metricUnit, usQty, usUnit, note) {
  return {
    name,
    metric: { qty: metricQty, unit: metricUnit },
    us: { qty: usQty, unit: usUnit },
    note: note || null
  };
}
function step(text, minutes) {
  return { text, time_minutes: minutes || null };
}

/* ---------- Recipes --------------------------------------------------
   region:     north | centre | south | islands
   course:     antipasto | primo | secondo | contorno | dolce
   dietary:    any of vegetarian | vegan | gluten_free
   difficulty: easy | medium | hard
   time_note:  extra waiting time that is not active cooking (optional)
---------------------------------------------------------------------- */
const recipes = [
  {
    id: 1, title: 'Bruschetta al pomodoro', title_en: 'Toasted bread with tomato',
    region: 'centre', course: 'antipasto', dietary: ['vegan'], difficulty: 'easy',
    time_minutes: 15, base_servings: 4,
    description: 'Charred country bread rubbed with garlic and piled with ripe, basil-scented tomatoes.',
    image: 'assets/img/recipes/bruschetta-al-pomodoro.webp', image_alt: 'Slices of toasted bread topped with diced tomato and basil',
    ingredients: [
      ing('Slices of rustic bread', 2, '', 2, ''),
      ing('Ripe plum tomatoes, diced', 75, 'g', 2.6, 'oz'),
      ing('Garlic clove, halved', 0.25, '', 0.25, ''),
      ing('Basil leaves, torn', 2, '', 2, ''),
      ing('Extra-virgin olive oil', 1, 'tbsp', 1, 'tbsp'),
      ing('Salt', null, '', null, '', 'To taste')
    ],
    steps: [
      step('Mix {1} of diced tomato with the basil, half the olive oil and a pinch of salt. Leave it to rest so the juices come out.', 10),
      step('Toast or grill {0} slices of bread until golden and a little charred at the edges.', 3),
      step('Rub the hot toast with the cut side of the garlic. The rough surface grates it like a cheese grater.'),
      step('Spoon the tomatoes on top, drizzle with the rest of the oil and serve straight away.')
    ]
  },
  {
    id: 2, title: 'Insalata caprese', title_en: 'Tomato and mozzarella salad',
    region: 'south', course: 'antipasto', dietary: ['vegetarian', 'gluten_free'], difficulty: 'easy',
    time_minutes: 10, base_servings: 4,
    description: 'The colours of the Italian flag on a plate: tomato, mozzarella and basil from Capri.',
    image: 'assets/img/recipes/insalata-caprese.webp', image_alt: 'Alternating slices of tomato and mozzarella with basil leaves',
    ingredients: [
      ing('Ripe tomatoes, sliced', 125, 'g', 4.4, 'oz'),
      ing('Buffalo mozzarella, sliced', 60, 'g', 2.1, 'oz'),
      ing('Basil leaves', 3, '', 3, ''),
      ing('Extra-virgin olive oil', 1, 'tbsp', 1, 'tbsp'),
      ing('Dried oregano', 0.25, 'tsp', 0.25, 'tsp'),
      ing('Salt', null, '', null, '', 'To taste')
    ],
    steps: [
      step('Slice {0} of tomato and {1} of mozzarella about 1 cm thick.'),
      step('Overlap them on a plate, alternating tomato and mozzarella, and tuck in the basil.'),
      step('Season with salt and {4} of oregano, then pour over the olive oil just before serving.')
    ]
  },
  {
    id: 3, title: 'Arancini', title_en: 'Fried stuffed rice balls',
    region: 'islands', course: 'antipasto', dietary: ['vegetarian'], difficulty: 'hard',
    time_minutes: 90, base_servings: 6,
    description: 'Sicilian saffron rice balls with a melting mozzarella and pea centre, fried until golden.',
    image: 'assets/img/recipes/arancini.webp', image_alt: 'Golden fried rice balls, one broken open to show melted cheese',
    ingredients: [
      ing('Arborio rice', 50, 'g', 0.25, 'cup'),
      ing('Hot vegetable stock', 150, 'ml', 0.6, 'cup'),
      ing('Saffron threads', 1, 'pinch', 1, 'pinch'),
      ing('Parmigiano Reggiano, grated', 10, 'g', 2, 'tbsp'),
      ing('Mozzarella, small cubes', 20, 'g', 0.7, 'oz'),
      ing('Frozen peas', 15, 'g', 2, 'tbsp'),
      ing('Eggs, beaten', 0.33, '', 0.33, ''),
      ing('Dried breadcrumbs', 20, 'g', 0.25, 'cup'),
      ing('Sunflower oil, for frying', null, '', null, '', 'For frying')
    ],
    steps: [
      step('Simmer {0} of rice in {1} of stock with the saffron until all the liquid is absorbed.', 18),
      step('Stir in {3} of Parmigiano, spread the rice on a tray and let it cool completely.', 30),
      step('With wet hands, shape a ball of rice, press a hollow in it, fill with mozzarella and peas, and close it up.'),
      step('Roll each ball in the beaten eggs ({6} in total), then in {7} of breadcrumbs.'),
      step('Fry in oil at 175°C, a few at a time, until deep golden all over. Drain on kitchen paper.', 5)
    ]
  },
  {
    id: 4, title: 'Farinata', title_en: 'Chickpea flatbread',
    region: 'north', course: 'antipasto', dietary: ['vegan', 'gluten_free'], difficulty: 'easy',
    time_minutes: 40, time_note: 'rest batter 4 hr', base_servings: 4,
    description: 'A thin, crisp-edged chickpea pancake from Liguria, baked in a very hot oven.',
    image: 'assets/img/recipes/farinata.webp', image_alt: 'A large thin golden chickpea flatbread cut into wedges',
    ingredients: [
      ing('Chickpea flour', 50, 'g', 0.4, 'cup'),
      ing('Cold water', 150, 'ml', 0.6, 'cup'),
      ing('Extra-virgin olive oil', 1.5, 'tbsp', 1.5, 'tbsp'),
      ing('Fine salt', 0.25, 'tsp', 0.25, 'tsp'),
      ing('Rosemary needles, chopped', 0.5, 'tsp', 0.5, 'tsp'),
      ing('Black pepper', null, '', null, '', 'To taste')
    ],
    steps: [
      step('Whisk {0} of chickpea flour into {1} of water until smooth. Cover and leave to rest.', 240),
      step('Skim off any foam. Heat the oven to its hottest setting with a large tin and {2} of oil inside.', 10),
      step('Stir {3} of salt into the batter, pour it into the hot oiled tin and scatter over the rosemary.'),
      step('Bake until set and golden with crisp edges.', 15),
      step('Grind over black pepper, cut into wedges and eat warm.')
    ]
  },
  {
    id: 5, title: 'Spaghetti alla carbonara', title_en: 'Egg, Pecorino and guanciale',
    region: 'centre', course: 'primo', dietary: [], difficulty: 'medium',
    time_minutes: 25, base_servings: 4,
    description: 'The Roman classic: no cream, just egg, Pecorino, pepper and crisp guanciale.',
    image: 'assets/img/recipes/spaghetti-alla-carbonara.webp', image_alt: 'Glossy spaghetti carbonara with pieces of crisp guanciale',
    ingredients: [
      ing('Spaghetti', 100, 'g', 3.5, 'oz'),
      ing('Guanciale, cut into strips', 40, 'g', 1.4, 'oz'),
      ing('Egg yolks', 1, '', 1, ''),
      ing('Whole egg', 0.25, '', 0.25, ''),
      ing('Pecorino Romano, finely grated', 25, 'g', 0.25, 'cup'),
      ing('Black pepper, freshly ground', 0.25, 'tsp', 0.25, 'tsp')
    ],
    steps: [
      step('Bring a large pot of salted water to the boil.', 10),
      step('Fry {1} of guanciale in a dry pan over a medium heat until the fat runs and it turns crisp.', 6),
      step('Whisk {2} egg yolks and {3} whole egg with {4} of Pecorino and {5} of pepper.'),
      step('Cook {0} of spaghetti until al dente. Keep a mug of the cooking water.', 9),
      step('Take the pan off the heat. Toss the pasta in the guanciale fat, add the egg mixture and a splash of water, and stir fast until creamy, not scrambled.')
    ]
  },
  {
    id: 6, title: 'Cacio e pepe', title_en: 'Pecorino and black pepper',
    region: 'centre', course: 'primo', dietary: ['vegetarian'], difficulty: 'medium',
    time_minutes: 20, base_servings: 2,
    description: 'Three ingredients and one technique: turning cheese and pasta water into a silky sauce.',
    image: 'assets/img/recipes/cacio-e-pepe.webp', image_alt: 'Tonnarelli coated in a creamy Pecorino and black pepper sauce',
    ingredients: [
      ing('Tonnarelli or spaghetti', 100, 'g', 3.5, 'oz'),
      ing('Pecorino Romano, finely grated', 50, 'g', 0.5, 'cup'),
      ing('Black peppercorns, freshly cracked', 0.5, 'tsp', 0.5, 'tsp'),
      ing('Salt, for the pasta water', null, '', null, '', 'To taste')
    ],
    steps: [
      step('Bring a large pot of water to the boil. Salt it lightly, because Pecorino is already salty.', 10),
      step('Toast {2} of cracked pepper in a dry, wide pan for 1 minute, until it smells fragrant.', 1),
      step('Cook {0} of pasta for 2 minutes less than the packet says. Keep a mug of the cooking water.', 8),
      step('Mix {1} of Pecorino with a few spoons of cool water to make a thick, smooth paste.'),
      step('Move the pasta and a splash of its water into the pepper pan. Off the heat, add the cheese paste and toss fast until creamy. Serve at once.')
    ]
  },
  {
    id: 7, title: 'Risotto alla Milanese', title_en: 'Saffron risotto',
    region: 'north', course: 'primo', dietary: ['gluten_free'], difficulty: 'medium',
    time_minutes: 40, base_servings: 4,
    description: 'Golden saffron risotto from Milan, finished with butter and Parmigiano.',
    image: 'assets/img/recipes/risotto-alla-milanese.webp', cutout_image: 'assets/img/featured-risotto-alla-milanese.webp', image_alt: 'Golden saffron risotto in a shallow white bowl',
    ingredients: [
      ing('Carnaroli or arborio rice', 80, 'g', 0.4, 'cup'),
      ing('Hot chicken or vegetable stock', 250, 'ml', 1, 'cup'),
      ing('Small onion, finely chopped', 0.25, '', 0.25, ''),
      ing('Butter', 15, 'g', 1, 'tbsp'),
      ing('Dry white wine', 20, 'ml', 1.5, 'tbsp'),
      ing('Saffron threads', 1, 'pinch', 1, 'pinch'),
      ing('Parmigiano Reggiano, grated', 15, 'g', 3, 'tbsp')
    ],
    steps: [
      step('Soften {2} small onion, finely chopped, in half of the butter without letting it brown.', 5),
      step('Add {0} of rice and toast it, stirring, until the grains look glassy.', 2),
      step('Pour in {4} of wine and let it bubble away.', 1),
      step('Add {1} of hot stock a ladle at a time, stirring, and waiting until each ladle is absorbed. Add the saffron halfway.', 18),
      step('Off the heat, beat in the rest of the butter and {6} of Parmigiano. Cover and rest for 2 minutes, then serve.', 2)
    ]
  },
  {
    id: 8, title: 'Trofie al pesto', title_en: 'Twists with basil pesto',
    region: 'north', course: 'primo', dietary: ['vegetarian'], difficulty: 'medium',
    time_minutes: 30, base_servings: 4,
    description: 'Short Ligurian pasta twists with pesto pounded by hand in a mortar.',
    image: 'assets/img/recipes/trofie-al-pesto.webp', image_alt: 'Short twisted pasta coated in bright green pesto',
    ingredients: [
      ing('Trofie pasta', 100, 'g', 3.5, 'oz'),
      ing('Basil leaves', 15, 'g', 0.75, 'cup'),
      ing('Pine nuts', 8, 'g', 1, 'tbsp'),
      ing('Garlic clove', 0.25, '', 0.25, ''),
      ing('Parmigiano Reggiano, grated', 10, 'g', 2, 'tbsp'),
      ing('Pecorino Sardo, grated', 5, 'g', 1, 'tbsp'),
      ing('Extra-virgin olive oil', 30, 'ml', 2, 'tbsp')
    ],
    steps: [
      step('Pound {3} garlic clove and {2} of pine nuts to a paste in a mortar.'),
      step('Add {1} of basil a little at a time with a pinch of coarse salt, grinding with a circular motion.'),
      step('Stir in {4} of Parmigiano and {5} of Pecorino, then {6} of olive oil.'),
      step('Cook {0} of trofie in salted water until al dente.', 10),
      step('Loosen the pesto with a spoon of pasta water and toss it with the pasta off the heat, so the basil stays green.')
    ]
  },
  {
    id: 9, title: 'Pasta alla Norma', title_en: 'Pasta with aubergine and ricotta salata',
    region: 'islands', course: 'primo', dietary: ['vegetarian'], difficulty: 'easy',
    time_minutes: 45, base_servings: 4,
    description: 'Catania’s favourite: fried aubergine, tomato and salty ricotta.',
    image: 'assets/img/recipes/pasta-alla-norma.webp', image_alt: 'Rigatoni with tomato sauce, fried aubergine and grated ricotta salata',
    ingredients: [
      ing('Rigatoni', 100, 'g', 3.5, 'oz'),
      ing('Aubergine, cubed', 100, 'g', 3.5, 'oz'),
      ing('Tomato passata', 125, 'ml', 0.5, 'cup'),
      ing('Garlic clove, sliced', 0.25, '', 0.25, ''),
      ing('Olive oil', 2, 'tbsp', 2, 'tbsp'),
      ing('Basil leaves', 2, '', 2, ''),
      ing('Ricotta salata, grated', 15, 'g', 3, 'tbsp')
    ],
    steps: [
      step('Fry {1} of aubergine in {4} of oil until golden on all sides. Drain on kitchen paper.', 8),
      step('In the same pan, soften the garlic, then add {2} of passata and simmer.', 15),
      step('Cook {0} of rigatoni until al dente.', 11),
      step('Toss the pasta with the sauce and half of the aubergine.'),
      step('Serve topped with the rest of the aubergine, basil and {6} of ricotta salata.')
    ]
  },
  {
    id: 10, title: 'Lasagne alla Bolognese', title_en: 'Baked ragù lasagne',
    region: 'north', course: 'primo', dietary: [], difficulty: 'hard',
    time_minutes: 180, base_servings: 6,
    description: 'Layers of egg pasta, slow-cooked ragù and béchamel, the Sunday lunch of Emilia-Romagna.',
    image: 'assets/img/recipes/lasagne-alla-bolognese.webp', image_alt: 'A square of layered lasagne showing ragù and béchamel',
    ingredients: [
      ing('Fresh egg lasagne sheets', 2, '', 2, ''),
      ing('Beef mince', 70, 'g', 2.5, 'oz'),
      ing('Pork mince', 30, 'g', 1, 'oz'),
      ing('Onion, carrot and celery, finely diced', 40, 'g', 0.33, 'cup'),
      ing('Dry white wine', 20, 'ml', 1.5, 'tbsp'),
      ing('Tomato passata', 80, 'ml', 0.33, 'cup'),
      ing('Milk, for the béchamel', 160, 'ml', 0.66, 'cup'),
      ing('Butter', 10, 'g', 0.75, 'tbsp'),
      ing('Plain flour', 10, 'g', 1, 'tbsp'),
      ing('Parmigiano Reggiano, grated', 15, 'g', 3, 'tbsp')
    ],
    steps: [
      step('Cook {3} of diced onion, carrot and celery gently in a little oil until soft.', 10),
      step('Add {1} of beef and {2} of pork and brown well, breaking it up.', 10),
      step('Pour in {4} of wine and let it evaporate, then add {5} of passata.', 2),
      step('Cover and simmer the ragù very gently, stirring now and then.', 120),
      step('For the béchamel, melt {7} of butter, stir in {8} of flour, then whisk in {6} of milk until thick.', 8),
      step('Layer pasta, ragù, béchamel and Parmigiano, finishing with béchamel and cheese. Bake at 180°C.', 35),
      step('Rest for 10 minutes before cutting, so the layers hold.', 10)
    ]
  },
  {
    id: 11, title: 'Ribollita', title_en: 'Tuscan bread and bean soup',
    region: 'centre', course: 'primo', dietary: ['vegan'], difficulty: 'easy',
    time_minutes: 120, base_servings: 6,
    description: 'A thick cucina povera soup of beans, cavolo nero and yesterday’s bread. Even better reboiled the next day.',
    image: 'assets/img/recipes/ribollita.webp', image_alt: 'A thick soup of bread, beans and dark greens in a rustic bowl',
    ingredients: [
      ing('Cooked cannellini beans', 80, 'g', 0.5, 'cup'),
      ing('Cavolo nero, shredded', 60, 'g', 2, 'oz'),
      ing('Onion, carrot and celery, diced', 60, 'g', 0.5, 'cup'),
      ing('Chopped tomatoes', 50, 'g', 0.25, 'cup'),
      ing('Stale rustic bread, torn', 40, 'g', 1.4, 'oz'),
      ing('Vegetable stock', 250, 'ml', 1, 'cup'),
      ing('Extra-virgin olive oil', 1.5, 'tbsp', 1.5, 'tbsp')
    ],
    steps: [
      step('Soften {2} of onion, carrot and celery in half the oil.', 10),
      step('Add {3} of tomatoes, {1} of cavolo nero, half the beans and {5} of stock. Simmer gently.', 60),
      step('Mash the rest of the beans and stir them in to thicken the soup.', 10),
      step('Layer the soup with {4} of bread in a pot and leave it to soak, ideally overnight.'),
      step('Reboil ("ribollire") the soup until thick, then serve with the rest of the olive oil poured over.', 20)
    ]
  },
  {
    id: 12, title: 'Pizza Margherita', title_en: 'Tomato, mozzarella and basil',
    region: 'south', course: 'primo', dietary: ['vegetarian'], difficulty: 'hard',
    time_minutes: 45, time_note: 'plus 24 hr dough', base_servings: 4,
    description: 'Neapolitan-style pizza from a slow, cold-risen dough baked as hot as your oven goes.',
    image: 'assets/img/recipes/pizza-margherita.webp', cutout_image: 'assets/img/featured-pizza-margherita.webp', image_alt: 'A blistered pizza Margherita with tomato, mozzarella and basil',
    ingredients: [
      ing('Tipo 00 flour', 125, 'g', 1, 'cup'),
      ing('Cold water', 80, 'ml', 0.33, 'cup'),
      ing('Fresh yeast', 1, 'g', 0.25, 'tsp'),
      ing('Fine salt', 3, 'g', 0.5, 'tsp'),
      ing('Tinned San Marzano tomatoes, crushed', 60, 'g', 0.25, 'cup'),
      ing('Fior di latte mozzarella, torn', 60, 'g', 2.1, 'oz'),
      ing('Basil leaves', 3, '', 3, ''),
      ing('Extra-virgin olive oil', 1, 'tsp', 1, 'tsp')
    ],
    steps: [
      step('Mix {0} of flour, {1} of water and {2} of yeast. Add {3} of salt and knead until smooth.', 10),
      step('Cover and leave the dough in the fridge to rise slowly.', 1440),
      step('Shape into balls and leave them at room temperature until soft and puffy.', 120),
      step('Heat the oven to its hottest setting with a tray or stone inside.', 45),
      step('Stretch each ball by hand, spread with {4} of crushed tomatoes and bake.', 8),
      step('Add {5} of mozzarella halfway through. Finish with basil and a thread of olive oil.')
    ]
  },
  {
    id: 13, title: 'Osso buco', title_en: 'Braised veal shanks',
    region: 'north', course: 'secondo', dietary: ['gluten_free'], difficulty: 'hard',
    time_minutes: 150, base_servings: 4,
    description: 'Veal shanks braised until falling apart, finished with lemony gremolata.',
    image: 'assets/img/recipes/osso-buco.webp', image_alt: 'A braised veal shank in sauce, sprinkled with gremolata',
    ingredients: [
      ing('Veal shank slice, 4 cm thick', 1, '', 1, ''),
      ing('Rice flour, for dusting', 1, 'tbsp', 1, 'tbsp'),
      ing('Butter', 10, 'g', 0.75, 'tbsp'),
      ing('Onion, carrot and celery, diced', 40, 'g', 0.33, 'cup'),
      ing('Dry white wine', 40, 'ml', 2.75, 'tbsp'),
      ing('Stock', 100, 'ml', 0.4, 'cup'),
      ing('Lemon, zest only', 0.25, '', 0.25, ''),
      ing('Parsley, finely chopped', 1, 'tbsp', 1, 'tbsp'),
      ing('Garlic clove, very finely chopped', 0.25, '', 0.25, '')
    ],
    steps: [
      step('Tie each shank with string so it keeps its shape, dust in {1} of rice flour and brown in {2} of butter.', 8),
      step('Lift out the meat. Soften {3} of diced vegetables in the same pan.', 8),
      step('Return the meat, pour in {4} of wine and let it reduce.', 3),
      step('Add {5} of stock, cover and braise on the lowest heat, turning once.', 120),
      step('Mix the zest of {6} lemon with {7} of parsley and {8} garlic clove to make gremolata. Scatter it over just before serving.')
    ]
  },
  {
    id: 14, title: 'Saltimbocca alla Romana', title_en: 'Veal with sage and prosciutto',
    region: 'centre', course: 'secondo', dietary: [], difficulty: 'medium',
    time_minutes: 25, base_servings: 4,
    description: '"Jumps in the mouth": thin veal topped with prosciutto and sage, in a butter and wine sauce.',
    image: 'assets/img/recipes/saltimbocca-alla-romana.webp', image_alt: 'Veal escalopes topped with prosciutto and sage leaves in a pan',
    ingredients: [
      ing('Thin veal escalopes', 2, '', 2, ''),
      ing('Slices of prosciutto crudo', 2, '', 2, ''),
      ing('Sage leaves', 2, '', 2, ''),
      ing('Plain flour, for dusting', 1, 'tsp', 1, 'tsp'),
      ing('Butter', 10, 'g', 0.75, 'tbsp'),
      ing('Dry white wine', 30, 'ml', 2, 'tbsp')
    ],
    steps: [
      step('Flatten {0} veal escalopes between sheets of baking paper until thin.'),
      step('Lay a slice of prosciutto and a sage leaf on each escalope and pin them with a cocktail stick.'),
      step('Dust the underside with {3} of flour and fry in {4} of butter, prosciutto side up first.', 4),
      step('Pour in {5} of wine, let it bubble for a minute and spoon the sauce over the meat.', 1)
    ]
  },
  {
    id: 15, title: 'Parmigiana di melanzane', title_en: 'Baked aubergine layers',
    region: 'south', course: 'secondo', dietary: ['vegetarian'], difficulty: 'medium',
    time_minutes: 90, base_servings: 6,
    description: 'Fried aubergine layered with tomato, mozzarella and Parmigiano, baked until bubbling.',
    image: 'assets/img/recipes/parmigiana-di-melanzane.webp', image_alt: 'A slice of layered aubergine bake with tomato and melted cheese',
    ingredients: [
      ing('Aubergine', 200, 'g', 7, 'oz'),
      ing('Tomato passata', 125, 'ml', 0.5, 'cup'),
      ing('Mozzarella, sliced', 50, 'g', 1.75, 'oz'),
      ing('Parmigiano Reggiano, grated', 20, 'g', 0.25, 'cup'),
      ing('Basil leaves', 3, '', 3, ''),
      ing('Olive oil, for frying', 2, 'tbsp', 2, 'tbsp'),
      ing('Garlic clove', 0.25, '', 0.25, '')
    ],
    steps: [
      step('Slice {0} of aubergine 1 cm thick, salt it and leave it in a colander.', 30),
      step('Pat dry and fry in {5} of oil until golden on both sides.', 10),
      step('Simmer {1} of passata with the garlic and half the basil.', 15),
      step('Layer sauce, aubergine, {2} of mozzarella and {3} of Parmigiano, ending with sauce and cheese. Bake at 180°C.', 35),
      step('Rest before cutting so the slices hold together.', 15)
    ]
  },
  {
    id: 16, title: 'Caponata', title_en: 'Sweet and sour aubergine',
    region: 'islands', course: 'contorno', dietary: ['vegan', 'gluten_free'], difficulty: 'easy',
    time_minutes: 60, base_servings: 4,
    description: 'Sicilian agrodolce: aubergine, celery, olives and capers in a sweet and sour tomato sauce.',
    image: 'assets/img/recipes/caponata.webp', cutout_image: 'assets/img/featured-caponata.webp', image_alt: 'A bowl of glossy aubergine caponata with olives and capers',
    ingredients: [
      ing('Aubergine, cubed', 125, 'g', 4.4, 'oz'),
      ing('Celery, sliced', 40, 'g', 1.4, 'oz'),
      ing('Onion, sliced', 0.25, '', 0.25, ''),
      ing('Tomato passata', 60, 'ml', 0.25, 'cup'),
      ing('Green olives, pitted', 15, 'g', 2, 'tbsp'),
      ing('Capers, rinsed', 1, 'tsp', 1, 'tsp'),
      ing('Red wine vinegar', 1, 'tbsp', 1, 'tbsp'),
      ing('Sugar', 1, 'tsp', 1, 'tsp'),
      ing('Olive oil', 2, 'tbsp', 2, 'tbsp')
    ],
    steps: [
      step('Fry {0} of aubergine in {8} of oil until golden. Set aside.', 10),
      step('Soften {1} of celery and {2} sliced onion in the same pan.', 8),
      step('Add {3} of passata, {4} of olives and {5} of capers and simmer.', 10),
      step('Stir in {6} of vinegar and {7} of sugar and let the sharpness cook off.', 2),
      step('Return the aubergine, then leave it to cool. Caponata tastes best at room temperature.', 30)
    ]
  },
  {
    id: 17, title: 'Tiramisù', title_en: 'Coffee and mascarpone layers',
    region: 'north', course: 'dolce', dietary: ['vegetarian'], difficulty: 'medium',
    time_minutes: 30, time_note: 'chill 6 hr', base_servings: 6,
    description: '"Pick me up": coffee-soaked biscuits and airy mascarpone cream from the Veneto.',
    image: 'assets/img/recipes/tiramisu.webp', image_alt: 'A square of tiramisù dusted with cocoa',
    ingredients: [
      ing('Mascarpone', 85, 'g', 3, 'oz'),
      ing('Very fresh eggs, separated', 0.5, '', 0.5, ''),
      ing('Caster sugar', 15, 'g', 1, 'tbsp'),
      ing('Savoiardi biscuits', 4, '', 4, ''),
      ing('Espresso, cooled', 60, 'ml', 0.25, 'cup'),
      ing('Cocoa powder', 1, 'tsp', 1, 'tsp')
    ],
    steps: [
      step('Whisk the yolks of {1} eggs with {2} of sugar until pale and thick.', 4),
      step('Beat in {0} of mascarpone until smooth.'),
      step('Whisk the whites to stiff peaks and fold them gently into the cream.'),
      step('Dip {3} savoiardi in {4} of espresso for one second each and lay them in a dish.'),
      step('Layer biscuits and cream twice, then chill.', 360),
      step('Dust with {5} of cocoa just before serving.')
    ]
  },
  {
    id: 18, title: 'Panna cotta', title_en: 'Set vanilla cream',
    region: 'north', course: 'dolce', dietary: ['gluten_free'], difficulty: 'easy',
    time_minutes: 20, time_note: 'set 4 hr', base_servings: 4,
    description: '"Cooked cream" from Piedmont with a gentle wobble, served with fresh berries.',
    image: 'assets/img/recipes/panna-cotta.webp', image_alt: 'A turned-out panna cotta with berries',
    ingredients: [
      ing('Double cream', 125, 'ml', 0.5, 'cup'),
      ing('Whole milk', 25, 'ml', 2, 'tbsp'),
      ing('Caster sugar', 15, 'g', 1, 'tbsp'),
      ing('Gelatine leaves', 0.5, '', 0.5, ''),
      ing('Vanilla pod, split', 0.25, '', 0.25, ''),
      ing('Fresh berries, to serve', 40, 'g', 0.25, 'cup')
    ],
    steps: [
      step('Soak {3} gelatine leaves in cold water until soft.', 5),
      step('Warm {0} of cream, {1} of milk, {2} of sugar and the vanilla seeds until just below a simmer.', 5),
      step('Squeeze out the gelatine and stir it into the warm cream until dissolved.'),
      step('Pour into small moulds and chill until set.', 240),
      step('Dip each mould in hot water for a few seconds, turn out and serve with {5} of berries.')
    ]
  },
  {
    id: 19, title: 'Cannoli siciliani', title_en: 'Crisp shells with ricotta',
    region: 'islands', course: 'dolce', dietary: ['vegetarian'], difficulty: 'hard',
    time_minutes: 60, base_servings: 6,
    description: 'Blistered fried shells filled at the last minute with sweet ricotta, chocolate and orange.',
    image: 'assets/img/recipes/cannoli-siciliani.webp', image_alt: 'Cannoli filled with ricotta and dipped in chocolate chips',
    ingredients: [
      ing('Plain flour', 40, 'g', 0.33, 'cup'),
      ing('Marsala wine', 10, 'ml', 2, 'tsp'),
      ing('Butter, soft', 5, 'g', 1, 'tsp'),
      ing('Caster sugar', 1, 'tsp', 1, 'tsp'),
      ing('Sheep’s milk ricotta, well drained', 80, 'g', 0.33, 'cup'),
      ing('Icing sugar', 15, 'g', 2, 'tbsp'),
      ing('Dark chocolate chips', 10, 'g', 1, 'tbsp'),
      ing('Candied orange peel, chopped', 5, 'g', 1, 'tsp'),
      ing('Sunflower oil, for frying', null, '', null, '', 'For frying')
    ],
    steps: [
      step('Knead {0} of flour, {3} of sugar, {2} of butter and {1} of Marsala into a firm dough. Wrap and rest.', 30),
      step('Roll the dough very thin, cut 10 cm circles and wrap them around cannoli tubes.'),
      step('Fry until blistered and golden, then slide off the tubes and cool.', 2),
      step('Beat {4} of ricotta with {5} of icing sugar, then fold in {6} of chocolate and {7} of orange peel.'),
      step('Fill the shells just before serving, so they stay crisp.')
    ]
  }
];

/* ---------- Featured recipes for the homepage news feed ------------- */
const featured_recipe_ids = [12, 7, 16];

/* ---------- Regions (the "cuisine type" category) ------------------- */
const regions = [
  { slug: 'north',   name: 'The North',   name_it: 'Il Nord',   description: 'Butter, rice and fresh egg pasta. The Alps and the Po valley give risotto, polenta and rich ragù.', featured_recipe_ids: [7, 8, 17] },
  { slug: 'centre',  name: 'The Centre',  name_it: 'Il Centro', description: 'Rome and Tuscany cook with very few, very good ingredients: Pecorino, pepper, bread and beans.', featured_recipe_ids: [5, 6, 11] },
  { slug: 'south',   name: 'The South',   name_it: 'Il Sud',    description: 'Sun, tomatoes and olive oil. From Naples to Calabria the cooking is bright, simple and generous.', featured_recipe_ids: [12, 15, 2] },
  { slug: 'islands', name: 'The Islands', name_it: 'Le Isole',  description: 'Sicily and Sardinia mix sweet and sour, saffron, almonds and ricotta, with Arab and Spanish echoes.', featured_recipe_ids: [3, 16, 19] }
];

/* ---------- Community posts -------------------------------------------
   type: recipe | tip | story
   Recipe posts also have `ingredients` and `steps` as plain text lists.
   Story posts have `place` (for the "Saluti da ..." postcard) and `area`.
---------------------------------------------------------------------- */
const posts = [
  { id: 1, user_name: 'Giulia', user_location: 'Bari', type: 'story', region: 'south', place: 'Bari', area: 'Puglia',
    title: 'Orecchiette con cime di rapa', created_at: '2026-10-28', likes: 18, featured: true,
    body: 'My grandmother shaped orecchiette every Sunday. She pressed each one with her thumb and never measured the flour.',
    image: 'assets/img/postcard-orecchiette.jpg', image_alt: 'Orecchiette drying on a wooden board' },
  { id: 2, user_name: 'Paolo', user_location: 'Bologna', type: 'story', region: 'north', place: 'Bologna', area: 'Emilia-Romagna',
    title: 'Tagliatelle al ragù', created_at: '2026-10-24', likes: 24, featured: true,
    body: 'My nonno rolled the sfoglia so thin you could see the tablecloth pattern through it.',
    image: 'assets/img/postcard-tagliatelle.webp', image_alt: 'Nests of fresh egg tagliatelle on a floured table' },
  { id: 3, user_name: 'Francesca', user_location: 'Palermo', type: 'story', region: 'islands', place: 'Palermo', area: 'Sicily',
    title: 'Cannoli siciliani', created_at: '2026-10-19', likes: 15, featured: true,
    body: 'Every Easter my aunt wrapped the dough around short lengths of cane to fry the cannoli shells.',
    image: 'assets/img/postcard-cannoli.webp', image_alt: 'Cannoli shells cooling on a tray' },
  { id: 4, user_name: 'Marco', user_location: 'Naples', type: 'recipe', region: 'south',
    title: 'Pasta e patate with provola', created_at: '2026-10-30', likes: 31, featured: true,
    body: 'The dish my mother made when the fridge was nearly empty. The potatoes melt into the pasta and the smoked provola makes it stringy.',
    ingredients: ['300 g mixed short pasta', '2 medium potatoes, diced', '1 onion, chopped', '1 litre hot vegetable stock', '100 g smoked provola, cubed', 'Olive oil, salt, pepper'],
    steps: ['Soften the onion in olive oil, add the potatoes and cook for 5 minutes.', 'Add the stock and simmer until the potatoes start to break up.', 'Add the pasta straight into the pot and cook, stirring, adding stock as needed.', 'Off the heat, stir in the provola, cover for 2 minutes and serve.'],
    image: null, image_alt: 'A creamy bowl of pasta and potatoes with melted cheese' },
  { id: 5, user_name: 'Elena', user_location: 'Trento', type: 'recipe', region: 'north',
    title: 'Zia Rosa’s apple cake', created_at: '2026-10-22', likes: 22, featured: false,
    body: 'More apple than cake, from the orchards of Trentino. It is even better the day after.',
    ingredients: ['4 apples, thinly sliced', '2 eggs', '120 g sugar', '150 g plain flour', '100 ml milk', '80 g melted butter', '1 tsp baking powder', 'Zest of 1 lemon'],
    steps: ['Whisk the eggs and sugar until pale, then add the milk, butter and zest.', 'Fold in the flour and baking powder.', 'Stir in three quarters of the apples and pour into a lined 22 cm tin.', 'Arrange the rest of the apples on top and bake at 180°C for 45 minutes.'],
    image: null, image_alt: 'A golden apple cake with sliced apples on top' },
  { id: 6, user_name: 'Aisha', user_location: 'Leeds', type: 'recipe', region: 'centre',
    title: 'Panzanella for a hot day', created_at: '2026-10-15', likes: 12, featured: false,
    body: 'I learned this bread salad on a summer job in Florence. Now it is how I use up every stale loaf.',
    ingredients: ['200 g stale bread, torn', '4 ripe tomatoes, chopped', '1 cucumber, sliced', '1 red onion, thinly sliced', 'Basil leaves', '4 tbsp olive oil', '1 tbsp red wine vinegar', 'Salt'],
    steps: ['Soak the onion in cold water for 10 minutes to soften its bite.', 'Sprinkle the bread with water until damp but not soggy, then squeeze it.', 'Mix everything with the oil, vinegar and salt.', 'Leave for 20 minutes so the bread soaks up the juices.'],
    image: null, image_alt: 'A bowl of bread salad with tomato, cucumber and basil' },
  { id: 7, user_name: 'Paolo', user_location: 'Bologna', type: 'tip', region: 'north',
    title: 'Never pour away your pasta water', created_at: '2026-10-29', likes: 40, featured: false,
    body: 'The starch in the cooking water is what turns oil and cheese into a smooth sauce. Scoop out a mugful before you drain the pasta, every time.',
    image: null, image_alt: 'A ladle of cloudy pasta water over a pan' },
  { id: 8, user_name: 'Giulia', user_location: 'Bari', type: 'tip', region: 'south',
    title: 'Save Parmigiano rinds for soup', created_at: '2026-10-20', likes: 27, featured: false,
    body: 'Keep the hard rinds in a bag in the freezer. Drop one into minestrone or bean soup and it adds a deep, savoury flavour. Fish it out before serving.',
    image: null, image_alt: 'Parmigiano rinds next to a pot of soup' },
  { id: 9, user_name: 'Francesca', user_location: 'Palermo', type: 'tip', region: 'islands',
    title: 'Only salt old aubergines', created_at: '2026-10-11', likes: 9, featured: false,
    body: 'Young, firm aubergines are not bitter, so you can skip the salting. Salt the big, seedy ones to draw out water before frying.',
    image: null, image_alt: 'Sliced aubergine sprinkled with salt in a colander' }
];

/* ---------- Comments on community posts ----------------------------- */
const comments = [
  { id: 1, post_id: 4, user_name: 'Luca',  body: 'This is exactly how my nonna made it. The provola is the secret.', created_at: '2026-10-30' },
  { id: 2, post_id: 4, user_name: 'Tom',   body: 'Made it tonight with smoked cheddar because I could not find provola. Still great.', created_at: '2026-10-31' },
  { id: 3, post_id: 7, user_name: 'Aisha', body: 'Game changer for my cacio e pepe. No more lumps!', created_at: '2026-10-29' },
  { id: 4, post_id: 2, user_name: 'Elena', body: 'Beautiful memory. My nonno did the same with a broom handle as a rolling pin.', created_at: '2026-10-25' },
  { id: 5, post_id: 5, user_name: 'Marco', body: 'How many apples if they are small ones?', created_at: '2026-10-23' }
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
  { id: 1, title: 'Fresh pasta by hand',           title_it: 'La pasta fresca',   event_date: '2026-11-14', start_time: '10:00', location: 'Online live class', image: 'assets/img/event-fresh-pasta.jpg' },
  { id: 2, title: 'Risotto for autumn',            title_it: "Risotto d'autunno", event_date: '2026-11-21', start_time: '18:00', location: 'Online cook-along', image: 'assets/img/event-risotto.jpg' },
  { id: 3, title: 'Pizza night, Neapolitan style', title_it: 'Pizza napoletana',  event_date: '2026-11-28', start_time: '18:30', location: 'Community kitchen', image: 'assets/img/event-pizza.webp' },
  { id: 4, title: 'Tiramisù masterclass',          title_it: 'Il tiramisù',       event_date: '2026-12-05', start_time: '15:00', location: 'Online live class', image: 'assets/img/event-tiramisu.jpg' },
  { id: 5, title: 'Sicilian cannoli workshop',     title_it: 'Cannoli siciliani', event_date: '2026-12-12', start_time: '14:00', location: 'Online live class', image: 'assets/img/event-cannoli.webp' },
  { id: 6, title: 'Christmas biscotti bake',       title_it: 'Biscotti di Natale', event_date: '2026-12-19', start_time: '11:00', location: 'Community kitchen', image: 'assets/img/event-biscotti.webp' }
];

/* ---------- News feed: culinary trends ------------------------------- */
/* tag and icon (a Bootstrap Icons class) label the card's photo */
const news = [
  { id: 1, title: 'Cucina povera is back',       tag: 'Budget',       icon: 'bi-piggy-bank',  summary: 'Stale bread, beans and greens become dinners like ribollita and panzanella.',                 published_on: '2026-10-12', image: 'assets/img/trends/trend-cucina-povera.webp', image_alt: 'A pan of bread and tomato salad' },
  { id: 2, title: 'Pumpkin season in Mantua',    tag: 'Seasonal',     icon: 'bi-calendar3',   summary: 'Tortelli di zucca are a northern autumn classic. Make the filling a day ahead.',               published_on: '2026-10-06', image: 'assets/img/trends/trend-pumpkin-pasta.webp', image_alt: 'Trays of fresh pumpkin-filled pasta' },
  { id: 3, title: 'Why the pasta shape matters', tag: 'Technique',    icon: 'bi-lightbulb',   summary: 'Ridged rigatoni hold a chunky ragù; smooth linguine suit olive oil and seafood.',              published_on: '2026-09-29', image: 'assets/img/trends/trend-pasta-shapes.webp', image_alt: 'Five dried pasta shapes in a row' },
  { id: 4, title: 'Ancient grains in fresh pasta', tag: 'Ingredients', icon: 'bi-basket',     summary: 'Farro and spelt flour give fresh pasta a nutty taste and a lovely rough surface for sauce.',  published_on: '2026-09-22', image: 'assets/img/trends/trend-fresh-pasta.webp', image_alt: 'Rolling out fresh pasta dough by hand' },
  { id: 5, title: 'Aperitivo at home',           tag: 'Entertaining', icon: 'bi-cup-straw',   summary: 'Olives, focaccia squares and a bowl of crisps: the easiest way to feed friends before dinner.', published_on: '2026-09-15', image: 'assets/img/trends/trend-aperitivo.webp', image_alt: 'Aperitivo drinks with bowls of nuts and snacks' },
  { id: 6, title: 'Nothing goes to waste',       tag: 'Zero waste',   icon: 'bi-recycle',     summary: 'Parmigiano rinds, herb stalks and onion skins make a rich broth for risotto and soup.',         published_on: '2026-09-08', image: 'assets/img/trends/trend-broth.webp', image_alt: 'A clay pot of vegetable broth' }
];

/* ---------- The team (About us) ---------------------------------------
   These people are FICTIONAL, written for this student project.
---------------------------------------------------------------------- */
const team = [
  { id: 1, name: 'Sofia Moretti',  role: 'Founder and head cook',        role_it: 'Fondatrice e capocuoca',     from: 'Bologna',  favourite_recipe_id: 10,
    bio: 'Grew up rolling pasta in her grandmother’s kitchen and started FoodFusion so those recipes would not be lost.' },
  { id: 2, name: 'Luca Bianchi',   role: 'Community manager',            role_it: 'Responsabile della comunità', from: 'Rome',     favourite_recipe_id: 6,
    bio: 'Reads every story you send, runs the monthly challenge and answers your messages.' },
  { id: 3, name: 'Amara Okafor',   role: 'Nutritionist',                 role_it: 'Nutrizionista',              from: 'Leeds',    favourite_recipe_id: 11,
    bio: 'Checks the vegetarian, vegan and gluten-free labels and adapts classics for every diet.' },
  { id: 4, name: 'Gio Russo',      role: 'Food photographer',            role_it: 'Fotografo',                  from: 'Naples',   favourite_recipe_id: 12,
    bio: 'Shoots every recipe in natural light, on the same old marble table.' },
  { id: 5, name: 'Mei Tan',        role: 'Recipe tester',                role_it: 'Tester delle ricette',       from: 'Singapore', favourite_recipe_id: 17,
    bio: 'Cooks every recipe in a small home kitchen before we publish it, so you know it works.' }
];

/* ---------- Downloadable and video resources ---------------------------
   category:  culinary | educational
   kind:      recipe_card | guide | infographic | video
   Videos have no file yet (file_path: null); they are added later.
---------------------------------------------------------------------- */
const resources = [
  { id: 1,  category: 'culinary', kind: 'recipe_card', title: 'Cacio e pepe',            description: 'Printable A5 recipe card with ingredients, method and the creamy-sauce trick.', recipe_id: 6,  file_path: 'downloads/recipe-card-cacio-e-pepe.pdf',         file_type: 'PDF', file_size_kb: 4 },
  { id: 2,  category: 'culinary', kind: 'recipe_card', title: 'Risotto alla Milanese',   description: 'Printable A5 recipe card for golden saffron risotto.',                          recipe_id: 7,  file_path: 'downloads/recipe-card-risotto-alla-milanese.pdf', file_type: 'PDF', file_size_kb: 4 },
  { id: 3,  category: 'culinary', kind: 'recipe_card', title: 'Pizza Margherita',        description: 'Printable A5 recipe card with the 24-hour dough schedule.',                     recipe_id: 12, file_path: 'downloads/recipe-card-pizza-margherita.pdf',      file_type: 'PDF', file_size_kb: 4 },
  { id: 4,  category: 'culinary', kind: 'recipe_card', title: 'Ribollita',               description: 'Printable A5 recipe card for the Tuscan bread and bean soup.',                  recipe_id: 11, file_path: 'downloads/recipe-card-ribollita.pdf',             file_type: 'PDF', file_size_kb: 4 },
  { id: 5,  category: 'culinary', kind: 'recipe_card', title: 'Caponata',                description: 'Printable A5 recipe card for Sicilian sweet and sour aubergine.',               recipe_id: 16, file_path: 'downloads/recipe-card-caponata.pdf',              file_type: 'PDF', file_size_kb: 4 },
  { id: 6,  category: 'culinary', kind: 'recipe_card', title: 'Tiramisù',                description: 'Printable A5 recipe card for the classic coffee and mascarpone dessert.',       recipe_id: 17, file_path: 'downloads/recipe-card-tiramisu.pdf',              file_type: 'PDF', file_size_kb: 4 },
  { id: 7,  category: 'culinary', kind: 'guide',       title: 'Fresh pasta by hand',     description: 'Step-by-step tutorial: the flour well, kneading, rolling and cutting tagliatelle.', file_path: 'downloads/tutorial-fresh-pasta-by-hand.pdf',   file_type: 'PDF', file_size_kb: 5 },
  { id: 8,  category: 'culinary', kind: 'guide',       title: '20 Italian kitchen hacks', description: 'Small habits from nonna’s kitchen that save time, money and flavour.',       file_path: 'downloads/guide-italian-kitchen-hacks.pdf',      file_type: 'PDF', file_size_kb: 5 },
  { id: 9,  category: 'culinary', kind: 'video', title: 'A creamy sauce from pasta water',  title_it: 'Cacio e pepe',  description: 'A Roman chef shows how starchy pasta water and Pecorino turn into a smooth sauce, with no cream.', recipe_id: 6,  file_path: null, video_url: 'https://www.youtube.com/watch?v=mlh8pAMQsOA', video_channel: 'Aden Films',        duration: '14:11', thumbnail_path: 'assets/img/videos/video-pasta-water.webp', skill: 'Emulsion' },
  { id: 10, category: 'culinary', kind: 'video', title: 'Rolling sfoglia with a rolling pin', title_it: 'La sfoglia',   description: 'Italian grandmothers roll egg pasta thin with a long mattarello: stretch, turn and wrap.',          recipe_id: 10, file_path: null, video_url: 'https://www.youtube.com/watch?v=DMa02mpVchk', video_channel: 'Pasta Grannies',    duration: '4:24',  thumbnail_path: 'assets/img/videos/video-sfoglia.webp',     skill: 'Rolling' },
  { id: 11, category: 'culinary', kind: 'video', title: 'Knife skills: the soffritto dice',   title_it: 'Il soffritto', description: 'Chop celery and carrot into tiny, even dice so they soften together: the base of ragù and soup.',  recipe_id: 11, file_path: null, video_url: 'https://www.youtube.com/watch?v=JGG9QLWBDmE', video_channel: 'La Cucina Caldesi', duration: '3:44',  thumbnail_path: 'assets/img/videos/video-soffritto.webp',   skill: 'Knife work' },
  { id: 12, category: 'educational', kind: 'infographic', title: 'Which hob uses the least energy?', description: 'Induction, electric, gas and solar cooking compared: efficiency, cost and carbon.', file_path: 'downloads/infographic-hob-energy-compared.pdf',  file_type: 'PDF', file_size_kb: 5 },
  { id: 13, category: 'educational', kind: 'infographic', title: '10 energy-saving cooking habits',  description: 'Lids, batch cooking, leftover heat and more, explained on one page for the fridge door.',        file_path: 'downloads/infographic-energy-saving-habits.pdf', file_type: 'PDF', file_size_kb: 6 },
  { id: 14, category: 'educational', kind: 'infographic', title: 'Cucina povera: zero-waste kitchen', description: 'How Italian home cooks turn leftovers into meals, and why it saves energy too.',     file_path: 'downloads/infographic-cucina-povera-zero-waste.pdf', file_type: 'PDF', file_size_kb: 6 },
  { id: 15, category: 'educational', kind: 'guide',       title: 'Cooking with renewable energy',    description: 'A home guide to solar cookers, green electricity tariffs, biogas and heat retention cooking.', file_path: 'downloads/guide-cooking-with-renewable-energy.pdf', file_type: 'PDF', file_size_kb: 6 },
  { id: 16, category: 'educational', kind: 'video', title: 'How a solar cooker works',              title_it: 'Il forno solare',     description: 'Shiny reflectors bounce sunlight into a closed box, and the trapped heat cooks a meal with no fuel at all.', recipe_id: 16, file_path: null, video_url: 'https://www.youtube.com/watch?v=Ofn7jqPDTeY', video_channel: 'National Geographic', duration: '3:11', thumbnail_path: 'assets/img/videos/video-solar-cooker.webp',  skill: 'Solar energy' },
  { id: 17, category: 'educational', kind: 'video', title: 'Induction vs gas: what really happens', title_it: 'Induzione o gas?',    description: 'How each hob turns energy into heat in the pan, and why induction wastes far less of it.',               recipe_id: 7,  file_path: null, video_url: 'https://www.youtube.com/watch?v=JyTvHQnHq14', video_channel: 'PBS Food',            duration: '6:55', thumbnail_path: 'assets/img/videos/video-induction-gas.webp', skill: 'Efficient hobs' },
  { id: 18, category: 'educational', kind: 'video', title: 'Hay-box cooking: finish dishes with no fuel', title_it: 'La cassetta di fieno', description: 'Bring a pot to the boil, then tuck it into an insulated box: the stored heat finishes beans and grains.',  recipe_id: 11, file_path: null, video_url: 'https://www.youtube.com/watch?v=FGLFeYNr2w0', video_channel: 'gaetanproductions',   duration: '4:54', thumbnail_path: 'assets/img/videos/video-hay-box.webp',        skill: 'Retained heat' }
];


/* =====================================================================
   Data functions: one per data type. Phase 2 swaps each body for a
   fetch() call to the matching file in api/.
   ===================================================================== */
async function getRecipes()   { return recipes; }                                // api/recipes.php
async function getRecipe(id)  { return recipes.find(r => r.id === id) || null; } // api/recipes.php?id=
async function getRegions()   { return regions; }                                // api/regions.php
async function getFeaturedRecipes() {                                           // api/recipes.php?featured=1
  return featured_recipe_ids.map(id => recipes.find(r => r.id === id)).filter(Boolean);
}
async function getPosts(type) { return type ? posts.filter(p => p.type === type) : posts; } // api/posts.php?type=
async function getComments(postId) { return comments.filter(c => c.post_id === postId); }  // api/comments.php?post_id=
async function getChallenge() { return challenges[0]; }                          // api/challenge.php
async function getChallengeEntries(challengeId) {                                // api/challenge_entries.php?challenge_id=
  return challenge_entries.filter(e => e.challenge_id === challengeId);
}
async function getEvents()    { return events; }                                 // api/events.php
async function getNews()      { return news; }                                   // api/news.php
async function getTeam()      { return team; }                                   // api/team.php
async function getResources(category) {                                         // api/resources.php?category=
  return resources.filter(r => r.category === category);
}


/* =====================================================================
   Write functions: user interactions and recipe submissions.
   These are the parts the brief's WEB SERVICE will handle. In phase 1
   they only change the data in memory (it resets when the page reloads).
   In phase 2 each body becomes a fetch() POST to a PHP file that saves
   to MySQL and returns JSON, for example:

     async function likePost(postId, liked) {
       const response = await fetch('api/like.php', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ post_id: postId, liked })
       });
       return response.json();   // { post_id: 4, likes: 32 }
     }
   ===================================================================== */

/* Like or unlike a community post. Returns the new like count. */
async function likePost(postId, liked) {                                          // api/like.php
  const post = posts.find(p => p.id === postId);
  post.likes += liked ? 1 : -1;
  return { post_id: postId, likes: post.likes };
}

/* Like or unlike a challenge entry. Returns the new like count. */
async function likeChallengeEntry(entryId, liked) {                               // api/like.php?type=entry
  const entry = challenge_entries.find(e => e.id === entryId);
  entry.likes += liked ? 1 : -1;
  return { entry_id: entryId, likes: entry.likes };
}

/* Add a comment. Returns the saved comment (with its new id). */
async function addComment(postId, userName, body) {                               // api/comment.php
  const comment = {
    id: comments.length + 1,
    post_id: postId,
    user_name: userName,
    body,
    created_at: new Date().toISOString().slice(0, 10)
  };
  comments.push(comment);
  return comment;
}

/* Submit a new recipe, tip or story. Returns the saved post. */
async function submitPost(newPost) {                                              // api/submit_recipe.php
  const post = {
    id: posts.length + 1,
    likes: 0,
    featured: false,
    created_at: new Date().toISOString().slice(0, 10),
    image: null,
    image_alt: newPost.title,
    ...newPost
  };
  posts.unshift(post);
  return post;
}
