# Build the project for production
prod:
	pnpm build

# Start the development server
d:
	pnpm dev

# Reinstall dependencies and start development server
reinstall:
	pnpm i && pnpm dev

# Clean install: remove node_modules, reinstall dependencies, start dev server
reset:
	rm -rf node_modules
	pnpm i
	pnpm dev

.PHONY: prod d reinstall reset