const path = require('path');
const { readdirSync } = require('fs');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const dotenv = require('dotenv');
dotenv.config();

const rest = new REST({ version: '9' }).setToken(process.env.token);

rest.put(Routes.applicationGuildCommands(process.env.clientid, process.env.serverid), { body: commands })
	.then(() => console.log('commands updated.. !'))
	.catch(console.error);
