# ⚙️ Discord TypeScript Bot Starter

A modern Discord bot template built with **TypeScript** and powered by [Bun](https://bun.sh) runtime. 

[![Bun](https://img.shields.io/badge/Runtime-Bun-%23000000.svg?style=flat&logo=bun)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-%233178C6.svg?logo=typescript)](https://www.typescriptlang.org/)

## ✨ Features

- Type-safe Discord.js interactions
- Hot-reloading development setup
- Modern Bun runtime performance
- Environment configuration support
- Slash commands ready
- Event handler system
- Modular code structure
- Deploy and Remove Commands to global 

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh) v1.2.2 or newer
- Discord application token ([get one here](https://discord.com/developers/applications))

### Installation

```bash
# Clone repository
git clone https://github.com/OuOSama/discord-bot-bun-ts.git my-bot
cd my-bot

# Install dependencies
bun install
```

## ⚙️ Configuration ( .env )
``` bash
APPLICATION_ID   =   <REPLACE_WITH_YOUR_APPLICATION_ID>
TOKEN            =   <REPLACE_WITH_YOUR_TOKEN>
GUILD_ID         =   <REPLACE_WITH_YOUR_GUILD_ID>
```

## 🧪 Development
``` bash
# Start development server (hot reload)
bun run dev

# Run production
bun start
```

## 📁 Project Structure
``` bash
📦 Discord-bot-bun-ts
 ┣ 📂.vscode
 ┃ ┗ 📜snippets.code-snippets
 ┣ 📂src
 ┃ ┣ 📂Commands
 ┃ ┃ ┗ 📜ping.ts
 ┃ ┣ 📂Events
 ┃ ┃ ┗ 📂Bot
 ┃ ┃ ┃ ┗ 📜Ready.ts
 ┃ ┣ 📂handlers
 ┃ ┃ ┣ 📜CommandsHandlers.ts
 ┃ ┃ ┗ 📜EventHandlers.ts
 ┃ ┣ 📂lib
 ┃ ┃ ┗ 📜loadTsFilesPath.ts
 ┃ ┣ 📂scripts
 ┃ ┃ ┣ 📜deploy-commands.ts
 ┃ ┃ ┗ 📜remove-commands.ts
 ┃ ┣ 📂types
 ┃ ┃ ┗ 📜index.d.ts
 ┃ ┗ 📜app.ts
 ┣ 📜.dockerignore
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜.prettierignore
 ┣ 📜.prettierrc
 ┣ 📜bun.lock
 ┣ 📜Dockerfile
 ┣ 📜eslint.config.js
 ┣ 📜LICENSE
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜tsconfig.json
```
## 📄 License
MIT License - see LICENSE for details

Made with ❤️ by [OuOSama](https://github.com/OuOSama) | Powered by [Bun](https://bun.sh) ⚡️
