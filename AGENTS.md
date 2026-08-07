# 🤖 Instructions for AI Agents

To maintain a healthy, up-to-date, and correct codebase across successive development sessions, all AI agents must strictly adhere to the following documentation maintenance rules:

## 1. Keep All Documentation Synced with Code Changes
Whenever you modify, add, remove, or reorganize elements of the codebase (such as files, folders, algorithms, components, utilities, configuration, or environment dependencies), you **must** immediately update any relevant documentation files (primarily `README.md` and any other user-facing markdown/text files):
- **Project Architecture:** Ensure any directory trees, architecture diagrams, or file-path references match the actual folder layout exactly.
- **Features & Algorithms:** Update tables, lists, or descriptions of supported features/algorithms to accurately represent the current capabilities of the application.
- **Local Setup & Dependency Notes:** If you modify `package.json` dependencies, node versions, or scripts, immediately update the corresponding instructions in the setup guides.

## 2. Ensure Environment & Remote Alignment
Before finalizing any work, inspect the active repository environment and ensure that the documentation points to correct endpoints:
- **Git Remotes:** Run `git remote -v` to determine the active repository owner and name.
- **Badges & Clone URLs:** Verify that all repository-specific links (such as GitHub Actions deployment badges, license badges, clone commands, or pull request links) match the active repository owner and name (e.g. `ChristopherZhong/decoder`).
- **Live Demo URLs:** Ensure deployment target links point to the correct GitHub Pages domain (e.g. `https://christopherzhong.github.io/decoder/`).

## 3. Review and Verify Before Submitting
- Always verify your documentation updates using read-only tools to confirm clarity, formatting, and correct syntax.
- Ensure that updating documentation does not introduce broken markdown links, stale descriptions, or typos.
