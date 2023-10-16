import database from '../database.js';


export default (req, res) => {


    const idUser = req.session.idUser;


    database(   `SELECT RDV.nom, RDV.prenom,Patient.tel, RDV.dateTime, Praticien.Nom, Praticien.Prenom, User.login, 
    User.mdp
        FROM RDV
        INNER JOIN Patient ON Patient.id = RDV.idPatient
        INNER JOIN Praticien ON RDV.idPraticien = Praticien.id
        INNER JOIN User ON User.id = Patient.idUser
        WHERE Patient.idUser = ?;`,

        [idUser], 
        (error, results) => {
        console.log(idUser, results)
        if (error) {
            console.error(`Erreur lors de l'exécution de la requête ${error}`);
            res.status(500).send('Erreur serveur');
            return;
        }

        const patient = results[0];
        
      

        res.render("modif.ejs", { patient });

    });
};
