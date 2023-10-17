import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import database from '../../database.js';
import xss from 'xss';

export default (req, res) => {
    
    const verifEmail=(email)=>{
        
         const Regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return Regex.test(email);
};
    
    
    const newId = v4();

    const newAdmin = {
        
        nom: xss(req.body.nom),
        prenom: xss(req.body.prenom),
        login: xss(req.body.login),
        mdp: req.body.mdp,
        role:"admin"
    };
    if (!verifEmail(newAdmin.login)) {
        
    return res.status(400).send('L\'e-mail n\'est pas dans un format valide.');
}

    bcrypt.hash(newAdmin.mdp, 10, (error, hash) => {
        if (error) {
            console.error('Erreur lors du hachage du mot de passe', error);
            return res.status(500).send({ error: 'Erreur serveur lors du hachage du mot de passe.' });
        }

        // Insérer dans la table User
        database(
            'INSERT INTO User (id, login, mdp,role) VALUES (?, ?, ?, ?)',
            [newId, newAdmin.login, hash, newAdmin.role],
            (error, result) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send({
                        error: 'Erreur serveur',
                    });
                    
                }
                // Insérer dans la table Praticien
                database(
                    'INSERT INTO Praticien (id, Nom, Prenom, idUser) VALUES (?, ?, ?, ?)',
                    [v4(), newAdmin.nom, newAdmin.prenom, newId,],
                    (error, result) => {
                        if (error) {
                            console.error(error);
                            return res.status(500).send({
                                error: 'Erreur serveur',
                            });
                        }

                         res.redirect("/login");
                    }
                );
            }
        );
    });
};
