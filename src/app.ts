import { Client, GatewayIntentBits } from 'discord.js'
import EventHandlers from '@handler/EventHandlers' // import EventHandlers from "src/handlers/EventHandlers.ts"
import CommandsHandlers from '@handler/CommandsHandlers' // import CommandsHandlers from "src/handlers/CommandsHandlers.ts"

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
})

// use Event Handlers
EventHandlers(client)

// use Commands Handlers
CommandsHandlers(client)

// Login
client.login(Bun.env.TOKEN)
