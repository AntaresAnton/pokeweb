@echo off
mkdir pokeweb
cd pokeweb

echo Creating root files...
type nul > .env
type nul > .dockerignore
type nul > Dockerfile
type nul > docker-compose.yml

echo Creating GitHub workflows...
mkdir .github\workflows
type nul > .github\workflows\ci.yml
type nul > .github\workflows\cd.yml

echo Creating source directories...
mkdir src\components\Berries
mkdir src\components\Evolution
mkdir src\components\Items
mkdir src\components\Locations
mkdir src\components\Moves
mkdir src\components\Pokedex
mkdir src\components\shared

mkdir src\routes
type nul > src\routes\AppRoutes.jsx

mkdir src\services
type nul > src\services\api.js

mkdir src\utils
type nul > src\utils\constants.js

mkdir src\tests\unit
mkdir src\tests\integration

echo Project structure created successfully!
