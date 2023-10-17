import database from '../database.js';


export default (req, res) => { 
    
    database(
      
      'SELECT* FROM Praticien ', 
       
      (error, results) => {
          
      if (error) {
      console.error(`Erreur lors de l'exécution de la requête ${error}`);
      res.status(500).send('Erreur serveur');
      return;
    }
    
    const Praticien =results
    
    res.render("rdv.ejs",{Praticien});
    
})
    
};