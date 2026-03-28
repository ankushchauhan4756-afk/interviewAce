# Contributing to InterviewAce

Thank you for your interest in contributing to InterviewAce! This document provides guidelines for contributing.

## Code of Conduct

Be respectful and professional in all interactions. We welcome contributions from everyone.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/interviewace.git`
3. Create a branch: `git checkout -b feature/your-feature`
4. Make changes and test
5. Push to your fork: `git push origin feature/your-feature`
6. Create a Pull Request

## Development Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Commit Messages

Use clear, descriptive commit messages:

```
Bad:  "fix bug"
Good: "fix: prevent race condition in authentication"

Bad:  "update"
Good: "feat: add resume analyzer feature"
```

Prefixes:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style (no logic change)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Build, dependencies, etc.

## Code Style

### JavaScript/React

- Use ES6+ syntax
- Use arrow functions
- Use const/let instead of var
- 2-space indentation
- Meaningful variable names
- Comments for complex logic

### Example:

```javascript
// Good
const calculateScore = (submissions) => {
  // Calculate total score
  return submissions.reduce((sum, sub) => sum + sub.score, 0);
};

// Bad
const calc = (s) => {
  let tot = 0;
  for (let i = 0; i < s.length; i++) {
    tot += s[i].score;
  }
  return tot;
};
```

## Testing

Write tests for new features:

```bash
npm test
```

## Pull Request Process

1. Update README if needed
2. Add description of changes
3. Reference related issues
4. Ensure tests pass
5. Request review from maintainers

## Reporting Bugs

Include:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment info

## Feature Requests

Describe:
- Problem you're solving
- Proposed solution
- Alternative solutions
- Additional context

## Questions?

- Create an issue
- Contact: support@interviewace.com
- Check existing issues first

Thank you for contributing! 🎉
