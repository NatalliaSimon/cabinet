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
