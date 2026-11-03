/* =====================================================================
   forms.js: friendly client-side validation for every form on the site.

   HTML attributes describe the rules:
     required, type="email", minlength, maxlength, accept (files)
     data-rule="new-password"   at least 8 characters including a number
     data-error-message="..."   a custom "this field is empty" message
   This file turns them into clear messages under each field, linked to
   the field with aria-describedby so screen readers read them out.

   IMPORTANT: browser checks are only for convenience. Anyone can switch
   JavaScript off, so in phase 2 the PHP files validate everything again.
   ===================================================================== */

'use strict';

const MAX_PHOTO_MB = 2;

/* The visible label text of a field (or of its group) */
function fieldLabel(input) {
  const group = input.closest('fieldset');
  if ((input.type === 'radio') && group) return group.querySelector('legend').textContent.trim();
  return input.labels && input.labels[0] ? input.labels[0].textContent.replace('(optional)', '').trim() : 'This field';
}

/* Return an error message for one field, or '' if it is fine. */
function getFieldError(input) {
  const label = fieldLabel(input);

  // Fields inside a hidden part of the form (e.g. recipe-only fields) are skipped
  if (input.closest('[hidden]') || input.disabled) return '';

  if (input.type === 'checkbox') {
    return input.required && !input.checked ? 'Please tick this box to continue.' : '';
  }

  if (input.type === 'radio') {
    const checked = input.form.querySelector(`input[name="${input.name}"]:checked`);
    return input.required && !checked ? `Choose one option for "${label}".` : '';
  }

  if (input.type === 'file') {
    const file = input.files[0];
    if (!file) return input.required ? 'Choose a photo to upload.' : '';
    if (!file.type.startsWith('image/')) return 'The photo must be an image file (JPG, PNG or WebP).';
    if (file.size > MAX_PHOTO_MB * 1024 * 1024) return `The photo must be smaller than ${MAX_PHOTO_MB} MB.`;
    return '';
  }

  const value = input.value.trim();

  if (input.required && value === '') {
    if (input.dataset.errorMessage) return input.dataset.errorMessage;
    return input.tagName === 'SELECT' ? `Choose ${label.toLowerCase()}.` : `Enter your ${label.toLowerCase()}.`;
  }
  if (value === '') return '';

  if (input.type === 'email' && input.validity.typeMismatch) {
    return 'Enter an email address like name@example.com.';
  }
  if (input.dataset.rule === 'new-password' && (value.length < 8 || !/\d/.test(value))) {
    return 'Your password needs at least 8 characters, including a number.';
  }
  if (input.minLength > 0 && value.length < input.minLength) {
    return `${label} needs at least ${input.minLength} characters (you have ${value.length}).`;
  }
  return '';
}

/* Show or clear the message under a field and link it with aria-describedby. */
function showFieldError(input, message) {
  const errorId = (input.type === 'radio' ? input.name : input.id) + 'Error';
  let errorElement = document.getElementById(errorId);

  // Keep any hint ids that were already in aria-describedby
  const describedBy = (input.getAttribute('aria-describedby') || '')
    .split(' ')
    .filter(id => id && id !== errorId);

  if (message) {
    if (!errorElement) {
      errorElement = document.createElement('p');
      errorElement.className = 'ff-error';
      errorElement.id = errorId;
      input.closest('.ff-field, .ff-check, fieldset').appendChild(errorElement);
    }
    errorElement.textContent = message;
    input.setAttribute('aria-invalid', 'true');
    describedBy.push(errorId);
  } else {
    if (errorElement) errorElement.remove();
    input.removeAttribute('aria-invalid');
  }

  if (describedBy.length) {
    input.setAttribute('aria-describedby', describedBy.join(' '));
  } else {
    input.removeAttribute('aria-describedby');
  }
}

/* The fields to check. For a radio group, only its first radio stands for the group. */
function fieldsToCheck(form) {
  const seenRadioGroups = new Set();
  return Array.from(form.querySelectorAll('input, select, textarea')).filter(input => {
    if (input.type === 'hidden' || input.type === 'submit') return false;
    if (input.type !== 'radio') return true;
    if (seenRadioGroups.has(input.name)) return false;
    seenRadioGroups.add(input.name);
    return true;
  });
}

/*
 * Attach validation to a form.
 * onValid(form, event) runs when every field passes.
 */
function setupValidatedForm(form, onValid) {
  if (!form) return;

  // Once a field shows an error, re-check it while the user types, so the
  // message disappears as soon as it is fixed. (Checking on "blur" instead
  // made the layout jump while clicking the next field, so clicks missed.)
  form.addEventListener('input', event => recheck(event.target));
  form.addEventListener('change', event => recheck(event.target));

  function recheck(target) {
    // For a radio, the error lives on the first radio of its group
    const field = target.type === 'radio' ? form.querySelector(`input[name="${target.name}"]`) : target;
    if (field && field.getAttribute('aria-invalid') === 'true') showFieldError(field, getFieldError(field));
  }

  form.addEventListener('submit', event => {
    let firstInvalid = null;
    fieldsToCheck(form).forEach(input => {
      const message = getFieldError(input);
      showFieldError(input, message);
      if (message && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      event.preventDefault();
      firstInvalid.focus();
      return;
    }
    onValid(form, event);
  });
}

/* Clear every error message in a form (e.g. after a successful send) */
function clearFormErrors(form) {
  fieldsToCheck(form).forEach(input => showFieldError(input, ''));
}


/* ---------- "Sign up now" form --------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  setupValidatedForm(document.getElementById('joinForm'), (form, event) => {
    // PHASE 1: register.php does not exist yet, so stop the real submit
    // and show a message instead. In phase 2, delete these lines and the
    // browser will post the form to register.php.
    event.preventDefault();
    const status = document.getElementById('joinStatus');
    const firstName = form.elements.first_name.value.trim();
    status.textContent = `Grazie, ${firstName}! (Demo only: accounts are created in phase 2.)`;
    form.reset();
  });
});
