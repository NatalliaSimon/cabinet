import database from '../database.js';

export default (req, res) => {

    const idUser = req.session.idUser;

    console.log(idUser);

    if (!idUser) {
        res.redirect('/login');
        return;
    }

    database(

        'SELECT * FROM Praticien WHERE idUser=?', [idUser],

        (error, praticien) => {

            if (error) {
                console.error(`Erreur lors de l'exécution de la requête ${error}`);
                res.status(500).send('Erreur serveur');
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

                    const rdv = results;




                    res.render('planning.ejs', { rdv, praticien: praticien[0] });
                });
        })

};
