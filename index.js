const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 3243773 });

const path = require('path');

// Handler
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const { readdirSync } = require('fs');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
};

// Error message
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		 interaction.reply({ content: 'Sorry, I ran into a problem.', ephemeral: true });
	}
});

const dotenv = require('dotenv');
dotenv.config();

client.login(process.env.authenticationkey);
