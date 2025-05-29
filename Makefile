install:
	npm ci && make -C frontend install

lint:
	make -C frontend lint

start:
	npx start-server -s ./frontend/dist

build:
	make -C frontend build
