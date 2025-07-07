# AgentFlow: AI-Powered Workflow Automation with Mosaia

AgentFlow is a modern web application that leverages Mosaia's AI-powered agents to automate and streamline your workflow. Effortlessly connect tools like Slack, Google Sheets, and Notion to extract tasks, update data, and keep your workspaces in sync—no manual busywork required. Experience seamless integration and next-level productivity with intelligent, modular agents.

## Live Demo

- [agentflowmosaia.netlify.app](https://agentflowmosaia.netlify.app/)

## Features

- **AI-Powered Agents:** Automate repetitive tasks and workflows using Mosaia's intelligent agents.
- **Seamless Integrations:** Effortlessly connect with Slack, Google Sheets, Notion, and more.
- **Task Extraction & Data Sync:** Extract actionable tasks, update data, and keep all your tools in sync automatically.
- **Modular & Extensible:** Easily add or customize agents to fit your unique workflow needs.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd frontend-modular-world
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## Related Projects & Tools

- [Google Sheets Mosaia Tool (GitHub)](https://github.com/Blessan-Alex/googlesheet-mosaia-tool)
- [Slack Agent (GitHub)](https://github.com/rhapsodicpug/slack1)
- [AI Task Extractor Agent (Mosaia)](https://www.mosaia.ai/user/bless/agent/AI-TaskExtractor)
- [Google Sheets Writer Tool (Mosaia)](https://www.mosaia.ai/user/bless/tool/google-sheets-writer)
- [Slack Task Extractor Tool (Mosaia)](https://www.mosaia.ai/user/rhapsodicpug/tool/slack-task-extractor)

## Development

This project uses React, TypeScript, and Vite for a fast and modern development experience. ESLint is configured for code quality and consistency.

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules.

## Roadmap & Future Plans

- **Enhanced User Experience:** We are actively working on improving the user interface and overall experience.
- **More Tool Integrations:** Expect support for additional tools and platforms to further expand your workflow automation capabilities.
- **Custom Agent Creation:** Future updates will make it even easier to create and manage your own AI agents.

---

Experience the future of productivity with AgentFlow and Mosaia's AI-powered agents!
