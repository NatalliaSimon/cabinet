import database from '../../database.js';

export default (req, res) => {

  const { idRDV } = req.body;

  database(

    'SELECT * FROM RDV WHERE id= ?', [idRDV],

    (error, results) => {
      if (error) {
        console.error(`Erreur lors de l'exécution de la requête ${error}`);
        res.status(500).send('Erreur serveur');
        return;
      }

      if (results.length === 0) {
        res.status(404).send(`Le client avec l'ID ${idRDV} n'a pas été trouvé.`);
        return;
      }


      database(

        'DELETE FROM RDV WHERE id = ?', [idRDV],

        (error, results) => {
          if (error) {
            console.error(`Erreur lors de l'exécution de la requête ${error}`);
            res.status(500).send('Erreur serveur');
            return;
          }

          if (results.length === 0) {
            res.status(404).send(`Le client avec l'ID ${idRDV} n'a pas été trouvé.`);
            return;
          }



          res.json({results});
        });

    })
};
