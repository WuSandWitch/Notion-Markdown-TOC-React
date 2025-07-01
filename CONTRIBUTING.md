# Contributing to @wusandwitch/notion-markdown-toc-react

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/wusandwitch/notion-markdown-toc-react.git
   cd notion-markdown-toc-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

## Development Workflow

### Making Changes

1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes to the source code

3. Build and test your changes:
   ```bash
   npm run build
   ```

4. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: describe your changes"
   ```

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Changes that do not affect the meaning of the code
- `refactor:` - A code change that neither fixes a bug nor adds a feature
- `test:` - Adding missing tests or correcting existing tests
- `chore:` - Changes to the build process or auxiliary tools

### Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the version numbers if applicable
3. Create a Pull Request with a clear title and description
4. Wait for code review and address any feedback

## Project Structure

```
├── table-of-contents.tsx    # Main component
├── index.ts                 # Entry point
├── example.tsx             # Usage examples
├── package.json            # Package configuration
├── tsconfig.json           # TypeScript configuration
├── rollup.config.js        # Build configuration
└── README.md               # Documentation
```

## Code Style

- Use TypeScript for type safety
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic

## Testing

Currently, the project uses build tests to ensure the package compiles correctly. In the future, we plan to add:

- Unit tests
- Integration tests
- Visual regression tests

## Release Process

Releases are automated through GitHub Actions:

1. **Automatic Release**: Create a GitHub release to trigger automatic npm publication
2. **Manual Release**: Use the GitHub Actions workflow dispatch to bump version and publish

## Questions?

If you have questions, please:

1. Check existing issues
2. Create a new issue with your question
3. Join our discussions

Thank you for contributing! 🎉 