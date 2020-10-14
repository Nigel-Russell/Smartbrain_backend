const handleRegister = (req, resp, db, bcrypt) => {
    const {email, name, password} = req.body; //destructoring req object parameters
    if (!email, !name, !password) {           //if email, name or password are empty return error
        return resp.status(400).json("Incorrect form submission") 
    }
    const hash = bcrypt.hashSync(password); //hasing password obtained from front end
    db.transaction(trx => {  //transaction created when using multiple database to copy
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')  //data from front end imported to login db
        .returning('email')  //returns email from login db 
        .then(loginemail => {
            return trx('users') //this information is put into users db
            .returning('*')
            .insert({
                email: loginemail[0],
                name: name,
                joined: new Date()
            })
            .then (user =>{
                resp.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
      })
      .catch(err=> resp.status(400).json("Unable to Register"));
    }

module.exports ={
    handleRegister: handleRegister
};