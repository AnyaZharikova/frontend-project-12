install:
	npm ci

lint:
	npx eslint .

start:
	npx start-server -s ./frontend/dist

build:
	npm run build
