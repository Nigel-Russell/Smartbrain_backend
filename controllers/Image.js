const Clarifai = require('clarifai');

//My Clarifai API key
const app = new Clarifai.App({
    apiKey: '78c1cf28c2404105aa809b4fd9985d98'
});

const handleAPI = (req, resp) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        resp.json(data);
    })
    .catch(err => resp.status(400).json("Unable to authenticate API"))
}

const handleImage = (req, resp, db)=>{
    const { id } = req.body;
    db('users').where( 'id','=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        resp.json(entries[0])
    }).catch(err => resp.status(400).json("Unable to get your entrie count"))
};

module.exports = {
    handleImage,
    handleAPI
}