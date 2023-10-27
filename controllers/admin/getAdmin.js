import database from '../../database.js';

export default (req, res) => {
    
    const idUser = req.session.idUser;

    database(
        `SELECT  Praticien.Nom, Praticien.Prenom, User.login, User.mdp, User.role
        FROM Praticien
        INNER JOIN User ON User.id = Praticien.idUser
        WHERE Praticien.idUser = ?;`,
        [idUser],
        
        (error, results) => {
            
            if (error) {
                console.error(`Erreur lors de l'exécution de la requête ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }

            if (results.length === 0) {
                res.status(404).send(`comment faire ${idUser}.`);
                return;
            }

            const praticien = {
                nom: results[0].Nom,
                prenom: results[0].Prenom,
                login: results[0].login,
                mdp: results[0].mdp
            }

            res.render("admin/modifAdmin.ejs", { praticien });
        }
    );
};