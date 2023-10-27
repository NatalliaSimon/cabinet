import bcrypt from 'bcrypt';
import database from '../../database.js';
import xss from 'xss';

export default (req, res) => {

  const idUser = req.session.idUser;

  const modifUser = {

    nom: xss(req.body.nom),
    prenom: xss(req.body.prenom),
    login: xss(req.body.login),
    mdp: req.body.mdp,
    role: "admin"
  };

  bcrypt.hash(modifUser.mdp, 10, (error, hash) => {
    if (error) {
      console.error('Erreur lors du hachage du mot de passe', error);
      return res.status(500).send({ error: 'Erreur serveur lors du hachage du mot de passe.' });
    }

    // Mettre à jour le user
    database(
      'UPDATE User SET login = ?, mdp = ? WHERE id = ?', [modifUser.login, hash, idUser],
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).send({
            error: 'Erreur serveur',
          });
        }

        // Mettre à jour le praticien
        database(

          'UPDATE Praticien SET Nom = ?, Prenom = ?  WHERE idUser = ?', [modifUser.nom, modifUser.prenom, idUser],
          (error, results) => {
            console.log(results)
            if (error) {
              console.error(error);

              return res.status(500).send({
                error: 'Erreur serveur',
              });

            }

            res.redirect(`/planning`);
          }
        );
      }
    );
  });
};
