import path from 'path'
import { loadTsFilesPath } from '@lib/loadTsFilesPath'
import { Client } from 'discord.js'

export default async (client: Client) => {
  // Get all .ts event files, including those in subfolders
  const TsEventFiles = await loadTsFilesPath(
    './src/Events/**/*.ts',
  )

  // Dynamically import event files and register events with the client
  await Promise.all(
    TsEventFiles.map(async (file) => {
      // Import event handler from each file
      const { default: event } = await import(path.resolve(file))

      // Register the event with the client: 'once' for one-time events, 'on' for repeated events
      client[event.once ? 'once' : 'on'](event.name, (...args) =>
        event.execute(...args, client),
      )
    }),
  )

  // Log all event files that were loaded
  console.log(TsEventFiles)
}
