const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey:'8b95bb438a854743a07b3f4893e8ed18'
});

const handleApiCall = (req,res) => {
	app.models.predict(
    {

        id: "a403429f2ddf4b49b307e318f00e528b",
        version: "34ce21a40cc24b6b96ffee54aabff139",
    },

        //1. Calling setState() in React is asynchronous, for various reasons (mainly performance).
        //2. Under the covers React will batch multiple calls to setState() into a single call,
        //and then re-render the component a single time, rather than re-rendering for every state change. 
        //3. so below we use input url as the data to send to api, since imageUrl wont be updated
        //at the time when we called .predict function
    req.body.input)
    .then(data => {
    	res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));

}



const handleImage = (req,res,db) => {
	const {id} =req.body;
	//use increment in knex to increase entry count
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('unable to get entries'))
	
}

module.exports = {
	handleImage,
	handleApiCall
};