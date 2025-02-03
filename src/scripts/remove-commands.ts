import { REST, Routes } from 'discord.js'

async function remove_commands() {
  const rest = new REST().setToken(process.env.TOKEN as string)

  // remove all commands in globals 🗑️
  await rest
    .put(Routes.applicationCommands(process.env.CLIENT_ID as string), {
      body: [],
    })
    .then(() =>
      console.log('Successfully deleted all global application commands.🗑️.'),
    )
    .catch(console.error)
}

remove_commands()
