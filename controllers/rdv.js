import { v4 } from 'uuid';
import database from '../database.js';
import xss from 'xss';


export default (req, res) => {
    
    const newId = v4();

    // Récupérer l'idPatient en fonction du numéro de téléphone
    const tel = req.body.tel;

    const sql = 'SELECT id FROM Patient WHERE tel = ?';

    database(sql, [tel], (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête SQL :', error);
            return res.status(500).send('Erreur serveur');
        }

        if (results.length === 0) {
            return res.send("Les coordonnées sont invalides")
        }

        //console.log(results[0])

        const rdv = {
            title: xss(req.body.title),
            nom: xss(req.body.nom),
            prenom: xss(req.body.prenom),
            tel: xss(req.body.tel),
            idPraticien: xss(req.body.idPraticien),
            dateTime: xss(req.body.dateTime),
            idPatient: results[0].id
        };




        // Insérer dans la table RDV avec l'idPatient récupéré
        database(
            'INSERT INTO RDV (id, title, nom, prenom, tel, idPraticien, dateTime, idPatient) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [newId, rdv.title, rdv.nom, rdv.prenom, rdv.tel, rdv.idPraticien, rdv.dateTime, rdv.idPatient],
            (error, result) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send({
                        error: 'Erreur serveur',
                    });
                }

                res.redirect('/rdv' );
            }
        );
    });
};


