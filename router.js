import express from "express";


import cabinet from './controllers/cabinet.js';
import acces from './controllers/acces.js';
import login from './controllers/login.js';
import loginget from './controllers/loginget.js';
import newUser from './controllers/newUser.js';
import newUserGet from './controllers/newUserGet.js';
import rdv from './controllers/rdv.js';
import rdvGet from './controllers/rdvGet.js';
import logout from './controllers/logout.js';
import Delete from './controllers/delete.js';
import modif from './controllers/modif.js';
import modifGet from './controllers/modifGet.js';
import planning from './controllers/planning.js';
import getAdmin from './controllers/admin/getAdmin.js';
import modifAdmin from './controllers/admin/modifAdmin.js';



const router = express.Router();

const checkAuthentication = (req, res, next) => {
    
    if(!req.session.isLogged) {
        res.redirect('/login');
        return;
    }
    
    next();
};

router.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged;
    next();
});






 
router.get('/',cabinet);
router.get('/acces',acces);
router.get('/login',loginget);
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
router.get('/admin/modifAdmin',getAdmin);
router.post('/admin/modifAdmin',checkAuthentication,modifAdmin);






export default router;
