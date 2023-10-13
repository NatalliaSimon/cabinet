export default (req, res) => {
    
    req.session.destroy((error) => {
        
        console.log(req.session)
        
		res.redirect('/');
    })
}
