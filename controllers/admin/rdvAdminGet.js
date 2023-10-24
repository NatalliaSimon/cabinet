import database from '../../database.js';


export default (req, res) => {


    database(
        'SELECT * FROM Praticien ',

        (error, praticiens) => {

            if (error) {
                console.error(`Erreur lors de l'exécution de la requête ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }

            const idUser = req.session.idUser;

            const sql = `
    SELECT RDV.*, Praticien.id AS idPraticien,Praticien.Nom AS NomPraticien,Praticien.Prenom AS PrenomPraticien,User.login, User.mdp
      FROM RDV
           INNER JOIN Praticien ON RDV.idPraticien = Praticien.id
           INNER JOIN User ON Praticien.idUser = User.id`;

            database(sql, [idUser], (error, results) => {

                if (error) {
                    console.error('Erreur lors de la requête SQL :', error);
                    return res.status(500).send('Erreur serveur');
                }

                if (results.length === 0) {
                    return res.status(404).send('Aucun utilisateur trouvé pour ce numéro de téléphone');
                }

                console.log(results[0]);


                const rdvs = results;


                res.render("admin/rdvAdmin.ejs", { rdvs, praticiens });

            })

        })
};
