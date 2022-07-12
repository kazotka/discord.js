// Appelle des libraries.
const path = require('path');
const { readdirSync } = require('fs');

// Appelle des commandes
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

// Appelle des libraries.
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Appelle de la config et actualisation des commandes.
const dotenv = require('dotenv');
dotenv.config();

const rest = new REST({ version: '9' }).setToken(process.env.authenticationkey);

rest.put(Routes.applicationGuildCommands(process.env.botId, process.env.guildId), { body: commands })
	.then(() => console.log('les slash commandes sont actualisés.'))
	.catch(console.error);