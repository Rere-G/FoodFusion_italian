/* =====================================================================
   recipe.js: servings scaler, Metric / US units and cook mode.

   setupCookAlong(container, recipe) works on any element that has the
   data-action / data-output / data-units hooks used in index.php.
   The homepage uses it now; recipe.php will reuse it later.
   ===================================================================== */

'use strict';

const MIN_SERVINGS = 1;
const MAX_SERVINGS = 12;


/* ---------- Amount formatting ---------------------------------------- */

/* Round to `places` decimals and drop trailing zeros: 1.50 -> "1.5" */
function trimNumber(number, places) {
  const factor = Math.pow(10, places);
  return String(Math.round(number * factor) / factor);
}

/* 1.25 -> "1¼", 0.5 -> "½", 2 -> "2" (to the nearest quarter) */
function toQuarters(number) {
  let whole = Math.floor(number + 1e-9);
  let quarter = Math.round((number - whole) * 4) / 4;
  if (quarter === 1) { whole += 1; quarter = 0; }

  const fraction = { 0: '', 0.25: '¼', 0.5: '½', 0.75: '¾' }[quarter];
  if (whole === 0) return fraction || '0';
  return String(whole) + fraction;
}

/* Format one amount, e.g. (1200, 'g') -> "1.2 kg", (1.5, 'cup') -> "1½ cups" */
function formatAmount(qty, unit) {
  if (qty === null) return 'To taste';

  switch (unit) {
    case 'g':   return qty >= 1000 ? `${trimNumber(qty / 1000, 2)} kg` : `${Math.round(qty)} g`;
    case 'ml':  return qty >= 1000 ? `${trimNumber(qty / 1000, 2)} l`  : `${Math.round(qty)} ml`;
    case 'oz':  return `${trimNumber(qty, 1)} oz`;
    case 'cup': return `${toQuarters(qty)} ${qty > 1 ? 'cups' : 'cup'}`;
    case '':    return toQuarters(qty);               // a count, e.g. 2 eggs
    default:    return `${toQuarters(qty)} ${unit}`;  // tbsp, tsp
  }
}

/*
 * The amount of one ingredient for a number of servings.
 * We always start from the per-serving value, so changing servings
 * up and down never piles up rounding errors.
 */
function ingredientAmount(ingredient, servings, units) {
  const source = units === 'us' ? ingredient.us : ingredient.metric;
  const qty = source.qty === null ? null : source.qty * servings;
  return formatAmount(qty, source.unit);
}

/* Replace {0}, {1} ... in a step with the matching ingredient amounts */
function fillStepText(step, ingredients, servings, units) {
  return step.text.replace(/\{(\d+)\}/g, (match, index) => {
    const ingredient = ingredients[Number(index)];
    return ingredient ? ingredientAmount(ingredient, servings, units) : match;
  });
}


/* ---------- Keep screen awake (Wake Lock API) ------------------------ */

function createWakeLockControl(onChange) {
  let lock = null;
  let wanted = false;

  async function request() {
    try {
      lock = await navigator.wakeLock.request('screen');
      // The browser releases the lock by itself when the tab is hidden.
      lock.addEventListener('release', () => { lock = null; });
      onChange(true);
    } catch (error) {
      // e.g. battery saver is on. Turn the switch back off and say why.
      wanted = false;
      onChange(false, 'Your device would not keep the screen on. Check battery saver settings.');
    }
  }

  // Coming back to the tab: ask again if the user still wants it.
  document.addEventListener('visibilitychange', () => {
    if (wanted && !lock && document.visibilityState === 'visible') request();
  });

  return {
    async toggle() {
      wanted = !wanted;
      if (wanted) {
        await request();
      } else {
        if (lock) await lock.release();
        lock = null;
        onChange(false);
      }
    }
  };
}


/* ---------- The cook-along widget ------------------------------------ */

