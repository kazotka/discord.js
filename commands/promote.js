const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('promote')
    .setDescription('Commande permettant de promouvoir un utilisateur.')
    .addUserOption(option =>
        option.setName('membre')
          .setDescription('Sélectionnez le membre à qui vous voulez donner le rôle.')
          .setRequired(true)).addRoleOption(option =>
            option.setName('rôle')
            .setDescription('Sélectionnez le rôle que vous voulez donner.')
            .setRequired(true)),

    async execute(interaction) {
      
      const client = require('../index')
      const rôle = interaction.options.getRole('rôle');
      const membre = interaction.options.getMember('membre');
      const hschannel = client.channels.cache.get(process.env.hschannel);

      membre.roles.add(rôle);

      await interaction.reply({ content: `<:dot:989616340325236776> *J'ai parfaitement ajouté le rôle* ${rôle} à ${membre} (\`${rôle.id}\`, \`${membre.id}\`).\n     <:bluedot:993559802460512397>*Le rôle est définitif* sauf si un membre qui peut gérer les rôles le change. \n\n<:dot:989616340325236776> *Attention* je *ne peux pas donner un rôle plus élevé que moi ou moi-même* faite attention à cela car parfois je deviens tout broken.\n*voili voila*`, ephemeral: true});

      await hschannel.send(`Hé tout le monde, regarder *${membre} à ressue le rôle ${rôle}* c'est pas cool sa! *... enfin je crois?*`);

      await membre.send(`:otter: Hé, vous avez ruçu un rôle sur The cave venez voir par vous-même pour le découvrir!`);
    }
};