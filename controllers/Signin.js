const handleSignin = (req, resp, db, bcrypt) => {
const {email, password} = req.body; //destructoring req object parameters
    if (!email, !password) {           //if email, name or password are empty return error
        return resp.status(400).json("Incorrect form submission") 
    }

    db.select('email', 'hash').from('login')   
    .where('email','=', email)
    .then(data=> {
        const isthisvalid = bcrypt.compareSync(password, data[0].hash);
        if (isthisvalid){
            return db('*').from('users')
            .where('email','=', email)
            .then(user=>{
                resp.json(user[0])
            })
            .catch(err=> resp.status(400).json("Unable to get the user"))
        } else {
            resp.status(400).json("Sorry, you have entered the wrong login details")
        }
    })
    .catch(err=> resp.status(400).json("Sorry, you have entered the wrong login details"))
}

module.exports = {
    handleSignin: handleSignin
}

