import database from '../database.js';

export default (req, res) => {
    
    const idUser = req.session.idUser;

    console.log(idUser);

    if (!idUser) {
        res.render('login.ejs');
        return;
    }

    database(
        
        'SELECT role FROM User WHERE id=?',
        [idUser],
        (err, results) => {
            if (err) {
                console.error(`Erreur lors de l'exécution de la requête ${err}`);
                res.status(500).send('Erreur serveur');
                return;
            }

            if (results[0].role === 'admin') {
                res.redirect('/planning');
                return;
            }

            database(
                
                `SELECT RDV.nom, RDV.prenom, Patient.tel, RDV.dateTime, Praticien.Nom, Praticien.Prenom, User.login, User.mdp
                FROM RDV
                INNER JOIN Patient ON Patient.id = RDV.idPatient
                INNER JOIN Praticien ON RDV.idPraticien = Praticien.id
                INNER JOIN User ON User.id = Patient.idUser
                WHERE Patient.idUser = ?;`,
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

                    const patient = {
                        nom: results[0].nom,
                        prenom: results[0].prenom,
                        tel: results[0].tel,
                    }

                    const rdv = results;

                    res.render('login.ejs', { rdv, patient });
                }
            );
        }
    );
};




