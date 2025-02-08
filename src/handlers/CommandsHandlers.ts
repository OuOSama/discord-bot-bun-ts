import {
  REST,
  Routes,
  Events,
  Client,
  Collection,
  MessageFlags,
  ChatInputCommandInteraction,
} from 'discord.js'
import path from 'path'
import { loadTsFilesPath } from '@lib/loadTsFilesPath'

export default async (client: Client) => {
  // 🛠️ Ensure that the `commands` collection exists on the client instance
  client.commands = new Collection()

  // Create a collection for cooldowns
  const cooldowns = new Collection<string, Collection<string, number>>()

  // 📂 Get all TypeScript command files recursively from the `src/Commands` folder
  const TsCommandsFiles = await loadTsFilesPath('./src/Commands/**/*.ts')
  console.log(TsCommandsFiles)

  // 🔄 Load and register all found command files
  await Promise.all(
    TsCommandsFiles.map(async (file) => {
      const { default: command } = await import(path.resolve(file))
      client.commands.set(command.data.name, command)
    }),
  )

  // 🚀 Register commands with Discord's API
  const rest = new REST().setToken(process.env.TOKEN as string)

  async function registerCommands() {
    try {
      console.log('🔄 Reloading application commands...')

      // Convert commands to an array of JSON objects
      const commandsArray = client.commands.map((cmd) => cmd.data.toJSON())

      // Update application commands via Discord API
      await rest.put(
        Routes.applicationGuildCommands(Bun.env.APPLICATION_ID, Bun.env.GUILD_ID),
        {
          body: commandsArray,
        },
      )

      console.log(
        `✅ Successfully registered ${commandsArray.length} commands.`,
      )
    } catch (error) {
      console.log('❌ An error occurred while reloading application commands:')
      console.error(error)
    }
  }

  // ⚡ Execute command registration
  await registerCommands()

  // 🎯 Listen for interactions (commands)
  client.on(Events.InteractionCreate, async (interaction) => {
    // 📋 Check if the interaction is a SlashCommand
    if (!interaction.isChatInputCommand) return

    // 🧐 Check if the command is registered in the bot
    const command = client.commands.get(
      (interaction as ChatInputCommandInteraction).commandName,
    )
    if (!command) return

    // 💡 Check if the command has a cooldown
    const now = Date.now()
    const timestamps = cooldowns.get(command.data.name)
    const cooldownAmount = command.cooldown * 1000

    if (timestamps) {
      const userTimestamp = timestamps.get(interaction.user.id)
      const expirationTime =
        (userTimestamp ? userTimestamp : now) + cooldownAmount

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000
        return await (interaction as ChatInputCommandInteraction).reply({
          content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`/${command.data.name}\` command.`,
          flags: MessageFlags.Ephemeral,
        })
      }
    } else {
      cooldowns.set(command.data.name, new Collection())
    }

    try {
      // 🏃‍♂️ Execute the command
      await command.execute(interaction as ChatInputCommandInteraction)

      // Set the cooldown for the user
      cooldowns.get(command.data.name)?.set(interaction.user.id, now)

      setTimeout(() => {
        timestamps?.delete(interaction.user.id)
      }, cooldownAmount)
    } catch (error) {
      console.error('❌ Error executing command:', error)
      await (interaction as ChatInputCommandInteraction).reply({
        content: 'There was an error while executing this command.',
        flags: MessageFlags.Ephemeral,
      })
    }
  })
}
