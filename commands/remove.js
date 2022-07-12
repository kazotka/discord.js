const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Commande permettant de supprimer un grade d\'un utilisateur.')
    .addUserOption(option =>
        option.setName('membre')
          .setDescription('Sélectionnez le membre à qui vous voulez supprimer le rôle.')
          .setRequired(true)).addRoleOption(option =>
            option.setName('rôle')
            .setDescription('Sélectionnez le rôle que vous voulez supprimer.')
            .setRequired(true)),

    async execute(interaction) {
      const rôle = interaction.options.getRole('rôle');
      const membre = interaction.options.getMember('membre');

      membre.roles.remove(rôle);

      await interaction.reply({ content: `<:dot:989616340325236776> *J'ai parfaitement supprimé le rôle* ${rôle} à ${membre} (\`${rôle.id}\`, \`${membre.id}\`).\n     <:bluedot:993559802460512397>*Le rôle est définitivement supprimer* sauf si un membre qui peut gérer les rôles le change. \n\n<:dot:989616340325236776> *Attention* je *ne peux pas suprimer un rôle plus élevé que moi ou moi-même* faite attention à cela car parfois je deviens tout broken.\n*voili voila*`, ephemeral: true});

      await membre.send(`:otter: Hey, vous n'avez pas été sage, vous avez été retiré d'un de vos rôles!`);
    }
};