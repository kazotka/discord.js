module.exports = {
	// Appelle de l'événement.
	name: 'ready',
	// Exécuter seulement au lancement ou non.
	once: true,
	execute(client) {

		// Appelle de la configuration, initialisation du status et message de lancement.

		const dotenv = require('dotenv')
		dotenv.config();

    client.user.setStatus(process.env.status);
    client.user.setActivity(process.env.display, { type: process.env.activity });

		console.log(`Toujours prêt.. !`);

	},
};