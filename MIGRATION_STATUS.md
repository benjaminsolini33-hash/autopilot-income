# Autopilot Income — migration status

## Current state
- Original app: https://autopilot-income.floot.app
- Destination repository: https://github.com/benjaminsolini33-hash/autopilot-income
- The initial repository contained only README.md.
- No deployment or scheduled automation is configured from this repository.

## Safety rules
- Never commit credentials, session cookies, API keys, database URLs with passwords, or production data.
- Prefer a private repository while migrating source code.
- Keep paid services disabled unless the owner explicitly approves the cost.
- Do not publish posts, send messages, launch ads, or run recurring tasks without explicit approval.
- Keep the original Floot project intact until the replacement has been tested.

## Migration plan
1. Inventory and export actual source files from Floot.
2. Exclude secrets, generated files, internal-only configuration, and customer data.
3. Recreate application structure and dependency manifest in this repository.
4. Run type checks and tests; document platform-specific services that need replacement.
5. Evaluate hosting only after checking free-tier limits and runtime requirements.
6. Deploy only after explicit approval and verification.

## Compatibility note
Floot provides platform-specific helpers and services, including AI integration, authentication, database, and server endpoints. Copying files alone will not make the app run elsewhere. Each platform-specific dependency must be replaced or configured deliberately.
