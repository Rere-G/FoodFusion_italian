/* =====================================================================
   contact.js: the Contact us form.
   - Shows extra fields for the chosen reason (dish for a recipe request,
     a rating for feedback).
   - Counts the characters in the message.
   - Validates with forms.js and shows a confirmation.
   ===================================================================== */

'use strict';

(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('contactStatus');
  const message = form.elements.message;
  const counter = document.getElementById('contactMessageCount');

  /* Extra fields for each reason */
  function showFieldsForReason() {
    const reason = form.elements.reason.value;
    form.querySelectorAll('[data-reason-fields]').forEach(group => {
      group.hidden = group.dataset.reasonFields !== reason;
    });
  }
  form.querySelectorAll('input[name="reason"]').forEach(radio => radio.addEventListener('change', showFieldsForReason));
  showFieldsForReason();

  /* Character counter. The visible count updates on every key; screen
     readers hear it (through a separate live region) only every 100
     characters and near the limit, so they are not interrupted constantly. */
  const live = document.getElementById('contactMessageLive');
  let lastAnnounced = 0;
  function updateCounter() {
    const length = message.value.length;
    counter.textContent = `${length} of ${message.maxLength} characters`;
    const nearLimit = message.maxLength - length <= 50;
    if (Math.abs(length - lastAnnounced) >= 100 || (nearLimit && length !== lastAnnounced)) {
      live.textContent = nearLimit ? `${message.maxLength - length} characters left` : counter.textContent;
      lastAnnounced = length;
    }
  }
  message.addEventListener('input', updateCounter);

  /* Submit */
  const REASON_TEXT = { enquiry: 'enquiry', recipe_request: 'recipe request', feedback: 'feedback' };

  setupValidatedForm(form, (validForm, event) => {
    // PHASE 1: there is no server yet, so stop the real submit and confirm.
    // Phase 2: remove these lines; PHP validates again and saves the message.
    event.preventDefault();
    const name = validForm.elements.name.value.trim();
    const email = validForm.elements.email.value.trim();
    const reason = REASON_TEXT[validForm.elements.reason.value];

    status.innerHTML = `<strong>Grazie, ${escapeHtml(name)}!</strong> We have your ${reason} and will reply to
      <strong>${escapeHtml(email)}</strong> within two working days. (Demo: messages are saved in phase 2.)`;
    validForm.reset();
    showFieldsForReason();
    updateCounter();
    clearFormErrors(validForm);
    status.focus();   // move focus to the confirmation so screen-reader users hear it
  });
})();
