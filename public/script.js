/***********************************************************/
// menu burger
/***********************************************************/
const navbar = document.getElementById("navbarMenu");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");


function toggleNav() {
  navbar.classList.toggle("active");

}

openBtn.addEventListener('click', toggleNav)
closeBtn.addEventListener('click', toggleNav)


/***********************************************************/
                   // accsecibiliter
/***********************************************************/


const darkButtonListener = (event) => {
  const isDarkMode = event.target.checked;
  if (isDarkMode) {
    document.body.classList.add('dark');
  }
  else {
    document.body.classList.remove('dark');
  }
  Cookies.set('isDarkMode', isDarkMode);
}

const dysButtonListener = (event) => {
  const isDysEnabled = event.target.checked;
  if (isDysEnabled) {
    document.body.classList.add('dys');
  }
  else {
    document.body.classList.remove('dys');
  }
  Cookies.set('isDysEnabled', isDysEnabled);
}

const bigFontButtonListener = (event) => {
  const isBigFont = event.target.checked;
  if (isBigFont) {
    document.body.classList.add('bigFont');
  }
  else {
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

/***********************************************************/
                 // barre de recherche
/***********************************************************/

document.getElementById('search').addEventListener('submit', function(e) {
  e.preventDefault();
  const nomPatient = document.getElementById('nom').value;

  fetch(`/rdvAdmin/?nom=${nomPatient}`)
    .then(response => response.json())
    .then(data => {

      // Affichez les résultats ici (par exemple, dans une liste)
      const resultList = document.getElementById('search');
      resultList.innerHTML = '';
      
      if (data.recherche.length > 0) {
        data.recherche.forEach(rdv => {
          const listItem = document.createElement('ul');
          listItem.innerHTML = `  <li class="ulPlanning" >Date et l'heure de RDV ${ rdv.dateTime }</li>
                    <li class="ulPlanning">Patient ${ rdv.nom} ${ rdv.prenom }</li>
                    <li class="ulPlanning"><a href="/deleteRdv/${ rdv.id }" class="planning">Supprimer le RDV</a></li>
                    
                `;
          resultList.appendChild(listItem);
        });
      }
      else {


        resultList.innerHTML = 'Aucun rendez-vous trouvé pour ce patient.';
      }
    })
    .catch(error => {
      console.error('Erreur lors de la recherche :', error);
    });
});
