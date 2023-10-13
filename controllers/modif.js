import bcrypt from 'bcrypt';
import database from '../database.js';
import xss from 'xss';

export default (req, res) => {
    
  const idUser = req.session.idUser; 

  const modifUser = {
    nom: xss(req.body.nom),
    prenom: xss(req.body.prenom),
    tel: xss(req.body.tel),
    login: xss(req.body.login),
    mdp: req.body.mdp,
    role: "User"
  };

  bcrypt.hash(modifUser.mdp, 10, (error, hash) => {
    if (error) {
      console.error('Erreur lors du hachage du mot de passe', error);
      return res.status(500).send({ error: 'Erreur serveur lors du hachage du mot de passe.' });
    }

    // Mettre à jour le user
    database(
      'UPDATE User SET login = ?, mdp = ? WHERE id = ?',
      [modifUser.login, hash,modifUser.role], 
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).send({
            error: 'Erreur serveur',
          });
        }
console.log(idUser)
        // Mettre à jour le patient
        database(
          
          'UPDATE Patient SET nom = ?, prenom = ?, tel = ? WHERE idUser = ?',
          [modifUser.nom, modifUser.prenom, modifUser.tel, idUser], 
          (error, results) => {
             console.log(results)
            if (error) {
              console.error(error);
              
              return res.status(500).send({
                error: 'Erreur serveur',
              });
             
              
            }

            res.redirect(`/login`, 200, { message: 'Mises à jour effectuées avec succès' }); 
          }
        );
      }
    );
  });
};