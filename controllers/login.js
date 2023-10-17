import database from '../database.js';
import bcrypt from 'bcrypt';
import xss from 'xss';


export default (req, res) => {

    const userLog = {
        login: xss(req.body.login),
        mdp: req.body.mdp
    };
    
//console.log(userLog)

        database('SELECT * FROM User WHERE login=? ', [userLog.login], (error, results) => {
            if (error) {
                console.error('Erreur lors de l\'exécution de la requête :', error);
                return res.status(500).send('Erreur lors de l\'exécution de la requête.');
            }
            
           // console.log(results)
          //  console.log(results[0])

            if (results.length === 0) {
                
                res.redirect('/newUser', 201,{ message: 'Cree un indentifiant' });
                return;
            }

            bcrypt.compare(userLog.mdp, results[0].mdp, (error, result) => {
                if (error) {
                    console.log(error);
                    res.send('Erreur serveur');
                }

                if (!result) {
                    res.render('login.ejs', { message: 'Identifiants incorrects' });
                    return;
                }

                req.session.isLogged = true;
                req.session.idUser=results[0].id
                
                
             if (results[0].role === 'admin') 
                {
                   
                res.redirect('/planning');
                
            } else 
            {
                res.redirect('/rdv', 200,{ data: result[0], isLogged: req.session.isLogged });
            }
        });
    });
};
  