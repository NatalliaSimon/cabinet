import database from '../database.js';


export default (req, res) => {

    database(

        'SELECT * FROM Praticien',

        (error, praticiens) => {

            if (error) {
                console.error(`Erreur lors de l'exécution de la requête ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }



            res.render("rdv.ejs", {
                praticiens,
                message: 'Votre demande est enregistrée',
            }, );

        })

};
