import { v4 } from 'uuid';
import database from '../../database.js';

export default (req, res) => {

    const newId = v4();
    const tel = req.body.tel;


    const rdv = {
        title: req.body.title,
        nom: req.body.nom,
        prenom: req.body.prenom,
        tel: req.body.tel,
        idPraticien: req.body.idPraticien,
        dateTime: req.body.dateTime,
        idPatient: req.body.idPatient
    };

    console.log('Téléphone:', tel);


    database(
        'SELECT id FROM Patient WHERE tel = ?', [tel],
        (error, results) => {

            if (error) {
                console.error(`Erreur lors de l'exécution de la requête ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }


            const patient = results[0].id;

            console.log('ID du patient:', patient);

            database(
                'INSERT INTO RDV (id, title, nom, prenom, tel, idPraticien, dateTime, idPatient) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [newId, rdv.title, rdv.nom, rdv.prenom, rdv.tel, rdv.idPraticien, rdv.dateTime, patient, rdv.idPatient],
                (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).send({
                            error: 'Erreur serveur',
                        });
                    }

                    console.log(result);

                    res.redirect('/admin/rdvAdmin');

                })
        }
    );

};
