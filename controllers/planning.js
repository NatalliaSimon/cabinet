import database from '../database.js';

export default (req, res) => {

    const idUser = req.session.idUser;

    console.log(idUser);

    if (!idUser) {
        res.render('login.ejs');
        return;
    }

    database(
        
        `SELECT RDV.nom, RDV.prenom,Patient.tel, RDV.dateTime, Praticien.Nom as praticienNom, Praticien.Prenom as praticienPrenom
        FROM RDV
        INNER JOIN Patient ON Patient.id = RDV.idPatient
        INNER JOIN Praticien ON RDV.idPraticien = Praticien.id
        INNER JOIN User ON User.id = Praticien.idUser
        WHERE Praticien.idUser = ?;`,

        [idUser],

        (error, results) => {



            if (error) {
                console.error(`Erreur lors de l'exécution de la requête ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }

            if (results.length === 0) {
                res.status(404).send(`Aucune donnée trouvée pour l'utilisateur avec l'ID ${idUser}.`);
                return;
            }

            const praticien = {
                nom: results[0].praticienNom,
                prenom: results[0].praticienPrenom,
                
            }
            
            const rdv = results;
            console.log(rdv)
           

            res.render('planning.ejs', { rdv, praticien });
        });
};
