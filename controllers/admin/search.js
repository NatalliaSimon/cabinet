import database from '../../database.js';

export default (req, res) => {


    const nomPatient = req.query.nom;


    database(
        'SELECT * FROM RDV WHERE nom = ?',

        [nomPatient],

 
        (err, recherche) => {
            if (err) {

                console.error('Erreur lors de la recherche :', err);

                res.status(500).json({ error: 'Une erreur s\'est produite lors de la recherche.' });
            }
            else {
                res.json({recherche });
            }
        });


}
