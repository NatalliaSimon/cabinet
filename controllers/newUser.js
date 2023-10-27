import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import database from '../database.js';
import xss from 'xss';

export default (req, res) => {

    const verifEmail = (email) => {

        const Regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return Regex.test(email);
    };


    const newId = v4();

    const newUser = {

        nom: xss(req.body.nom),
        prenom: xss(req.body.prenom),
        tel: xss(req.body.tel),
        login: xss(req.body.login),
        mdp: req.body.mdp,
        role: "User"
    };
    if (!verifEmail(newUser.login)) {

        return res.status(400).send('L\'e-mail n\'est pas dans un format valide.');
    }

    bcrypt.hash(newUser.mdp, 10, (error, hash) => {
        if (error) {
            console.error('Erreur lors du hachage du mot de passe', error);
            return res.status(500).send({ error: 'Erreur serveur lors du hachage du mot de passe.' });
        }

        // Insérer dans la table newUser
        database(
            'INSERT INTO User (id, login, mdp,role) VALUES (?, ?, ?, ?)', [newId, newUser.login, hash, newUser.role],
            (error, result) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send({
                        error: 'Erreur serveur',
                    });

                }
                // Insérer dans la table Patient
                database(
                    'INSERT INTO Patient (id, nom, prenom, tel, idUser) VALUES (?, ?, ?, ?, ?)', [v4(), newUser.nom, newUser.prenom, newUser.tel, newId, ],
                    (error, result) => {
                        if (error) {
                            console.error(error);
                            return res.status(500).send({
                                error: 'Erreur serveur',
                            });
                        }

                        res.redirect("/login", 200, {});
                    }
                );
            }
        );
    });
};
