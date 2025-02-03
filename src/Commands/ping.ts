import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js'
import type { Command } from '@type/index' // import type from "src/types/index"

/**
 * A basic "ping" command to check bot responsiveness.
 * - When executed, it replies with "Pong!".
 */
export default {
  // 🏗️ Define the command structure using SlashCommandBuilder
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName('ping') // Command name: /ping
    .setDescription('Return pong!'), // Command description

  // 🎯 Command execution logic
  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply({
      content: 'Pong!',
      flags: MessageFlags.Ephemeral,
    }) // Reply with "Pong!" when the command is used
  },
} satisfies Command // Ensures the object conforms to the Command interface
