# Base docker-compose command
DC = docker-compose

# Secret key check
ENV_FILE = .env
SECRET_KEY_VAR = SECRET_KEY

# Helpers
define NEW_SECRET_KEY
$(shell $(DC) run --rm generate-secret-key)
endef

.PHONY: help build up down logs migrate createsuper shell generate-secret-key ensure-env restore_dump reset_db

help:
	@echo "Usage:"
	@echo "  make build             Build containers"
	@echo "  make up                Start all services"
	@echo "  make down              Stop and remove services"
	@echo "  make logs              Follow logs"
	@echo "  make shell             Open backend shell"
	@echo "  make migrate           Run Django migrations"
	@echo "  make createsuper       Create Django superuser"
	@echo "  make restore_dump      Restore PostgreSQL from backup.dump"
	@echo "  make reset_db          Remove and re-init the database volume"
	@echo "  make ensure-env        Ensure .env and SECRET_KEY exist"

build:
	$(DC) build

up: ensure-env
	$(DC) up -d

down:
	$(DC) down

logs:
	$(DC) logs -f

shell:
	$(DC) exec backend bash

migrate:
	$(DC) exec backend python manage.py migrate

createsuper:
	$(DC) exec backend python manage.py createsuperuser

generate-secret-key:
	@$(DC) run --rm generate-secret-key 

ensure-env:
	@if [ ! -f $(ENV_FILE) ]; then \
		echo "# Auto-generated .env" > $(ENV_FILE); \
		echo "POSTGRES_DB=sinemon_db" >> $(ENV_FILE); \
		echo "POSTGRES_USER=postgres" >> $(ENV_FILE); \
		echo "POSTGRES_PASSWORD=postgres" >> $(ENV_FILE); \
		echo "DEBUG=True" >> $(ENV_FILE); \
		echo "SECRET_KEY=$$(make generate-secret-key -s)" >> $(ENV_FILE); \
		echo "[+] Created .env with new SECRET_KEY"; \
	else \
		if ! grep -q "$(SECRET_KEY_VAR)=" $(ENV_FILE); then \
			echo "$(SECRET_KEY_VAR)=$$(make generate-secret-key -s)" >> $(ENV_FILE); \
			echo "[+] Added missing SECRET_KEY to existing .env"; \
		fi \
	fi

restore_dump:
	@echo "Stopping dependent containers..."
	$(DC) stop backend consumer socket
	@echo "Running restore job..."
	$(DC) run --rm restore
	@echo "Starting dependent containers again..."
	$(DC) start backend consumer socket
	@echo "Restore complete."

reset_db:
	@echo "[!] WARNING: Resetting database volume..."
	$(DC) down -v
	$(DC) up -d db
	@echo "[✓] DB restarted — re-run 'make restore_dump' or 'make migrate'"

clean:
	@echo "[!] Cleaning up Docker containers, volumes, and generated files..."
	$(DC) down -v --remove-orphans
	@echo "[✓] Docker containers and volumes removed."
	@if [ -f .env ]; then rm .env && echo "[✓] .env file removed."; fi
	@find . -type d -name "__pycache__" -exec rm -r {} + && echo "[✓] __pycache__ cleaned." || true

.PHONY: all

all: build ensure-env up restore_dump