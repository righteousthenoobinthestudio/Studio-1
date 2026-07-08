/*
 * <righteous-logo> — Righteous Studios animated wordmark ("The Backspace").
 *
 * Spec: design_handoff_righteous_logo/README.md
 * Behavior reference: design_handoff_righteous_logo/logo-reference.html
 *
 * Usage:
 *   <script src="components/righteous-logo.js"></script>
 *   <righteous-logo></righteous-logo>                 loop forever (default), 52px
 *   <righteous-logo size="24"></righteous-logo>       bracket mark font size in px (min 15 per spec)
 *   <righteous-logo mode="once"></righteous-logo>     one-shot: backspace once, rest at [r] studios
 *
 * Color: inherits currentColor from the host page (spec ink: #141414 light / #FFFFFF dark).
 * Respects prefers-reduced-motion: renders the static [r] studios lockup, bracket solid.
 */
(function () {
  'use strict';

  var FULL = 'righteous';
  var HOLD_FULL = 2000, ERASE = 110, REST = 2600, RETYPE = 90, BLINK = 530;

  var CSS =
    ':host{display:inline-block;color:inherit;}' +
    '.logo{display:flex;align-items:baseline;gap:0.27em;' +
    "font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;" +
    'font-weight:700;letter-spacing:-0.02em;line-height:1;}' +
    '.studios{font-size:0.29em;letter-spacing:0.5em;}';

  class RighteousLogo extends HTMLElement {
    connectedCallback() {
      if (!this.shadowRoot) {
        var root = this.attachShadow({ mode: 'open' });
        root.innerHTML =
          '<style>' + CSS + '</style>' +
          '<span class="logo" role="img" aria-label="Righteous Studios">' +
          '<span aria-hidden="true">[<span class="txt">righteous</span><span class="close">]</span></span>' +
          '<span class="studios" aria-hidden="true">studios</span>' +
          '</span>';
      }
      this._txt = this.shadowRoot.querySelector('.txt');
      this._close = this.shadowRoot.querySelector('.close');
      var size = parseFloat(this.getAttribute('size'));
      this.shadowRoot.querySelector('.logo').style.fontSize = (size > 0 ? size : 52) + 'px';

      this._rm = window.matchMedia('(prefers-reduced-motion: reduce)');
      this._rmHandler = this._restart.bind(this);
      this._rm.addEventListener('change', this._rmHandler);
      this._start();
    }

    disconnectedCallback() {
      this._stop();
      this._rm.removeEventListener('change', this._rmHandler);
    }

    _start() {
      this._alive = true;
      if (this._rm.matches) { // static lockup, no animation
        this._setTxt('r');
        this._setBracket(true);
        return;
      }
      this._holding = false;
      this._blinkOn = true;
      var self = this;
      this._blinkTimer = setInterval(function () {
        if (self._holding) { self._blinkOn = !self._blinkOn; self._setBracket(self._blinkOn); }
      }, BLINK);
      this._run();
    }

    _stop() {
      this._alive = false;
      clearInterval(this._blinkTimer);
      clearTimeout(this._waitTimer);
    }

    _restart() { this._stop(); this._start(); }

    _setTxt(s) { this._txt.textContent = s; }
    _setBracket(on) { this._close.style.opacity = on ? '1' : '0'; }
    _wait(ms) {
      var self = this;
      return new Promise(function (res) { self._waitTimer = setTimeout(res, ms); });
    }

    async _run() {
      var once = this.getAttribute('mode') === 'once';
      while (this._alive) {
        // 1. Full hold — [righteous], bracket blinking
        this._holding = true; this._blinkOn = true;
        this._setTxt(FULL); this._setBracket(true);
        await this._wait(HOLD_FULL); if (!this._alive) return;
        // 2. Erase — one char every ERASE ms, bracket solid
        this._holding = false; this._setBracket(true);
        for (var i = FULL.length - 1; i >= 1; i--) {
          this._setTxt(FULL.slice(0, i));
          await this._wait(ERASE); if (!this._alive) return;
        }
        // 3. Rest — [r], bracket blinking (one-shot stays here forever)
        this._holding = true; this._blinkOn = true;
        if (once) return;
        await this._wait(REST); if (!this._alive) return;
        // 4. Retype — one char every RETYPE ms, bracket solid
        this._holding = false; this._setBracket(true);
        for (var j = 2; j <= FULL.length; j++) {
          this._setTxt(FULL.slice(0, j));
          await this._wait(RETYPE); if (!this._alive) return;
        }
      }
    }
  }

  customElements.define('righteous-logo', RighteousLogo);
})();
