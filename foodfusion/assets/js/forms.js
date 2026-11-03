/* =====================================================================
   forms.js: friendly client-side validation.

   HTML attributes (required, type="email", minlength) describe the rules.
   This file turns them into clear messages under each field.

   IMPORTANT: browser checks are only for convenience. Anyone can switch
   JavaScript off, so in phase 2 the PHP files validate everything again.
   ===================================================================== */

'use strict';

/* Return an error message for one input, or '' if it is fine. */
function getFieldError(input) {
  const value = input.type === 'checkbox' ? input.checked : input.value.trim();
  const label = input.labels && input.labels[0] ? input.labels[0].textContent.trim() : 'This field';

  if (input.type === 'checkbox') {
    return input.required && !value ? 'Please tick this box to continue.' : '';
  }
  if (input.required && value === '') {
    return `Enter your ${label.toLowerCase()}.`;
  }
  if (input.type === 'email' && value !== '' && input.validity.typeMismatch) {
    return 'Enter an email address like name@example.com.';
  }
  if (input.type === 'password' && value !== '') {
    if (value.length < 8 || !/\d/.test(value)) {
      return 'Your password needs at least 8 characters, including a number.';
    }
  }
  return '';
}

/* Show or clear the message under an input and link it with aria-describedby. */
function showFieldError(input, message) {
  const errorId = input.id + 'Error';
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
      input.closest('.ff-field, .ff-check').appendChild(errorElement);
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

/*
 * Attach validation to a form.
 * onValid(form) runs when every field passes.
 */
function setupValidatedForm(form, onValid) {
  if (!form) return;
  const inputs = Array.from(form.querySelectorAll('input, select, textarea'));

  // Once a field shows an error, re-check it while the user types, so the
  // message disappears as soon as it is fixed. (Checking on "blur" instead
  // made the layout jump while clicking the next field, so clicks missed.)
  inputs.forEach(input => {
    const recheck = () => {
      if (input.getAttribute('aria-invalid') === 'true') showFieldError(input, getFieldError(input));
    };
    input.addEventListener('input', recheck);
    input.addEventListener('change', recheck);
  });

  form.addEventListener('submit', event => {
    let firstInvalid = null;
    inputs.forEach(input => {
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


/* ---------- Join us form --------------------------------------------- */
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
