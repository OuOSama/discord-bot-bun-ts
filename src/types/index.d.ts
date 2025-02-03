import {
  Collection,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} from 'discord.js'

/**
 * `cooldown`: The cooldown period for the command in seconds.
 * - Used to prevent the command from being triggered multiple times in a short period.
 * - The value defines how long a user must wait before using the same command again.
 */
export interface Command {
  cooldown: number // Cooldown time in seconds
  data: SlashCommandBuilder // Command data
  execute: (interaction: ChatInputCommandInteraction) => Promise<void> // Function to execute the command
}

/**
 * `CooldownCommand`: Extends the Command interface with the ability to track cooldowns.
 * - Includes cooldown management logic.
 * - Stores the last execution time for each user.
 */
export interface CooldownCommand extends Command {
  // A collection to track cooldowns for each user.
  cooldowns: Collection<string, number>
}

/**
 * Represents a Discord bot event.
 * - `name`: The name of the event, such as 'ready', 'messageCreate', etc.
 * - `once`: Optional boolean to specify if the event should only fire once (default is false).
 * - `execute`: The function that will be called when the event is triggered.
 *   - This function takes a `client` as an argument and performs actions when the event occurs.
 *   - Typically, this would involve logging, sending messages, or other bot-related actions.
 */
export interface Event {
  name: string // Event name like 'ready', 'messageCreate', etc.
  once?: boolean // Optional: To indicate if the event should only fire once
  execute: (client: Client) => Promise<void> // Function to execute when event triggers
}

/**
 * Extends the Discord.js Client interface to include a custom command collection.
 * - `commands`: Stores registered commands, mapping command names to their implementations.
 */
declare module 'discord.js' {
  interface Client {
    commands: Collection<string, CooldownCommand>
  }
}
