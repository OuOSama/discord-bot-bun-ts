import path from 'path'
import { REST, Routes } from 'discord.js'
import { loadTsFilesPath } from '@lib/loadTsFilesPath'

async function deploy_commands() {
  // 🚀 Use glob to search for command files.
  const TsCommandsFiles = await loadTsFilesPath('./src/Commands/**/*.ts')

  // 🔄 Load all commands

  const commandsArray = await Promise.all(
    TsCommandsFiles.map(async (file) => {
      const { default: command } = await import(path.resolve(file))
      return command.data.toJSON() // Convert commands to JSON
    }),
  )

  // 🚀 Register Commands with Discord API
  const rest = new REST().setToken(process.env.TOKEN as string)

  await rest
    .put(Routes.applicationCommands(process.env.CLIENT_ID as string), {
      body: commandsArray,
    })
    .then(() =>
      console.log('Successfully registered application commands globally. 🚀'),
    )
    .catch(console.error)
}

deploy_commands()
