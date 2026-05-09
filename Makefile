.PHONY: help build up down logs shell migrate

help:
	@echo "Available commands:"
	@echo "  make build       - Build Docker images"
	@echo "  make up          - Start containers"
	@echo "  make down        - Stop containers"
	@echo "  make logs        - View container logs"
	@echo "  make logs-backend - View backend logs"
	@echo "  make logs-frontend - View frontend logs"
	@echo "  make shell       - Open database shell"
	@echo "  make migrate     - Run database migrations"
	@echo "  make clean       - Remove containers and volumes"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

logs-backend:
	docker-compose logs -f backend

logs-frontend:
	docker-compose logs -f frontend

shell:
	docker-compose exec db psql -U postgres -d hotel_db

migrate:
	docker-compose exec backend alembic upgrade head

clean:
	docker-compose down -v

prod-build:
	docker-compose -f docker-compose.prod.yml build

prod-up:
	docker-compose -f docker-compose.prod.yml up -d

prod-down:
	docker-compose -f docker-compose.prod.yml down