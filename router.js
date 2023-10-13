import express from "express";
//import createUser from './controllers/createUser.js';
//import list from './controllers/list.js';
//import update from './controllers/update.js';
//import Delete from './controllers/delete.js';
//import user from './controllers/user.js';

import cabinet from './controllers/cabinet.js';
import acces from './controllers/acces.js';
import login from './controllers/login.js';
//import loginGet from './controllers/loginGet.js';
import Get from './controllers/get.js';
import newUser from './controllers/newUser.js';
import newUserGet from './controllers/newUserGet.js';
import rdv from './controllers/rdv.js';
import rdvGet from './controllers/rdvGet.js';
import logout from './controllers/logout.js';
import Delete from './controllers/delete.js';
import modif from './controllers/modif.js';
import modifGet from './controllers/modifGet.js';
import planning from './controllers/planning.js';





const router = express.Router();

const checkAuthentication = (req, res, next) => {
    
    if(!req.session.isLogged) {
        res.redirect('/login');
        return;
    }
    console.log('ok')
    next();
}

router.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged;
    next();
});






 
router.get('/',cabinet);
router.get('/acces',acces);
router.get('/login',Get);
router.post('/login', login);
router.get('/logout',logout); 
router.get('/delete',checkAuthentication, Delete); 
router.post('/newUser',newUser);
router.get('/newUser',newUserGet);
router.get('/rdv',rdvGet);
router.post('/rdv',checkAuthentication,rdv); 
router.get('/modif',modifGet);
router.post('/modif',checkAuthentication,modif);
router.get('/planning',planning);

export default router;
