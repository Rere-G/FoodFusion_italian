/* =====================================================================
   community.js: the Community Cookbook (and the challenge on the homepage).
   1. Monthly challenge: entries, likes and the "Leading" badge
   2. Featured posts carousel (Bootstrap)
   3. Feed: filter by type, sort, like, comment, share
   4. "Share with the community" form (recipe submission)

   Each part checks that its element is on the page first, so this file
   can be loaded on both the homepage and community.php.

   Likes, comments and new posts go through likePost(), addComment() and
   submitPost() in data.js. In phase 2 those become calls to the PHP web
   service, and this file does not need to change.
   ===================================================================== */

'use strict';


/* ---------- 1. Monthly challenge ------------------------------------- */

async function setupChallenge() {
  const ticket = document.getElementById('challenge');
  const list = document.getElementById('entryList');
  if (!ticket || !list) return;

  const challenge = await getChallenge();
  const entries = await getChallengeEntries(challenge.id);
  const closes = parseDate(challenge.closes_on);

  ticket.innerHTML = `
    <div class="ticket">
      <div class="ticket__main">
        <p class="ticket__label"><i class="bi bi-trophy" aria-hidden="true"></i> La sfida del mese</p>
        <h2 class="ff-heading mt-2" id="challengeTitle">${escapeHtml(challenge.title)}</h2>
        <p class="fs-5 mt-3 mb-0">${escapeHtml(challenge.description)}</p>
        <ol>${challenge.rules.map(rule => `<li>${escapeHtml(rule)}</li>`).join('')}</ol>
      </div>
      <div class="ticket__stub">
        <p class="fw-bold m-0">Entries close</p>
        <p class="ticket__day">${closes.getDate()}</p>
        <p class="ticket__month">${closes.toLocaleDateString('en-GB', { month: 'long' })}</p>
        <a class="ff-btn ff-btn--navy align-self-start mt-2" href="community.php#share">Enter the challenge</a>
      </div>
    </div>`;

  const likedIds = new Set();   // entries this visitor liked

  function render() {
    const top = Math.max(...entries.map(entry => entry.likes));
    list.innerHTML = entries.map(entry => {
      const liked = likedIds.has(entry.id);
      return `
        <li class="entry">
          <div class="photo-placeholder">
            Photo: ${escapeHtml(entry.image_alt)}
            ${entry.likes === top ? '<span class="badge-leading"><i class="bi bi-star-fill" aria-hidden="true"></i> Leading</span>' : ''}
          </div>
          <div class="entry__body">
            <h3 class="entry__title">${escapeHtml(entry.title)}</h3>
            <p class="m-0">${escapeHtml(entry.user_name)}, ${escapeHtml(entry.user_location)}</p>
            <div class="mt-auto pt-2">
              <button type="button" class="like-btn" data-entry-id="${entry.id}" aria-pressed="${liked}"
                      aria-label="${liked ? 'Unlike' : 'Like'} ${escapeHtml(entry.title)}, ${entry.likes} likes">
                <i class="bi ${liked ? 'bi-heart-fill' : 'bi-heart'}" aria-hidden="true"></i> ${entry.likes}
              </button>
            </div>
          </div>
        </li>`;
    }).join('');
  }

  // One listener on the list handles every like button ("event delegation"),
  // so it keeps working after the list is redrawn.
  list.addEventListener('click', async event => {
    const button = event.target.closest('.like-btn');
    if (!button) return;
    const id = Number(button.dataset.entryId);
    const nowLiked = !likedIds.has(id);
    nowLiked ? likedIds.add(id) : likedIds.delete(id);
    await likeChallengeEntry(id, nowLiked);   // data.js (phase 2: api/like.php)
    render();
    list.querySelector(`[data-entry-id="${id}"]`).focus(); // keep keyboard focus on the same button
  });

  render();
}


/* ---------- 2. Featured posts carousel ------------------------------- */

function featuredCardHtml(post, index) {
  if (post.type === 'story') {
    return `<li>${postcardHtml(post, index % 2 ? '1deg' : '-1deg')}</li>`;
  }
  return `
    <li>
      <article class="featured-post">
        <p class="type-badge type-badge--${post.type}">${POST_TYPE_LABELS[post.type]}</p>
        <div class="photo-placeholder featured-post__photo">Photo: ${escapeHtml(post.image_alt)}</div>
        <h3 class="featured-post__title">${escapeHtml(post.title)}</h3>
        <p class="featured-post__by">By <strong>${escapeHtml(post.user_name)}</strong>, ${escapeHtml(post.user_location)}</p>
        <p>${escapeHtml(post.body)}</p>
        <a class="fw-bold mt-auto" href="#post-${post.id}">Read the full ${POST_TYPE_LABELS[post.type].toLowerCase()}</a>
      </article>
    </li>`;
}

