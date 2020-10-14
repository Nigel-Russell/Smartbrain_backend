const handleProfile = (req, resp, db)=>{
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then(user=>{
        if(user.length) {
            resp.json(user[0])
        } else {
            resp.status(400).json("User not found")
        }
    })
    .catch(err => resp.status(400).json("User not found"));
};

module.exports = {
    handleProfile: handleProfile
}