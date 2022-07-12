const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const client = require('../index')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('announcement')
    .setDescription('Commande dans lequel vous saisissez un texte qui sera ensuite envoyé par louloutre.')
    .addStringOption(option =>
        option.setName('message')
          .setDescription('Entrez votre message qui sera ensuite envoyé par louloutre.')
          .setRequired(true)).addChannelOption(option =>
            option.setName('salon')
            .setDescription('Sélectionnez un salon dans lequel le message sera envoyé.')
            .setRequired(true)),

    async execute(interaction) {
      
        const salon = interaction.options.getChannel('salon');
        const message = interaction.options.getString('message');

        if (!client.permissions.has([Permissions.FLAGS.VIEW_CHANNEL])) return interaction.reply('error')
    
        salon.send(`${message}`);
        await interaction.reply({ content:`<:dot:989616340325236776> *J\'ai envoyé votre message* en mon nom au salon *${salon}!*`, ephemeral: true});


    }
}