function setupCookAlong(container, recipe) {
  const state = {
    servings: recipe.base_servings,
    units: 'metric',
    step: 0
  };

  // Find the hooks inside this container
  const output = name => container.querySelector(`[data-output="${name}"]`);
  const action = name => container.querySelector(`[data-action="${name}"]`);
  const unitButtons = container.querySelectorAll('[data-units]');

  output('original').textContent = `Original recipe serves ${recipe.base_servings}.`;

  /* Draw the ingredients card */
  function renderIngredients() {
    const s = state.servings;
    output('servings').textContent = `${s} ${s === 1 ? 'serving' : 'servings'}`;

    output('ingredients').innerHTML = recipe.ingredients.map(ingredient => `
      <li>
        <span class="ingredient-list__amount">${escapeHtml(ingredientAmount(ingredient, s, state.units))}</span>
        <span>${escapeHtml(ingredient.name)}</span>
      </li>`).join('');

    const resetButton = action('reset');
    resetButton.hidden = s === recipe.base_servings;
    resetButton.textContent = `Reset to ${recipe.base_servings}`;

    action('fewer').disabled = s <= MIN_SERVINGS;
    action('more').disabled = s >= MAX_SERVINGS;

    unitButtons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.units === state.units));
    });
  }

  /* Draw the current step */
  function renderStep() {
    const total = recipe.steps.length;
    const step = recipe.steps[state.step];

    output('counter').textContent = `Step ${state.step + 1} of ${total}`;
    output('step').textContent = fillStepText(step, recipe.ingredients, state.servings, state.units);

    const timeChip = output('time');
    timeChip.hidden = !step.time_minutes;
    if (step.time_minutes) {
      timeChip.innerHTML = `<i class="bi bi-stopwatch" aria-hidden="true"></i> Suggested time: ${formatMinutes(step.time_minutes)}`;
    }

    // One bar segment per step; segments up to the current one are filled
    output('progress').innerHTML = recipe.steps
      .map((_, index) => `<span class="${index <= state.step ? 'is-done' : ''}"></span>`)
      .join('');

    action('prev').disabled = state.step === 0;
    output('nextLabel').textContent = state.step === total - 1 ? 'Start again' : 'Next step';
  }

  function render() {
    renderIngredients();
    renderStep(); // steps contain amounts too, so redraw them
  }

  /* Servings buttons */
  action('fewer').addEventListener('click', () => {
    state.servings = Math.max(MIN_SERVINGS, state.servings - 1);
    render();
  });
  action('more').addEventListener('click', () => {
    state.servings = Math.min(MAX_SERVINGS, state.servings + 1);
    render();
  });
  action('reset').addEventListener('click', () => {
    state.servings = recipe.base_servings;
    render();
  });

  /* Units switch: changes units only, never the servings */
  unitButtons.forEach(button => {
    button.addEventListener('click', () => {
      state.units = button.dataset.units;
      render();
    });
  });

  /* Step buttons. Moving on does not mean the step is "done"; it is just navigation. */
  action('prev').addEventListener('click', () => {
    if (state.step > 0) state.step -= 1;
    renderStep();
  });
  action('next').addEventListener('click', () => {
    state.step = state.step === recipe.steps.length - 1 ? 0 : state.step + 1;
    renderStep();
  });

  /* Keep screen awake: only offered if the browser supports it */
  const awakeSwitch = action('awake');
  const awakeNote = output('awakeNote');
  if (!('wakeLock' in navigator)) {
    awakeSwitch.hidden = true;
    awakeNote.hidden = true;
  } else {
    const wakeLock = createWakeLockControl((isOn, problem) => {
      awakeSwitch.setAttribute('aria-checked', String(isOn));
      awakeNote.textContent = problem || (isOn
        ? 'Your screen will stay on while this recipe is open.'
        : 'Your screen may dim while you cook. Turn on Keep screen awake to stop it.');
    });
    // Only ever requested from a click, as browsers require
    awakeSwitch.addEventListener('click', () => wakeLock.toggle());
  }

  render();
}
