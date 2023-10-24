
const darkButtonListener = (event) => {
  const isDarkMode = event.target.checked;
  if (isDarkMode) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  Cookies.set('isDarkMode', isDarkMode);
}

const dysButtonListener = (event) => {
  const isDysEnabled = event.target.checked;
  if (isDysEnabled) {
    document.body.classList.add('dys');
  } else {
    document.body.classList.remove('dys');
  }
  Cookies.set('isDysEnabled', isDysEnabled);
}

const bigFontButtonListener = (event) => {
  const isBigFont = event.target.checked;
  if (isBigFont) {
    document.body.classList.add('bigFont');
  } else {
    document.body.classList.remove('bigFont');
  }
  Cookies.set('isBigFont', isBigFont);
}

document.addEventListener('DOMContentLoaded', () => {
  let checkEvent = new Event('change');

  // Bouton dark / light
  const darkButton = document.querySelector('#lightDarkSwitchInput');
  darkButton.addEventListener('change', darkButtonListener);
  darkButton.checked = Cookies.get('isDarkMode') === 'true';
  darkButton.dispatchEvent(checkEvent);

  // Bouton Dyslexic
  const dysButton = document.querySelector('#dysSwitchInput');
  dysButton.addEventListener('change', dysButtonListener);
  dysButton.checked = Cookies.get('isDysEnabled') === 'true';
  dysButton.dispatchEvent(checkEvent);

  // Bouton police grosse
  const bigFontButton = document.querySelector('#bigFontSwitchInput');
  bigFontButton.addEventListener('change', bigFontButtonListener);
  bigFontButton.checked = Cookies.get('isBigFont') === 'true';
  bigFontButton.dispatchEvent(checkEvent);
});
