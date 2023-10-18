import database from '../database.js'



export default (req, res) => {


  const idUser = req.session.idUser

  req.session.destroy((error) => {

    console.log(req.session)

database(

    'DELETE FROM User WHERE id = ?',
    [idUser],
    (error, result) => {

      if (error) {
        console.error(`Erreur lors de l'exécution de la requête ${error}`);
        return;
      }

      res.redirect('/');


      console.log('Donnés supprimés !');
    });
    
  })
  


}
