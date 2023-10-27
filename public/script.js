/***********************************************************/
// accsecibiliter
/***********************************************************/


const toggleSwitch = (element, className, cookieName) => {
  const isChecked = element.checked;
  if (isChecked) {
    document.body.classList.add(className);
  } else {
    document.body.classList.remove(className);
  }
  Cookies.set(cookieName, isChecked);
};

const addToggleListener = (switchContainer, switchInput, cookieName, className) => {
  switchContainer.addEventListener('click', () => {
    switchInput.checked = !switchInput.checked;
    toggleSwitch(switchInput, className, cookieName);
  });

  switchInput.addEventListener('change', () => toggleSwitch(switchInput, className, cookieName));
  switchInput.checked = Cookies.get(cookieName) === 'true';
  switchInput.dispatchEvent(new Event('change'));
};

document.addEventListener('DOMContentLoaded', () => {
  // Bouton dark / light
  const darkSwitchContainer = document.querySelector('.light-dark-switch');
  const darkSwitchInput = document.querySelector('#lightDarkSwitchInput');
  addToggleListener(darkSwitchContainer, darkSwitchInput, 'isDarkMode', 'dark');

  // Bouton Dyslexic
  const dysSwitchContainer = document.querySelector('.dys-switch');
  const dysSwitchInput = document.querySelector('#dysSwitchInput');
  addToggleListener(dysSwitchContainer, dysSwitchInput, 'isDysEnabled', 'dys');

  // Bouton police grosse
  const bigFontSwitchContainer = document.querySelector('.big-font-switch');
  const bigFontSwitchInput = document.querySelector('#bigFontSwitchInput');
  addToggleListener(bigFontSwitchContainer, bigFontSwitchInput, 'isBigFont', 'bigFont');
});


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
// barre de recherche
/***********************************************************/
const searchBar = document.getElementById('search');
if (searchBar) {
  searchBar.addEventListener('submit', function(e) {
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

}



