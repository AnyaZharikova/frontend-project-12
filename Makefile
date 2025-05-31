install:
	npm ci && make -C frontend install

lint:
	make -C frontend lint

start-backend:
	npx start-server -s ./frontend/dist

start-frontend:
	make -C frontend start

start:
	make start-backend && make start-frontend

build:
	make -C frontend build
