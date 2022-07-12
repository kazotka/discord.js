module.exports = {
	name: 'ready',
	once: true,
	execute(client) {

		const dotenv = require('dotenv')
		dotenv.config();

    			client.user.setStatus(process.env.status);
   			 client.user.setActivity(process.env.display, { type: process.env.activity });

		console.log(`Ready for the show.. !`);

	},
};
