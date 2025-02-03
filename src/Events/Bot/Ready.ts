import { Client, Events } from 'discord.js'
import type { Event } from '@type/index' // Import type from "src/types/index"

export default {
  name: Events.ClientReady, // Replace Event name with Your interested  Event 🟢
  once: true, // This event will trigger only once ⏳
  execute: async (client: Client) => {
    // When the bot is ready 🛠️
    console.log(`${client.user?.displayName ?? 'Bot'} is ready! 🚀`) // Log the message when the bot is ready
  },
} satisfies Event // Ensures the object conforms to the Event interface ✅
