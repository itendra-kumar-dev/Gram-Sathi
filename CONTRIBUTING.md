# Contributing to GramSathi

Thanks for taking the time to improve GramSathi. Clear, focused contributions make the project easier to review and maintain.

## Before you start

- For a large change, open an issue first to discuss the approach.
- Keep changes focused; avoid mixing unrelated features or formatting changes into one pull request.
- Never commit credentials, `.env` files, personal data, or production database records.
- Follow the existing JavaScript and React patterns in the relevant app.

## Local setup

Follow the [README setup instructions](./README.md#getting-started) to configure MongoDB and the frontend and backend applications.

## Validate your changes

For frontend changes, run from `gramsathi-frontend`:

```bash
npm run lint
npm run build
```

For backend changes, check the JavaScript files from the repository root:

```bash
find gramsathi-backend -path '*/node_modules' -prune -o -name '*.js' -type f -print0 \
  | xargs -0 -n 1 node --check
```

When a change depends on MongoDB, Cloudinary, Razorpay, or Gemini, describe any required local configuration and manual verification steps in the pull request.

## Pull requests

- Use a specific title that describes the change.
- Explain the problem and the solution, and link any related issue.
- List the validation commands you ran and their results.
- Include screenshots for visible UI changes when practical.
- Call out configuration changes, migration needs, and known limitations.

## Reporting issues

Include steps to reproduce, expected and actual behavior, and relevant browser or server output. Remove tokens, personal information, and other secrets before sharing logs.
