# Makefile

lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules jest