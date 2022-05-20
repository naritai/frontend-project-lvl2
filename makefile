# Makefile

install:
	npm install

lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules jest

test-watch:
	npx -n --experimental-vm-modules jest --watchAll