async function setupFeaturedCarousel() {
  const root = document.getElementById('featuredCarousel');
  if (!root) return;
  const featured = (await getPosts()).filter(post => post.featured);
  setupGroupedCarousel({                                   // from main.js
    root,
    items: featured,
    renderItem: featuredCardHtml,
    itemName: 'featured posts',
    statusEl: document.getElementById('featuredStatus')
  });
}


/* ---------- 3. Feed ---------------------------------------------------- */

const feedState = {
  type: 'all',          // all | recipe | tip | story
  sort: 'newest',       // newest | popular
  likedIds: new Set(),  // posts this visitor liked (phase 2: stored in the likes table)
  openComments: new Set()
};

function postHtml(post, postComments) {
  const liked = feedState.likedIds.has(post.id);
  const commentsOpen = feedState.openComments.has(post.id);
  const recipePart = post.type === 'recipe' ? `
    <details class="post__recipe">
      <summary>Show the recipe</summary>
      <div class="row g-4 mt-1">
        <div class="col-md-5">
          <h4 class="h6 fw-bold">Ingredients</h4>
          <ul>${post.ingredients.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </div>
        <div class="col-md-7">
          <h4 class="h6 fw-bold">Method</h4>
          <ol>${post.steps.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ol>
        </div>
      </div>
    </details>` : '';

  return `
    <article class="post" id="post-${post.id}" aria-labelledby="post-${post.id}-title">
      <div class="post__top">
        <p class="type-badge type-badge--${post.type}">${POST_TYPE_LABELS[post.type]}</p>
        <p class="post__region">${regionIcon(post.region, 16)} ${REGION_LABELS[post.region]}</p>
      </div>
      <h3 class="post__title" id="post-${post.id}-title">${escapeHtml(post.title)}</h3>
      <p class="post__meta">By <strong>${escapeHtml(post.user_name)}</strong>${post.user_location ? `, ${escapeHtml(post.user_location)}` : ''}
        &middot; <time datetime="${post.created_at}">${formatDate(post.created_at)}</time></p>
      <p class="post__body">${escapeHtml(post.body)}</p>
      ${recipePart}

      <div class="post__actions">
        <button type="button" class="like-btn" data-like-post="${post.id}" aria-pressed="${liked}"
                aria-label="${liked ? 'Unlike' : 'Like'} ${escapeHtml(post.title)}, ${post.likes} likes">
          <i class="bi ${liked ? 'bi-heart-fill' : 'bi-heart'}" aria-hidden="true"></i> ${post.likes}
        </button>
        <button type="button" class="comment-toggle" data-toggle-comments="${post.id}"
                aria-expanded="${commentsOpen}" aria-controls="comments-${post.id}">
          <i class="bi bi-chat" aria-hidden="true"></i> ${postComments.length} ${postComments.length === 1 ? 'comment' : 'comments'}
        </button>
        ${shareMenuHtml({ title: post.title, text: post.body.slice(0, 80), path: `community.php#post-${post.id}` })}
      </div>

      <div class="comments" id="comments-${post.id}" ${commentsOpen ? '' : 'hidden'}>
        <ul class="comments__list">
          ${postComments.length ? postComments.map(c => `
            <li>
              <p class="comments__by"><strong>${escapeHtml(c.user_name)}</strong> &middot; <time datetime="${c.created_at}">${formatDate(c.created_at)}</time></p>
              <p class="m-0">${escapeHtml(c.body)}</p>
            </li>`).join('') : '<li class="comments__empty">No comments yet. Be the first.</li>'}
        </ul>
        <form class="comment-form" data-comment-form="${post.id}" action="api/comment.php" method="post" novalidate>
          <input type="hidden" name="post_id" value="${post.id}">
          <div class="row g-2">
            <div class="col-sm-4 ff-field">
              <label for="commentName-${post.id}">Your name</label>
              <input id="commentName-${post.id}" name="user_name" type="text" required maxlength="50" autocomplete="given-name">
            </div>
            <div class="col-sm-8 ff-field">
              <label for="commentBody-${post.id}">Comment</label>
              <textarea id="commentBody-${post.id}" name="body" rows="2" required minlength="3" maxlength="500" data-error-message="Write a comment before posting."></textarea>
            </div>
          </div>
          <button type="submit" class="ff-btn ff-btn--navy mt-2">Post comment</button>
        </form>
      </div>
    </article>`;
}

async function renderFeed(focusSelector) {
  const feed = document.getElementById('postFeed');
  const allPosts = await getPosts();

  let shown = feedState.type === 'all' ? allPosts : allPosts.filter(post => post.type === feedState.type);
  shown = [...shown].sort((a, b) => feedState.sort === 'popular'
    ? b.likes - a.likes
    : b.created_at.localeCompare(a.created_at));

  // Load the comments for every post shown (phase 2: one request per post, or one combined request)
  const commentLists = await Promise.all(shown.map(post => getComments(post.id)));

  feed.innerHTML = shown.length
    ? shown.map((post, i) => postHtml(post, commentLists[i])).join('')
    : '<p class="empty-state">No posts of this type yet.</p>';

  const typeName = feedState.type === 'all' ? 'posts' : `${POST_TYPE_LABELS[feedState.type].toLowerCase()} posts`;
  document.getElementById('feedStatus').textContent = `Showing ${shown.length} ${typeName}`;

  // Every comment form needs validation (forms.js)
  feed.querySelectorAll('[data-comment-form]').forEach(form => setupValidatedForm(form, onCommentSubmit));

  if (focusSelector) {
    const target = feed.querySelector(focusSelector);
    if (target) target.focus();
  }
}

async function onCommentSubmit(form, event) {
  event.preventDefault();   // phase 1: no page reload; phase 2: addComment() calls api/comment.php
  const postId = Number(form.dataset.commentForm);
  await addComment(postId, form.elements.user_name.value.trim(), form.elements.body.value.trim());
  feedState.openComments.add(postId);
  await renderFeed(`[data-toggle-comments="${postId}"]`);
}

function setupFeed() {
  const feed = document.getElementById('postFeed');
  if (!feed) return;

  // Filter buttons: All / Recipes / Tips / Stories
  document.querySelectorAll('[data-feed-type]').forEach(button => {
    button.addEventListener('click', () => {
      feedState.type = button.dataset.feedType;
      document.querySelectorAll('[data-feed-type]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      renderFeed();
    });
  });

  document.getElementById('feedSort').addEventListener('change', event => {
    feedState.sort = event.target.value;
    renderFeed();
  });

  // Likes and comment toggles (event delegation: one listener for the whole feed)
  feed.addEventListener('click', async event => {
    const likeButton = event.target.closest('[data-like-post]');
    if (likeButton) {
      const id = Number(likeButton.dataset.likePost);
      const nowLiked = !feedState.likedIds.has(id);
      nowLiked ? feedState.likedIds.add(id) : feedState.likedIds.delete(id);
      await likePost(id, nowLiked);              // data.js (phase 2: api/like.php)
      await renderFeed(`[data-like-post="${id}"]`);
      return;
    }

    const toggle = event.target.closest('[data-toggle-comments]');
    if (toggle) {
      const id = Number(toggle.dataset.toggleComments);
      const panel = document.getElementById(`comments-${id}`);
      const open = panel.hidden;
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      open ? feedState.openComments.add(id) : feedState.openComments.delete(id);
      if (open) panel.querySelector('input:not([type="hidden"])').focus();
    }
  });

  renderFeed().then(() => {
    // Arriving from a link like community.php#post-4: scroll to that post
    if (window.location.hash.startsWith('#post-')) {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView();
    }
  });
}


/* ---------- 4. Share with the community form ------------------------- */

function setupPostForm() {
  const form = document.getElementById('postForm');
  if (!form) return;

  const recipeFields = document.getElementById('recipeFields');
  const storyFields = document.getElementById('storyFields');
  const status = document.getElementById('postStatus');

  // Show the extra fields that match the chosen type
  function showFieldsForType() {
    const type = form.elements.type.value;
    recipeFields.hidden = type !== 'recipe';
    storyFields.hidden = type !== 'story';
  }
  form.querySelectorAll('input[name="type"]').forEach(radio => radio.addEventListener('change', showFieldsForType));
  showFieldsForType();

  // One item per line -> an array, ignoring empty lines
  const lines = text => text.split('\n').map(line => line.trim()).filter(Boolean);

  setupValidatedForm(form, async (validForm, event) => {
    // PHASE 1: no server yet, so stop the real submit. Phase 2: submitPost()
    // sends the form (and the photo) to api/submit_recipe.php.
    event.preventDefault();
    const f = validForm.elements;
    const type = f.type.value;

    const post = await submitPost({
      type,
      user_name: f.user_name.value.trim(),
      user_location: f.user_location.value.trim(),
      title: f.title.value.trim(),
      region: f.region.value,
      body: f.body.value.trim(),
      ingredients: type === 'recipe' ? lines(f.ingredients.value) : undefined,
      steps: type === 'recipe' ? lines(f.steps.value) : undefined,
      place: type === 'story' ? f.place.value.trim() : undefined,
      area: type === 'story' ? f.place.value.trim() : undefined
    });

    validForm.reset();
    showFieldsForType();
    status.innerHTML = `Grazie! Your ${POST_TYPE_LABELS[type].toLowerCase()} is now in the feed.
      <a href="#post-${post.id}">See your post</a>. (Demo: posts are saved in phase 2.)`;

    // Show it: switch the feed to "All", newest first
    feedState.type = 'all';
    feedState.sort = 'newest';
    document.getElementById('feedSort').value = 'newest';
    document.querySelectorAll('[data-feed-type]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.feedType === 'all')));
    await renderFeed();
  });
}


/* ---------- Start ----------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  setupChallenge();
  setupFeaturedCarousel();
  setupFeed();
  setupPostForm();
});
