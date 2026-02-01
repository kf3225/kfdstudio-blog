module.exports = {
  "pre-commit": "pnpm lint:fix && pnpm format",
  "pre-push": "pnpm lint && pnpm typecheck",
};
