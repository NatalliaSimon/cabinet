import database from '../database.js';

export default (req, res) => {

    const idUser = req.session.idUser;

    console.log(idUser)
    
    if (!idUser) {
        res.render('login.ejs');
        return;
    }

    database('SELECT * FROM Patient WHERE idUser = ?', [idUser], (error, results) => {
        if (error) {
            console.error(`Erreur lors de l'exécution de la requête ${error}`);
            res.status(500).send('Erreur serveur');
            return;
        }

        if (results.length === 0) {
            res.status(404).send(`Le Patien avec l'ID ${idUser} n'a pas été trouvé.`);
            return;
        }
        const patient = results[0];

        database('SELECT * FROM RDV WHERE idPatient = ?', [patient.id], (error, results) => {
            if (error) {
                console.error(`Erreur lors de l'exécution de la requête ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }

            if (results.length === 0) {
                res.status(404).send(`Le RDV avec l'ID ${patient.id} n'a pas été trouvé.`);
                return;
            }
            const rdv = results;
            console.log(rdv);



            rdv.forEach((currentRdv) => {
                database('SELECT * FROM Praticien WHERE id = ?', [currentRdv.idPraticien], (error, results) => {
                    if (error) {
                        console.error(`Erreur lors de l'exécution de la requête ${error}`);
                        res.status(500).send('Erreur serveur');
                        return;
                    }

                    if (results.length === 0) {
                        res.status(404).send(`Le Praticien avec l'ID ${idUser} n'a pas été trouvé.`);
                        return;
                    }
                    const praticien = results;
                    
                    console.log(patient);

                    res.render('login.ejs', { patient, rdv, praticien });
                });
            });
        });
    });

    
    
    res.render('login.ejs', { patient: {nom: 'plop', prenom: 'plop2', tel: 2}, rdv: [{dateTime: '12'}], praticien: [{Nom: 'tt', Prenom: 'rr'}] });
};
/*
 <%- include('header.ejs') %>

<main>
    <div class="profil">
      
        <a href="logout" class="planning">Logout</a>
        <a href="admin/modifAdmin" class="planning">Modifier mon profil Admin</a>
        <a href="admin/newAdmin" class="planning">Crée profil Admin</a>
        <a href="admin/rdvAdmin" class="planning">Modifier les RDV</a>
        <a href="delete" class="planning" >Supprimer mon profil Admin</a>
    </div>
    
     <% if (isLogged) {%>
        <p>  Données du praticien:</p>
         <ul class ="list">
            <li>
                <ul>
                 <li>Nom:<%= praticien.nom %></li>
                 <li>Prenom:<%= praticien.prenom %></li>
                
                </ul>
            </li>
            <li> <p> List de rendez-vous:</p>
            <% if(rdv.length > 0)  {%>
            <ul>
                
           <% for(const tab of rdv) { %> 
    <li>Date et l'heure de RDV <%= tab.dateTime %></li>
    <li>Patient <%= tab.nom %> <%= tab.prenom %></li>
    <li>Tel: <%= tab.tel %></li>
          </ul>
           </li>
         <% } %> 
        <% } %> <% else { %>
            <a href="/admin/rdvAdmin">
        <% } %>
        </ul>
       <% } %>
</main>

<%- include('footer.ejs') %> 

*/
/*<%- include('header.ejs') %>

<main>
    <% if (!isLogged) {%>
    <p>Merci de vous connecter ou de créer votre profil pour la prise de RENDEZ−VOUS</p>
    <% } %>
      <% if(locals.message) { %><p> <%=message  %></p>
    <% } %>
    <% if (isLogged) {%>
    
    <form method="post">
        <label for="title">Mme ou MR</label>
        <select id="title" name="title" type="text" />
        <option value=""> --- </option>
        <option value="Madame">Madame</option>
        <option value="Monsieur">Monsieur</option>
        </select>
        <label for="nom">Nom</label>
        <input id="nom" name="nom" type="text" />
        <label for="prenom">Prenom</label>
        <input id="prenom" name="prenom" type="text"></input>
        <label for="tel">Telephone</label>
        <input id="tel" name="tel" type="phone"></input>
        <label for="idPraticen">Praticiens</label>
         <select id="idPraticien" name="idPraticien" type="text" />
        <option value=""> --- </option>
        
        <% for(const medcin of praticiens) { %>
        
        <option value="<%= medcin.id %>"> <%= medcin.Nom %> <%= medcin.Prenom %></option>
        
        <% } %>
        </select>
        <label for="dateTime"> Veuillez choisir une date et l'heure :</label >
        <input id="dateTime"  type="datetime-local"   name="dateTime" />
        <button type="submit">Envoyer</button>
      </form>
      <% } %>
      </main>
      
<%- include('footer.ejs') %>      */

/* <header>
        <div class="logo">
            <img class="symbole" src="/logo.png" alt="logo kiné">
        </div>
        <h1> Masseurs-kinésithérapeutes </h1>
       
        <nav class="navbar">

             <ul class="liste">
                <li class="home"><a href="/" class="color"><strong>Cabinet</strong></a></li>
                <li class="marg"><a href="/rdv"><strong>Prendre RDV</strong></a></li>
                <li class="marg"><a href="/acces"><strong>Accès</strong></a></li>
                <li class="marg"><a href="/login"><strong>Mon Profil</strong></a></li>
            </ul>
            
        </nav>
    </header>
    */