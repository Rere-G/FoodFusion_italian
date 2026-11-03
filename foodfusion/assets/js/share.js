/* =====================================================================
   share.js: social media sharing (Task 4, social media integration).

   Two ways to show share buttons:
     shareRowHtml(item)   a visible row of platform buttons (recipe page)
     shareMenuHtml(item)  one "Share" button (cards, posts, events)

   item = { title: 'Cacio e pepe', text: 'A short line', path: 'recipe.php?id=6' }

   On phones and tablets the "Share" button opens the device's own share
   sheet (the Web Share API), which lists every app the visitor has
   installed. On computers it opens a menu of platform links instead.
   Each platform link is just a URL the platform provides for sharing,
   so no third-party script or tracking cookie is loaded.
   ===================================================================== */

'use strict';

/* Turn a page path into a full address, e.g. http://localhost/foodfusion/recipe.php?id=6 */
function absoluteUrl(path) {
  return new URL(path || '', window.location.href).href;
}

/* The share address each platform expects */
function shareLinks(item) {
  const url = encodeURIComponent(absoluteUrl(item.path));
  const text = encodeURIComponent(`${item.title} on FoodFusion${item.text ? ': ' + item.text : ''}`);
  return [
    { name: 'Facebook',  icon: 'bi-facebook',  href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { name: 'X',         icon: 'bi-twitter-x', href: `https://twitter.com/intent/tweet?url=${url}&text=${text}` },
    { name: 'Pinterest', icon: 'bi-pinterest', href: `https://www.pinterest.com/pin/create/button/?url=${url}&description=${text}` },
    { name: 'WhatsApp',  icon: 'bi-whatsapp',  href: `https://wa.me/?text=${text}%20${url}` },
    { name: 'Email',     icon: 'bi-envelope',  href: `mailto:?subject=${encodeURIComponent(item.title + ' on FoodFusion')}&body=${text}%20${url}`, sameTab: true }
  ];
}

/* The data- attributes the click handler below reads */
function shareDataAttributes(item) {
  return `data-share-title="${escapeHtml(item.title)}" data-share-text="${escapeHtml(item.text || '')}" data-share-path="${escapeHtml(item.path)}"`;
}

/* Use the device's share sheet only on touch screens, where it is expected */
function useNativeShare() {
  return typeof navigator.share === 'function' && window.matchMedia('(pointer: coarse)').matches;
}

function platformLinkHtml(link, extraClass) {
  const target = link.sameTab ? '' : ' target="_blank" rel="noopener"';
  const hint = link.sameTab ? '' : ' (opens in a new tab)';
  return `<a class="${extraClass}" href="${link.href}"${target} aria-label="Share on ${link.name}${hint}">
            <i class="bi ${link.icon}" aria-hidden="true"></i><span>${link.name}</span></a>`;
}

/* A full row of buttons */
function shareRowHtml(item) {
  const native = useNativeShare()
    ? `<button type="button" class="share-row__btn" data-share-native ${shareDataAttributes(item)}><i class="bi bi-share" aria-hidden="true"></i><span>Share</span></button>`
    : '';
  return `
    <div class="share-row" role="group" aria-label="Share ${escapeHtml(item.title)}">
      ${native}
      ${shareLinks(item).map(link => platformLinkHtml(link, 'share-row__btn')).join('')}
      <button type="button" class="share-row__btn" data-share-copy ${shareDataAttributes(item)}><i class="bi bi-link-45deg" aria-hidden="true"></i><span>Copy link</span></button>
      <p class="share-row__status" role="status" aria-live="polite"></p>
    </div>`;
}

/* One compact "Share" button */
function shareMenuHtml(item, buttonClass = 'share-btn') {
  if (useNativeShare()) {
    return `<button type="button" class="${buttonClass}" data-share-native ${shareDataAttributes(item)}>
              <i class="bi bi-share" aria-hidden="true"></i> Share</button>`;
  }
  // Bootstrap dropdown: the menu opens on click and closes with Escape
  return `
    <div class="dropdown share-menu">
      <button type="button" class="${buttonClass}" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Share ${escapeHtml(item.title)}">
        <i class="bi bi-share" aria-hidden="true"></i> Share
      </button>
      <ul class="dropdown-menu">
        ${shareLinks(item).map(link => `<li>${platformLinkHtml(link, 'dropdown-item')}</li>`).join('')}
        <li><button type="button" class="dropdown-item" data-share-copy ${shareDataAttributes(item)}>
          <i class="bi bi-link-45deg" aria-hidden="true"></i><span>Copy link</span></button></li>
      </ul>
    </div>`;
}

/* Small message near the button, e.g. "Link copied" */
function showShareStatus(button, message) {
  const row = button.closest('.share-row');
  const status = row ? row.querySelector('.share-row__status') : null;
  if (status) {
    status.textContent = message;
  } else {
    const label = button.querySelector('span');
    if (!label) return;
    const original = label.textContent;
    label.textContent = message;
    setTimeout(() => { label.textContent = original; }, 2000);
  }
}

/* One listener for every share button on the page, including ones added later */
document.addEventListener('click', async event => {
  const nativeButton = event.target.closest('[data-share-native]');
  const copyButton = event.target.closest('[data-share-copy]');
  const button = nativeButton || copyButton;
  if (!button) return;

  const item = { title: button.dataset.shareTitle, text: button.dataset.shareText, path: button.dataset.sharePath };
  const url = absoluteUrl(item.path);

  if (nativeButton) {
    try {
      await navigator.share({ title: item.title, text: item.text, url });
    } catch (error) {
      // The visitor closed the share sheet: nothing to do
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(url);
    showShareStatus(button, 'Link copied');
  } catch (error) {
    // Clipboard blocked (e.g. not a secure page): show the link so it can be copied by hand
    window.prompt('Copy this link:', url);
  }
});
