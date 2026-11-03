/* =====================================================================
   about.js: the team carousel on About us (Bootstrap carousel).
   ===================================================================== */

'use strict';

(async function () {
  const [team, recipes] = await Promise.all([getTeam(), getRecipes()]);
  const colours = ['#F0D08C', '#CFE0EB', '#F6C9A6', '#E8D9F0', '#D4E8C9'];
  const tilts = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.5deg'];

  // "Sofia Moretti" -> "SM"
  const initials = name => name.split(' ').map(part => part[0]).join('');

  function teamCardHtml(person, index) {
    const favourite = recipes.find(r => r.id === person.favourite_recipe_id);
    return `
      <li>
        <article class="team-card">
          <div class="team-card__avatar" style="--avatar-bg: ${colours[index % colours.length]}; --tilt: ${tilts[index % tilts.length]}" aria-hidden="true">${initials(person.name)}</div>
          <h3 class="team-card__name">${escapeHtml(person.name)}</h3>
          <p class="team-card__role">${escapeHtml(person.role)}, ${escapeHtml(person.from)}</p>
          <p class="team-card__it">${escapeHtml(person.role_it)}</p>
          <p class="team-card__bio">${escapeHtml(person.bio)}</p>
          ${favourite ? `<p class="team-card__fav">Favourite dish: <a class="fw-bold" href="recipe.php?id=${favourite.id}">${escapeHtml(favourite.title)}</a></p>` : ''}
        </article>
      </li>`;
  }

  setupGroupedCarousel({                       // from main.js
    root: document.getElementById('teamCarousel'),
    items: team,
    renderItem: teamCardHtml,
    itemName: 'team members',
    statusEl: document.getElementById('teamStatus')
  });
})();
