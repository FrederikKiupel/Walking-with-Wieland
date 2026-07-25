/* Check-In: 4-Schritt-Flow für Energie, Stress, Stimmung, Routenwahl v16 */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  var ENERGY_ICONS = [
    'assets/Energie/Energie%20Lvl%201.png',
    'assets/Energie/Energie%20Lvl%202.png',
    'assets/Energie/Energie%20Lvl%203.png',
    'assets/Energie/Energie%20Lvl%204.png',
    'assets/Energie/Energie%20Lvl%205.png'
  ];
  var STRESS_ICONS = [
    'assets/Stress/Stress%20Lvl%201.png',
    'assets/Stress/Stress%20Lvl%202.png',
    'assets/Stress/Stress%20Lvl%203.png',
    'assets/Stress/Stress%20Lvl%204.png',
    'assets/Stress/Stress%20Lvl%205.png'
  ];
  var MOOD_ICONS = [
    'assets/Emotionen/Wieland%20-%20very%20sad.png',
    'assets/Emotionen/Wieland%20-%20sad.png',
    'assets/Emotionen/Wieland%20-%20neutral.png',
    'assets/Emotionen/Wieland%20-%20happy.png',
    'assets/Emotionen/Wieland%20-%20very%20happy.png'
  ];
  var ENERGY_LABELS = ['Erschöpft', 'Müde', 'Mittel', 'Fit', 'Voller Energie'];
  var STRESS_LABELS = ['Entspannt', 'Ruhig', 'Okay', 'Angespannt', 'Sehr gestresst'];
  var MOOD_LABELS   = ['Mies', 'Nicht so gut', 'Okay', 'Gut', 'Super!'];

  // Alle Icons vorladen damit beim Wechsel kein Flackern entsteht
  [].concat(ENERGY_ICONS, STRESS_ICONS, MOOD_ICONS).forEach(function (src) {
    var img = new Image(); img.src = src;
  });

  function levelOf(val) {
    return Math.min(4, Math.floor(parseInt(val, 10) / 20));
  }

  // ── Schritt-Navigation ─────────────────────────────────────────────

  function showStep(n) {
    [1, 2, 3, 4].forEach(function (i) {
      var el = $('ci-step-' + i);
      if (i === n) el.removeAttribute('hidden');
      else el.setAttribute('hidden', '');
    });
  }

  var CHEVRON_LEFT = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';

  $('ci-back-1').innerHTML = WW.icon('x');
  $('ci-back-1').addEventListener('click', function () {
    location.replace('index.html');
  });
  [2, 3, 4].forEach(function (n) {
    $('ci-back-' + n).innerHTML = CHEVRON_LEFT;
    $('ci-back-' + n).addEventListener('click', function () { showStep(n - 1); });
  });

  // ── Schritt 1: Energie ─────────────────────────────────────────────

  function updateEnergy() {
    var val = parseInt($('energy').value, 10);
    var lvl = levelOf(val);
    $('ci-energy-icon').src = ENERGY_ICONS[lvl];
    $('ci-energy-label').textContent = ENERGY_LABELS[lvl];
    $('ci-energy-time').textContent = 'ca. ' + WW.estimateMinutes(val) + ' Min.';
  }
  $('energy').addEventListener('input', updateEnergy);
  updateEnergy();

  $('ci-next-1').addEventListener('click', function () { showStep(2); });

  // ── Schritt 2: Stress ──────────────────────────────────────────────

  function updateStress() {
    var val = parseInt($('stress').value, 10);
    var lvl = levelOf(val);
    $('ci-stress-icon').src = STRESS_ICONS[lvl];
    $('ci-stress-label').textContent = STRESS_LABELS[lvl];
  }
  $('stress').addEventListener('input', updateStress);
  updateStress();

  $('ci-next-2').addEventListener('click', function () { showStep(3); });

  // ── Schritt 3: Stimmung ────────────────────────────────────────────

  function updateMood() {
    var val = parseInt($('mood').value, 10);
    var lvl = levelOf(val);
    $('ci-mood-icon').src = MOOD_ICONS[lvl];
    $('ci-mood-label').textContent = MOOD_LABELS[lvl];
  }
  $('mood').addEventListener('input', updateMood);
  updateMood();

  $('ci-next-3').addEventListener('click', function () { showStep(4); });

  // ── Schritt 4: Route ───────────────────────────────────────────────

  var locationMode = 'gps';

  function setLocMode(mode) {
    locationMode = mode;
    $('loc-gps').style.opacity  = mode === 'gps'  ? '' : '0.5';
    $('loc-home').style.opacity = mode === 'home' ? '' : '0.5';
  }

  var savedHome = WW.getSettings().home;
  if (savedHome && typeof savedHome.lat === 'number') {
    $('loc-home').hidden = false;
    $('loc-hint').textContent =
      'Heimat: ' + savedHome.lat.toFixed(4) + ', ' + savedHome.lng.toFixed(4);
  } else {
    $('loc-hint').textContent =
      'Aktuellen GPS-Standort als Start verwenden. ' +
      'Oder Heimat-Standort in den Einstellungen speichern.';
  }

  $('loc-gps').addEventListener('click',  function () { setLocMode('gps'); });
  $('loc-home').addEventListener('click', function () { setLocMode('home'); });

  $('route').addEventListener('change', function () {
    var on = this.checked;
    $('location-choice').hidden = !on;
    $('route-hint').hidden = !(on && !WW.getSettings().orsKey);
  });

  // ── Starten ────────────────────────────────────────────────────────

  $('ci-start').addEventListener('click', function () {
    var cfg = {
      checkin: {
        energy: parseInt($('energy').value, 10),
        stress: parseInt($('stress').value, 10),
        mood:   parseInt($('mood').value,   10)
      },
      guided:       $('route').checked,
      locationMode: locationMode
    };
    function go() { WW.setWalkConfig(cfg); location.replace('walk.html'); }
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission().then(function () { go(); }).catch(go);
    } else {
      go();
    }
  });
})();
