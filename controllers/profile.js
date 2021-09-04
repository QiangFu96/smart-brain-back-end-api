

const handleProfileGet = (req,res) => {
	const {id} =req.params;
	db.select('*').from('users').where({id})
		.then(user => {
			if(user.length){
				res.json(user[0]);
			}
			//if not found, system will return an empty array, not error
			else {
				res.status(400).json('Not Found')
			}
		})
		.catch(err => res.status(400).json('error getting user'))

	
}

module.exports = {
	handleProfileGet
};