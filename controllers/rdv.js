import { v4 } from 'uuid';
import database from '../database.js';

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
            return res.status(404).send('Aucun utilisateur trouvé pour ce numéro de téléphone');
        }

        console.log(results[0])

        const rdv = {
            title: req.body.title,
            nom: req.body.nom,
            prenom: req.body.prenom,
            tel: req.body.tel,
            idPraticien: req.body.idPraticien,
            dateTime: req.body.dateTime,
            idPatient: results[0].id
        };




        // Insérer dans la table RDV avec l'idPatient récupéré
        database(
            'INSERT INTO RDV (id, title, nom, prenom, tel, idPraticien, dateTime, idPatient) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [newId, rdv.title, rdv.nom, rdv.prenom, rdv.tel, rdv.idPraticien, rdv.dateTime, rdv.idPatient],
            (error, result) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send({
                        error: 'Erreur serveur',
                    });
                }

                console.log(result);
                res.render('rdv.ejs', {
                    message: 'Votre demande est enregistrée',
                });
            }
        );
    });
};


/*import {v4} from 'uuid';
import bcrypt from 'bcrypt';
import database from '../database.js';
import xss from 'xss'

export default (req, res) => {
     
    const newId= v4();

  const rdv = {
       
       
        title: req.body.title,
        nom: req.body.nom,
        prenom: req.body.prenom,
        tel:req.body.tel,
        praticien:req.body.praticien,
        dateTime:req.body.dateTime,
        idPatient:req.body.idPatient
        
    
};
const sql = 'SELECT idPatient FROM User WHERE login = ?';

database(sql, [login], (error, results) => {
  if (error) {
    console.error('Erreur lors de la requête SQL :', error);
    return res.status(500).send('Erreur serveur');
  }

  if (results.length === 0) {
    return res.status(404).send('Aucun utilisateur trouvé pour ce login');
  }

idPatient= results[0].idPatient;

  database(
      
    'INSERT INTO RDV (id, title, nom, prenom, tel, idPraticien, dateTime) VALUES (?, ?, ?, ?, ?, ?,? )',
     [newId, rdv.title, rdv.nom, rdv.prenom, rdv.tel, rdv.praticien, rdv.dateTime],
     
            (error, result) => {
                
                if(error) {
                    console.error(error);
                    res.status(500).send({
                        error: 'Erreur server'
                    });
                    return;
                }
                
                console.log(result)
                res.render("rdv.ejs",{message:
                   " Votre demande est enregistrée"}
                );
            }
        );
    
};
*/