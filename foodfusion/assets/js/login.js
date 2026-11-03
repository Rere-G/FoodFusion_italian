/* =====================================================================
   login.js: log-in form, lockout DEMO and password reset form.

   IMPORTANT FOR THE REPORT: this is only a visual demo of the lockout.
   Anything stored in the browser can be cleared or changed by the user,
   so the real rule (3 failed attempts, then locked for 3 minutes) must
   be enforced in PHP with the users table in phase 2:
     - on a wrong password: failed_attempts + 1; on the 3rd,
       lockout_until = NOW() + INTERVAL 3 MINUTE
     - before checking a password: refuse while lockout_until > NOW()
     - on success: failed_attempts = 0, lockout_until = NULL
   ===================================================================== */

'use strict';

(function () {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const MAX_ATTEMPTS = 3;
  const LOCK_SECONDS = 3 * 60;
  const STORE_KEY = 'ff_demo_login';   // sessionStorage, demo only

  const live = document.getElementById('loginLive');   // what screen readers hear
  const alertBox = document.getElementById('loginAlert');
  const alertTitle = document.getElementById('loginAlertTitle');
  const alertText = document.getElementById('loginAlertText');
  const dots = document.querySelectorAll('#attemptDots li');
  const button = document.getElementById('loginButton');
  const inputs = form.querySelectorAll('input');

  // { attempts: 0, lockedUntil: 0 } kept for this tab, so a reload does not reset the demo
  function loadState() {
    try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || { attempts: 0, lockedUntil: 0 }; }
    catch (error) { return { attempts: 0, lockedUntil: 0 }; }
  }
  function saveState(state) {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (error) { /* demo only */ }
  }

  let state = loadState();
  let timer = null;

  // 161 -> "2:41"
  const clock = seconds => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

  function showAttempts() {
    dots.forEach((dot, i) => dot.classList.toggle('is-used', i < state.attempts));
  }

  function setLocked(locked) {
    inputs.forEach(input => { input.disabled = locked; });
    button.disabled = locked;
    button.textContent = locked ? 'Log in paused' : 'Log in';
  }

  function tick() {
    const left = Math.ceil((state.lockedUntil - Date.now()) / 1000);
    if (left <= 0) {
      clearInterval(timer);
      state = { attempts: 0, lockedUntil: 0 };
      saveState(state);
      setLocked(false);
      showAttempts();
      alertTitle.textContent = 'You can try again now';
      alertText.textContent = 'Check your password carefully, or reset it below.';
      alertBox.classList.add('auth-alert--info');
      live.textContent = 'You can try logging in again now.';
      form.elements.email.focus();
      return;
    }
    // The visible countdown changes every second; it is not announced each time
    alertText.textContent = `For your security, logging in is paused after ${MAX_ATTEMPTS} wrong passwords. Try again in ${clock(left)}.`;
  }

  function startLockout() {
    setLocked(true);
    alertBox.hidden = false;
    alertBox.classList.remove('auth-alert--info');
    alertTitle.textContent = 'Too many attempts';
    const minutesLeft = Math.ceil((state.lockedUntil - Date.now()) / 60000);
    live.textContent = `Too many attempts. Logging in is paused for ${minutesLeft} ${minutesLeft === 1 ? 'minute' : 'minutes'}.`;
    tick();
    clearInterval(timer);
    timer = setInterval(tick, 1000);
  }

  setupValidatedForm(form, (validForm, event) => {
    event.preventDefault();   // phase 1: no server to check the password
    state.attempts += 1;
    showAttempts();

    if (state.attempts >= MAX_ATTEMPTS) {
      state.lockedUntil = Date.now() + LOCK_SECONDS * 1000;
      saveState(state);
      startLockout();
      return;
    }

    saveState(state);
    const left = MAX_ATTEMPTS - state.attempts;
    alertBox.hidden = false;
    alertBox.classList.remove('auth-alert--info');
    alertTitle.textContent = 'Wrong email or password';
    alertText.textContent = `You have ${left} ${left === 1 ? 'attempt' : 'attempts'} left before logging in is paused for 3 minutes.`;
    live.textContent = `${alertTitle.textContent}. ${alertText.textContent}`;
    validForm.elements.password.value = '';
    validForm.elements.password.focus();
  });

  // Still locked from before a reload? Carry on counting down.
  showAttempts();
  if (state.lockedUntil > Date.now()) startLockout();

  /* ---------- Password reset (demo) ------------------------------------ */
  setupValidatedForm(document.getElementById('resetForm'), (resetForm, event) => {
    event.preventDefault();
    // The same message whether or not the email has an account, so nobody can
    // use this form to find out who is a member.
    document.getElementById('resetStatus').textContent =
      'If an account uses that email, a reset link is on its way. (Demo: emails are sent in phase 2.)';
    resetForm.reset();
  });
})();
