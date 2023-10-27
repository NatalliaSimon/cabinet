import { v4 } from 'uuid';
import database from '../../database.js';
import xss from 'xss';

export default (req, res) => {

    const newId = v4();
    const tel = req.body.tel;


    const rdv = {
        title: xss(req.body.title),
        nom: xss(req.body.nom),
        prenom: xss(req.body.prenom),
        tel: xss(req.body.tel),
        idPraticien: xss(req.body.idPraticien),
        dateTime: xss(req.body.dateTime),
        idPatient: xss(req.body.idPatient)
    };




    database(
        'SELECT id FROM Patient WHERE tel = ?', [tel],
        (error, results) => {

            if (error) {
                console.error(`Erreur lors de l'exécution de la requête ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }


            const patient = results[0].id;



            database(
                'INSERT INTO RDV (id, title, nom, prenom, tel, idPraticien, dateTime, idPatient) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [newId, rdv.title, rdv.nom, rdv.prenom, rdv.tel, rdv.idPraticien, rdv.dateTime, patient, rdv.idPatient],
                (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).send({
                            error: 'Erreur serveur',
                        });
                    }



                    res.redirect('/admin/rdvAdmin');

                })
        }
    );

};
